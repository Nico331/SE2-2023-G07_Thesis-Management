package it.polito.server
import io.mockk.*
import it.polito.server.annotations.CoderseeGenerated
import it.polito.server.appliedproposal.*
import it.polito.server.email.EmailService
import it.polito.server.externalcosupervisor.ExternalCoSupervisorDTO
import it.polito.server.externalcosupervisor.ExternalCoSupervisorRepository
import it.polito.server.externalcosupervisor.ExternalCoSupervisorService
import it.polito.server.professor.ProfessorDTO
import it.polito.server.professor.ProfessorService
import it.polito.server.proposal.*
import kotlinx.coroutines.*
import kotlinx.coroutines.test.runTest
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.mockito.kotlin.whenever
import org.springframework.http.HttpStatus
import java.time.LocalDate
import java.util.*
import kotlin.test.assertFailsWith

@CoderseeGenerated
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


    private val coSupervisorId = "coSupervisorId"
    private val supervisorId = "supervisorId"
    private val proposalId = "proposalId"

    private val proposals = listOf(
        ProposalDTO(
            id = proposalId,
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
            id = "proposal2",
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
    private val activeProposals = listOf(
        ProposalDTO(
            title = "Active proposal 1",
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
            title = "Active proposal 2",
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
    private val archivedProposals = listOf(
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

    private val proposalEntity = ProposalDTO(
        id = proposalId,
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
        archived = archiviation_type.NOT_ARCHIVED
    ).toDBObj()
///**************************************************

//    @Test
//    fun `updateProposal updates and notifies changes`() = runTest {
//        runBlocking {
//
//            // Given
//            val proposalId = "proposalId"
//            val existingProposalEntity = proposals[0]
//
//            val updateProposalDTO = proposals[1].toDTO(externalCoSupervisorRepository)
//
//            `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(existingProposalEntity))
//
//            val external = mock(ExternalCoSupervisor::class.java).toDTO()
//
//            `when`(externalCoSupervisorService.saveNewExternals(listOf(external))).thenReturn(Unit)
//            `when`(professorService.findProfessorById("coSupervisor3")).thenReturn(
//                ProfessorDTO(
//                    id = "coSupervisor3",
//                    name = "Co",
//                    surname = "Supervisor3",
//                    email = "cosupervisor3@example.com",
//                    codGroup = "Group3",
//                    codDepartment = "Department3"
//                )
//            )
//
//            // When
//            val response = proposalService.updateProposal(proposalId, updateProposalDTO)
//
//            // Then
//            assertEquals(updateProposalDTO, response)
////        CoroutineScope(Dispatchers.IO).launch {
////            coVerify { emailService.notifyRemovedCoSupervisor("Updated Proposal 1", "cosupervisor1@example.com") }
////            coVerify { emailService.notifyAddedCoSupervisor("Updated Proposal 1", "cosupervisor3@example.com") }
////
////        }
////        verifyNoInteractions(emailService)
//        }
//    }

    @Test
    fun `updateProposal returns null if proposal does not exist`() {
        // Given
        val nonExistentProposalId = "nonExistentProposalId"
        val updateProposalDTO = proposals[1].toDTO(externalCoSupervisorRepository)

        `when`(proposalRepository.findById(nonExistentProposalId)).thenReturn(Optional.empty())

        // When
        val response = proposalService.updateProposal(nonExistentProposalId, updateProposalDTO)

        // Then
        assertEquals(null, response)
        verifyNoInteractions(emailService)
    }

//    @Test
//    fun `updateProposal does not notify external co-supervisors if null in updateProposalDTO`() {
//        val proposalId = "proposalId"
//        val existingProposalEntity = proposals[0]
//        val updateProposalDTO = proposals[1].toDTO(externalCoSupervisorRepository)
//
//        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(existingProposalEntity))
//
//        // When
//        proposalService.updateProposal(proposalId, updateProposalDTO)
//
//        verifyNoInteractions(emailService)
//    }

    @Test
    fun `createProposal throws exception when professor not found`() = runTest {
        // Given
        val coSupervisorId = "coSupervisorId"
        val proposalTitle = "New Proposal"

        val proposalDTO = mock(ProposalDTO::class.java).apply {
            `when`(coSupervisors).thenReturn(listOf(coSupervisorId))
            `when`(title).thenReturn(proposalTitle)
        }

        `when`(professorService.findProfessorById(coSupervisorId)).thenReturn(null)

        // Expect an exception when the professor is not found
        val exception = assertFailsWith<NullPointerException> {
            proposalService.createProposal(proposalDTO)
        }

        // Then
        assertEquals("proposalRepository.save(proposal.toDBObj()) must not be null", exception.message)
    }
    @Test
    fun `createProposal does not save external co-supervisors when none are provided`() = runTest {
        // Given
        val proposalDTO = mock(ProposalDTO::class.java).apply {
            `when`(externalCoSupervisors).thenReturn(null)
            `when`(coSupervisors).thenReturn(emptyList())
            `when`(title).thenReturn("Proposal Without Externals")
        }

        val proposal = mock(Proposal::class.java)
        `when`(proposalRepository.save(any())).thenReturn(proposal)
        `when`(proposal.toDTO(externalCoSupervisorRepository)).thenReturn(proposalDTO)

        // When
        proposalService.createProposal(proposalDTO)

        // Then
        verify(externalCoSupervisorService, never()).saveNewExternals(anyList())
    }

//    @Test
//    fun `createProposal saves proposal and notifies co-supervisors`() = runTest() {
//        runBlocking {
//            // Given
//            val coSupervisorId = "coSupervisorId"
//            val coSupervisorEmail = "coSupervisor@example.com"
//            val proposalTitle = "New Proposal"
//
//            val proposalDTO = mock(ProposalDTO::class.java)
//            `when`(proposalDTO.coSupervisors).thenReturn(listOf(coSupervisorId))
//            `when`(proposalDTO.title).thenReturn(proposalTitle)
//
//            val professorDTO = mock(ProfessorDTO::class.java)
//            `when`(professorDTO.email).thenReturn(coSupervisorEmail)
//            `when`(professorService.findProfessorById(coSupervisorId)).thenReturn(professorDTO)
//
//            val proposal = mock(Proposal::class.java)
//            `when`(proposalRepository.save(any())).thenReturn(proposal)
//            `when`(proposal.toDTO(externalCoSupervisorRepository)).thenReturn(proposalDTO)
//
//            // Stubbing the asynchronous method
//            `when`(emailService.notifyAddedCoSupervisor(proposalTitle, coSupervisorEmail)).thenReturn(Unit)
//
//            val result = proposalService.createProposal(proposalDTO)
//
//            // Then
//            verify(emailService).notifyAddedCoSupervisor(proposalTitle, coSupervisorEmail)
//            assertEquals(proposalDTO, result)
//        }
//
//    }


    @Test
    fun `findProposalById returns ProposalDTO if proposal exists`() {
        // Given
        val proposalId = "proposalId"

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(proposalEntity))

        // When
        val response = proposalService.findProposalById(proposalId)

        // Then
        assertEquals(proposalEntity.toDTO(externalCoSupervisorRepository), response)
        assertNotNull(response)
        assertEquals("John Doe", response?.supervisor)
    }
    @Test
    fun `findProposalById returns null if proposal does not exist`() {
        // Given
        val nonExistentProposalId = "nonExistentProposalId"
        `when`(proposalRepository.findById(nonExistentProposalId)).thenReturn(Optional.empty())

        // When
        val response = proposalService.findProposalById(nonExistentProposalId)

        // Then
        assertNull(response)
    }

    @Test
    fun `findAll returns all proposals as DTOs`() {
        // Given
        val proposalDTOs = proposals.map { it.toDTO(externalCoSupervisorRepository) }

        `when`(proposalRepository.findAll()).thenReturn(proposals)

        // When
        val result = proposalService.findAll()

        // Then
        assertEquals(proposalDTOs.size, result.size)
        assertEquals(proposalDTOs, result)
    }
    @Test
    fun `findActiveByStudent returns active proposals for given student`() {
        // Given
        val studentId = "studentId"

        val proposalDTOs = proposals.map { it.toDTO(externalCoSupervisorRepository) }
        val activeProposals = proposals.filter { it.archived == archiviation_type.NOT_ARCHIVED }

        `when`(proposalRepository.findByArchived(archiviation_type.NOT_ARCHIVED)).thenReturn(activeProposals)
        `when`(appliedProposalRepository.findByProposalIdAndStudentId(proposalId, studentId))
            .thenReturn(AppliedProposal("id", proposalId, studentId, ApplicationStatus.ACCEPTED, null))

        // When
        val result = proposalService.findActiveByStudent(studentId)

        // Then
        assertEquals(1, result?.size)
    }

    @Test
    fun deleteProposalDeletesAProposalSuccessfully() {
        // Coroutine context for testing
        val testCoroutineContext = newSingleThreadContext("testThread")

        // Given
        val proposalId = "proposalId"

        whenever(proposalRepository.existsById(proposalId)).thenReturn(true)
        whenever(proposalRepository.findById(proposalId)).thenReturn(Optional.of(proposalEntity))

        CoroutineScope(Dispatchers.IO).launch {
            coEvery {
                emailService.notifyRemovedCoSupervisor(any(), any())
            } just Runs

            // When
            val response = proposalService.deleteProposal(proposalId)

            // Then
            assertEquals(HttpStatus.OK, response.statusCode)
            coVerify { emailService.notifyRemovedCoSupervisor(any(), any()) }

            coVerify { emailService.notifyRemovedCoSupervisor("Proposal 1", "external1@email.com") }
            coVerify { emailService.notifyRemovedCoSupervisor("Proposal 1", "johndoe@professor.it") }
        }
    }

    @Test
    fun `deleteProposal returns NOT_FOUND if proposal does not exist`() {
        // Given
        val nonExistentProposalId = "nonExistentProposalId"
        `when`(proposalRepository.existsById(nonExistentProposalId)).thenReturn(false)

        // When
        val response = proposalService.deleteProposal(nonExistentProposalId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue((response.body as String).contains("Proposal doesn't exist"))
        verifyNoInteractions(emailService)
    }

    @Test
    fun `deleteProposal returns BAD_REQUEST if proposal is already archived`() {
        // Given
        val archivedProposalId = "archivedProposalId"
        val archivedProposalEntity = proposalEntity.copy(archived = archiviation_type.EXPIRED)

        `when`(proposalRepository.existsById(archivedProposalId)).thenReturn(true)
        `when`(proposalRepository.findById(archivedProposalId)).thenReturn(Optional.of(archivedProposalEntity))

        // When
        val response = proposalService.deleteProposal(archivedProposalId)

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertTrue((response.body as String).contains("Error: Proposal is already archived"))
        verifyNoInteractions(emailService)
    }
    @Test
    fun `findActiveProposalsBySupervisor returns active proposals for an existing supervisor with active proposals`() {
        // Given
        val supervisorId = "supervisorId"
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
        val activeProposals =
        `when`(proposalRepository.findBySupervisor(supervisorId)).thenReturn(activeProposals)

        // When
        val response = proposalService.findActiveProposalsBySupervisor(supervisorId)

        // Then
        assertEquals(HttpStatus.OK, response.statusCode)
        val activeProposalsDTOs = response.body as List<ProposalDTO>
        assertEquals(2, activeProposalsDTOs.size)
    }
    @Test
    fun `findActiveProposalsBySupervisor returns NOT_FOUND if supervisor does not exist`() {
        // Given
        val nonExistentSupervisorId = "nonExistentSupervisorId"
        `when`(professorService.findProfessorById(nonExistentSupervisorId)).thenReturn(null)

        // When
        val response = proposalService.findActiveProposalsBySupervisor(nonExistentSupervisorId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue((response.body as String).contains("Error: Supervisor '$nonExistentSupervisorId' does NOT exist."))
    }
    @Test
    fun `findActiveProposalsBySupervisor returns BAD_REQUEST if supervisor has no proposals`() {
        // Given
        val supervisorId = "supervisorId"
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
        `when`(proposalRepository.findBySupervisor(supervisorId)).thenReturn(emptyList())

        // When
        val response = proposalService.findActiveProposalsBySupervisor(supervisorId)

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertTrue((response.body as String).contains("Error: Supervisor '$supervisorId' has NO proposals."))
    }
    @Test
    fun `findActiveProposalsBySupervisor returns BAD_REQUEST if supervisor has no active proposals`() {
        // Given
        val supervisorId = "supervisorId"
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
        val response = proposalService.findActiveProposalsBySupervisor(supervisorId)

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertTrue((response.body as String).contains("Error: Supervisor '$supervisorId' has NO ACTIVE proposals."))
    }


    @Test
    fun `manuallyArchivedProposal archives a proposal successfully`() {
        // Given
        val proposalId = "proposalId"

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(proposalEntity))
        `when`(appliedProposalRepository.findByProposalId(proposalId)).thenReturn(emptyList())

        // When
        val response = proposalService.manuallyArchivedProposal(proposalId)

        // Then
        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals("Proposal '$proposalId' archived manually successfully", response.body)
    }

    @Test
    fun `manuallyArchivedProposal returns NOT_FOUND if proposal does not exist`() {
        // Given
        val nonExistentProposalId = "nonExistentProposalId"
        `when`(proposalRepository.findById(nonExistentProposalId)).thenReturn(Optional.empty())

        // When
        val response = proposalService.manuallyArchivedProposal(nonExistentProposalId)

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue((response.body as String).contains("Error: Proposal '$nonExistentProposalId' not found"))
    }

    @Test
    fun `manuallyArchivedProposal returns BAD_REQUEST if proposal is already archived`() {
        // Given
        val archivedProposalId = "archivedProposalId"
        val archivedProposalEntity = proposalEntity.copy(archived = archiviation_type.MANUALLY_ARCHIVED)
        `when`(proposalRepository.findById(archivedProposalId)).thenReturn(Optional.of(archivedProposalEntity))

        // When
        val response = proposalService.manuallyArchivedProposal(archivedProposalId)

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertTrue((response.body as String).contains("Error: Proposal is already archived"))
    }

    @Test
    fun `manuallyArchivedProposal cancels pending applications`() {
        // Given

        val pendingApplication = AppliedProposalDTO(
            id = "applicationId",
            proposalId = proposalId,
            studentId = "id",
            status = ApplicationStatus.PENDING,
            file = null
        ).toDocument()

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(proposalEntity))
        `when`(appliedProposalRepository.findByProposalId(proposalId)).thenReturn(listOf(pendingApplication))

        // When
        val response = proposalService.manuallyArchivedProposal(proposalId)

        // Then
        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals("Proposal '$proposalId' archived manually successfully", response.body)
    }

    @Test
    fun `findProposalBySupervisor returns proposals by supervisor`() {
        // Given
        val supervisorId = "supervisorId"

        `when`(proposalRepository.findBySupervisor(supervisorId)).thenReturn(proposals)

        // When
        val response = proposalService.findProposalBySupervisor(supervisorId)

        // Then
        assertEquals(response, proposals.map { it.toDTO(externalCoSupervisorRepository) })
    }

    @Test
    fun `existsByTitleAndSupervisor returns true if proposal exists with given title and supervisor`() {
        // Given
        val proposalTitle = "Proposal 1"
        val proposalSupervisor = "John Doe"

        `when`(proposalRepository.existsProposalByTitleAndSupervisor(proposalTitle, proposalSupervisor)).thenReturn(true)

        // When
        val exists = proposalService.existsByTitleAndSupervisor(proposalTitle, proposalSupervisor)

        // Then
        assertTrue(exists)
    }

    @Test
    fun `existsByTitleAndSupervisor returns false if proposal does not exist with given title and supervisor`() {
        // Given
        val proposalTitle = "Nonexistent Proposal"
        val proposalSupervisor = "John Doe"

        `when`(proposalRepository.existsProposalByTitleAndSupervisor(proposalTitle, proposalSupervisor)).thenReturn(false)

        // When
        val exists = proposalService.existsByTitleAndSupervisor(proposalTitle, proposalSupervisor)

        // Then
        assertFalse(exists)
    }


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
