package it.polito.server.appliedproposal

import it.polito.server.proposal.Proposal
import it.polito.server.proposal.ProposalDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/API/appliedProposal")
class AppliedProposalController(private val appliedProposalService: AppliedProposalService) {

    @GetMapping("/{id}")
    fun getAppliedProposal(@PathVariable id: String): ResponseEntity<AppliedProposalDTO>{
        val appliedproposal = appliedProposalService.findAppliedProposalById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(appliedproposal)
    }

    @GetMapping("")
    fun getAll(): ResponseEntity<List<AppliedProposalDTO>>{
        val appliedproposals = appliedProposalService.findAll()
        return ResponseEntity.ok(appliedproposals)
    }

    @DeleteMapping("/{id}")
    fun deleteAppliedProposal(@PathVariable id: String):ResponseEntity<Void>{
        appliedProposalService.deleteAppliedProposal(id)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/apply/{proposalId}/{studentId}")
    fun createApplyForProposal(@PathVariable proposalId: String, @PathVariable studentId: String) : ResponseEntity<String> {

        val appliedProposalDTO = appliedProposalService.applyForProposal(proposalId,studentId)

        return if (appliedProposalDTO != null){
            ResponseEntity.ok("Application successful")
        } else{
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Student has already applied for this proposal")
        }
    }

    @GetMapping("/{studentId}")
    fun getAppliedProposalByStudent (@PathVariable studentId: String) : ResponseEntity<List<AppliedProposalDTO>> {
        val appliesByStudent = appliedProposalService.appliesByStudent(studentId)
        return ResponseEntity.ok(appliesByStudent)
    }

    @PutMapping("/accept/{id}")
    fun acceptProposal(@PathVariable id: String): ResponseEntity<Void>{
        appliedProposalService.findAppliedProposalById(id) ?: return ResponseEntity<Void>(HttpStatus.NOT_FOUND)
        appliedProposalService.acceptProposal(id)
        return ResponseEntity.ok().build()
    }

    @PutMapping("/reject/{id}")
    fun rejectProposal(@PathVariable id: String): ResponseEntity<Void>{
        appliedProposalService.findAppliedProposalById(id) ?: return ResponseEntity<Void>(HttpStatus.NOT_FOUND)
        appliedProposalService.rejectProposal(id)
        return ResponseEntity.ok().build()
    }
}