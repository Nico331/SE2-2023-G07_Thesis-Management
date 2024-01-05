package it.polito.server.requestproposal

import java.time.LocalDate

data class RequestProposalDTO (
        val id: String? = null,
        var title: String,
        var studentId: String,
        var supervisorId: String,
        var coSupervisors: List<String>,
        var description: String,
        var acceptanceDate: LocalDate?= null,
        var secretaryStatus: RequestProposalStatus = RequestProposalStatus.PENDING,
        val supervisorStatus: RequestProposalStatus = RequestProposalStatus.PENDING
){
    fun toDBObj () : RequestProposal = RequestProposal(
            id = this.id,
            title = this.title,
            studentId = this.studentId,
            supervisorId = this.supervisorId,
            coSupervisors = this.coSupervisors,
            description = this.description,
            acceptanceDate = this.acceptanceDate,
            secretaryStatus = this.secretaryStatus,
            supervisorStatus = this.supervisorStatus
    )
}

class MessageFromProfessorDTO (
        val message : String
)