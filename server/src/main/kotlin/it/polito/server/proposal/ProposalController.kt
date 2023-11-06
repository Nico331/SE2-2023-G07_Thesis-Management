package it.polito.server.proposal

import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.util.Date

@RestController
@RequestMapping("/API/proposals")
class ProposalController (private val proposalService: ProposalService){

    @PutMapping("/{id}")
    fun updateProposal (@PathVariable id : String , @RequestBody update : ProposalDTO, actualDate: Date) : ResponseEntity<ProposalDTO> {
        val updatedProposal = proposalService.updateProposal(id, update, actualDate ) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedProposal)
    }

}