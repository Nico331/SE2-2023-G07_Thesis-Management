class Degree {
    id: string | null;
    codDegree: string;
    titleDegree: string;

    constructor(id: string | null, codDegree: string, titleDegree: string) {
        this.id = id;
        this.codDegree = codDegree;
        this.titleDegree = titleDegree;
    }
}

export default Degree
