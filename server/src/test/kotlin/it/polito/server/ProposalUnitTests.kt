package it.polito.server

import it.polito.server.annotations.CoderseeGenerated
import it.polito.server.externalcosupervisor.ExternalCoSupervisorDTO
import it.polito.server.proposal.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDate
import it.polito.server.professor.ProfessorService
import java.util.Optional

//@Testcontainers
//@SpringBootTest
@CoderseeGenerated
class ProposalUnitTests {

//    @Autowired
    private lateinit var proposalService: ProposalService
//    @Autowired
    private lateinit var proposalController: ProposalController
//    @Autowired
    private lateinit var professorService: ProfessorService
//    @Autowired
    private lateinit var proposalRepository: ProposalRepository

    @BeforeEach
    fun setUp() {
        proposalService = mock(ProposalService::class.java)
        proposalController = ProposalController(proposalService)
        professorService = mock(ProfessorService::class.java)
        proposalRepository = mock(ProposalRepository::class.java)
    }
    val proposalDTO = ProposalDTO(
        title = "Updated Proposal",
        supervisor = "John Doe",
        coSupervisors = listOf("Jane Smith"),
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
    )
    @Test
    fun testUpdateProposal() {
        val proposalId = "1"
        val updatedProposalDTO = proposalDTO
        `when`(proposalService.updateProposal(proposalId, updatedProposalDTO)).thenReturn(
                ProposalDTO(
                        id = proposalId,
                        title = "Updated Proposal",
                        supervisor = "John Doe",
                        coSupervisors = listOf("Jane Smith"),
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
                )
        )

        val responseEntity = proposalController.updateProposal(proposalId, updatedProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == ProposalDTO(
                id = proposalId,
                title = "Updated Proposal",
                supervisor = "John Doe",
                coSupervisors = listOf("Jane Smith"),
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
        ))
    }

    @Test
    fun testUpdateNonExistingProposal() {
        val proposalId = "999"
        val updatedProposalDTO = proposalDTO

        `when`(proposalService.updateProposal(proposalId, updatedProposalDTO)).thenReturn(null)

        val responseEntity = proposalController.updateProposal(proposalId, updatedProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }


    @Test
    fun testCreateProposal() {
        val newProposalDTO = proposalDTO

        `when`(proposalService.existsByTitleAndSupervisor(newProposalDTO.title, newProposalDTO.supervisor)).thenReturn(false)
        `when`(proposalService.createProposal(newProposalDTO)).thenReturn(
                newProposalDTO
        )

        val responseEntity = proposalController.createProposal(newProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.CREATED)
        assert(responseEntity.body == newProposalDTO)
    }

//    @Test
//    fun testCreateExistingProposal() {
//        val existingProposalDTO = ProposalDTO(
//                title = "Existing Proposal",
//                supervisor = "John Doe",
//                coSupervisors = listOf("Jane Smith"),
//                keywords = listOf("Java", "Spring"),
//                type = "Research",
//                groups = listOf("Group1", "Group2"),
//                description = "Existing description",
//                requiredKnowledge = "Existing knowledge",
//                notes = "Existing notes",
//                expiration = LocalDate.now().plusMonths(3),
//                level = "Bachelor",
//                cdS = listOf("CD1", "CD2"),
//                archived = archiviation_type.NOT_ARCHIVED
//        )
//
//        `when`(proposalService.existsByTitleAndSupervisor(existingProposalDTO.title, existingProposalDTO.supervisor)).thenReturn(true)
//
//        val responseEntity = proposalController.createProposal(existingProposalDTO)
//
//        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
//        assert(responseEntity.body == "Proposal with same title and supervisor already in the database")
//    }

    @Test
    fun testGetProposal() {
        val proposalId = "1"

        `when`(proposalService.findProposalById(proposalId)).thenReturn(proposalDTO)

        val responseEntity = proposalController.getProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == proposalDTO)
    }

    @Test
    fun testGetProposalNotFound() {
        val nonExistingProposalId = "99"

        `when`(proposalService.findProposalById(nonExistingProposalId)).thenReturn(null)

        val responseEntity = proposalController.getProposal(nonExistingProposalId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testGetAllProposals() {
        val proposalDTOList = listOf(
                proposalDTO,
                ProposalDTO(
                        id = "2",
                        title = "Proposal 2",
                        supervisor = "Jane Smith",
                        coSupervisors = listOf("John Doe"),
                        keywords = listOf("Kotlin", "Spring"),
                        type = "Thesis",
                        groups = listOf("Group2", "Group3"),
                        description = "Description 2",
                        requiredKnowledge = "Knowledge 2",
                        notes = "Notes 2",
                        expiration = LocalDate.now().plusMonths(3),
                        level = "PhD",
                        cdS = listOf("CD2", "CD3"),
                        archived = archiviation_type.MANUALLY_ARCHIVED
                )
        )

        `when`(proposalService.findAll()).thenReturn(proposalDTOList)

        val responseEntity = proposalController.getAll()
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == proposalDTOList)
    }

    @Test
    fun testGetActiveProposalsForStudent() {
        val studentId = "student123"
        val activeProposals = listOf(
                proposalDTO,
                proposalDTO.copy(id = "2"))

        `when`(proposalService.findActiveByStudent(studentId)).thenReturn(activeProposals)

        val responseEntity = proposalController.getAllByStudent(studentId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == activeProposals)
    }

    @Test
    fun testGetNoActiveProposalsForStudent() {
        val studentId = "student456"

        `when`(proposalService.findActiveByStudent(studentId)).thenReturn(emptyList())

        val responseEntity = proposalController.getAllByStudent(studentId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body?.isEmpty() ?: true)
    }

    @Test
    fun testDeleteExistingProposal() {
        val proposalId = "1"

        `when`(proposalService.deleteProposal(proposalId)).thenReturn(
                ResponseEntity.status(HttpStatus.OK).body("Proposal with ID $proposalId successfully deleted.")
        )

        val responseEntity = proposalController.deleteProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Proposal with ID $proposalId successfully deleted.")
    }

    @Test
    fun testDeleteNonExistingProposal() {
        val nonExistingProposalId = "99"

        `when`(proposalService.deleteProposal(nonExistingProposalId)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proposal doesn't exist")
        )

        val responseEntity = proposalController.deleteProposal(nonExistingProposalId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Proposal doesn't exist")
    }

    @Test
    fun testGetActiveProposalsBySupervisor() {
        val supervisor = "John Doe"
        val activeProposalDTOList = listOf(
                proposalDTO, proposalDTO.copy(id = "2")
        )

        `when`(proposalService.findActiveProposalsBySupervisor(supervisor)).thenReturn(
                ResponseEntity.ok(activeProposalDTOList)
        )

        val responseEntity = proposalController.getActiveProposalsBySupervisor(supervisor)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == activeProposalDTOList)
    }

    @Test
    fun testGetActiveProposalsBySupervisorNotFound() {
        val nonExistingSupervisor = "NonExistingSupervisor"

        `when`(proposalService.findActiveProposalsBySupervisor(nonExistingSupervisor)).thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Supervisor '$nonExistingSupervisor' does NOT exist."))

        val responseEntity = proposalController.getActiveProposalsBySupervisor(nonExistingSupervisor)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Error: Supervisor '$nonExistingSupervisor' does NOT exist.")
    }

    @Test
    fun testFindActiveProposalsBySupervisorNoProposals() {
        val supervisor = "TestSupervisor"

        `when`(proposalService.findActiveProposalsBySupervisor(supervisor)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Supervisor '$supervisor' has NO proposals."))

        val responseEntity = proposalService.findActiveProposalsBySupervisor(supervisor)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Supervisor '$supervisor' has NO proposals.")
    }

    @Test
    fun testFindActiveProposalsBySupervisorNoActiveProposals() {
        val supervisor = "TestSupervisor"
//        val activeProposalDTOList = listOf(
//                ProposalDTO(
//                        id = "1",
//                        title = "Active Proposal 1",
//                        supervisor = supervisor,
//                        coSupervisors = listOf("Jane Smith"),
//                        keywords = listOf("Java", "Spring"),
//                        type = "Research",
//                        groups = listOf("Group1", "Group2"),
//                        description = "Description 1",
//                        requiredKnowledge = "Knowledge 1",
//                        notes = "Notes 1",
//                        expiration = LocalDate.now().plusMonths(2),
//                        level = "Master",
//                        cdS = listOf("CD1", "CD2"),
//                        archived = archiviation_type.EXPIRED
//                ),
//                ProposalDTO(
//                        id = "2",
//                        title = "Active Proposal 2",
//                        supervisor = supervisor,
//                        coSupervisors = listOf("Jane Smith"),
//                        keywords = listOf("Kotlin", "Spring"),
//                        type = "Thesis",
//                        groups = listOf("Group2", "Group3"),
//                        description = "Description 2",
//                        requiredKnowledge = "Knowledge 2",
//                        notes = "Notes 2",
//                        expiration = LocalDate.now().plusMonths(3),
//                        level = "PhD",
//                        cdS = listOf("CD2", "CD3"),
//                        archived = archiviation_type.MANUALLY_ARCHIVED
//                )
//        )

        `when`(proposalService.findActiveProposalsBySupervisor(supervisor)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Supervisor '$supervisor' has NO ACTIVE proposals."))

        val responseEntity = proposalService.findActiveProposalsBySupervisor(supervisor)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Supervisor '$supervisor' has NO ACTIVE proposals.")
    }


    @Test
    fun testManuallyArchivedProposal() {
        val proposalId = "1"

        `when`(proposalService.manuallyArchivedProposal(proposalId)).thenReturn(
                ResponseEntity.ok("Proposal '$proposalId' archived manually successfully")
        )

        val responseEntity = proposalController.setManuallyArchivedProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Proposal '$proposalId' archived manually successfully")
    }

    @Test
    fun testManuallyArchivedProposalNotFound() {
        val proposalId = "1"

        // Configuring mock repository response for a non-existing proposal
        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.empty())

        // Configuring mock service response for manuallyArchivedProposal
        `when`(proposalService.manuallyArchivedProposal(proposalId)).thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Proposal '$proposalId' not found"))

        val responseEntity = proposalController.setManuallyArchivedProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Error: Proposal '$proposalId' not found")
    }

    @Test
    fun testManuallyArchivedAlreadyArchivedProposal() {
        val proposalId = "1"
        val proposalEntity = proposalDTO.toDBObj()

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(proposalEntity))
        `when`(proposalService.manuallyArchivedProposal(proposalId)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Proposal is already archived"))

        val responseEntity = proposalService.manuallyArchivedProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Proposal is already archived")
    }

    @Test
    fun testManuallyArchivedProposalError() {
        val proposalId = "1"
        val proposalEntity = proposalDTO.toDBObj()

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(proposalEntity))
        `when`(proposalService.manuallyArchivedProposal(proposalId)).thenReturn(
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error")
        )

        val responseEntity = proposalController.setManuallyArchivedProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

    @Test
    fun testManuallyArchivedProposalInvalidId() {
        val proposalId = "invalid_id"

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.empty())

        `when`(proposalService.manuallyArchivedProposal(proposalId)).thenReturn(
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Invalid proposal ID")
        )

        val responseEntity = proposalController.setManuallyArchivedProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Invalid proposal ID")
    }

    @Test
    fun testManuallyArchivedProposalNegativeExpiration() {
        val proposalId = "1"

        val proposalEntity = proposalDTO.toDBObj()

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(proposalEntity))
        `when`(proposalService.manuallyArchivedProposal(proposalId)).thenReturn(
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Negative expiration date")
        )

        val responseEntity = proposalController.setManuallyArchivedProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Negative expiration date")
    }


    @Test
    fun testGetArchivedProposalsBySupervisor() {
        val supervisor = "John Doe"
        val archivedProposalDTOList = listOf(proposalDTO.copy(supervisor = supervisor),proposalDTO.copy(id = "2", supervisor = supervisor)
        )

        `when`(proposalService.findArchivedProposalsBySupervisor(supervisor))
                .thenReturn(ResponseEntity.ok(archivedProposalDTOList))

        val responseEntity = proposalController.getArchivedProposalsBySupervisor(supervisor)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == archivedProposalDTOList)
    }

    @Test
    fun testGetArchivedProposalsBySupervisorNotFound() {
        val nonExistingSupervisor = "NonExistingSupervisor"

        `when`(proposalService.findArchivedProposalsBySupervisor(nonExistingSupervisor))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Supervisor '$nonExistingSupervisor' does NOT exist."))

        val responseEntity = proposalController.getArchivedProposalsBySupervisor(nonExistingSupervisor)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Error: Supervisor '$nonExistingSupervisor' does NOT exist.")
    }

    @Test
    fun testGetArchivedProposalsBySupervisorEmptyList() {
        val supervisorWithNoArchivedProposals = "NoArchivedProposalsSupervisor"

        `when`(proposalService.findArchivedProposalsBySupervisor(supervisorWithNoArchivedProposals)).thenReturn(
                ResponseEntity.ok(emptyList<ProposalDTO>())
        )

        val responseEntity = proposalController.getArchivedProposalsBySupervisor(supervisorWithNoArchivedProposals)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList<ProposalDTO>())
    }
    /*@Test
    fun testGetArchivedProposalsExceptionHandling() {
        val supervisorID = "1"

        `when`(professorService.findProfessorById(supervisorID)).thenReturn(ProfessorDTO(id = supervisorID, name = "John", surname = "Doe", email = "JohnDoe@gmail.com", codGroup = "11111", codDepartment = "22222"))

        `when`(proposalService.findArchivedProposalsBySupervisor(supervisorID)).thenThrow(RuntimeException("An unexpected error occurred."))

        val responseEntity = proposalController.getArchivedProposalsBySupervisor(supervisorID)

        assert(responseEntity != null) { "ResponseEntity is null" }
        assert(responseEntity!!.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
    }*/

    @Test
    fun testGetProposalsByCoSupervisor() {
        val coSupervisorId = "coSupervisorId"
        val proposalDTOList = listOf(
                proposalDTO.copy(coSupervisors = listOf(coSupervisorId)),
                proposalDTO.copy(id = "2", coSupervisors = listOf(coSupervisorId)))

        `when`(proposalService.findProposalsByCoSupervisor(coSupervisorId)).thenReturn(
                ResponseEntity.ok(proposalDTOList)
        )

        val responseEntity = proposalController.getProposalsByCoSupervisor(coSupervisorId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == proposalDTOList)
    }

    @Test
    fun testGetProposalsByCoSupervisorNotFound() {
        val nonExistingCoSupervisorId = "nonExistingCoSupervisorId"

        `when`(proposalService.findProposalsByCoSupervisor(nonExistingCoSupervisorId)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: CoSupervisor '$nonExistingCoSupervisorId' does NOT exist.")
        )

        val responseEntity = proposalController.getProposalsByCoSupervisor(nonExistingCoSupervisorId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Error: CoSupervisor '$nonExistingCoSupervisorId' does NOT exist.")
    }

    @Test
    fun testGetProposalsByCoSupervisorEmptyList() {
        val coSupervisorWithNoProposals = "coSupervisorWithNoProposals"

        `when`(proposalService.findProposalsByCoSupervisor(coSupervisorWithNoProposals)).thenReturn(
                ResponseEntity.ok(emptyList<ProposalDTO>())
        )

        val responseEntity = proposalController.getProposalsByCoSupervisor(coSupervisorWithNoProposals)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList<ProposalDTO>())
    }
}
