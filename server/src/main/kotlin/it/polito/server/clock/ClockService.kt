package it.polito.server.clock

import it.polito.server.proposal.ProposalRepository
import it.polito.server.proposal.archiviation_type
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.time.Clock
import java.time.Duration
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.concurrent.TimeUnit


@Service
class ClockService ( private val proposalRepository: ProposalRepository ){

    final var currentClock = LocalDateTime.now()
    final var today = currentClock.toLocalDate()
    final var virtualClock : Clock? = null


    fun setServerVirtualClock (virtualClock : Clock) {
        this.virtualClock = virtualClock
    }
    fun unsetServerVirtualClock () {
        this.virtualClock = null
    }

    @Scheduled(fixedRate = 5000)
    fun updateClock () {
        currentClock = if (virtualClock != null){
            LocalDateTime.now(virtualClock)
        } else {
            LocalDateTime.now()
        }

        if (isNewDay())
            updateExpirations( currentClock.toLocalDate() )
    }

    fun isNewDay () : Boolean {
        val currentDay = currentClock.toLocalDate()
        if (currentDay == today) {
            return false
        }

        today = currentDay
        return true
    }


    public fun updateExpirations (actualDate: LocalDate)  {

        val expiredProposals = proposalRepository.findByExpirationIsBefore(actualDate)
        for (proposal in expiredProposals) {
            if (proposal.archived != archiviation_type.MANUALLY_ARCHIVED) {
                proposal.archived = archiviation_type.EXPIRED
                proposalRepository.save(proposal)
            }
        }

        val notExpiredYetProposals = proposalRepository.findByExpirationIsGreaterThanEqual( actualDate )
        for (proposal in notExpiredYetProposals) {
            if (proposal.archived != archiviation_type.MANUALLY_ARCHIVED) {
                proposal.archived = archiviation_type.NOT_ARCHIVED
                proposalRepository.save( proposal )
            }
        }
    }

}