package it.polito.server

import it.polito.server.appliedproposal.*
import it.polito.server.proposal.Proposal
import it.polito.server.proposal.ProposalRepository
import it.polito.server.proposal.archiviation_type
import it.polito.server.student.StudentRepository
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.mockito.Mockito.`when`
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDate
import java.util.Optional

class AppliedProposalUnitTests {

    private lateinit var appliedProposalService: AppliedProposalService
    private lateinit var proposalRepository: ProposalRepository
    private lateinit var studentRepository: StudentRepository
    private lateinit var appliedProposalRepository: AppliedProposalRepository
    private lateinit var appliedProposalController: AppliedProposalController

    @BeforeEach
    fun setUp() {
       appliedProposalService = mock(AppliedProposalService::class.java)
        proposalRepository = mock(ProposalRepository::class.java)
        studentRepository = mock(StudentRepository::class.java)
        appliedProposalRepository= mock(AppliedProposalRepository::class.java)
        appliedProposalController = AppliedProposalController(appliedProposalService,proposalRepository, studentRepository)
    }

    @Test
    fun testGetAllAppliedProposals() {
        val appliedProposalDTOList = listOf(
                AppliedProposalDTO(id = "1", proposalId = "1", studentId = "student1", status = ApplicationStatus.PENDING, file = null),
                AppliedProposalDTO(id = "2", proposalId = "2", studentId = "student2", status = ApplicationStatus.ACCEPTED, file = null)
        )
        `when`(appliedProposalService.findAll()).thenReturn(appliedProposalDTOList)

        val responseEntity = appliedProposalController.getAll()

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == appliedProposalDTOList)
    }

    @Test
    fun testDeleteAppliedProposal() {
        val applicationId = "1"

        `when`(appliedProposalService.deleteAppliedProposal(applicationId)).thenReturn(
                ResponseEntity.status(HttpStatus.OK).body("Application with ID $applicationId successfully deleted.")
        )

        val responseEntity = appliedProposalController.deleteAppliedProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Application with ID $applicationId successfully deleted.")
    }

    @Test
    fun testDeleteNonExistingAppliedProposal(){
        val applicationId = "99"

        `when`(appliedProposalService.deleteAppliedProposal(applicationId)).thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("this Application does NOT EXIST"))

        val responseEntity = appliedProposalController.deleteAppliedProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "this Application does NOT EXIST")

    }

    @Test
    fun testApplyForProposal() {
        val proposalId = "1"
        val studentId = "student1"
        val file = FileDTO(byteArrayOf(1, 2, 3), "filename", "originalFileName", "application/pdf")

        val appliedProposalDTO = AppliedProposalDTO(
                id = "1",
                proposalId = proposalId,
                studentId = studentId,
                status = ApplicationStatus.PENDING,
                file = file
        )

        `when`(appliedProposalService.applyForProposal(proposalId, studentId,file)).thenReturn(ResponseEntity.ok(appliedProposalDTO))

        val responseEntity = appliedProposalController.createApplyForProposal(proposalId, studentId,file)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == appliedProposalDTO)
    }

    /*@Test
    fun testExistingApplyForProposal(){
        val proposalId = "1"
        val studentId = "student1"
        val file = FileDTO(byteArrayOf(1, 2, 3), "filename", "originalFileName", "application/pdf")
        val exisingAppliedProposal = AppliedProposal( id = "1",
                proposalId = proposalId,
                studentId = studentId,
                status = ApplicationStatus.PENDING, file = null)

        `when`(appliedProposalRepository.findByProposalIdAndStudentId(proposalId,studentId)).thenReturn(exisingAppliedProposal)
        val responseEntity = appliedProposalController.createApplyForProposal(proposalId,studentId,file)
        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR in creating the application (APPLICATION ALREADY EXISTS).")
    }*/

    @Test
    fun testGetAppliedProposalByStudent() {
        val studentId = "existingStudentId"
        val appliedProposalDTOList = listOf(
                AppliedProposalDTO(id = "1", proposalId = "1", studentId = studentId, status = ApplicationStatus.PENDING, file = null),
                AppliedProposalDTO(id = "2", proposalId = "2", studentId = studentId, status = ApplicationStatus.ACCEPTED, file = null)
        )
        `when`(appliedProposalService.appliesByStudentId(studentId)).thenReturn(ResponseEntity.ok(appliedProposalDTOList))

        val responseEntity = appliedProposalController.getAppliedProposalByStudent(studentId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == appliedProposalDTOList )
    }

    @Test
    fun testGetAppliedProposalByStudentNOTFOUND() {
        val studentId = "nonExistentStudentId"
        `when`(appliedProposalService.appliesByStudentId(studentId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this student NOT EXISTS"))

        val responseEntity = appliedProposalController.getAppliedProposalByStudent(studentId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "ERROR: this student NOT EXISTS")
    }

    @Test
    fun testGetAppliedProposalByProposal() {
        val proposalId = "existingProposalId"
        val appliedProposalDTOList = listOf(
                AppliedProposalDTO(id = "1", proposalId = proposalId, studentId = "student1", status = ApplicationStatus.PENDING, file = null),
                AppliedProposalDTO(id = "2", proposalId = proposalId, studentId = "student2", status = ApplicationStatus.ACCEPTED, file = null)
        )
        `when`(appliedProposalService.appliesByProposalId(proposalId)).thenReturn(ResponseEntity.ok(appliedProposalDTOList))

        val responseEntity = appliedProposalController.getAppliedProposalByProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == appliedProposalDTOList )
    }

    @Test
    fun testGetAppliedProposalByProposalNOTFOUND() {
        val proposalId = "nonExistentProposalId"
        `when`(appliedProposalService.appliesByProposalId(proposalId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Proposal NOT EXISTS"))

        val responseEntity = appliedProposalController.getAppliedProposalByProposal(proposalId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "ERROR: this Proposal NOT EXISTS")
    }

    @Test
    fun testAcceptProposal() {
        val applicationId = "1"

        `when`(appliedProposalService.acceptProposal(applicationId)).thenReturn(
                ResponseEntity.ok("Successful operation")
        )

        val responseEntity = appliedProposalController.acceptProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Successful operation")
    }

    @Test
    fun testRejectProposal() {
        val applicationId = "1"

        `when`(appliedProposalService.rejectProposal(applicationId)).thenReturn(
                ResponseEntity.ok("Successful operation")
        )

        val responseEntity = appliedProposalController.rejectProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Successful operation")
    }

}