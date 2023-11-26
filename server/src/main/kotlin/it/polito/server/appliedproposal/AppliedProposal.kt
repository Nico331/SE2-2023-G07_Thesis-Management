package it.polito.server.appliedproposal

import it.polito.server.proposal.ProposalDTO
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Document
data class AppliedProposal(
        @Id val id: String? = null,
        val proposalId: String,
        val studentId: String,
        var status: ApplicationStatus = ApplicationStatus.PENDING,  //all created applications start with the PENDING state
        val file: ByteArray?
) {


    fun toDTO(): AppliedProposalDTO = AppliedProposalDTO (
            id = this.id,
            proposalId = this.proposalId,
            studentId = this.studentId,
            status = this.status
    )
}

enum class ApplicationStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED
}
