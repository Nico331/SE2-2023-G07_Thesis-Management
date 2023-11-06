package it.polito.server.proposal

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.*
import kotlin.reflect.full.declaredMemberProperties

@Service
class ProposalService (private val proposalRepository : ProposalRepository ) {

    fun updateProposal (id : String, update : ProposalDTO) : ProposalDTO? {
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

        var isExpired = false
        proposal.archived = isExpired

        return proposalRepository.save(proposal).toDTO()
    }

    fun createProposal (proposal: Proposal) : ProposalDTO {
        val savedProposal = proposalRepository.save(proposal)
        return savedProposal.toDTO()
    }
}