import React, { useState } from 'react';
import StudentService from '../../services/StudentService';
import { Form, Button } from 'react-bootstrap';

function StudentForm({ studentId, refreshStudents }) {
    const [studentData, setStudentData] = useState({
        surname: '',
        name: '',
        gender: '',
        nationality: '',
        email: '',
        codDegree: '',
        enrollmentYear: '',
    });

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (studentId) {
            await StudentService.updateStudent(studentId, studentData);
        } else {
            await StudentService.createStudent(studentData);
        }
        refreshStudents();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group id="formSurname">
                <Form.Control
                    type="text"
                    name="surname"
                    value={studentData.surname}
                    onChange={handleChange}
                    placeholder="Cognome"
                    required
                />
            </Form.Group>

            <Form.Group id="formName">
                <Form.Control
                    type="text"
                    name="name"
                    value={studentData.name}
                    onChange={handleChange}
                    placeholder="Nome"
                    required
                />
            </Form.Group>

            <Form.Group id="formGender">
                <Form.Control
                    as="select"
                    name="gender"
                    value={studentData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleziona genere</option>
                    <option value="maschio">Maschio</option>
                    <option value="femmina">Femmina</option>
                    <option value="altro">Altro</option>
                </Form.Control>
            </Form.Group>

            <Form.Group id="formNationality">
                <Form.Control
                    type="text"
                    name="nationality"
                    value={studentData.nationality}
                    onChange={handleChange}
                    placeholder="Nazionalità"
                    required
                />
            </Form.Group>

            <Form.Group id="formEmail">
                <Form.Control
                    type="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
            </Form.Group>

            <Form.Group id="formCodDegree">
                <Form.Control
                    type="text"
                    name="codDegree"
                    value={studentData.codDegree}
                    onChange={handleChange}
                    placeholder="Codice Corso di Laurea"
                    required
                />
            </Form.Group>

            <Form.Group id="formEnrollmentYear">
                <Form.Control
                    type="number"
                    name="enrollmentYear"
                    value={studentData.enrollmentYear}
                    onChange={handleChange}
                    placeholder="Anno di immatricolazione"
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Salva
            </Button>
        </Form>
    );
}

export default StudentForm;
