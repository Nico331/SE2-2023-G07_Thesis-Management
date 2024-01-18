package it.polito.server

import it.polito.server.appliedproposal.*
import it.polito.server.career.Career
import it.polito.server.career.CareerRepository
import it.polito.server.email.EmailService
import it.polito.server.externalcosupervisor.ExternalCoSupervisorRepository
import it.polito.server.externalcosupervisor.ExternalCoSupervisorService
import it.polito.server.professor.Professor
import it.polito.server.professor.ProfessorRepository
import it.polito.server.professor.ProfessorService
import it.polito.server.proposal.*
import it.polito.server.student.Student
import it.polito.server.student.StudentRepository
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import java.time.LocalDate
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

        professorService = mock(ProfessorService::class.java)
        proposalRepository = mock(ProposalRepository::class.java)
        proposalRepository = mock(ProposalRepository::class.java)
        professorService = mock(ProfessorService::class.java)
        appliedProposalRepository = mock(AppliedProposalRepository::class.java)
        externalCoSupervisorRepository = mock(ExternalCoSupervisorRepository::class.java)
        externalCoSupervisorService = mock(ExternalCoSupervisorService::class.java)
        emailService = mock(EmailService::class.java)
        studentRepository = mock(StudentRepository::class.java)
        careerRepository = mock(CareerRepository::class.java)
        professorRepository = mock(ProfessorRepository::class.java)
        proposalService = mock(ProposalService::class.java)
        appliedProposalService = AppliedProposalService(
            appliedProposalRepository,
            proposalRepository,
            studentRepository,
            careerRepository,
            professorRepository,
            proposalService,
            emailService,
            )
    }

    private val appliedProposal1 = AppliedProposal(

        proposalId = "1111",
        studentId = "studentId",
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
    private val myProposal1 = Proposal(
        id = "proposalId",
        title = "Algoritmi di Machine Learning per l'analisi del testo",
        supervisor = "0001",
        coSupervisors = listOf("Prof. Giulia Bianchi", "Prof. Luca Verdi"),
        keywords = listOf("machine learning", "NLP", "text analytics"),
        type = "Ricerca",
        groups = listOf("ML Group"),
        description = "Un progetto di ricerca volto a sviluppare nuovi algoritmi per l'analisi del testo.",
        requiredKnowledge = "Python, PyTorch, NLP basics",
        notes = "Richiesta familiarità con le reti neurali.",
        expiration = LocalDate.of(2023, 12, 31) ,
        level = "Master",
        cdS = listOf("Informatica", "Data Science"),
        archived = archiviation_type.NOT_ARCHIVED
    )
    @Test
    fun findAllAppliedProposalsAsDTOs() {
        // Given

        val appliedProposalDTOs = appliedProposals.map { it.toDTO() }
        `when`(appliedProposalRepository.findAll()).thenReturn(appliedProposals)

        // When
        val result = appliedProposalService.findAll()

        // Then
        assertEquals(appliedProposalDTOs.size, result.size)
        assertEquals(appliedProposalDTOs, result)
    }

    @Test
    fun deleteAppliedProposalIfExists() {
        // Given
        val proposalId = "nonExistingId"
        `when`(appliedProposalRepository.existsById(proposalId)).thenReturn(false)

        // When
        val response = appliedProposalService.deleteAppliedProposal(proposalId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertEquals("this Application does NOT EXIST", response.body)
    }
    @Test
    fun deleteAppliedProposal() {
        // Given
        val proposalId = "existingId"
        `when`(appliedProposalRepository.existsById(proposalId)).thenReturn(true)

        // When
        val response = appliedProposalService.deleteAppliedProposal(proposalId)

        // Then
        verify(appliedProposalRepository).deleteById(proposalId)
        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals("Application with ID $proposalId successfully deleted.", response.body)
    }

    @Test
    fun applyForProposalNotPresent() {
        // Given
        val proposalId = "proposalId"
        val studentId = "studentId"
        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.empty())

        // When
        val response = appliedProposalService.applyForProposal(proposalId, studentId, null)

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertEquals("ERROR in creating the application (PROPOSAL NOT PRESENT in the database).", response.body)
    }
    @Test
    fun applyForProposalBadRequest() {
        // Given
        val proposalId = "proposalId"
        val studentId = "studentId"
        `when`(proposalRepository.findById
            (proposalId)).thenReturn(Optional.of(mock(Proposal::class.java)))
        `when`(studentRepository.findById(studentId)).thenReturn(Optional.empty())

        // When
        val response = appliedProposalService.applyForProposal(proposalId, studentId, null)

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertEquals("ERROR in creating the application (STUDENT NOT PRESENT in the database).", response.body)
    }
    @Test
    fun applyForProposalExisting() {
        // Given
        val proposalId = "proposalId"
        val studentId = "studentId"
        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(mock(Proposal::class.java)))
        `when`(studentRepository.findById(studentId)).thenReturn(Optional.of(mock(Student::class.java)))
        `when`(appliedProposalRepository.findByProposalIdAndStudentId(proposalId, studentId))
            .thenReturn(mock(AppliedProposal::class.java))

        // When
        val response = appliedProposalService.applyForProposal(proposalId, studentId, null)

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertEquals("ERROR in creating the application (APPLICATION ALREADY EXISTS).", response.body)
    }
    @Test
    fun applyForProposalExistingApplicationPendingOrAccepted() {
        // Given
        val proposalId = "proposalId"
        val studentId = "studentId"
        val appliedProposal = mock(AppliedProposal::class.java)
        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(mock(Proposal::class.java)))
        `when`(studentRepository.findById(studentId)).thenReturn(Optional.of(mock(Student::class.java)))
        `when`(appliedProposalRepository.findByProposalIdAndStudentId(proposalId, studentId)).thenReturn(null)
        `when`(appliedProposalRepository.existsAppliedProposalByStudentId(studentId)).thenReturn(false)
        `when`(appliedProposalRepository.findByStudentId(studentId)).thenReturn(listOf(appliedProposal))
        `when`(appliedProposal.status).thenReturn(ApplicationStatus.PENDING)

        // When
        val response = appliedProposalService.applyForProposal(proposalId, studentId, null)

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertEquals("ERROR in creating the application (STUDENT ALREADY HAS AN APPLICATION).", response.body)
    }

    @Test
    fun appliesByStudentIdStudentNotExists() {
        // Given
        val studentId = "nonExistingStudentId"
        `when`(studentRepository.findById(studentId)).thenReturn(Optional.empty())

        // When
        val response = appliedProposalService.appliesByStudentId(studentId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertEquals("ERROR: this student NOT EXISTS", response.body)
    }
    @Test
    fun appliesByStudentIdReturnList() {
        // Given
        val studentId = "existingStudentId"
        val student = mock(Student::class.java)
        val appliedProposalsDTOs = appliedProposals.map { it.toDTO() }

        `when`(studentRepository.findById(studentId)).thenReturn(Optional.of(student))
        `when`(appliedProposalRepository.findByStudentId(studentId)).thenReturn(appliedProposals)

        // When
        val response = appliedProposalService.appliesByStudentId(studentId)

        // Then
        verify(studentRepository).findById(studentId)
        verify(appliedProposalRepository).findByStudentId(studentId)
        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(appliedProposalsDTOs, response.body)
    }

    @Test
    fun appliesByProposalIdNotFound() {
        // Given
        val proposalId = "nonExistingProposalId"
        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.empty())

        // When
        val response = appliedProposalService.appliesByProposalId(proposalId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertEquals("ERROR: this Proposal NOT EXISTS", response.body)
    }
    @Test
    fun appliesByProposalIdListOfApplications() {
        // Given
        val proposalId = "existingProposalId"
        val appliedProposalsDTOs = appliedProposals.map { it.toDTO() }

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(mock(Proposal::class.java)))
        `when`(appliedProposalRepository.findByProposalId(proposalId)).thenReturn(appliedProposals)

        // When
        val response = appliedProposalService.appliesByProposalId(proposalId)

        // Then
        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(appliedProposalsDTOs, response.body)
    }

    @Test
    fun findByProfessorFilteredProposals() {
        // Given
        val professorId = "professorId"
        val proposalId = "proposalId"
        val studentId = "studentId"
        val proposal = mock(Proposal::class.java)

        val student = Student(id = studentId, surname = "Doe", name = "John", gender = "Male",
            nationality = "US", email = "john.doe@student.it", codDegree = "22222", enrollmentYear = 2022)

        val exam = mock(Career::class.java)
        val professor = mock(Professor::class.java)
        val appliedProposal = appliedProposal1

        `when`(proposal.id).thenReturn(proposalId)
        `when`(proposal.supervisor).thenReturn(professorId)
        `when`(proposalRepository.findBySupervisor(professorId)).thenReturn(listOf(proposal))
        `when`(appliedProposalRepository.findByProposalId(proposalId)).thenReturn(listOf(appliedProposal))
        `when`(studentRepository.findById(anyString())).thenReturn(Optional.of(student))
        `when`(careerRepository.findByStudentId(anyString())).thenReturn(listOf(exam))
        `when`(professorRepository.findById(anyString())).thenReturn(Optional.of(professor))
        `when`(proposal.archived).thenReturn(archiviation_type.NOT_ARCHIVED)
        `when`(proposal.id).thenReturn(proposalId)
        `when`(proposal.title).thenReturn("proposalTitle")
        `when`(proposal.supervisor).thenReturn(professorId)
        `when`(professorRepository.findById(professorId)).thenReturn(Optional.of(professor))
        `when`(professor.name).thenReturn("name")
        `when`(professor.surname).thenReturn("surname")
        `when`(proposal.coSupervisors).thenReturn(listOf("coSupervisorId"))
        `when`(proposal.keywords).thenReturn(listOf("keyword1", "keyword2"))
        `when`(proposal.type).thenReturn("Research")
        `when`(proposal.groups).thenReturn(listOf("group1", "group2"))
        `when`(proposal.description).thenReturn("Description of the proposal")
        `when`(proposal.requiredKnowledge).thenReturn("Required knowledge for the proposal")
        `when`(proposal.notes).thenReturn("Notes on the proposal")
        `when`(proposal.expiration).thenReturn(LocalDate.now())
        `when`(proposal.level).thenReturn("PhD")
        `when`(proposal.cdS).thenReturn(listOf("cds1", "cds2"))
        `when`(proposal.archived).thenReturn(archiviation_type.NOT_ARCHIVED)

        // When
        val result = appliedProposalService.findByProfessor(professorId, archiviation_type.NOT_ARCHIVED)

        // Then
        assertEquals(1, result.size) // Assuming that the archivation_type matches
        // Other assertions to verify the correct mapping to StrangeObjectRequestedByDarione
    }

    @Test
    fun updateApplicationsStatusSetsCancelled() {
        // Given
        val proposalId = "proposalId"
        val proposal = mock(Proposal::class.java)
        `when`(proposal.id).thenReturn(proposalId)
        `when`(proposal.archived).thenReturn(archiviation_type.EXPIRED)
        val applications = listOf(mock(AppliedProposal::class.java))

        `when`(appliedProposalRepository.findByProposalId(proposalId)).thenReturn(applications)

        // When
        appliedProposalService.updateApplicationsStatus(proposal)

        // Then
        for (application in applications) {
            verify(application).status = ApplicationStatus.CANCELLED
            verify(appliedProposalRepository).save(application)
        }
    }
    @Test
    fun updateApplicationsStatusSetsPending() {
        // Given
        val proposalId = "proposalId"
        val proposal = mock(Proposal::class.java)
        `when`(proposal.id).thenReturn(proposalId)
        `when`(proposal.archived).thenReturn(archiviation_type.NOT_ARCHIVED) // O qualsiasi altro tipo
        val applications = listOf(mock(AppliedProposal::class.java))

        `when`(appliedProposalRepository.findByProposalId(proposalId)).thenReturn(applications)

        // When
        appliedProposalService.updateApplicationsStatus(proposal)

        // Then
        for (application in applications) {
            verify(application).status = ApplicationStatus.PENDING
            verify(appliedProposalRepository).save(application)
        }
    }

    @Test
    fun withdrawProposalSetsCancelled() {
        // Given
        val appliedProposalId = "existingId"
        val appliedProposal = mock(AppliedProposal::class.java)
        `when`(appliedProposalRepository.findById(appliedProposalId)).thenReturn(Optional.of(appliedProposal))
        `when`(appliedProposalRepository.save(Optional.of(appliedProposal).get().copy(status = ApplicationStatus.CANCELLED))).thenReturn(appliedProposal1.copy(status = ApplicationStatus.CANCELLED))
        // When
        val response = appliedProposalService.withdrawProposal(appliedProposalId)

        // Then
        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(ApplicationStatus.CANCELLED, (response.body as AppliedProposal).status)
    }
    @Test
    fun withdrawProposalNotExists() {
        // Given
        val appliedProposalId = "nonExistingId"
        `when`(appliedProposalRepository.findById(appliedProposalId)).thenReturn(Optional.empty())

        // When
        val response = appliedProposalService.withdrawProposal(appliedProposalId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertEquals("Application not found", response.body)
    }

    @Test
    fun findByCoSupervisorReturnsFilteredApps() {
        // Given
        val coSupervisorId = "coSupervisorId"
        val proposalId = "proposalId"
        val studentId = "studentId"
//        val proposal = mock(Proposal::class.java)
        val proposal = myProposal1
        val student = Student(id = studentId, surname = "Doe", name = "John", gender = "Male",
            nationality = "US", email = "john.doe@student.it", codDegree = "22222",
            enrollmentYear = 2022)
        val exam = mock(Career::class.java)
        `when`(proposalRepository.findByCoSupervisors(coSupervisorId)).thenReturn(listOf(proposal))
//        `when`(proposal.archived).thenReturn(archiviation_type.NOT_ARCHIVED)
        `when`(appliedProposalRepository.findByProposalId(proposalId)).thenReturn(listOf(appliedProposal1))
//        `when`(proposal.id).thenReturn(proposalId)
        `when`(studentRepository.findById(studentId)).thenReturn(Optional.of(student))
        `when`(careerRepository.findByStudentId(studentId)).thenReturn(listOf(exam))

        // When
        val result = appliedProposalService.findByCoSupervisor(coSupervisorId, archiviation_type.NOT_ARCHIVED)

        // Then
        assertEquals(1, result.size)
        // Here you can add more detailed assertions to verify the properties of each StrangeObjectRequestedByDarione
    }

}

