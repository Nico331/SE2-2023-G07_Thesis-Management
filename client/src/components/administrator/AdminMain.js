import React, { useEffect, useState} from "react";
import StudentList from "./StudentList";
import StudentService from "../../services/StudentService";

function AdminMain() {
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
            <StudentList students={students} refreshStudents={refreshStudents} />
        </div>
    );
}

export { AdminMain }