class Career {
    id: string | null;
    studentId: string;
    codCourse: string;
    titleCourse: string;
    cfu: number;
    grade: number;
    date: string;

    constructor(id: string | null, studentId: string, codCourse: string, titleCourse: string, cfu: number, grade: number, date: string) {
        this.id = id;
        this.studentId = studentId;
        this.codCourse = codCourse;
        this.titleCourse = titleCourse;
        this.cfu = cfu;
        this.grade = grade;
        this.date = date;
    }
}

export default Career
