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
        var company: String,
        var description: String,
        var level : String,
        var creationDate: LocalDate = LocalDate.now(),
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
            company = this.company,
            description = this.description,
            level = this.level,
            creationDate = this.creationDate,
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