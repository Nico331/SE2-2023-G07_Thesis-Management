import React, {useState} from 'react';
import {Form, Button, Table} from 'react-bootstrap';
import CareerService from "../../services/CareerService";

function StudentApplyForm(props) {
    const [studentData, setStudentData] = useState({
        id: '',
        surname: '',
        name: '',
        gender: '',
        nationality: '',
        email: '',
        codDegree: '',
        enrollmentYear: '',
    });

    //questo deve essere un vettore di oggetti con campi (cod_course, title_course, cfu, grade, date)
    //non so quanto è lungo -> non so quanti esami abbia sostenuto lo studente
    const [studentCareer, setStudentCareer] = useState([]);

    //flag che uso per distinguere due possibili viste: form di inserimento dati oppure riepilogo dati + attach file
    const [showForm, setShowForm] = useState(true);

    const getCareer = async (id) => {
        const response = await CareerService.fetchCareer(id);
        setStudentCareer(response.data);
    }

    const handleChange = (e) => {
        setStudentData({...studentData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //await getCareer(studentData.id);

        //dati statici temporanei, poi va settata con quello che mi restituisce il server nella get subito sopra
        setStudentCareer(
            [
                {codCorso: 'AX345678', titCorso: 'Web Application 1', CFU: '6', voto: '29', data: '01-09-2023'},
                {codCorso: "AY675432", titCorso: "Software Engineering 1", CFU: "8", voto: "30", data: "28-06-2023"}]
        )

        setShowForm(false);
        // poi fai apparire un'altra pagina con le info studente + cv + possibilità di attach file + pulsante submit
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            {showForm ? (
                    <>
                        <h1>Inserisci i tuoi dati:</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formId">
                                <Form.Control
                                    type="number"
                                    name="id"
                                    value={studentData.id}
                                    onChange={handleChange}
                                    placeholder="Matricola"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formSurname">
                                <Form.Control
                                    type="text"
                                    name="surname"
                                    value={studentData.surname}
                                    onChange={handleChange}
                                    placeholder="Cognome"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formName">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={studentData.name}
                                    onChange={handleChange}
                                    placeholder="Nome"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formGender">
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

                            <Form.Group controlId="formNationality">
                                <Form.Control
                                    type="text"
                                    name="nationality"
                                    value={studentData.nationality}
                                    onChange={handleChange}
                                    placeholder="Nazionalità"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={studentData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formCodDegree">
                                <Form.Control
                                    type="text"
                                    name="codDegree"
                                    value={studentData.codDegree}
                                    onChange={handleChange}
                                    placeholder="Codice Corso di Laurea"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEnrollmentYear">
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
                    </>
                )
                :
                (
                    <>
                        <Table striped bordered hover>
                            <caption>Dati studente</caption>
                            <thead>
                            <tr>
                                <th>Matricola</th>
                                <th>Cognome</th>
                                <th>Nome</th>
                                <th>Sesso</th>
                                <th>Nazionalità</th>
                                <th>Email</th>
                                <th>Codice CdS</th>
                                <th>Anno di Immatricolazione</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{studentData.id}</td>
                                <td>{studentData.surname}</td>
                                <td>{studentData.name}</td>
                                <td>{studentData.gender}</td>
                                <td>{studentData.nationality}</td>
                                <td>{studentData.email}</td>
                                <td>{studentData.codDegree}</td>
                                <td>{studentData.enrollmentYear}</td>
                            </tr>
                            </tbody>
                        </Table>

                        <Table striped bordered hover>
                            <caption>Curriculum</caption>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Codice</th>
                                <th>Titolo</th>
                                <th>CFU</th>
                                <th>Voto</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentCareer.map((row, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{row.codCorso}</td>
                                    <td>{row.titCorso}</td>
                                    <td>{row.CFU}</td>
                                    <td>{row.voto}</td>
                                    <td>{row.data}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                        <Form.Group controlId="formFile">
                            <Form.Label>Allega un file (opzionale)</Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>


                    </>
                )}
        </div>


    );
}

export default StudentApplyForm;
