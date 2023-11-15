import React, {useEffect, useState} from "react";
import StudentService from "../../services/StudentService";
import StudentForm from "./StudentForm";

function NewStudent() {
    const [students, setStudents] = useState([]);

    const refreshStudents = async () => {
        const response = await StudentService.fetchAllStudents();
        setStudents(response.data);
    };

    useEffect(() => {
        refreshStudents();
    }, []);

    return (
        <div className="App">
            <h1>Students</h1>
            <StudentForm studentId={null} refreshStudents={refreshStudents} />
        </div>
    );
}

export default NewStudent
