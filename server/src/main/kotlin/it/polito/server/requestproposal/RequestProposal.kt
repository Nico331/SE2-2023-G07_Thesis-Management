package it.polito.server.requestproposal

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document
data class RequestProposal(
        @Id val id: String? = null,
        var title: String,
        var studentId: String,
        var supervisorId: String,
        var coSupervisors: List<String>,
        var description: String,
        var acceptanceDate: LocalDate?= null,
        val secretaryStatus: RequestProposalStatus = RequestProposalStatus.PENDING,
        val supervisorStatus: RequestProposalStatus = RequestProposalStatus.PENDING
){

    fun toDTO(): RequestProposalDTO = RequestProposalDTO (
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

enum class RequestProposalStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}