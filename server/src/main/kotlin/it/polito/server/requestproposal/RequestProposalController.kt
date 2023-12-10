package it.polito.server.requestproposal


import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/API/requestProposals")
class RequestProposalController (private val requestProposalService: RequestProposalService){

    @PostMapping("")
    fun createRequestProposal(@RequestBody requestProposal: RequestProposalDTO): ResponseEntity<Any> {
        if (requestProposalService.existsByTitleAndStudentId(requestProposal.title, requestProposal.studentId))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Proposal with same Title and Student already in the database")
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

    @GetMapping("byStudentId")
    fun getAllByStudentId(@PathVariable studentId: String) : ResponseEntity<Any>{
        return requestProposalService.findAllRequestProposalsByStudent(studentId)
    }

    @PutMapping("/accept/{id}/")
    fun acceptRequestProposal(@PathVariable id: String): ResponseEntity<Any> {
        return requestProposalService.acceptRequestProposal(id)
    }

    @PutMapping("/reject/{id}")
    fun rejectRequestProposal(@PathVariable id: String): ResponseEntity<Any> {
        return requestProposalService.rejectRequestProposal(id)
    }

}