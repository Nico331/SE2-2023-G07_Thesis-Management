package it.polito.server.appliedproposal

data class AppliedProposalDTO (
        val id: String? = null,
        val proposalId: String,
        val studentId: String,
        val status: ApplicationStatus
)