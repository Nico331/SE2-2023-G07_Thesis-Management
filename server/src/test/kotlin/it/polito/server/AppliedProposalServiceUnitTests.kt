package it.polito.server

import it.polito.server.appliedproposal.AppliedProposal
import it.polito.server.appliedproposal.AppliedProposalRepository
import it.polito.server.appliedproposal.AppliedProposalService
import it.polito.server.career.CareerRepository
import it.polito.server.email.EmailService
import it.polito.server.externalcosupervisor.ExternalCoSupervisorRepository
import it.polito.server.externalcosupervisor.ExternalCoSupervisorService
import it.polito.server.professor.ProfessorRepository
import it.polito.server.professor.ProfessorService
import it.polito.server.proposal.ProposalRepository
import it.polito.server.proposal.ProposalService
import it.polito.server.student.StudentRepository
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.Mock
import org.mockito.InjectMocks
import org.mockito.Mockito.`when`
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito
import org.mockito.Mockito.any
import java.util.*

@ExtendWith(MockitoExtension::class)
class AppliedProposalServiceTest {

    private lateinit var proposalRepository: ProposalRepository

    private lateinit var professorService: ProfessorService

    private lateinit var proposalService: ProposalService
    private lateinit var appliedProposalRepository: AppliedProposalRepository
    private lateinit var externalCoSupervisorRepository: ExternalCoSupervisorRepository
    private lateinit var externalCoSupervisorService: ExternalCoSupervisorService
    private lateinit var emailService: EmailService
    private lateinit var studentRepository: StudentRepository
    private lateinit var careerRepository: CareerRepository
    private lateinit var professorRepository: ProfessorRepository
    private lateinit var appliedProposalService: AppliedProposalService
    @BeforeEach
    fun setUp() {

        professorService = Mockito.mock(ProfessorService::class.java)
        proposalRepository = Mockito.mock(ProposalRepository::class.java)
        proposalRepository = Mockito.mock(ProposalRepository::class.java)
        professorService = Mockito.mock(ProfessorService::class.java)
        appliedProposalRepository = Mockito.mock(AppliedProposalRepository::class.java)
        externalCoSupervisorRepository = Mockito.mock(ExternalCoSupervisorRepository::class.java)
        externalCoSupervisorService = Mockito.mock(ExternalCoSupervisorService::class.java)
        emailService = Mockito.mock(EmailService::class.java)
        studentRepository = Mockito.mock(StudentRepository::class.java)
        careerRepository = Mockito.mock(CareerRepository::class.java)
        professorRepository = Mockito.mock(ProfessorRepository::class.java)
        proposalService = Mockito.mock(ProposalService::class.java)
        appliedProposalService = AppliedProposalService(
            appliedProposalRepository,
            proposalRepository,
            studentRepository,
            careerRepository,
            professorRepository,
            proposalService,
            emailService,
            externalCoSupervisorRepository
            )
    }

    private val appliedProposal1 = AppliedProposal(

        proposalId = "1111",
        studentId = "67891",
        file = null
    )
    private val appliedProposal2 = AppliedProposal(

            proposalId = "22222",
            studentId = "67890",
            file = null
    )
    private val appliedProposals = listOf(
        appliedProposal1, appliedProposal2
    )

    @Test
    fun `findAll returns all applied proposals as DTOs`() {
        // Given

        val appliedProposalDTOs = appliedProposals.map { it.toDTO() }
        `when`(appliedProposalRepository.findAll()).thenReturn(appliedProposals)

        // When
        val result = appliedProposalService.findAll()

        // Then
        assertEquals(appliedProposalDTOs.size, result.size)
        assertEquals(appliedProposalDTOs, result)
    }
}
