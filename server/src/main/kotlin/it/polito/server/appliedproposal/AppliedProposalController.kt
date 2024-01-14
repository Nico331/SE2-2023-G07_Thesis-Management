package it.polito.server.appliedproposal


import it.polito.server.proposal.archiviation_type
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/API/appliedProposal")
class AppliedProposalController(
    private val appliedProposalService: AppliedProposalService
) {

    @GetMapping("")
    fun getAll(): ResponseEntity<List<AppliedProposalDTO>>{
        val application = appliedProposalService.findAll()
        return ResponseEntity.ok(application)
    }

    @DeleteMapping("/{id}")
    fun deleteAppliedProposal(@PathVariable id: String):ResponseEntity<Any>{
        return appliedProposalService.deleteAppliedProposal(id)
    }

    @PostMapping("/apply/{proposalId}/{studentId}")
    fun createApplyForProposal(@PathVariable proposalId: String, @PathVariable studentId: String, @RequestBody file: FileDTO?) : ResponseEntity<Any> {
        return appliedProposalService.applyForProposal(proposalId,studentId, file)
    }

    @GetMapping("/bystudent/{studentId}")
    fun getAppliedProposalByStudent (@PathVariable studentId: String) : ResponseEntity<Any> {
        return appliedProposalService.appliesByStudentId(studentId)
    }

    @GetMapping("/byproposal/{proposalId}")
    fun getAppliedProposalByProposal (@PathVariable proposalId: String) : ResponseEntity<Any> {
        return appliedProposalService.appliesByProposalId(proposalId)
    }

    @PutMapping("/accept/{id}")
    fun acceptProposal(@PathVariable id: String): ResponseEntity<Any>{
        return appliedProposalService.acceptProposal(id)
    }

    @PutMapping("/reject/{id}")
    fun rejectProposal(@PathVariable id: String): ResponseEntity<Any>{
        return appliedProposalService.rejectProposal(id)
    }

    @PutMapping("/withdraw/{proposalId}")
    fun withdrawProposal(@PathVariable proposalId: String) : ResponseEntity<Any>{
        return appliedProposalService.withdrawProposal(proposalId)
    }

    @GetMapping("/active/{professorId}")
    fun getActiveByProfessorId (@PathVariable professorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByProfessor( professorId, archiviation_type.NOT_ARCHIVED )
        return ResponseEntity.ok(proposalsWithApplications)
    }
    @GetMapping("/archived/{professorId}")
    fun getArchivedByProfessorId (@PathVariable professorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByProfessor( professorId, archiviation_type.EXPIRED, archiviation_type.MANUALLY_ARCHIVED )
        return ResponseEntity.ok(proposalsWithApplications)
    }

    @GetMapping("/active/cosupervisor/{coSupervisorId}")
    fun getActiveByCoSupervisorId (@PathVariable coSupervisorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByCoSupervisor( coSupervisorId, archiviation_type.NOT_ARCHIVED )
        return ResponseEntity.ok(proposalsWithApplications)
    }
    @GetMapping("/archived/cosupervisor/{coSupervisorId}")
    fun getArchivedCoSupervisorId (@PathVariable coSupervisorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByCoSupervisor( coSupervisorId, archiviation_type.EXPIRED, archiviation_type.MANUALLY_ARCHIVED )
        return ResponseEntity.ok(proposalsWithApplications)
    }
}
