package it.polito.server
import it.polito.server.appliedproposal.AppliedProposalRepository
import it.polito.server.email.EmailService
import it.polito.server.externalcosupervisor.ExternalCoSupervisorDTO
import it.polito.server.externalcosupervisor.ExternalCoSupervisorRepository
import it.polito.server.externalcosupervisor.ExternalCoSupervisorService
import it.polito.server.professor.*
import it.polito.server.proposal.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.data.mongodb.core.query.Query
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDate
import java.util.*
import java.util.regex.Pattern
import kotlin.collections.HashMap

class ProposalServiceTest {
    private lateinit var proposalRepository: ProposalRepository

    private lateinit var professorService: ProfessorService

    private lateinit var proposalService: ProposalService
    private lateinit var appliedProposalRepository: AppliedProposalRepository
    private lateinit var externalCoSupervisorRepository: ExternalCoSupervisorRepository
    private lateinit var externalCoSupervisorService: ExternalCoSupervisorService
    private lateinit var emailService: EmailService
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

        proposalService = ProposalService(proposalRepository, professorService, appliedProposalRepository, externalCoSupervisorRepository, externalCoSupervisorService, emailService )
    }
    val coSupervisorId = "coSupervisorId"
    val supervisorId = "supervisorId"
    val proposals = listOf(
        ProposalDTO(
            title = "Updated Proposal",
            supervisor = "John Doe",
            coSupervisors = listOf("coSupervisorId"),
            externalCoSupervisors = listOf(
                ExternalCoSupervisorDTO("name1", "surname1", "email1"),
                ExternalCoSupervisorDTO("name2", "surname2", "email2")
            ),
            keywords = listOf("Java", "Spring"),
            type = "Research",
            groups = listOf("Group1", "Group2"),
            description = "Updated description",
            requiredKnowledge = "Updated knowledge",
            notes = "Updated notes",
            expiration = LocalDate.now().plusMonths(1),
            level = "Master",
            cdS = listOf("CD1", "CD2"),
            archived = archiviation_type.NOT_ARCHIVED
        ).toDBObj(),
        ProposalDTO(
            title = "Updated Proposal2",
            supervisor = "John Doe",
            coSupervisors = listOf("coSupervisorId"),
            externalCoSupervisors = listOf(
                ExternalCoSupervisorDTO("name1", "surname1", "email1"),
                ExternalCoSupervisorDTO("name2", "surname2", "email2")
            ),
            keywords = listOf("Java", "Spring"),
            type = "Research",
            groups = listOf("Group1", "Group2"),
            description = "Updated description",
            requiredKnowledge = "Updated knowledge",
            notes = "Updated notes",
            expiration = LocalDate.now().plusMonths(1),
            level = "Master",
            cdS = listOf("CD1", "CD2"),
            archived = archiviation_type.NOT_ARCHIVED
        ).toDBObj()
    )
    val archivedProposals = listOf(
        ProposalDTO(
            title = "Archived Proposal",
            supervisor = "John Doe",
            coSupervisors = listOf("coSupervisorId"),
            externalCoSupervisors = listOf(
                ExternalCoSupervisorDTO("name1", "surname1", "email1"),
                ExternalCoSupervisorDTO("name2", "surname2", "email2")
            ),
            keywords = listOf("Java", "Spring"),
            type = "Research",
            groups = listOf("Group1", "Group2"),
            description = "Updated description",
            requiredKnowledge = "Updated knowledge",
            notes = "Updated notes",
            expiration = LocalDate.now().plusMonths(1),
            level = "Master",
            cdS = listOf("CD1", "CD2"),
            archived = archiviation_type.MANUALLY_ARCHIVED
        ).toDBObj(),
        ProposalDTO(
            title = "Expired Proposal",
            supervisor = "John Doe",
            coSupervisors = listOf("coSupervisorId"),
            externalCoSupervisors = listOf(
                ExternalCoSupervisorDTO("name1", "surname1", "email1"),
                ExternalCoSupervisorDTO("name2", "surname2", "email2")
            ),
            keywords = listOf("Java", "Spring"),
            type = "Research",
            groups = listOf("Group1", "Group2"),
            description = "Updated description",
            requiredKnowledge = "Updated knowledge",
            notes = "Updated notes",
            expiration = LocalDate.now().plusMonths(1),
            level = "Master",
            cdS = listOf("CD1", "CD2"),
            archived = archiviation_type.EXPIRED
        ).toDBObj()
    )

//    @Test
//    fun `getProposalsWithFilters returns filtered proposals`() {
//        // Given
//        val filters = HashMap<String, String>()
//        filters["type"] = "Research"
//        filters["archived"] = "false"
//
//        val searchKeyword = "Java"
//        val regexPattern = Pattern.compile(searchKeyword, Pattern.CASE_INSENSITIVE)
//
//        val queryCaptor = argumentCaptor<Query>()
//
//        `when`(mongoTemplate.find(queryCaptor.capture(), Proposal::class.java)).thenReturn(proposals)
//
//        // When
//        val response = proposalService.getProposalsWithFilters(filters, searchKeyword)
//
//        // Then
//        val capturedQuery = queryCaptor.firstValue
//        assertTrue(capturedQuery.toString().contains("type: Research"))
//        assertTrue(capturedQuery.toString().contains("archived: false"))
//        assertTrue(capturedQuery.toString().contains("title: /$regexPattern/"))
//
//        assertEquals(HttpStatus.OK, response.statusCode)
//        assertEquals(proposals, response.body)
//    }

    @Test
    fun `findArchivedProposalsBySupervisor returns archived proposals if supervisor exists`() {
        // Given
        `when`(professorService.findProfessorById(supervisorId)).thenReturn(
            ProfessorDTO(
                id = supervisorId,
                name = "John",
                surname = "Doe",
                email = "johndoe@professor.it",
                codGroup = "Group",
                codDepartment = "Department"
            )
        )

        `when`(proposalRepository.findBySupervisor(supervisorId)).thenReturn(archivedProposals)

        // When
        val response = proposalService.findArchivedProposalsBySupervisor(supervisorId)

        // Then
        assertEquals(HttpStatus.OK, response.statusCode)
        val archivedProposals = response.body as List<ProposalDTO>
        assertEquals(2, archivedProposals.size)
        assertTrue(archivedProposals.any { it.title == "Archived Proposal" })
        assertTrue(archivedProposals.any { it.title == "Expired Proposal" })
    }

    @Test
    fun `findArchivedProposalsBySupervisor returns NOT_FOUND if supervisor does not exist`() {
        // Given
        val supervisorId = "supervisorIdNotExists"
        `when`(professorService.findProfessorById(supervisorId)).thenReturn(null)

        // When
        val response = proposalService.findArchivedProposalsBySupervisor(supervisorId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue((response.body as String).contains("does NOT exist"))
    }

    @Test
    fun `findProposalsByCoSupervisor returns proposals if coSupervisor exists`() {
        // Given

        `when`(professorService.findProfessorById(coSupervisorId)).thenReturn(
            ProfessorDTO(
            id = coSupervisorId,
            name = "John",
            surname = "Doe",
            email = "johndoe@professor.it",
            codGroup = "Group",
            codDepartment = "Department"
        )
        )
        `when`(proposalRepository.findByCoSupervisors(coSupervisorId)).thenReturn(proposals)

        // When
        val response = proposalService.findProposalsByCoSupervisor(coSupervisorId)
        println(response)
        // Then
        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(proposals, response.body)
    }

    @Test
    fun `findProposalsByCoSupervisor returns NOT_FOUND if coSupervisor does not exist`() {
        // Given
        val coSupervisorId = "coSupervisorIdnot"
        `when`(professorService.findProfessorById(coSupervisorId)).thenReturn(null)

        // When
        val response = proposalService.findProposalsByCoSupervisor(coSupervisorId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue((response.body as String).contains("does NOT exist"))
    }
}
