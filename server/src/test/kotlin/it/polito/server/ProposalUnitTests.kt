package it.polito.server

import it.polito.server.externalcosupervisor.ExternalCoSupervisorDTO
import it.polito.server.proposal.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDate
import it.polito.server.professor.ProfessorService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.testcontainers.junit.jupiter.Testcontainers
import java.util.Optional

//@Testcontainers
//@SpringBootTest
class ProposalUnitTests {

//    @Autowired
    private lateinit var proposalService: ProposalService
//    @Autowired
    private lateinit var proposalController: ProposalController
//    @Autowired
    private lateinit var professorService: ProfessorService
//    @Autowired
    private lateinit var proposalRepository: ProposalRepository


    fun setUp() {
        proposalService = mock(ProposalService::class.java)
        proposalController = ProposalController(proposalService)
        professorService = mock(ProfessorService::class.java)
        proposalRepository = mock(ProposalRepository::class.java)
    }

    @Test
    fun testUpdateProposal() {
        val proposalId = "1"
        val updatedProposalDTO = ProposalDTO(
                title = "Updated Proposal",
                supervisor = "John Doe",
                coSupervisors = listOf("Jane Smith"),
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

        `when`(proposalService.updateProposal(proposalId, updatedProposalDTO)).thenReturn(
                ProposalDTO(
                        id = proposalId,
                        title = "Updated Proposal",
                        supervisor = "John Doe",
                        coSupervisors = listOf("Jane Smith"),
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

/*    @Test
    fun testCreateProposalWithExternalCoSups () {
        val newProposalDTO = ProposalDTO(
            title = "New Proposal",
            supervisor = "John Doe",
            coSupervisors = listOf("Jane Smith"),
            externalCoSupervisors = listOf(ExternalCoSupervisorDTO("name1", "surname1", "email1"), ExternalCoSupervisorDTO("name2", "surname2", "email2")),
            keywords = listOf("Java", "Spring"),
            type = "Research",
            groups = listOf("Group1", "Group2"),
            description = "New description",
            requiredKnowledge = "New knowledge",
            notes = "New notes",
            expiration = LocalDate.now().plusMonths(2),
            level = "PhD",
            cdS = listOf("CD1", "CD2"),
            archived = archiviation_type.NOT_ARCHIVED
        )

        val saveResponse = proposalController.createProposal(newProposalDTO)

        assert(saveResponse.statusCode == HttpStatus.CREATED)
        assert(saveResponse.body == ProposalDTO(
            id = "2",
            title = "New Proposal",
            supervisor = "John Doe",
            coSupervisors = listOf("Jane Smith"),
            externalCoSupervisors = listOf(ExternalCoSupervisorDTO("name1", "surname1", "email1"), ExternalCoSupervisorDTO("name2", "surname2", "email2")),
            keywords = listOf("Java", "Spring"),
            type = "Research",
            groups = listOf("Group1", "Group2"),
            description = "New description",
            requiredKnowledge = "New knowledge",
            notes = "New notes",
            expiration = LocalDate.now().plusMonths(2),
            level = "PhD",
            cdS = listOf("CD1", "CD2"),
            archived = archiviation_type.NOT_ARCHIVED
        ))
    }*/

    @Test
    fun testCreateProposal() {
        val newProposalDTO = ProposalDTO(
                title = "New Proposal",
                supervisor = "John Doe",
                coSupervisors = listOf("Jane Smith"),
                keywords = listOf("Java", "Spring"),
                type = "Research",
                groups = listOf("Group1", "Group2"),
                description = "New description",
                requiredKnowledge = "New knowledge",
                notes = "New notes",
                expiration = LocalDate.now().plusMonths(2),
                level = "PhD",
                cdS = listOf("CD1", "CD2"),
                archived = archiviation_type.NOT_ARCHIVED
        )

        `when`(proposalService.existsByTitleAndSupervisor(newProposalDTO.title, newProposalDTO.supervisor)).thenReturn(false)
        `when`(proposalService.createProposal(newProposalDTO)).thenReturn(
                ProposalDTO(
                        id = "2",
                        title = "New Proposal",
                        supervisor = "John Doe",
                        coSupervisors = listOf("Jane Smith"),
                        keywords = listOf("Java", "Spring"),
                        type = "Research",
                        groups = listOf("Group1", "Group2"),
                        description = "New description",
                        requiredKnowledge = "New knowledge",
                        notes = "New notes",
                        expiration = LocalDate.now().plusMonths(2),
                        level = "PhD",
                        cdS = listOf("CD1", "CD2"),
                        archived = archiviation_type.NOT_ARCHIVED
                )
        )

        val responseEntity = proposalController.createProposal(newProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.CREATED)
        assert(responseEntity.body == ProposalDTO(
                id = "2",
                title = "New Proposal",
                supervisor = "John Doe",
                coSupervisors = listOf("Jane Smith"),
                keywords = listOf("Java", "Spring"),
                type = "Research",
                groups = listOf("Group1", "Group2"),
                description = "New description",
                requiredKnowledge = "New knowledge",
                notes = "New notes",
                expiration = LocalDate.now().plusMonths(2),
                level = "PhD",
                cdS = listOf("CD1", "CD2"),
                archived = archiviation_type.NOT_ARCHIVED
        ))
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
        val proposalDTO = ProposalDTO(
                id = proposalId,
                title = "Sample Proposal",
                supervisor = "John Doe",
                coSupervisors = listOf("Jane Smith"),
                keywords = listOf("Java", "Spring"),
                type = "Research",
                groups = listOf("Group1", "Group2"),
                description = "Sample description",
                requiredKnowledge = "Sample knowledge",
                notes = "Sample notes",
                expiration = LocalDate.now().plusMonths(2),
                level = "Master",
                cdS = listOf("CD1", "CD2"),
                archived = archiviation_type.NOT_ARCHIVED
        )

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
                ProposalDTO(
                        id = "1",
                        title = "Proposal 1",
                        supervisor = "John Doe",
                        coSupervisors = listOf("Jane Smith"),
                        keywords = listOf("Java", "Spring"),
                        type = "Research",
                        groups = listOf("Group1", "Group2"),
                        description = "Description 1",
                        requiredKnowledge = "Knowledge 1",
                        notes = "Notes 1",
                        expiration = LocalDate.now().plusMonths(2),
                        level = "Master",
                        cdS = listOf("CD1", "CD2"),
                        archived = archiviation_type.NOT_ARCHIVED
                ),
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
                ProposalDTO(
                        id = "1",
                        title = "Active Proposal 1",
                        supervisor = supervisor,
                        coSupervisors = listOf("Jane Smith"),
                        keywords = listOf("Java", "Spring"),
                        type = "Research",
                        groups = listOf("Group1", "Group2"),
                        description = "Description 1",
                        requiredKnowledge = "Knowledge 1",
                        notes = "Notes 1",
                        expiration = LocalDate.now().plusMonths(2),
                        level = "Master",
                        cdS = listOf("CD1", "CD2"),
                        archived = archiviation_type.NOT_ARCHIVED
                ),
                ProposalDTO(
                        id = "2",
                        title = "Active Proposal 2",
                        supervisor = supervisor,
                        coSupervisors = listOf("Jane Smith"),
                        keywords = listOf("Kotlin", "Spring"),
                        type = "Thesis",
                        groups = listOf("Group2", "Group3"),
                        description = "Description 2",
                        requiredKnowledge = "Knowledge 2",
                        notes = "Notes 2",
                        expiration = LocalDate.now().plusMonths(3),
                        level = "PhD",
                        cdS = listOf("CD2", "CD3"),
                        archived = archiviation_type.NOT_ARCHIVED
                )
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
        val activeProposalDTOList = listOf(
                ProposalDTO(
                        id = "1",
                        title = "Active Proposal 1",
                        supervisor = supervisor,
                        coSupervisors = listOf("Jane Smith"),
                        keywords = listOf("Java", "Spring"),
                        type = "Research",
                        groups = listOf("Group1", "Group2"),
                        description = "Description 1",
                        requiredKnowledge = "Knowledge 1",
                        notes = "Notes 1",
                        expiration = LocalDate.now().plusMonths(2),
                        level = "Master",
                        cdS = listOf("CD1", "CD2"),
                        archived = archiviation_type.EXPIRED
                ),
                ProposalDTO(
                        id = "2",
                        title = "Active Proposal 2",
                        supervisor = supervisor,
                        coSupervisors = listOf("Jane Smith"),
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
        val proposalEntity = Proposal(
                id = "1",
                title = "Active Proposal 1",
                supervisor = "supervisor",
                coSupervisors = listOf("Jane Smith"),
                keywords = listOf("Java", "Spring"),
                type = "Research",
                groups = listOf("Group1", "Group2"),
                description = "Description 1",
                requiredKnowledge = "Knowledge 1",
                notes = "Notes 1",
                expiration = LocalDate.now().plusMonths(2),
                level = "Master",
                cdS = listOf("CD1", "CD2"),
                archived = archiviation_type.MANUALLY_ARCHIVED
        )

        `when`(proposalRepository.findById(proposalId)).thenReturn(Optional.of(proposalEntity))
        `when`(proposalService.manuallyArchivedProposal(proposalId)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Proposal is already archived"))

        val responseEntity = proposalService.manuallyArchivedProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Proposal is already archived")
    }

}
