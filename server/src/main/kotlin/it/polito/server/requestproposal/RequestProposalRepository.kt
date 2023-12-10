package it.polito.server.requestproposal

import org.springframework.data.mongodb.repository.MongoRepository


interface RequestProposalRepository : MongoRepository<RequestProposal,String> {

    fun existsRequestProposalByTitleAndStudentId(requestProposalTitle: String , requestProposalStudentId: String) : Boolean
    fun findByStudentId (studentId: String) : List<RequestProposal>

}