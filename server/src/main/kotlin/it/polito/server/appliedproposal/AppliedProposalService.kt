package it.polito.server.appliedproposal

import it.polito.server.proposal.ProposalRepository
import it.polito.server.student.StudentRepository
import org.springframework.stereotype.Service

@Service
class AppliedProposalService(private val appliedProposalRepository: AppliedProposalRepository, private val proposalRepository : ProposalRepository, private val studentRepository: StudentRepository) {

    fun createAppliedProposal(appliedProposal: AppliedProposal): AppliedProposalDTO {
        val savedAppliedProposal = appliedProposalRepository.save(appliedProposal)
        return savedAppliedProposal.toDTO()
    }

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

            val appliedProposal = AppliedProposal(proposalId = proposalId, studentId = studentId)
            appliedProposalRepository.save(appliedProposal)

            return  appliedProposal.toDTO()
        }
        else
            return null
    }

    fun appliesByStudent(studentId: String): List<AppliedProposalDTO> {
        return appliedProposalRepository.findByStudentId(studentId).map { it.toDTO() }
    }
}