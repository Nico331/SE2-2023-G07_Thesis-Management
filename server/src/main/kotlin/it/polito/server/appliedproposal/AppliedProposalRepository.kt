package it.polito.server.appliedproposal

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.repository.query.QueryByExampleExecutor

interface AppliedProposalRepository : MongoRepository<AppliedProposal,String> {

    fun findByProposalIdAndStudentId(proposalId: String, studentId: String): AppliedProposal?
    fun findByStudentId(studentId: String): List<AppliedProposal>
    fun findByProposalId(proposalId: String): List<AppliedProposal>

    fun existsAppliedProposalByProposalId (proposalId: String) : Boolean


}