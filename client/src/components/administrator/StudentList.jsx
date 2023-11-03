import React from 'react';
import StudentService from '../../services/StudentService';

function StudentList({ students, refreshStudents }) {
    const handleDelete = async (id) => {
        await StudentService.deleteStudent(id);
        refreshStudents();
    };

    return (
        <ul>
            {students.map(student => (
                <li key={student.id}>
                    {student.name} {student.surname}
                    <button onClick={() => handleDelete(student.id)}>Elimina</button>
                </li>
            ))}
        </ul>
    );
}

export default StudentList;
