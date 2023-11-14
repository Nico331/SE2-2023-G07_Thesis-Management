package it.polito.server.proposal

import it.polito.server.student.StudentDTO
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.util.Date

@RestController
@RequestMapping("/API/proposals")
class ProposalController (private val proposalService: ProposalService){

    @PutMapping("/{id}")
    fun updateProposal (@PathVariable id : String , @RequestBody update : ProposalDTO) : ResponseEntity<ProposalDTO> {
        val updatedProposal = proposalService.updateProposal(id, update ) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedProposal)
    }

    @PostMapping("")
    fun createProposal(@RequestBody proposal: Proposal): ResponseEntity<ProposalDTO> {
        val newProposal = proposalService.createProposal(proposal)
        return ResponseEntity(newProposal, HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getProposal(@PathVariable id: String): ResponseEntity<ProposalDTO>{
        val proposal = proposalService.findProposalById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(proposal)
    }
    @GetMapping("")
    fun getAll(): ResponseEntity<List<ProposalDTO>>{
        val proposals = proposalService.findAll()
        return ResponseEntity.ok(proposals)
    }

    @DeleteMapping("/{id}")
    fun deleteProposal(@PathVariable id: String):ResponseEntity<Void>{
        proposalService.deleteProposal(id)
        return ResponseEntity(HttpStatus.OK)
    }
}
