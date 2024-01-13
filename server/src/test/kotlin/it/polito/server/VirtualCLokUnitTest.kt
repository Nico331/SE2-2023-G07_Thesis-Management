package it.polito.server

import it.polito.server.annotations.CoderseeGenerated
import it.polito.server.appliedproposal.AppliedProposalService
import it.polito.server.clock.ClockController
import it.polito.server.clock.ClockService
import it.polito.server.email.EmailService
import it.polito.server.proposal.ProposalRepository
import it.polito.server.student.StudentController
import it.polito.server.student.StudentDTO
import it.polito.server.student.StudentService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.springframework.http.HttpStatus
import java.time.Clock
import java.time.Instant
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit
import java.time.temporal.TemporalUnit

@CoderseeGenerated
class VirtualCLokUnitTest {

        private lateinit var clockService: ClockService
        private lateinit var clockController: ClockController
        private lateinit var proposalRepository: ProposalRepository
        private lateinit var appliedProposalService: AppliedProposalService
        private lateinit var emailService: EmailService

        @BeforeEach
        fun setUp() {
            proposalRepository = Mockito.mock(ProposalRepository::class.java)
            appliedProposalService = Mockito.mock(AppliedProposalService::class.java)
            emailService = Mockito.mock(EmailService::class.java)
            clockService = ClockService(proposalRepository, appliedProposalService, emailService)
            clockController = ClockController(clockService)
        }

    @Test
    fun testSetVirtualCLock() {
        val clockToSet = "2025-01-01T01:01:01"


        // Eseguo la chiamata all'API SetVirtualClock
        val responseEntity = clockController.setServerVirtualCLock(clockToSet)
        // Verifico che la risposta sia OK e anche il BODY
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body is String)
    }

    @Test
    fun testResetVirtualCLock() {

        // Eseguo la chiamata all'API ResetVirtualClock
        val responseEntity = clockController.resetServerVirtualCLock()
        // Verifico che la risposta sia OK e anche il BODY
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body is String)
    }

    @Test
    fun testGetVirtualCLock() {

        `when`(clockService.getServerClock()).thenReturn(LocalDateTime.now())

        // Eseguo la chiamata all'API GetVirtualClock
        val responseEntity = clockController.getServerClock()
        // Verifico che la risposta sia OK e anche il BODY
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body is LocalDateTime)
    }

    @Test
    fun testGetServerClockService() {
        val clockSet = Clock.fixed(Instant.now(), Clock.systemDefaultZone().zone)
        clockService.virtualClock = clockSet

        clockService.getServerClock()

        assert(clockService.virtualClock == clockSet)
    }

    @Test
    fun testIsnNewDay() {
        val clockSet = Clock.fixed(Instant.now().plus(24, ChronoUnit.HOURS), Clock.systemDefaultZone().zone)
        clockService.virtualClock = clockSet

        assert(clockService.isNewDay(clockSet))
    }
}
