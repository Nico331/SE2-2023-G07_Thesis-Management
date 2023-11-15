import React, {useState} from 'react';
import {Form, Button, Table, Container, Navbar, Image} from 'react-bootstrap';
import CareerService from "../../services/CareerService";
import Modal from 'react-bootstrap/Modal';
import {Link, useNavigate} from 'react-router-dom';
import DegreeService from "../../services/DegreeService";
import '../componentsStyle.css'

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
    const [studentDegree, setStudentDegree] = useState({
        codDegree: '',
        titleDegree: ''
    });

    //flag che uso per distinguere due possibili viste: form di inserimento dati oppure riepilogo dati + attach file
    const [showForm, setShowForm] = useState(true);

    //per disabilitare il pulsante Apply mentre sto parlando con il server
    const [isApplying, setIsApplying] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const getCareer = async (id) => {
        const response = await CareerService.fetchCareer(id);
        setStudentCareer(response.data);
    }

    const getDegree = async (codDegree) => {
        const response = await DegreeService.fetchDegree(codDegree);
        setStudentDegree(response.data);
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
                {codCorso: "01PDWOV", titCorso: "Information System", CFU: "6", voto: "27", data: "28-01-2023"},
                {codCorso: "02LSEOV", titCorso: "Computer Architecture", CFU: "10", voto: "26", data: "02-02-2023"},
                {
                    codCorso: 'AX345678',
                    titCorso: 'Data Science and Database Technology',
                    CFU: '8',
                    voto: '24',
                    data: '23-01-2023'
                },
                {
                    codCorso: "01OTWOV",
                    titCorso: "Computer Network Technologies and Services",
                    CFU: "6",
                    voto: "28",
                    data: "06-02-2023"
                },
                {
                    codCorso: "02JEUOV",
                    titCorso: "Formal Languages and Compilers",
                    CFU: "6",
                    voto: "25",
                    data: "01-07-2023"
                },
                {codCorso: "04GSPOV", titCorso: "Software Engineering 1", CFU: "8", voto: "30", data: "28-06-2023"},
                {codCorso: "01TXYOV", titCorso: "Web Application 1", CFU: "6", voto: "29", data: "10-07-2023"},
                {
                    codCorso: "01NYHOV",
                    titCorso: "System and Device Programming",
                    CFU: "10",
                    voto: "26",
                    data: "01-09-2023"
                },
                {codCorso: "02JSKOV", titCorso: "Human Computer Interaction", CFU: "6", voto: "30", data: "28-01-2024"},
                {
                    codCorso: "01TYMOV",
                    titCorso: "Information System Security",
                    CFU: "6",
                    voto: "25",
                    data: "01-02-2024"
                },
                {codCorso: "01SQNOV", titCorso: "Software Engineering 2", CFU: "6", voto: "28", data: "07-02-2024"},
                {codCorso: "01QYDOV", titCorso: "Big data", CFU: "6", voto: "30", data: "29-06-2024"},
                {
                    codCorso: "01PFPOV",
                    titCorso: "Mobile Application Development",
                    CFU: "6",
                    voto: "27",
                    data: "03-07-2024"
                }]
        )
        //stessa cosa di sopra
        //await getDegree(studentData.codDegree);
        setStudentDegree({
                codDegree: "LM-32 (DM270)", titleDegree: "Computer Engineering - Software"
            }
        )

        setShowForm(false);
        // poi fai apparire un'altra pagina con le info studente + cv + possibilità di attach file + pulsante submit
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleApply = async () => {
        setIsApplying(true);

        try {

            //api per fare apply: sarà una post su qualche url tipo application.
            //avrà nel body i dati dello studente, la sua carriera, i dati sul degree
            // e un qualche identificativo della tesi a cui sto facendo l'apply
            const requestData = {
                studentData,
                studentCareer,
            };

            // Aggiungi il file alla richiesta solo se è presente
            if (file) {
                requestData.file = file;
            }

            //const response = await axios.post('url_del_tuo_server', requestData);

            // Esegui altre azioni dopo il successo, se necessario

            setShowModal(true);
        } catch (error) {
            console.error('Errore durante l\'invio al server:', error);
        } finally {
            setIsApplying(false);
        }
    };
    const navigate = useNavigate();
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/proposallist'); // Utilizza il hook useNavigate per il reindirizzamento
    };

    const handleCancel = () => {
        setShowForm(true);
    }
    const handleBack = () => {
        navigate('/proposallist');
    }


    return (
       <>
            <Navbar bg="secondary" fixed="top" variant="dark"  className="navbar-padding">
                <Container>
                    <Link to={"/"}>
                        <Navbar.Brand>
                            <Navbar.Text>
                                <Image style={{ width: 160, height: 40 }} src={"../logo_thesis_management.png"}/>
                            </Navbar.Text>
                        </Navbar.Brand>
                    </Link>
                </Container>
            </Navbar>
           <Container className="content-container">
            {showForm ? (
                    <>
                        <h1>Your data:</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formId">
                                <Form.Control
                                    type="number"
                                    name="id"
                                    value={studentData.id}
                                    onChange={handleChange}
                                    placeholder="Student ID"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formSurname">
                                <Form.Control
                                    type="text"
                                    name="surname"
                                    value={studentData.surname}
                                    onChange={handleChange}
                                    placeholder="Surname"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formName">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={studentData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
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
                                    <option value="">Select you gender</option>
                                    <option value="maschio">Male</option>
                                    <option value="femmina">Female</option>
                                    <option value="altro">Other</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formNationality">
                                <Form.Control
                                    type="text"
                                    name="nationality"
                                    value={studentData.nationality}
                                    onChange={handleChange}
                                    placeholder="Nationality"
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
                                    placeholder="Degree code"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEnrollmentYear">
                                <Form.Control
                                    type="number"
                                    name="enrollmentYear"
                                    value={studentData.enrollmentYear}
                                    onChange={handleChange}
                                    placeholder="Year of enrollment"
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleSubmit}
                                    style={{marginTop: '100px', marginBottom: '10px', marginRight: '20px'}}>
                                Save
                            </Button>

                            <Button variant="secondary" type="button" onClick={handleBack}
                                    style={{marginTop: '100px', marginBottom: '10px'}}>
                                Back to proposal list
                            </Button>
                        </Form>
                    </>
                )
                :
                (
                    <div>
                        <Table striped bordered hover>
                            <caption>Student Data</caption>
                            <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Surname</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Nationality</th>
                                <th>Email</th>
                                <th>Degree code</th>
                                <th>Year of enrollment</th>
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
                                <th>Code</th>
                                <th>Title</th>
                                <th>CFU</th>
                                <th>Vote</th>
                                <th>Date</th>
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

                        <Table striped bordered hover>
                            <caption>Degree info</caption>
                            <thead>
                            <tr>
                                <th>Code</th>
                                <th>Title</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{studentDegree.codDegree}</td>
                                <td>{studentDegree.titleDegree}</td>
                            </tr>
                            </tbody>
                        </Table>

                        <Form.Group controlId="formFile">
                            <Form.Label>Attach a file (optional)</Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={handleApply} disabled={isApplying}
                                style={{marginTop: '10px', marginBottom: '100px', marginRight: '20px'}}>
                            {isApplying ? 'Applying...' : 'Apply'}
                        </Button>


                        <Button variant="secondary" type="button" onClick={handleCancel}
                                style={{marginTop: '10px', marginBottom: '100px'}}>
                            Cancel
                        </Button>


                    </div>
                )}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Application Submitted</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You applied! Thank you for your submission.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

           </Container>
       </>

    );
}

export default StudentApplyForm;
