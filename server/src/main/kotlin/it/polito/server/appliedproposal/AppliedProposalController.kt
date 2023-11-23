package it.polito.server.appliedproposal

import it.polito.server.professor.Professor
import it.polito.server.proposal.Proposal
import it.polito.server.proposal.ProposalDTO
import it.polito.server.proposal.ProposalRepository
import it.polito.server.student.StudentRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import kotlin.reflect.jvm.internal.impl.util.ModuleVisibilityHelper.EMPTY

@RestController
@RequestMapping("/API/appliedProposal")
class AppliedProposalController(private val appliedProposalService: AppliedProposalService, private val proposalRepository : ProposalRepository, private val studentRepository: StudentRepository) {

    /*@GetMapping("/{id}")
    fun getAppliedProposal(@PathVariable id: String): ResponseEntity<AppliedProposalDTO>{
        val appliedproposal = appliedProposalService.findAppliedProposalById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(appliedproposal)
    }*/

    @GetMapping("")
    fun getAll(): ResponseEntity<List<AppliedProposalDTO>>{
        val appliedproposals = appliedProposalService.findAll()
        return ResponseEntity.ok(appliedproposals)
    }

    @DeleteMapping("/{id}")
    fun deleteAppliedProposal(@PathVariable id: String):ResponseEntity<Any>{
        val appliedProposal = appliedProposalService.findAppliedProposalById(id)
        if(appliedProposal == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR, this Application does NOT EXIST")

        appliedProposalService.deleteAppliedProposal(id)
        val successMessage = "Application with ID $id successfully deleted."
        return ResponseEntity.status(HttpStatus.OK).body(successMessage)
    }

    @PostMapping("/apply/{proposalId}/{studentId}")
    fun createApplyForProposal(@PathVariable proposalId: String, @PathVariable studentId: String) : ResponseEntity<Any> {

        val proposal = proposalRepository.findById(proposalId)
        val student = studentRepository.findById(studentId)
        val appliedProposalDTO = appliedProposalService.applyForProposal(proposalId,studentId)

        return if (appliedProposalDTO != null){
            ResponseEntity.ok(appliedProposalDTO)
        } else{

            if( !proposal.isPresent )
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (PROPOSAL NOT PRESENT in the database).")

            else if( !student.isPresent)
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (STUDENT NOT PRESENT in the database).")
            else
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (APPLICATION ALREADY EXISTS).")
        }
    }

    @GetMapping("/bystudent/{studentId}")
    fun getAppliedProposalByStudent (@PathVariable studentId: String) : ResponseEntity<List<AppliedProposalDTO>> {
        val appliesByStudent = appliedProposalService.appliesByStudentId(studentId)
        return ResponseEntity.ok(appliesByStudent)
    }

    @GetMapping("/byproposal/{proposalId}")
    fun getAppliedProposalByProposal (@PathVariable proposalId: String) : ResponseEntity<List<AppliedProposalDTO>> {
        val appliesByProposal = appliedProposalService.appliesByProposalId(proposalId)
        return ResponseEntity.ok(appliesByProposal)
    }

    @PutMapping("/accept/{id}")
    fun acceptProposal(@PathVariable id: String): ResponseEntity<Any>{
        appliedProposalService.findAppliedProposalById(id) ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR, this Application NOT EXIST")
        appliedProposalService.acceptProposal(id)
        return ResponseEntity.ok().build()
    }

    @PutMapping("/reject/{id}")
    fun rejectProposal(@PathVariable id: String): ResponseEntity<Any>{
        appliedProposalService.findAppliedProposalById(id) ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR, this Application NOT EXIST")
        appliedProposalService.rejectProposal(id)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/{professorId}/filter")
    fun getByFilters (@PathVariable professorId: String) : ResponseEntity<Any> {
        val filteredApplications = appliedProposalService.findByFilters( professorId )
        return ResponseEntity.ok(filteredApplications)
    }
    @GetMapping("/{professorId}")
    fun getByProfessorId (@PathVariable professorId: String) : ResponseEntity<Any> {
        val proposalsWithApplications = appliedProposalService.findByProfessor( professorId )
        return ResponseEntity.ok(proposalsWithApplications)
    }
}
