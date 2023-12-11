package it.polito.server.requestproposal

import it.polito.server.student.StudentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDate


@Service
class RequestProposalService (private val requestProposalRepository: RequestProposalRepository, private val studentService: StudentService) {

    fun createRequestProposal(requestProposal: RequestProposalDTO): RequestProposalDTO {
        val savedRequestProposal = requestProposalRepository.save(requestProposal.toDBObj())
        return savedRequestProposal.toDTO()
    }

    fun updateRequestProposal(id: String, update: RequestProposalDTO): RequestProposalDTO? {
        val requestProposal = requestProposalRepository.findById(id).orElse(null) ?: return null
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
        val student = studentExists ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Student '$studentId' does NOT exist.")

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

        return ResponseEntity.ok("Request Proposal '$id' rejected successfully")
    }


    fun acceptRequestProposalBySupervisor(id: String): ResponseEntity<Any> {
        val requestProposal = requestProposalRepository.findById(id).orElse(null) ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist")

        /*AGGIUNGERLO UNA VOLTA IMPLEMENTATO L'ACCETTAZIONE DELLA SEGRETERIA
        if(requestProposal.acceptanceDate == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal has not yet been accepted by the secretariat")*/

        if (requestProposal.supervisorStatus != RequestProposalStatus.PENDING)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state")

        requestProposalRepository.save(requestProposal.copy(supervisorStatus = RequestProposalStatus.ACCEPTED))

        return ResponseEntity.ok("Request Proposal '$id' accepted successfully")
    }

    fun rejectRequestProposalBySupervisor(id: String): ResponseEntity<Any> {
        val requestProposal = requestProposalRepository.findById(id).orElse(null) ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Proposal doesn't exist")

        /*AGGIUNGERLO UNA VOLTA IMPLEMENTATO L'ACCETTAZIONE DELLA SEGRETERIA
        if(requestProposal.acceptanceDate == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal has not yet been accepted by the secretariat")*/

        if (requestProposal.supervisorStatus != RequestProposalStatus.PENDING)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Request Proposal is not in a pending state")

        requestProposalRepository.save(requestProposal.copy(supervisorStatus = RequestProposalStatus.REJECTED))

        return ResponseEntity.ok("Request Proposal '$id' rejected successfully")
    }

}