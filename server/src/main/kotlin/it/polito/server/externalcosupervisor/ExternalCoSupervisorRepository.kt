package it.polito.server.externalcosupervisor

import it.polito.server.proposal.Proposal
import org.springframework.data.mongodb.repository.MongoRepository

interface ExternalCoSupervisorRepository : MongoRepository<ExternalCoSupervisor, String> {

    fun existsByEmail(email: String): Boolean
    fun findByEmail(email: String): ExternalCoSupervisor
}
