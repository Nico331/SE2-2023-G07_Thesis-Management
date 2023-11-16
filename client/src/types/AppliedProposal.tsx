enum ApplicationStatus {
    PENDING,
    APPROVED,
    REJECTED
}

class AppliedProposal {
    id: string | null;
    proposalId: string;
    studentId: string;
    status: ApplicationStatus;

    constructor(id: string | null, proposalId: string, studentId: string, status: ApplicationStatus) {
        this.id = id;
        this.proposalId = proposalId;
        this.studentId = studentId;
        this.status = status;
    }
}
export default AppliedProposal
