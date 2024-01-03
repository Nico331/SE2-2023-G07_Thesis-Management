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
    fun testGetAllAppliedProposalsNoContent() {
        `when`(appliedProposalService.findAll()).thenReturn(emptyList())

        val responseEntity = appliedProposalController.getAll()

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList<AppliedProposalDTO>())
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
    fun testDeleteAppliedProposalServerError() {
        val applicationId = "1"

        `when`(appliedProposalService.deleteAppliedProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = appliedProposalController.deleteAppliedProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

    @Test
    fun testDeleteAppliedProposalWithNonPendingStatus() {
        val applicationId = "1"
        val nonPendingApplication = AppliedProposalDTO(
                id = applicationId,
                proposalId = "1",
                studentId = "student1",
                status = ApplicationStatus.ACCEPTED,
                file = null
        )

        `when`(appliedProposalService.deleteAppliedProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot delete application with status ${nonPendingApplication.status}"))

        val responseEntity = appliedProposalController.deleteAppliedProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Cannot delete application with status ${nonPendingApplication.status}")
    }

    @Test
    fun testWithdrawProposal() {
        val appliedProposalId = "1"
        val withdrawnAppliedProposal = AppliedProposalDTO(
                id = appliedProposalId,
                proposalId = "1",
                studentId = "student1",
                status = ApplicationStatus.CANCELLED,
                file = null
        )
        `when`(appliedProposalService.withdrawProposal(appliedProposalId)).thenReturn(ResponseEntity.ok(withdrawnAppliedProposal))

        val responseEntity = appliedProposalController.withdrawProposal(appliedProposalId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == withdrawnAppliedProposal)
    }

    @Test
    fun testWithdrawNonExistingProposal() {
        val nonExistingAppliedProposalId = "99"
        `when`(appliedProposalService.withdrawProposal(nonExistingAppliedProposalId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found"))

        val responseEntity = appliedProposalController.withdrawProposal(nonExistingAppliedProposalId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Application not found")
    }

    @Test
    fun testWithdrawProposalServerError() {
        val applicationId = "1"

        `when`(appliedProposalService.withdrawProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = appliedProposalController.withdrawProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
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

    @Test
    fun testApplyForProposalBadRequest() {
        val proposalId = "1"
        val studentId = "student1"
        val file = FileDTO(byteArrayOf(1, 2, 3), "filename", "originalFileName", "application/pdf")

        `when`(appliedProposalService.applyForProposal(proposalId, studentId, file))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (APPLICATION ALREADY EXISTS)."))

        val responseEntity = appliedProposalController.createApplyForProposal(proposalId, studentId, file)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR in creating the application (APPLICATION ALREADY EXISTS).")
    }

    @Test
    fun testApplyForProposalNonExistingProposal() {
        val nonExistingProposalId = "99"
        val studentId = "student1"
        val file = FileDTO(byteArrayOf(1, 2, 3), "filename", "originalFileName", "application/pdf")

        `when`(appliedProposalService.applyForProposal(nonExistingProposalId, studentId, file))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (PROPOSAL NOT PRESENT in the database)."))

        val responseEntity = appliedProposalController.createApplyForProposal(nonExistingProposalId, studentId, file)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR in creating the application (PROPOSAL NOT PRESENT in the database).")
    }

    @Test
    fun testApplyForProposalNonExistingStudent() {
        val proposalId = "1"
        val nonExistingStudentId = "student99"
        val file = FileDTO(byteArrayOf(1, 2, 3), "filename", "originalFileName", "application/pdf")

        `when`(appliedProposalService.applyForProposal(proposalId, nonExistingStudentId, file))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (STUDENT NOT PRESENT in the database)."))

        val responseEntity = appliedProposalController.createApplyForProposal(proposalId, nonExistingStudentId, file)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR in creating the application (STUDENT NOT PRESENT in the database).")
    }

    @Test
    fun testApplyForProposalAcceptedOrPending() {
        val existingProposalId = "1"
        val studentId = "student1"
        val file = FileDTO(byteArrayOf(1, 2, 3), "filename", "originalFileName", "application/pdf")

        `when`(appliedProposalService.applyForProposal(existingProposalId, studentId, file))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (STUDENT ALREADY HAS AN APPLICATION)."))

        val responseEntity = appliedProposalController.createApplyForProposal(existingProposalId, studentId, file)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR in creating the application (STUDENT ALREADY HAS AN APPLICATION).")
    }

    @Test
    fun testApplyForProposalInternalError() {
        val existingProposalId = "1"
        val studentId = "student1"
        val file = FileDTO(byteArrayOf(1, 2, 3), "filename", "originalFileName", "application/pdf")

        `when`(appliedProposalService.applyForProposal(existingProposalId, studentId, file))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = appliedProposalController.createApplyForProposal(existingProposalId, studentId, file)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

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
    fun testGetAppliedProposalByStudentServerError() {
        val studentId = "existingStudentId"

        `when`(appliedProposalService.appliesByStudentId(studentId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = appliedProposalController.getAppliedProposalByStudent(studentId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

    @Test
    fun testGetAppliedProposalByStudentEmptyList() {
        val studentId = "studentWithNoApplications"

        `when`(appliedProposalService.appliesByStudentId(studentId)).thenReturn(ResponseEntity.ok(emptyList<AppliedProposalDTO>()))

        val responseEntity = appliedProposalController.getAppliedProposalByStudent(studentId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList<AppliedProposalDTO>())
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
    fun testGetAppliedProposalByProposalServerError() {
        val proposalId = "existingProposalId"

        `when`(appliedProposalService.appliesByStudentId(proposalId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = appliedProposalController.getAppliedProposalByStudent(proposalId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

    @Test
    fun testGetAppliedProposalByProposalEmptyList() {
        val proposalId = "proposalWithNoApplications"

        `when`(appliedProposalService.appliesByStudentId(proposalId)).thenReturn(ResponseEntity.ok(emptyList<AppliedProposalDTO>()))

        val responseEntity = appliedProposalController.getAppliedProposalByStudent(proposalId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList<AppliedProposalDTO>())
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
    fun testAcceptProposalNotFound() {
        val applicationId = "nonExistingId"

        `when`(appliedProposalService.acceptProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Application NOT EXIST"))

        val responseEntity = appliedProposalController.acceptProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "ERROR: this Application NOT EXIST")
    }

    @Test
    fun testAcceptProposalAlreadyAccepted() {
        val applicationId = "1"

        `when`(appliedProposalService.acceptProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been ACCEPTED"))

        val responseEntity = appliedProposalController.acceptProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR: this Application has already been ACCEPTED")
    }

    @Test
    fun testAcceptProposalAlreadyCancelled() {
        val applicationId = "1"

        `when`(appliedProposalService.acceptProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been CANCELLED"))

        val responseEntity = appliedProposalController.acceptProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR: this Application has already been CANCELLED")
    }

    @Test
    fun testAcceptProposalAlreadyRejected() {
        val applicationId = "1"

        `when`(appliedProposalService.acceptProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been REJECTED"))

        val responseEntity = appliedProposalController.acceptProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR: this Application has already been REJECTED")
    }

    @Test
    fun testAcceptProposalUnexpectedError() {
        val applicationId = "1"

        `when`(appliedProposalService.acceptProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected Error"))

        val responseEntity = appliedProposalController.acceptProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Unexpected Error")
    }

    @Test
    fun testAcceptProposalServerError() {
        val applicationId = "1"

        `when`(appliedProposalService.acceptProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = appliedProposalController.acceptProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
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

    @Test
    fun testRejectProposalNotFound() {
        val applicationId = "nonExistingId"

        `when`(appliedProposalService.rejectProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Application NOT EXIST"))

        val responseEntity = appliedProposalController.rejectProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "ERROR: this Application NOT EXIST")
    }

    @Test
    fun testRejectProposalAlreadyAccepted() {
        val applicationId = "1"

        `when`(appliedProposalService.rejectProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been ACCEPTED"))

        val responseEntity = appliedProposalController.rejectProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR: this Application has already been ACCEPTED")
    }

    @Test
    fun testRejectProposalAlreadyCancelled() {
        val applicationId = "1"

        `when`(appliedProposalService.rejectProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been CANCELLED"))

        val responseEntity = appliedProposalController.rejectProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR: this Application has already been CANCELLED")
    }

    @Test
    fun testRejectProposalAlreadyRejected() {
        val applicationId = "1"

        `when`(appliedProposalService.rejectProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been REJECTED"))

        val responseEntity = appliedProposalController.rejectProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "ERROR: this Application has already been REJECTED")
    }

    @Test
    fun testRejectProposalUnexpectedError() {
        val applicationId = "1"

        `when`(appliedProposalService.rejectProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected Error"))

        val responseEntity = appliedProposalController.rejectProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Unexpected Error")
    }

    @Test
    fun testRejectProposalServerError() {
        val applicationId = "1"

        `when`(appliedProposalService.rejectProposal(applicationId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = appliedProposalController.rejectProposal(applicationId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }


    /*
    MANCANO TEST PER QUESTE APIs:
    @GetMapping("/active/{professorId}")
    fun getActiveByProfessorId (@PathVariable professorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByProfessor( professorId, archiviation_type.NOT_ARCHIVED )
        return ResponseEntity.ok(proposalsWithApplications)
    }
    @GetMapping("/archived/{professorId}")
    fun getArchivedByProfessorId (@PathVariable professorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByProfessor( professorId, archiviation_type.EXPIRED, archiviation_type.MANUALLY_ARCHIVED )
        return ResponseEntity.ok(proposalsWithApplications)
    }

    @GetMapping("/active/{coSupervisorId}")
    fun getActiveByCoSupervisorId (@PathVariable coSupervisorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByCoSupervisor( coSupervisorId, archiviation_type.NOT_ARCHIVED )
        return ResponseEntity.ok(proposalsWithApplications)
    }
    @GetMapping("/archived/{coSupervisorId}")
    fun getArchivedCoSupervisorId (@PathVariable coSupervisorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByCoSupervisor( coSupervisorId, archiviation_type.EXPIRED, archiviation_type.MANUALLY_ARCHIVED )
        return ResponseEntity.ok(proposalsWithApplications)
    }
     */

}