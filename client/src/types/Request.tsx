class Request {
    id: string;
    acceptanceDate: string | null;
    coSupervisors: string[];
    description: string;
    secretaryStatus: string;
    studentId: string;
    supervisorId: string;
    supervisorStatus: string;
    title: string;
    constructor(id: string, title: string, supervisorId: string, coSupervisors: string[], description: string, secretaryStatus: string, studentId: string, supervisorStatus: string, acceptanceDate: string | null) {
        this.id = id;
        this.title = title;
        this.supervisorId = supervisorId;
        this.coSupervisors = coSupervisors;
        this.description = description;
        this.secretaryStatus = secretaryStatus;
        this.studentId = studentId;
        this.supervisorStatus = supervisorStatus;
        this.acceptanceDate = acceptanceDate;
    }
}

export default Request
