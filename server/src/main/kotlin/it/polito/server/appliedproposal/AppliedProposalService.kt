package it.polito.server.appliedproposal

import it.polito.server.career.CareerRepository
import it.polito.server.proposal.ProposalDTO
import it.polito.server.proposal.ProposalRepository
import it.polito.server.proposal.ProposalService
import it.polito.server.student.StudentRepository
import org.springframework.data.domain.Example
import org.springframework.stereotype.Service

@Service
class AppliedProposalService(
    private val appliedProposalRepository: AppliedProposalRepository,
    private val proposalRepository : ProposalRepository,
    private val studentRepository: StudentRepository,
    private val careerRepository: CareerRepository,
) {

    fun findAppliedProposalById(id: String): AppliedProposalDTO? {
        return appliedProposalRepository.findById(id).map(AppliedProposal::toDTO).orElse(null)
    }

    fun findAll() : List<AppliedProposalDTO> {
        return appliedProposalRepository.findAll().map{ (it.toDTO())}
    }

    fun deleteAppliedProposal(id: String) {
        return appliedProposalRepository.deleteById(id)
    }

    fun applyForProposal(proposalId: String, studentId: String) : AppliedProposalDTO? {
        val proposal = proposalRepository.findById(proposalId)
        val student = studentRepository.findById(studentId)

        if(proposal.isPresent && student.isPresent){
            val existingApplication = appliedProposalRepository.findByProposalIdAndStudentId(proposalId,studentId)
            if(existingApplication != null){
                return null
            }

            val application = AppliedProposal(proposalId = proposalId, studentId = studentId)
            val appliedProposal = appliedProposalRepository.save(application)

            return  appliedProposal.toDTO()
        }
        else
            return null
    }

    fun appliesByStudent(studentId: String): List<AppliedProposalDTO> {
        return appliedProposalRepository.findByStudentId(studentId).map { it.toDTO() }
    }

    fun acceptProposal(applicationId: String) {
        val appliedProposal = appliedProposalRepository.findById(applicationId).orElse(null)

        appliedProposal.status = ApplicationStatus.APPROVED
        appliedProposalRepository.save(appliedProposal)
    }

    fun rejectProposal(applicationId: String) {
        val appliedProposal = appliedProposalRepository.findById(applicationId).orElse(null)

        appliedProposal.status = ApplicationStatus.REJECTED
        appliedProposalRepository.save(appliedProposal)
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
            return@map StrangeObjectRequestedByDarione(
                proposal.id,
                proposal.title,
                proposal.supervisor,
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
