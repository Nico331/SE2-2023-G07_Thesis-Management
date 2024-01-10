package it.polito.server.clock

import it.polito.server.appliedproposal.AppliedProposalService
import it.polito.server.email.EmailService
import it.polito.server.proposal.ProposalRepository
import it.polito.server.proposal.archiviation_type
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.time.*
import java.time.format.DateTimeFormatter


@Service
class ClockService (
    private val proposalRepository: ProposalRepository,
    private val appliedProposalService: AppliedProposalService,
    private val emailService: EmailService
){

    final var realTimeClock: Clock = Clock.systemDefaultZone()
    final var virtualClock : Clock? = null
    private final var actualDate : LocalDate = realTimeClock.instant().atZone(ZoneId.systemDefault()).toLocalDate()


    fun setServerVirtualClock (timeToSet : LocalDateTime) {
        this.virtualClock = null
        val offset = Duration.between(realTimeClock.instant().atZone(ZoneId.systemDefault()).toLocalDateTime(), timeToSet)
        this.virtualClock = Clock.offset(Clock.systemDefaultZone(), offset)
        updateClock()
    }
    fun unsetServerVirtualClock () {
        this.virtualClock = null
        updateClock()
    }
    fun getServerClock () : LocalDateTime {
        val clockInUse = virtualClock ?: realTimeClock
        return clockInUse.instant().atZone(ZoneId.systemDefault()).toLocalDateTime()
    }

    @Scheduled(fixedRate = 5000)
    fun updateClock () {
        val clockToUse = virtualClock ?: realTimeClock
        if (isNewDay(clockToUse))
            updateExpirations( actualDate )
    }

    fun isNewDay (clock : Clock) : Boolean {
        val currentDay = clock.instant().atZone(ZoneId.systemDefault()).toLocalDate()
        if (currentDay == this.actualDate) {
            return false
        }

        actualDate = currentDay
        return true
    }


     fun updateExpirations (actualDate: LocalDate)  {

        val expiredProposals = proposalRepository.findByExpirationIsBefore(actualDate)
        for (proposal in expiredProposals) {
            if (proposal.archived != archiviation_type.MANUALLY_ARCHIVED) {
                proposal.archived = archiviation_type.EXPIRED
                appliedProposalService.updateApplicationsStatus(proposal)
                proposalRepository.save(proposal)
            }
        }

        val notExpiredYetProposals = proposalRepository.findByExpirationIsGreaterThanEqual( actualDate )
        for (proposal in notExpiredYetProposals) {
            if (proposal.archived != archiviation_type.MANUALLY_ARCHIVED) {
                proposal.archived = archiviation_type.NOT_ARCHIVED
                appliedProposalService.updateApplicationsStatus(proposal)
                proposalRepository.save( proposal )
            }
        }

         val notifyExpirationProposals = proposalRepository.findByExpirationIsBefore(actualDate.plusWeeks(1))
         for (proposal in notifyExpirationProposals) {
             if (proposal.archived != archiviation_type.MANUALLY_ARCHIVED && proposal.archived != archiviation_type.EXPIRED) {
                 CoroutineScope(Dispatchers.IO).launch {
                     emailService.sendSimpleMessage(
                         "${proposal.supervisor}@polito.it",
                         "Proposal expiration",
                         "The proposal \"${proposal.title}\" will expire ${
                             proposal.expiration.format(
                                 DateTimeFormatter.ofPattern(
                                     "dd/MM/yyyy"
                                 )
                             )
                         }." +
                                 "\nBest regards" +
                                 "\nGestione Didattica",
                         "no-reply@studenti.polito.it"
                     )
                 }
             }
         }
    }
}
