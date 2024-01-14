package it.polito.server.requestproposal

import it.polito.server.professor.ProfessorService
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt

@RestController
@RequestMapping("/API/requestProposals")
class RequestProposalController (private val requestProposalService: RequestProposalService, private val professorService: ProfessorService){

    @PostMapping("")
    fun createRequestProposal(@RequestBody requestProposal: RequestProposalDTO): ResponseEntity<Any> {
        if (requestProposalService.findByStudentId(requestProposal.studentId)
            .any { it.secretaryStatus == RequestProposalStatus.PENDING && it.supervisorStatus == RequestProposalStatus.PENDING })
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Proposal for the same Student already exists")
        professorService.findProfessorById(requestProposal.supervisorId)
            ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The supervisor does not exist in the database")

        val newRequestProposal = requestProposalService.createRequestProposal(requestProposal)
        return ResponseEntity(newRequestProposal, HttpStatus.CREATED)
    }

    @PutMapping("/{requestProposalId}")
    fun updateRequestProposal (@PathVariable requestProposalId : String , @RequestBody update : RequestProposalDTO) : ResponseEntity<RequestProposalDTO> {
        val updatedRequestProposal = requestProposalService.updateRequestProposal(requestProposalId, update ) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedRequestProposal)
    }

    @DeleteMapping("/{id}")
    fun deleteRequestProposal(@PathVariable id: String):ResponseEntity<Any>{
        return requestProposalService.deleteRequestProposal(id)
    }

    @GetMapping("/{id}")
    fun getRequestProposal(@PathVariable id: String): ResponseEntity<RequestProposalDTO>{
        val requestProposal = requestProposalService.findRequestProposalById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(requestProposal)
    }

    @GetMapping("")
    fun getAll(): ResponseEntity<List<RequestProposalDTO>>{
        val requestProposals = requestProposalService.findAllRequestProposals()
        return ResponseEntity.ok(requestProposals)
    }

    @GetMapping("/byStudent/{id}")
    fun getAllByStudentId(@PathVariable id: String) : ResponseEntity<Any>{
        return requestProposalService.findAllRequestProposalsByStudent(id)
    }

    @GetMapping("/byProfessor/{id}")
    fun getAllByProfessorId(@PathVariable id: String) : ResponseEntity<Any>{
        return requestProposalService.findAllRequestProposalsByProfessor(id)
    }

    @PutMapping("/bySecretary/accept/{id}")
    fun acceptRequestProposalBySecretary(@PathVariable id: String): ResponseEntity<Any> {
        return requestProposalService.acceptRequestProposalBySecretary(id)
    }

    @PutMapping("/bySecretary/reject/{id}")
    fun rejectRequestProposalBySecretary(@PathVariable id: String): ResponseEntity<Any> {
        return requestProposalService.rejectRequestProposalBySecretary(id)
    }

    @PutMapping("/bySupervisor/accept/{id}")
    fun acceptRequestProposalBySupervisor(@PathVariable id: String): ResponseEntity<Any> {
        return requestProposalService.acceptRequestProposalBySupervisor(id)
    }

    @PutMapping("/bySupervisor/reject/{id}")
    fun rejectRequestProposalBySupervisor(@PathVariable id: String): ResponseEntity<Any> {
        return requestProposalService.rejectRequestProposalBySupervisor(id)
    }

    @PostMapping("/requestOfChangeByProfessor/{professorId}/{proposalId}")
    fun requestOfChangeByProfessor(@PathVariable professorId: String, @PathVariable proposalId: String, @RequestBody message : MessageFromProfessorDTO): ResponseEntity<Any> {
        return requestProposalService.requestOfChangeByProfessor(professorId, proposalId, message)
    }

    @GetMapping("/ongoingRequestProposals")
    fun getAllOngoingRequests(@AuthenticationPrincipal jwt: Jwt): ResponseEntity<Any>{
        return try {
            val userId: String = jwt.getClaimAsString("preferred_username").split("@")[0] ?: "Unknown"
            val realmAccess = jwt.claims["realm_access"] as? Map<String, Any>
            val roles = realmAccess?.get("roles") as? List<String> ?: emptyList()
            val requestProposals = requestProposalService.getAllOngoingRequestsByProfessorId(userId)
            ResponseEntity.ok(requestProposals)
        } catch (ex: Exception){
            ResponseEntity.badRequest().build()
        }
    }
}
