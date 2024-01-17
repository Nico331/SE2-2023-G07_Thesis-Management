package it.polito.server.requestproposal

import it.polito.server.email.EmailService
import it.polito.server.professor.ProfessorService
import it.polito.server.student.StudentService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDate


@Service
class RequestProposalService (
    private val requestProposalRepository: RequestProposalRepository,
    private val studentService: StudentService,
    private val emailService: EmailService,
    private val professorService: ProfessorService,

) {

    fun createRequestProposal(requestProposal: RequestProposalDTO): RequestProposalDTO {
        val savedRequestProposal = requestProposalRepository.save(requestProposal.toDBObj())
        val student = studentService.findStudentById(savedRequestProposal.studentId)
        val professor = professorService.findProfessorById(savedRequestProposal.supervisorId)!!
        CoroutineScope(Dispatchers.IO).launch {
            emailService.sendSimpleMessage(
                professor.email,
                "You have a new thesis request",
                "Dear professor, you have a new thesis request with title \"${savedRequestProposal.title}\" made by ${student!!.name} ${student.surname}",
                "no-reply@polito.it",
            )
        }
        savedRequestProposal.coSupervisors.forEach { coSupervisorId->
            val coSupervisor = professorService.findProfessorById(coSupervisorId)
            if (coSupervisor != null) {
                CoroutineScope(Dispatchers.IO).launch {
                    emailService.sendSimpleMessage(
                        coSupervisor.email,
                        "You have a new thesis request as a Co-Supervisor",
                        "Dear professor, you have a new thesis request as a Co-Supervisor with title \"${savedRequestProposal.title}\" made by ${student!!.name} ${student.surname}" +
                                "\nPlease let now the professor ${professor.name} ${professor.surname} (${professor.email}) and/or" +
                                "the student ${student.name} ${student.surname} (${student.email}) if you accept or reject the request.",
                        "no-reply@polito.it",
                    )
                }
            }
        }
        return savedRequestProposal.toDTO()
    }

    fun updateRequestProposal(id: String, update: RequestProposalDTO): RequestProposalDTO? {
        requestProposalRepository.findById(id).orElse(null) ?: return null
        return requestProposalRepository.save(update.toDBObj()).toDTO()
    }

    fun deleteRequestProposal(id: String) : ResponseEntity<Any> {
        if (!requestProposalRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exists")
        requestProposalRepository.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }

    fun findRequestProposalById(id: String): RequestProposalDTO? {
        return requestProposalRepository.findById(id).map(RequestProposal::toDTO).orElse(null)
    }

    fun findAllRequestProposals() : List<RequestProposalDTO> {
        return requestProposalRepository.findAll().map{(it.toDTO())}
    }

    fun existsByTitleAndStudentId (requestProposalTitle : String, requestProposalStudentId : String): Boolean {
        return requestProposalRepository.existsRequestProposalByTitleAndStudentId (requestProposalTitle, requestProposalStudentId)
    }

    fun findAllRequestProposalsByStudent(studentId : String) : ResponseEntity <Any> {

        val studentExists = studentService.findStudentById(studentId)
        studentExists ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Student '$studentId' does NOT exist.")

        val allRequestProposal = requestProposalRepository.findByStudentId(studentId)
        if(allRequestProposal.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Student '$studentId' has NO Request Proposals.")

        return ResponseEntity.ok(allRequestProposal.map {(it.toDTO())})
    }

    fun acceptRequestProposalBySecretary(id: String) : ResponseEntity<Any> {
        val requestProposal = requestProposalRepository.findById(id).orElse(null) ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist")

        if (requestProposal.secretaryStatus != RequestProposalStatus.PENDING)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state")

        requestProposal.acceptanceDate = LocalDate.now()
        requestProposalRepository.save(requestProposal.copy(secretaryStatus = RequestProposalStatus.ACCEPTED))

        return ResponseEntity.ok("Request Proposal '$id' accepted successfully")
    }

    fun rejectRequestProposalBySecretary(id: String) : ResponseEntity<Any> {
        val requestProposal = requestProposalRepository.findById(id).orElse(null) ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist")

        if (requestProposal.secretaryStatus != RequestProposalStatus.PENDING)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state")

        requestProposalRepository.save(requestProposal.copy(secretaryStatus = RequestProposalStatus.REJECTED))
        val student = studentService.findStudentById(requestProposal.studentId)!!
        CoroutineScope(Dispatchers.IO).launch {
            emailService.sendSimpleMessage(
                student.email,
                "Your thesis request \"${requestProposal.title}\" has been rejected by secretary",
                "Dear ${student.name} ${student.surname},\n" +
                        "Your request of proposal has been rejected by secretary, " +
                        "\nBest regards" +
                        "\nGestione Didattica",
                "no-reply@studenti.polito.it"
            )
        }
        return ResponseEntity.ok("Request Proposal '$id' rejected successfully")
    }


    fun acceptRequestProposalBySupervisor(id: String): ResponseEntity<Any> {
        val requestProposal = requestProposalRepository.findById(id).orElse(null) ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist")

        if(requestProposal.acceptanceDate == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal has not yet been accepted by the secretariat")

        if (requestProposal.supervisorStatus != RequestProposalStatus.PENDING)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state")

        requestProposalRepository.save(requestProposal.copy(supervisorStatus = RequestProposalStatus.ACCEPTED))
        val student = studentService.findStudentById(requestProposal.studentId)!!
        CoroutineScope(Dispatchers.IO).launch {
            emailService.sendSimpleMessage(
                student.email,
                "Your thesis request \"${requestProposal.title}\" has been accepted by the professor",
                "Dear ${student.name} ${student.surname}," +
                        "\nYour request of proposal has been accepted by the professor, " +
                        "\nBest regards" +
                        "\nGestione Didattica",
                "no-reply@studenti.polito.it"
            )
        }
        return ResponseEntity.ok("Request Proposal '$id' accepted successfully")
    }

    fun rejectRequestProposalBySupervisor(id: String): ResponseEntity<Any> {
        val requestProposal = requestProposalRepository.findById(id).orElse(null) ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist")

        if(requestProposal.acceptanceDate == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal has not yet been accepted by the secretariat")

        if (requestProposal.supervisorStatus != RequestProposalStatus.PENDING)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state")

        requestProposalRepository.save(requestProposal.copy(supervisorStatus = RequestProposalStatus.REJECTED))
        val student = studentService.findStudentById(requestProposal.studentId)!!
        CoroutineScope(Dispatchers.IO).launch {
            emailService.sendSimpleMessage(
                student.email,
                "Your thesis request \"${requestProposal.title}\" has been rejected by the professor",
                "Dear ${student.name} ${student.surname},\n" +
                        "Your request of proposal has been rejected by the professor, " +
                        "\nBest regards" +
                        "\nGestione Didattica",
                "no-reply@studenti.polito.it"
            )
        }

        return ResponseEntity.ok("Request Proposal '$id' rejected successfully")
    }

    fun requestOfChangeByProfessor(professorId: String, proposalId: String, message: MessageFromProfessorDTO): ResponseEntity<Any> {
        val requestProposal = requestProposalRepository.findById(proposalId).orElse(null)?.toDTO() ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist")

        if (requestProposal.supervisorStatus != RequestProposalStatus.PENDING)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state")

        requestProposal.secretaryStatus = RequestProposalStatus.PENDING
        CoroutineScope(Dispatchers.IO).launch {
            emailService.sendSimpleMessage(
                "${requestProposal.studentId}@studenti.polito.it",
                "Request of change for thesis request \"${requestProposal.title}\"",
                "Your request of proposal has been reviewed by the professor, " +
                        "and there are some corrections/" +
                        "modifications to make. Follows the professor's requests" +
                        "\nBest regards" +
                        "\nGestione Didattica" +
                        "\n---------------------\n" +
                        message.message +
                        "\n---------------------\n",
                "no-reply@studenti.polito.it"
            )
        }

        requestProposalRepository.save(requestProposal.toDBObj())
        return ResponseEntity.ok("Notification for Request Proposal '$proposalId' sent successfully")
    }

    fun findAllRequestProposalsByProfessor(id: String): ResponseEntity<Any> {
        val allRequestProposal = requestProposalRepository.findBySupervisorIdOrCoSupervisorsContaining(id).map{(it.toDTO())}
        if (allRequestProposal.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Professor '$id' has NO Request for Proposals.")
        return ResponseEntity.ok(allRequestProposal)
    }

    fun findByStudentId(studentId: String): List<RequestProposalDTO> {
        return requestProposalRepository.findByStudentId(studentId).map{(it.toDTO())}
    }
    fun getAllOngoingRequestsByProfessorId(id: String): List<RequestProposalDTO> {
        return requestProposalRepository.findAllBySupervisorIdAndSupervisorStatusAndSecretaryStatus(
            id,
            RequestProposalStatus.ACCEPTED,
            RequestProposalStatus.ACCEPTED
        ).map { it.toDTO() }
    }
}
