package it.polito.server.appliedproposal

import it.polito.server.email.EmailService
import it.polito.server.professor.Professor
import it.polito.server.proposal.Proposal
import it.polito.server.proposal.ProposalDTO
import it.polito.server.proposal.ProposalRepository
import it.polito.server.proposal.archiviation_type
import it.polito.server.student.StudentRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import kotlin.reflect.jvm.internal.impl.util.ModuleVisibilityHelper.EMPTY

@RestController
@RequestMapping("/API/appliedProposal")
class AppliedProposalController(
    private val appliedProposalService: AppliedProposalService,
    private val proposalRepository : ProposalRepository,
    private val studentRepository: StudentRepository,
) {

    /*@GetMapping("/{id}")
    fun getAppliedProposal(@PathVariable id: String): ResponseEntity<AppliedProposalDTO>{
        val appliedProposal = appliedProposalService.findAppliedProposalById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(appliedProposal)
    }*/

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
    fun createApplyForProposal(@PathVariable proposalId: String, @PathVariable studentId: String, @RequestBody file: FileDTO) : ResponseEntity<Any> {
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
        //appliedProposalService.acceptProposal(id)

        return appliedProposalService.acceptProposal(id)
    }

    @PutMapping("/reject/{id}")
    fun rejectProposal(@PathVariable id: String): ResponseEntity<Any>{
        return appliedProposalService.rejectProposal(id)
        //return ResponseEntity.ok().build()
    }

    /*@GetMapping("/{professorId}/filter")
    fun getByFilters (@PathVariable professorId: String) : ResponseEntity<Any> {
        val filteredApplications = appliedProposalService.findByFilters( professorId )
        return ResponseEntity.ok(filteredApplications)
    }*/

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
}
