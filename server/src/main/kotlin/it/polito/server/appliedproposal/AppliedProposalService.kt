package it.polito.server.appliedproposal

import it.polito.server.career.CareerRepository
import it.polito.server.professor.ProfessorRepository
import it.polito.server.proposal.*
import it.polito.server.student.StudentRepository
import org.springframework.data.domain.Example
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import kotlin.reflect.jvm.internal.impl.util.ReturnsCheck.ReturnsUnit

@Service
class AppliedProposalService(
    private val appliedProposalRepository: AppliedProposalRepository,
    private val proposalRepository : ProposalRepository,
    private val studentRepository: StudentRepository,
    private val careerRepository: CareerRepository,
    private val professorRepository: ProfessorRepository,
    private val proposalService: ProposalService,
) {

    fun findAppliedProposalById(id: String): AppliedProposalDTO? {
        //return application if exists or null
        return appliedProposalRepository.findById(id).map(AppliedProposal::toDTO).orElse(null)
    }

    fun findAll() : List<AppliedProposalDTO> {
        //return list of application (in case nothing exists yet empty list)
        return appliedProposalRepository.findAll().map{ (it.toDTO())}
    }

    fun deleteAppliedProposal(id: String) : ResponseEntity<Any> {

        //check if the application exists and return NOT_FOUND
        if (!appliedProposalRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this Application does NOT EXIST")

        appliedProposalRepository.deleteById(id)
        return ResponseEntity.status(HttpStatus.OK).body("Application with ID $id successfully deleted.")
    }

    fun applyForProposal(proposalId: String, studentId: String) : ResponseEntity<Any> {

        val proposal = proposalRepository.findById(proposalId)
        val student = studentRepository.findById(studentId)

        //check if Proposal exists or return ERROR
        if(!proposal.isPresent)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (PROPOSAL NOT PRESENT in the database).")
        //check if Student exists or return ERROR
        if(!student.isPresent)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (STUDENT NOT PRESENT in the database).")
        //check if this application already exists
        val existingApplication = appliedProposalRepository.findByProposalIdAndStudentId(proposalId,studentId)
        if(existingApplication != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (APPLICATION ALREADY EXISTS).")

        //create new application,save it and return the DTO
        val application = AppliedProposal(proposalId = proposalId, studentId = studentId)
        val appliedProposal = appliedProposalRepository.save(application)
        return  ResponseEntity.ok(appliedProposal.toDTO())

    }

    fun appliesByStudentId(studentId: String): ResponseEntity<Any> {
        //check if student exists
        val student = studentRepository.findById(studentId)
        if(student.isEmpty)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this student NOT EXISTS")

        //return only list applications with that proposal(even empty)
        val appliesByStudentDTOs = appliedProposalRepository.findByStudentId(studentId).map { it.toDTO() }
        return ResponseEntity.ok(appliesByStudentDTOs)
    }

    fun appliesByProposalId(proposalId: String): ResponseEntity<Any> {
        //check if Proposal exists
        val proposal = proposalRepository.findById(proposalId)
        if(proposal.isEmpty)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Proposal NOT EXISTS")

        //return only list applications with that proposal(even empty)
        val appliesByProposalDTOs = appliedProposalRepository.findByProposalId(proposalId).map { it.toDTO() }
        return ResponseEntity.ok(appliesByProposalDTOs)
    }

    fun acceptProposal(applicationId: String) : ResponseEntity <Any> {
        val appliedProposal = appliedProposalRepository.findById(applicationId).orElse(null)
        //check if it exists
        if(appliedProposal == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Application NOT EXIST")

        //check if proposal already ARCHIVED
        val proposal: Proposal? = proposalRepository.findById(appliedProposal.proposalId).orElse(null)
        if(proposal?.archived == archiviation_type.MANUALLY_ARCHIVED || proposal?.archived == archiviation_type.EXPIRED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Proposal has already been ARCHIVED ")

        //check if it already ACCEPTED
        if(appliedProposal.status==ApplicationStatus.ACCEPTED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been ACCEPTED")
        //check if it already REJECTED
        if(appliedProposal.status==ApplicationStatus.REJECTED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been REJECTED")
        //check if it already CANCELLED
        if(appliedProposal.status==ApplicationStatus.CANCELLED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been CANCELLED")


        //FIND and REJECT all applications given the proposalId
        val applicationsToReject = appliedProposalRepository.findByProposalId(appliedProposal.proposalId);
        applicationsToReject.map { applicationToReject->
            if (applicationToReject.status==ApplicationStatus.PENDING){
                appliedProposalRepository.save(applicationToReject.copy(status = ApplicationStatus.CANCELLED))
            }
        }
        //ONLY ACCEPTED this application
        appliedProposalRepository.save(appliedProposal.copy(status = ApplicationStatus.ACCEPTED))

        //SETS the PROPOSAL as MANUALLY_ARCHIVED
        proposalService.manuallyArchivedProposal(appliedProposal.proposalId)

        return ResponseEntity.ok().body("Successful operation")
    }

    fun rejectProposal(applicationId: String) : ResponseEntity <Any> {
        val appliedProposal = appliedProposalRepository.findById(applicationId).orElse(null)

        //check if it exists
        if(appliedProposal == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Application NOT EXIST")

        //check if proposal already ARCHIVED
        val proposal: Proposal? = proposalRepository.findById(appliedProposal.proposalId).orElse(null)
        if(proposal?.archived == archiviation_type.MANUALLY_ARCHIVED || proposal?.archived == archiviation_type.EXPIRED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Proposal has already been ARCHIVED ")

        //check if it already ACCEPTED
        if(appliedProposal.status==ApplicationStatus.ACCEPTED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been ACCEPTED")
        //check if it already REJECTED
        if(appliedProposal.status==ApplicationStatus.REJECTED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been REJECTED")
        //check if it already CANCELLED
        if(appliedProposal.status==ApplicationStatus.CANCELLED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been CANCELLED")

        //ONLY REJECTED this application
        appliedProposalRepository.save(appliedProposal.copy(status = ApplicationStatus.REJECTED))

        return ResponseEntity.ok().body("Successful operation")
    }

    fun findByFilters (supervisorId : String) : HashMap<String, List<Any>> {
        val resMap = HashMap<String, List<Any>>()

        val interestingProposals = proposalRepository.findBySupervisor(supervisorId).map { it.toDTO() }
        interestingProposals.filter { appliedProposalRepository.existsAppliedProposalByProposalId(it.supervisor) }

        interestingProposals.forEach {
            val proposalId = it.id
            val applications = it.id?.let { it1 -> appliedProposalRepository.findByProposalId(it1).map { it.toDTO() } }
            if (applications != null && proposalId != null) {
                val mixedList = listOf(it) + applications
                resMap.put( proposalId , mixedList)
            }
        }
        return resMap
    }

    fun findByProfessor(professorId: String) : List<StrangeObjectRequestedByDarione>{
        val proposals = proposalRepository.findBySupervisor(professorId);
        return proposals.map { proposal->
            println(proposal)
            println(proposal.id!!)
            val appliedProposals = appliedProposalRepository.findByProposalId(proposal.id!!).map { it.toDTO() }
            println(appliedProposals)
            val listApplications = appliedProposals.map { appliedProposal->
                val student = studentRepository.findById(appliedProposal.studentId).map { it.toDTO() }.get()
                println(student)
                val listExams = careerRepository.findByStudentId(student.id!!).map { it.toDTO() }
                return@map Applications(
                    appliedProposal.id,
                    appliedProposal.proposalId,
                    Student(
                        student.id,
                        student.surname,
                        student.name,
                        student.gender,
                        student.nationality,
                        student.email,
                        student.codDegree,
                        student.enrollmentYear,
                        listExams
                    ),
                    appliedProposal.status
                )
            }
            val nameSupervisor = professorRepository.findById(proposal.supervisor)
            /*
            val coSup = proposal.coSupervisors.map { it ->
                val prof = professorRepository.findById(it).get();
                return@map "${prof.name} ${prof.surname}"
            }

             */
            return@map StrangeObjectRequestedByDarione(
                proposal.id,
                proposal.title,
                "${nameSupervisor.get().name} ${nameSupervisor.get().surname}",
                proposal.coSupervisors,
                proposal.keywords,
                proposal.type,
                proposal.groups,
                proposal.description,
                proposal.requiredKnowledge,
                proposal.notes,
                proposal.expiration,
                proposal.level,
                proposal.cdS,
                proposal.archived,
                listApplications
            )
        }
    }
}
