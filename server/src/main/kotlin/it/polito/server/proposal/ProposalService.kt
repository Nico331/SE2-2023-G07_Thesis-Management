package it.polito.server.proposal

import it.polito.server.student.Student
import it.polito.server.student.StudentDTO
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.*
import kotlin.reflect.full.declaredMemberProperties

@Service
class ProposalService (private val proposalRepository : ProposalRepository ) {

    fun updateProposal(id: String, update: ProposalDTO): ProposalDTO? {
        val proposal = proposalRepository.findById(id).orElse(null) ?: return null

        proposal.title = update.title
        proposal.supervisor = update.supervisor
        proposal.coSupervisors = update.coSupervisors
        proposal.keywords = update.keywords
        proposal.type = update.type
        proposal.groups = update.groups
        proposal.description = update.description
        proposal.requiredKnowledge = update.requiredKnowledge
        proposal.notes = update.notes
        proposal.expiration = update.expiration
        proposal.level = update.level
        proposal.cdS = update.cdS

        val isExpired = false
        proposal.archived = isExpired

        return proposalRepository.save(proposal).toDTO()
    }

    fun createProposal(proposal: ProposalDTO): ProposalDTO {
        val savedProposal = proposalRepository.save(proposal.toDBObj())
        return savedProposal.toDTO()
    }

    fun findProposalById(id: String): ProposalDTO? {
        return proposalRepository.findById(id).map(Proposal::toDTO).orElse(null)
    }
    fun findAll() : List<ProposalDTO> {
        return proposalRepository.findAll().map{(it.toDTO())}
    }

    fun deleteProposal(id: String) {
        return proposalRepository.deleteById(id)
    }

    fun findActiveProposalsBySupervisor(supervisor:String): List<ProposalDTO>{
        return proposalRepository.findByArchivedFalseAndSupervisor(supervisor).map{(it.toDTO())}
    }
}