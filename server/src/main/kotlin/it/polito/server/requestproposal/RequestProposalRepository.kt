package it.polito.server.requestproposal

import org.springframework.data.mongodb.repository.MongoRepository


interface RequestProposalRepository : MongoRepository<RequestProposal,String> {

    fun existsRequestProposalByTitleAndStudentId(requestProposalTitle: String , requestProposalStudentId: String) : Boolean
    fun existsRequestProposalByStudentId(requestProposalStudentId: String) : Boolean
    fun findByStudentId (studentId: String) : List<RequestProposal>
    fun findBySupervisorIdOrCoSupervisorsContaining(supervisorId: String): List<RequestProposal>
    fun findAllBySupervisorIdAndSupervisorStatusAndSecretaryStatus(
        supervisorId: String,
        supervisorStatus: RequestProposalStatus,
        secretaryStatus: RequestProposalStatus
    ): List<RequestProposal>
}
