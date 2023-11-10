package it.polito.server.proposal

import org.springframework.data.mongodb.repository.MongoRepository

interface ProposalRepository : MongoRepository<Proposal, String> {
    fun findByArchivedFalseAndSupervisor(supervisor: String) : List<Proposal>

}