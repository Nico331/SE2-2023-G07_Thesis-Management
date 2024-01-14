package it.polito.server.appliedproposal

import org.springframework.data.mongodb.repository.MongoRepository

interface AppliedProposalRepository : MongoRepository<AppliedProposal,String> {

    fun findByProposalIdAndStudentId(proposalId: String, studentId: String): AppliedProposal? //returns an application that has proposalid and studentd
    fun findByStudentId(studentId: String): List<AppliedProposal> //returns the list of applications for that student
    fun findByProposalId(proposalId: String): List<AppliedProposal> //returns the list of applications for that proposal
    fun existsAppliedProposalByStudentId (studentId: String) : Boolean

}
