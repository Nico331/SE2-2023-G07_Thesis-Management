package it.polito.server.proposal

import it.polito.server.externalcosupervisor.ExternalCoSupervisor
import it.polito.server.professor.ProfessorRepository
import it.polito.server.professor.ProfessorService
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.util.Date

@RestController
@RequestMapping("/API/proposals")
class ProposalController (private val proposalService: ProposalService){

    @PostMapping("")
    fun createProposal(@RequestBody proposal: ProposalDTO): ResponseEntity<Any> {
        /*if (proposalService.existsByTitleAndSupervisor(proposal.title, proposal.supervisor))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Proposal with same title and supervisor already in the database")*/
        val newProposal = proposalService.createProposal(proposal)
        return ResponseEntity(newProposal, HttpStatus.CREATED)
    }

    @PutMapping("/manuallyarchived/{id}")
    fun setManuallyArchivedProposal(@PathVariable id: String): ResponseEntity<Any> {
        return proposalService.manuallyArchivedProposal(id)
    }

    @PutMapping("/{proposalId}")
    fun updateProposal (@PathVariable proposalId : String , @RequestBody update : ProposalDTO) : ResponseEntity<ProposalDTO> {
        val updatedProposal = proposalService.updateProposal(proposalId, update ) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedProposal)
    }

    @GetMapping("")
    fun getAll(): ResponseEntity<List<ProposalDTO>>{
        val proposals = proposalService.findAll()
        return ResponseEntity.ok(proposals)
    }
    @GetMapping("/student/{studentid}")
    fun getAllByStudent( @PathVariable studentid : String ): ResponseEntity<List<ProposalDTO>>{
        val proposals = proposalService.findActiveByStudent( studentid )
        return ResponseEntity.ok(proposals)
    }

    @GetMapping("/{id}")
    fun getProposal(@PathVariable id: String): ResponseEntity<ProposalDTO>{
        //return proposal if exists or null
        val proposal = proposalService.findProposalById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(proposal)
    }

    @GetMapping("/bysupervisor/{supervisor}")
    fun getActiveProposalsBySupervisor(@PathVariable supervisor: String): ResponseEntity<Any> {
        //return only ACTIVE proposal by supervisor or NOT_FOUND(if the supervisor doesn't exist) or BAD_REQUEST (if supervisor hasn't proposals)
        return proposalService.findActiveProposalsBySupervisor(supervisor)
    }

    @GetMapping("/bysupervisor/archived/{supervisor}")
    fun getArchivedProposalsBySupervisor(@PathVariable supervisor: String): ResponseEntity<Any> {
        //return only ARCHIVED proposal by supervisor or NOT_FOUND(if the supervisor doesn't exist) or BAD_REQUEST (if supervisor hasn't proposals)
        return proposalService.findArchivedProposalsBySupervisor(supervisor)
    }

    @GetMapping("/byCoSupervisor/{coSupervisor}")
    fun getProposalsByCoSupervisor(@PathVariable coSupervisor: String): ResponseEntity<Any> {
       //return ALL PROPOSAL by CoSupervisor
        return proposalService.findProposalsByCoSupervisor(coSupervisor)
    }



    @GetMapping("/filters")
    fun getProposals(@RequestParam(required = false) filters: Map<String, String>,
                     @RequestParam(required = false) search: String?): ResponseEntity<List<ProposalDTO>> {
        return ResponseEntity.ok(proposalService.getProposalsWithFilters(filters, search))
    }

    @DeleteMapping("/{id}")
    fun deleteProposal(@PathVariable id: String):ResponseEntity<Any>{
        return proposalService.deleteProposal(id)
    }

}

