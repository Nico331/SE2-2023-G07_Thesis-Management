class Student {
    id: string | null;
    surname: string;
    name: string;
    gender: string;
    nationality: string;
    email: string;
    codDegree: string;
    enrollmentYear: number;

    constructor(id: string | null, surname: string, name: string, gender: string, nationality: string, email: string, codDegree: string, enrollmentYear: number) {
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.gender = gender;
        this.nationality = nationality;
        this.email = email;
        this.codDegree = codDegree;
        this.enrollmentYear = enrollmentYear;
    }
}

export default Student
