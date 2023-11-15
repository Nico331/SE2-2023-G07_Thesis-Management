package it.polito.server.appliedproposal

import it.polito.server.proposal.ProposalDTO
import it.polito.server.proposal.ProposalRepository
import it.polito.server.proposal.ProposalService
import it.polito.server.student.StudentRepository
import org.springframework.data.domain.Example
import org.springframework.stereotype.Service

@Service
class AppliedProposalService(private val appliedProposalRepository: AppliedProposalRepository, private val proposalRepository : ProposalRepository, private val studentRepository: StudentRepository) {

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
}