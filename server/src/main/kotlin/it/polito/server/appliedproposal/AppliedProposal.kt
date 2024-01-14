package it.polito.server.appliedproposal

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

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
            status = this.status,
            file = if (this.file != null) FileDTO(this.file, "application_attachment_" + this.studentId, "originalFileName", "application/pdf") else null
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as AppliedProposal

        if (id != other.id) return false
        if (proposalId != other.proposalId) return false
        if (studentId != other.studentId) return false
        if (status != other.status) return false
        if (file != null) {
            if (other.file == null) return false
            if (!file.contentEquals(other.file)) return false
        } else if (other.file != null) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id?.hashCode() ?: 0
        result = 31 * result + proposalId.hashCode()
        result = 31 * result + studentId.hashCode()
        result = 31 * result + status.hashCode()
        result = 31 * result + (file?.contentHashCode() ?: 0)
        return result
    }
}

enum class ApplicationStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED
}
