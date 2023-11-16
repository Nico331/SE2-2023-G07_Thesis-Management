class Professor {
    id: string | null;
    name: string;
    surname: string;
    email: string;
    codGroup: string;
    codDepartment: string;

    constructor(id: string | null, name: string, surname: string, email: string, codGroup: string, codDepartment: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.codGroup = codGroup;
        this.codDepartment = codDepartment;
    }
}

export default Professor
