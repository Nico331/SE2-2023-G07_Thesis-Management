package it.polito.server

import it.polito.server.professor.ProfessorDTO
import it.polito.server.professor.ProfessorService
import it.polito.server.requestproposal.*
import it.polito.server.student.StudentService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDate
import java.util.Optional

class RequestProposalUnitTests {

    private lateinit var requestProposalService: RequestProposalService
    private lateinit var requestProposalRepository: RequestProposalRepository
    private lateinit var requestProposalController: RequestProposalController
    private lateinit var studentService : StudentService
    private lateinit var professorService : ProfessorService

    @BeforeEach
    fun setUp() {
        requestProposalService = mock(RequestProposalService::class.java)
        requestProposalRepository= mock(RequestProposalRepository::class.java)
        professorService = mock(ProfessorService::class.java)
        requestProposalController = RequestProposalController(requestProposalService, professorService)
        studentService = mock(StudentService::class.java)
    }

    @Test
    fun testCreateRequestProposal() {
        val newRequestProposalDTO = RequestProposalDTO(
                title = "New Request Proposal",
                studentId = "1",
                supervisorId = "John Doe",
                coSupervisors = listOf("Sup1", "Sup2"),
                description = "New description",
                acceptanceDate = null,
                secretaryStatus = RequestProposalStatus.PENDING,
                supervisorStatus = RequestProposalStatus.PENDING
        )

        `when`(requestProposalService.existsByTitleAndStudentId(newRequestProposalDTO.title, newRequestProposalDTO.studentId)).thenReturn(false)
        `when`(professorService.findProfessorById(newRequestProposalDTO.supervisorId)).thenReturn(ProfessorDTO(
                id = newRequestProposalDTO.supervisorId,
                name = "John",
                surname = "Doe",
                email = "johndoe@professor.it",
                codGroup = "11111",
                codDepartment = "22222")
        )
        `when`(requestProposalService.createRequestProposal(newRequestProposalDTO)).thenReturn(
                RequestProposalDTO(
                        id = "2",
                        title = "New Request Proposal",
                        studentId = "1",
                        supervisorId = "John Doe",
                        coSupervisors = listOf("Sup1", "Sup2"),
                        description = "New description",
                        acceptanceDate = null,
                        secretaryStatus = RequestProposalStatus.PENDING,
                        supervisorStatus = RequestProposalStatus.PENDING
                )
        )

        val responseEntity = requestProposalController.createRequestProposal(newRequestProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.CREATED)
        assert(responseEntity.body == RequestProposalDTO(
                id = "2",
                title = "New Request Proposal",
                studentId = "1",
                supervisorId = "John Doe",
                coSupervisors = listOf("Sup1", "Sup2"),
                description = "New description",
                acceptanceDate = null,
                secretaryStatus = RequestProposalStatus.PENDING,
                supervisorStatus = RequestProposalStatus.PENDING
        ))
    }

//    @Test
//    fun testCreateExistingRequestProposal() {
//        val existingRequestProposalDTO = RequestProposalDTO(
//                title = "Existing Request Proposal",
//                studentId = "1",
//                supervisorId = "p300001",
//                coSupervisors = listOf("Sup1", "Sup2"),
//                description = "New description",
//                acceptanceDate = null,
//                secretaryStatus = RequestProposalStatus.PENDING,
//                supervisorStatus = RequestProposalStatus.PENDING
//        )
//
//
//        `when`(requestProposalService.existsByStudentId(existingRequestProposalDTO.studentId)).thenReturn(true)
//
//        val responseEntity = requestProposalController.createRequestProposal(existingRequestProposalDTO)
//
//        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
//        assert(responseEntity.body == "Request Proposal for the same Student already exists")
//    }

    @Test
    fun testCreateRequestProposalSupervisorNotFound() {
        val newRequestProposalDTO = RequestProposalDTO(
                title = "Existing Request Proposal",
                studentId = "1",
                supervisorId = "John Doe",
                coSupervisors = listOf("Sup1", "Sup2"),
                description = "New description",
                acceptanceDate = null,
                secretaryStatus = RequestProposalStatus.PENDING,
                supervisorStatus = RequestProposalStatus.PENDING
        )

        `when`(requestProposalService.existsByTitleAndStudentId(newRequestProposalDTO.title, newRequestProposalDTO.studentId)).thenReturn(false)
        `when`(professorService.findProfessorById(newRequestProposalDTO.supervisorId)).thenReturn(null)

        val responseEntity = requestProposalController.createRequestProposal(newRequestProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "The supervisor does not exist in the database")
    }

//    @Test
//    fun testCreateRequestProposalExistingStudent() {
//        val existingStudentId = "ExistingStudent"
//        val newRequestProposalDTO = RequestProposalDTO(
//                title = "New Request Proposal",
//                studentId = existingStudentId,
//                supervisorId = "John Doe",
//                coSupervisors = listOf("Sup1", "Sup2"),
//                description = "New description",
//                acceptanceDate = null,
//                secretaryStatus = RequestProposalStatus.PENDING,
//                supervisorStatus = RequestProposalStatus.PENDING
//        )
//
//        `when`(requestProposalService.existsByStudentId(existingStudentId)).thenReturn(true)
//
//        val responseEntity = requestProposalController.createRequestProposal(newRequestProposalDTO)
//
//        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
//        assert(responseEntity.body == "Request Proposal for the same Student already exists")
//    }

    /*@Test
    fun testCreateRequestProposalInternalServerError() {
        val newRequestProposalDTO = RequestProposalDTO(
                title = "New Request Proposal",
                studentId = "1",
                supervisorId = "John Doe",
                coSupervisors = listOf("Sup1", "Sup2"),
                description = "New description",
                acceptanceDate = null,
                secretaryStatus = RequestProposalStatus.PENDING,
                supervisorStatus = RequestProposalStatus.PENDING
        )

        `when`(requestProposalService.existsByStudentId(newRequestProposalDTO.studentId)).thenReturn(false)
        `when`(professorService.findProfessorById(newRequestProposalDTO.supervisorId)).thenReturn(null)
        `when`(requestProposalService.createRequestProposal(newRequestProposalDTO)).thenThrow(RuntimeException("Simulated Internal Server Error"))

        val responseEntity = requestProposalController.createRequestProposal(newRequestProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Simulated Internal Server Error")
    }*/

    @Test
    fun testUpdateRequestProposal() {
        val requestProposalId = "1"
        val updatedRequestProposalDTO = RequestProposalDTO(
                title = "Updated Request Proposal",
                studentId = "1",
                supervisorId = "John Doe",
                coSupervisors = listOf("Sup1", "Sup2"),
                description = "New description",
                acceptanceDate = null,
                secretaryStatus = RequestProposalStatus.PENDING,
                supervisorStatus = RequestProposalStatus.PENDING
        )

        `when`(requestProposalService.updateRequestProposal(requestProposalId, updatedRequestProposalDTO)).thenReturn(
                RequestProposalDTO(
                        id = requestProposalId,
                        title = "Updated Request Proposal",
                        studentId = "1",
                        supervisorId = "John Doe",
                        coSupervisors = listOf("Sup1", "Sup2"),
                        description = "New description",
                        acceptanceDate = null,
                        secretaryStatus = RequestProposalStatus.PENDING,
                        supervisorStatus = RequestProposalStatus.PENDING
                )
        )

        val responseEntity = requestProposalController.updateRequestProposal(requestProposalId, updatedRequestProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == RequestProposalDTO(
                id = requestProposalId,
                title = "Updated Request Proposal",
                studentId = "1",
                supervisorId = "John Doe",
                coSupervisors = listOf("Sup1", "Sup2"),
                description = "New description",
                acceptanceDate = null,
                secretaryStatus = RequestProposalStatus.PENDING,
                supervisorStatus = RequestProposalStatus.PENDING
        ))
    }

    @Test
    fun testUpdateRequestProposalNotFound() {
        val nonExistingRequestProposalId = "99"
        val updatedRequestProposalDTO = RequestProposalDTO(
                title = "Updated Request Proposal",
                studentId = "1",
                supervisorId = "John Doe",
                coSupervisors = listOf("Sup1", "Sup2"),
                description = "New description",
                acceptanceDate = null,
                secretaryStatus = RequestProposalStatus.PENDING,
                supervisorStatus = RequestProposalStatus.PENDING
        )

        `when`(requestProposalService.updateRequestProposal(nonExistingRequestProposalId, updatedRequestProposalDTO)).thenReturn(null)

        val responseEntity = requestProposalController.updateRequestProposal(nonExistingRequestProposalId, updatedRequestProposalDTO)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testDeleteExistingProposal() {
        val requestProposalId = "1"

        `when`(requestProposalService.deleteRequestProposal(requestProposalId)).thenReturn(
                ResponseEntity.status(HttpStatus.OK).body(requestProposalId)
        )

        val responseEntity = requestProposalService.deleteRequestProposal(requestProposalId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == requestProposalId)
    }

    @Test
    fun testDeleteNonExistingProposal() {
        val nonExistingRequestProposalId = "99"

        `when`(requestProposalService.deleteRequestProposal(nonExistingRequestProposalId)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exists")
        )

        val responseEntity = requestProposalService.deleteRequestProposal(nonExistingRequestProposalId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Request Proposal doesn't exists")
    }

    @Test
    fun testDeleteRequestProposalInternalServerError() {
        val requestProposalId = "1"

        `when`(requestProposalService.deleteRequestProposal(requestProposalId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = requestProposalController.deleteRequestProposal(requestProposalId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

    @Test
    fun testGetRequestProposal() {
        val requestProposalId = "1"
        val requestProposalDTO = RequestProposalDTO(
                id = requestProposalId,
                title = "Request Proposal",
                studentId = "1",
                supervisorId = "John Doe",
                coSupervisors = listOf("Sup1", "Sup2"),
                description = "description",
                acceptanceDate = null,
                secretaryStatus = RequestProposalStatus.PENDING,
                supervisorStatus = RequestProposalStatus.PENDING
        )

        `when`(requestProposalService.findRequestProposalById(requestProposalId))
                .thenReturn(requestProposalDTO)

        val responseEntity = requestProposalController.getRequestProposal(requestProposalId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == requestProposalDTO)
    }

    @Test
    fun testGetRequestProposalNotFound() {
        val nonExistingRequestProposalId = "99"

        `when`(requestProposalService.findRequestProposalById(nonExistingRequestProposalId))
                .thenReturn(null)

        val responseEntity = requestProposalController.getRequestProposal(nonExistingRequestProposalId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testGetAllRequestProposals() {
        val requestProposalDTOList = listOf(
                RequestProposalDTO(
                        id = "1",
                        title = "Request Proposal",
                        studentId = "1",
                        supervisorId = "John Doe",
                        coSupervisors = listOf("Sup1", "Sup2"),
                        description = "description",
                        acceptanceDate = null,
                        secretaryStatus = RequestProposalStatus.PENDING,
                        supervisorStatus = RequestProposalStatus.PENDING
                ),
                RequestProposalDTO(
                        id = "2",
                        title = "Request Proposal",
                        studentId = "1",
                        supervisorId = "Jane Smith",
                        coSupervisors = listOf("Sup1", "Sup2"),
                        description = "description",
                        acceptanceDate = null,
                        secretaryStatus = RequestProposalStatus.PENDING,
                        supervisorStatus = RequestProposalStatus.PENDING
                )
        )

        `when`(requestProposalService.findAllRequestProposals())
                .thenReturn(requestProposalDTOList)

        val responseEntity = requestProposalController.getAll()

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == requestProposalDTOList)
    }

    @Test
    fun testGetAllRequestProposalsEmptyList() {
        val emptyList: List<RequestProposalDTO> = emptyList()

        `when`(requestProposalService.findAllRequestProposals())
                .thenReturn(emptyList)

        val responseEntity = requestProposalController.getAll()

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList)
    }

    @Test
    fun testGetAllRequestProposalsByStudentId() {
        val studentId = "123"
        val requestProposalDTOList = listOf(
                RequestProposalDTO(
                        id = "1",
                        title = "Request Proposal",
                        studentId = "123",
                        supervisorId = "John Doe",
                        coSupervisors = listOf("Sup1", "Sup2"),
                        description = "description",
                        acceptanceDate = null,
                        secretaryStatus = RequestProposalStatus.PENDING,
                        supervisorStatus = RequestProposalStatus.PENDING
                ),
                RequestProposalDTO(
                        id = "2",
                        title = "Request Proposal",
                        studentId = "123",
                        supervisorId = "Jane Smith",
                        coSupervisors = listOf("Sup1", "Sup2"),
                        description = "description",
                        acceptanceDate = null,
                        secretaryStatus = RequestProposalStatus.PENDING,
                        supervisorStatus = RequestProposalStatus.PENDING
                )
        )

        `when`(requestProposalService.findAllRequestProposalsByStudent(studentId))
                .thenReturn(ResponseEntity.ok(requestProposalDTOList))

        val responseEntity = requestProposalController.getAllByStudentId(studentId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == requestProposalDTOList)
    }

    @Test
    fun testGetAllRequestProposalsByNonExistingStudentId() {
        val nonExistingStudentId = "99"

        `when`(studentService.findStudentById(nonExistingStudentId))
                .thenReturn(null)

        `when`(requestProposalService.findAllRequestProposalsByStudent(nonExistingStudentId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Student '$nonExistingStudentId' does NOT exist."))

        val responseEntity = requestProposalController.getAllByStudentId(nonExistingStudentId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Error: Student '$nonExistingStudentId' does NOT exist.")
    }
    @Test
    fun testGetAllRequestProposalsByStudentIdEmptyList() {
        val studentId = "456"

        `when`(requestProposalService.findAllRequestProposalsByStudent(studentId))
                .thenReturn(ResponseEntity.ok(emptyList<RequestProposalDTO>()))

        val responseEntity = requestProposalController.getAllByStudentId(studentId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList<RequestProposalDTO>())
    }

    @Test
    fun testGetAllRequestProposalsByStudentIdInternalServerError() {
        val studentId = "789"

        `when`(requestProposalService.findAllRequestProposalsByStudent(studentId))
                .thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error"))

        val responseEntity = requestProposalController.getAllByStudentId(studentId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

    @Test
    fun testAcceptRequestProposalBySecretary() {
        val requestId = "1"

        `when`(requestProposalService.acceptRequestProposalBySecretary(requestId))
                .thenReturn(ResponseEntity.ok("Request Proposal '$requestId' accepted successfully"))

        val responseEntity = requestProposalController.acceptRequestProposalBySecretary(requestId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Request Proposal '$requestId' accepted successfully")
    }

    @Test
    fun testRejectRequestProposalBySecretary() {
        val requestId = "1"

        `when`(requestProposalService.rejectRequestProposalBySecretary(requestId))
                .thenReturn(ResponseEntity.ok("Request Proposal '$requestId' rejected successfully"))

        val responseEntity = requestProposalController.rejectRequestProposalBySecretary(requestId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Request Proposal '$requestId' rejected successfully")
    }

    @Test
    fun testAcceptRequestProposalBySupervisor() {
        val requestId = "1"

        `when`(requestProposalService.acceptRequestProposalBySupervisor(requestId))
                .thenReturn(ResponseEntity.ok("Request Proposal '$requestId' accepted successfully"))

        val responseEntity = requestProposalController.acceptRequestProposalBySupervisor(requestId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Request Proposal '$requestId' accepted successfully")
    }

    @Test
    fun testRejectRequestProposalBySupervisor() {
        val requestId = "1"

        `when`(requestProposalService.rejectRequestProposalBySupervisor(requestId))
                .thenReturn(ResponseEntity.ok("Request Proposal '$requestId' rejected successfully"))

        val responseEntity = requestProposalController.rejectRequestProposalBySupervisor(requestId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Request Proposal '$requestId' rejected successfully")
    }

    @Test
    fun testAcceptRequestProposalBySecretary_NotFound() {
        val requestId = "1"

        `when`(requestProposalService.acceptRequestProposalBySecretary(requestId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist"))

        val responseEntity = requestProposalController.acceptRequestProposalBySecretary(requestId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Request Proposal doesn't exist")
    }

    @Test
    fun testRejectRequestProposalBySecretary_NotFound() {
        val requestId = "1"

        `when`(requestProposalService.rejectRequestProposalBySecretary(requestId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist"))

        val responseEntity = requestProposalController.rejectRequestProposalBySecretary(requestId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Request Proposal doesn't exist")
    }

    @Test
    fun testAcceptRequestProposalBySecretary_BadRequest() {
        val requestId = "1"

        `when`(requestProposalService.acceptRequestProposalBySecretary(requestId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state"))

        val responseEntity = requestProposalController.acceptRequestProposalBySecretary(requestId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Request Proposal is not in a pending state")
    }

    @Test
    fun testAcceptRequestProposalBySupervisor_NotFound() {
        val requestId = "1"

        `when`(requestProposalService.acceptRequestProposalBySupervisor(requestId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist"))

        val responseEntity = requestProposalController.acceptRequestProposalBySupervisor(requestId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Request Proposal doesn't exist")
    }

    @Test
    fun testRejectRequestProposalBySupervisor_NotFound() {
        val requestId = "1"

        `when`(requestProposalService.rejectRequestProposalBySupervisor(requestId))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist"))

        val responseEntity = requestProposalController.rejectRequestProposalBySupervisor(requestId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Request Proposal doesn't exist")
    }

    @Test
    fun testAcceptRequestProposalBySupervisor_BadRequest() {
        val requestId = "1"

        `when`(requestProposalService.acceptRequestProposalBySupervisor(requestId))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state"))

        val responseEntity = requestProposalController.acceptRequestProposalBySupervisor(requestId)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Request Proposal is not in a pending state")
    }

    @Test
    fun testRequestOfChangeByProfessorSuccess() {
        val professorId = "123"
        val proposalId = "456"
        val message = MessageFromProfessorDTO("New message")

        `when`(requestProposalService.requestOfChangeByProfessor(professorId, proposalId, message)).thenReturn(
                ResponseEntity.ok("Notification for Request Proposal '$proposalId' sent successfully")
        )

        val responseEntity = requestProposalController.requestOfChangeByProfessor(professorId, proposalId, message)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Notification for Request Proposal '$proposalId' sent successfully")
    }

    @Test
    fun testRequestOfChangeByProfessorNotFound() {
        val professorId = "123"
        val proposalId = "456"
        val message = MessageFromProfessorDTO("New message")

        `when`(requestProposalService.requestOfChangeByProfessor(professorId, proposalId, message)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proposal not found")
        )

        val responseEntity = requestProposalController.requestOfChangeByProfessor(professorId, proposalId, message)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Proposal not found")
    }

    @Test
    fun testRequestOfChangeByProfessorProposalNotPending() {
        val professorId = "123"
        val proposalId = "456"
        val message = MessageFromProfessorDTO("New message")

        `when`(requestProposalService.requestOfChangeByProfessor(professorId, proposalId, message)).thenReturn(
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state")
        )

        val responseEntity = requestProposalController.requestOfChangeByProfessor(professorId, proposalId, message)

        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "Error: Request Proposal is not in a pending state")
    }

    @Test
    fun testRequestOfChangeByProfessorServerError() {
        val professorId = "123"
        val proposalId = "456"
        val message = MessageFromProfessorDTO("New message")

        `when`(requestProposalService.requestOfChangeByProfessor(professorId, proposalId, message)).thenReturn(
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error")
        )

        val responseEntity = requestProposalController.requestOfChangeByProfessor(professorId, proposalId, message)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

    @Test
    fun testGetAllByProfessorIdSuccess() {
        val professorId = "123"
        val requestProposalList = listOf(
                RequestProposalDTO(
                        id = "1",
                        title = "Request Proposal",
                        studentId = "123",
                        supervisorId = "John Doe",
                        coSupervisors = listOf("Sup1", "Sup2"),
                        description = "description",
                        acceptanceDate = null,
                        secretaryStatus = RequestProposalStatus.PENDING,
                        supervisorStatus = RequestProposalStatus.PENDING
                ),
                RequestProposalDTO(
                        id = "2",
                        title = "Request Proposal",
                        studentId = "123",
                        supervisorId = "Jane Smith",
                        coSupervisors = listOf("Sup1", "Sup2"),
                        description = "description",
                        acceptanceDate = null,
                        secretaryStatus = RequestProposalStatus.PENDING,
                        supervisorStatus = RequestProposalStatus.PENDING
                )
        )

        `when`(requestProposalService.findAllRequestProposalsByProfessor(professorId)).thenReturn(
                ResponseEntity.ok(requestProposalList)
        )

        val responseEntity = requestProposalController.getAllByProfessorId(professorId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == requestProposalList)
    }

    @Test
    fun testGetAllByProfessorIdNotFound() {
        val professorId = "456"

        `when`(requestProposalService.findAllRequestProposalsByProfessor(professorId)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Professor '$professorId' has NO Request for Proposals.")
        )

        val responseEntity = requestProposalController.getAllByProfessorId(professorId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Error: Professor '$professorId' has NO Request for Proposals.")
    }

    @Test
    fun testGetAllByProfessorIdEmptyList() {
        val professorId = "789"

        `when`(requestProposalService.findAllRequestProposalsByProfessor(professorId)).thenReturn(
                ResponseEntity.ok(emptyList<RequestProposalDTO>())
        )

        val responseEntity = requestProposalController.getAllByProfessorId(professorId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList<RequestProposalDTO>())
    }

    @Test
    fun testGetAllByProfessorIdInternalServerError() {
        val professorId = "789"

        `when`(requestProposalService.findAllRequestProposalsByProfessor(professorId)).thenReturn(
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error")
        )

        val responseEntity = requestProposalController.getAllByProfessorId(professorId)

        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Internal Server Error")
    }

}
