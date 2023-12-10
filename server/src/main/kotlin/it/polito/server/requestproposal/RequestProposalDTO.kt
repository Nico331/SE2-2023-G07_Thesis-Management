package it.polito.server.requestproposal

import java.time.LocalDate

data class RequestProposalDTO (
        val id: String? = null,
        var title: String,
        var studentId: String,
        var supervisorId: String,
        var coSupervisors: List<String>,
        var company: String,
        var description: String,
        var level : String,
        var creationDate: LocalDate = LocalDate.now(),
        var acceptanceDate: LocalDate?= null,
        val status: RequestProposalStatus = RequestProposalStatus.PENDING
){
    fun toDBObj () : RequestProposal = RequestProposal(
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
            status = this.status,
    )
}