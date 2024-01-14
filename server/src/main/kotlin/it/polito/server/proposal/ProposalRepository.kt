package it.polito.server.proposal

import org.springframework.data.mongodb.repository.MongoRepository
import java.time.LocalDate

interface ProposalRepository : MongoRepository<Proposal, String> {

    fun findBySupervisor (supervisor: String) : List<Proposal>
    fun existsProposalByTitleAndSupervisor(proposalTitle: String, proposalSupervisor: String): Boolean
    fun findByExpirationIsBefore (actualDate : LocalDate ) : List<Proposal>
    fun findByExpirationIsGreaterThanEqual (actualDate: LocalDate) : List<Proposal>
    fun findByArchived (archiviationType: archiviation_type) : List<Proposal>
    fun findByCoSupervisors(coSupervisor: String): List<Proposal>
}
