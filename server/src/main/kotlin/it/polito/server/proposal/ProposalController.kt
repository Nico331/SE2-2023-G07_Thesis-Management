package it.polito.server.proposal

import it.polito.server.professor.ProfessorRepository
import it.polito.server.professor.ProfessorService
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
    fun createProposal(@RequestBody proposal: ProposalDTO): ResponseEntity<Any> {
        if (proposalService.existsByTitleAndSupervisor(proposal.title, proposal.supervisor))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Proposal with same title and supervisor already in the database")
        val newProposal = proposalService.createProposal(proposal)
        return ResponseEntity(newProposal, HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getProposal(@PathVariable id: String): ResponseEntity<ProposalDTO>{
        //return proposal if exists or null
        val proposal = proposalService.findProposalById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(proposal)
    }
    @GetMapping("")
    fun getAll(): ResponseEntity<List<ProposalDTO>>{
        val proposals = proposalService.findAll()
        return ResponseEntity.ok(proposals)
    }

    @DeleteMapping("/{id}")
    fun deleteProposal(@PathVariable id: String):ResponseEntity<Any>{
        return proposalService.deleteProposal(id)
    }

    @GetMapping("/bysupervisor/{supervisor}")
    fun getActiveProposalsBySupervisor(@PathVariable supervisor: String): ResponseEntity<Any> {
        //return only ACTIVE proposal by supervisor or NOT_FOUND(if the supervisor doesn't exist) or BAD_REQUEST (if supervisor hasn't proposals)
        return proposalService.findActiveProposalsBySupervisor(supervisor)
    }

    @GetMapping("/filters")
    fun getProposals(@RequestParam(required = false) filters: Map<String, String>,
                     @RequestParam(required = false) search: String?): ResponseEntity<List<ProposalDTO>> {
        return ResponseEntity.ok(proposalService.getProposalsWithFilters(filters, search))
    }

    @PostMapping("/manuallyarchived/{id}")
    fun setManuallyArchivedProposal(@PathVariable id: String): ResponseEntity<Any> {
        return proposalService.manuallyArchivedProposal(id)
    }

}

