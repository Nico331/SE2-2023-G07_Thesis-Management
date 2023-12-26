export enum ThesisStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    ACCEPTED = "ACCEPTED"
}

export class Thesis {
    id: string;
    title: string;
    studentId: string;
    supervisorId: string;
    coSupervisors: string[];
    description: string;
    acceptanceDate: string | null;
    secretaryStatus: ThesisStatus;
    supervisorStatus: ThesisStatus;

    constructor(
        id: string,
        title: string,
        studentId: string,
        supervisorId: string,
        coSupervisors: string[],
        description: string,
        acceptanceDate: string | null,
        secretaryStatus: ThesisStatus,
        supervisorStatus: ThesisStatus
    ) {
        this.id = id;
        this.title = title;
        this.studentId = studentId;
        this.supervisorId = supervisorId;
        this.coSupervisors = coSupervisors;
        this.description = description;
        this.acceptanceDate = acceptanceDate;
        this.secretaryStatus = secretaryStatus;
        this.supervisorStatus = supervisorStatus;
    }
}
