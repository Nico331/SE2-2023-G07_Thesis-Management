package it.polito.server.proposal

import org.springframework.data.mongodb.repository.MongoRepository
import java.util.*

interface ProposalRepository : MongoRepository<Proposal, String> {
    fun findByArchivedFalseAndSupervisor(supervisor: String) : List<Proposal> //returns list of active applications of that supervisor

    fun findBySupervisor (supervisor: String) : List<Proposal>
    fun existsProposalByTitleAndSupervisor(proposalTitle: String, proposalSupervisor: String): Boolean
}
