package it.polito.server.proposal

import org.springframework.data.mongodb.repository.MongoRepository
import java.util.*

interface ProposalRepository : MongoRepository<Proposal, String> {
    fun findByArchivedFalseAndSupervisor(supervisor: String) : List<Proposal>

    fun findBySupervisor (supervisor: String) : List<Proposal>
}
