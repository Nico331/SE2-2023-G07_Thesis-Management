import React, {useContext, useEffect, useState} from 'react';
import {
    Accordion,
    Button,
    Modal,
    Table,
    Row,
    Col,
    Container,
    Form,
    ButtonGroup,
} from 'react-bootstrap';
import {UserContext} from "../../contexts/UserContexts";
import ProfessorService from '../../services/ProfessorService';
import {VirtualClockContext} from "../../contexts/VirtualClockContext";
import RequestProposalService from "../../services/RequestProposalService";
import StudentService from "../../services/StudentService";
import CareerService from "../../services/CareerService"; // Import icons as needed


const BrowseRequests = () => {
    const {refresh, setRefresh} = useContext(VirtualClockContext);

    const {user, setUser} = useContext(UserContext);

    const [professors, setProfessors] = useState([]);

    const [allRequests, setAllRequests] = useState([]);
    const [myRequests, setMyRequests] = useState([])

    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState([]);


    const [showAcceptPopup, setShowAcceptPopup] = useState(false);
    const [requestToAccept, setRequestToAccept] = useState("");

    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState("");

    const [showChangePopup, setShowChangePopup] = useState(false);
    const [requestToChange, setRequestToChange] = useState("");
    const [changeMessage, setChangeMessage] = useState("");

    const [showsuccessmodal, setShowAlertModal] = useState({show: false, text: "", type: ""});

    const [isSupervisor, setIsSupervisor] = useState(false);

    const [filter, setFilter] = useState('all'); // 'all', 'supervisor', 'cosupervisor'

    const [isScreenSmall, setIsScreenSmall] = useState(window.matchMedia('(max-width: 780px)').matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 780px)');

        const handleResize = (event) => {
            setIsScreenSmall(event.matches);
        };

        mediaQueryList.addEventListener('change', handleResize);

        return () => {
            mediaQueryList.removeEventListener('change', handleResize);
        };
    }, []);

    useEffect(() => {
        if (user) {
            RequestProposalService.fetchAllRequestProposals().then((res) => {
                const userId = JSON.parse(user).id;

                const myReq = res.data.filter((req) => {
                    // Verifica se il supervisorId corrisponde all'ID dell'utente
                    const isSupervisor = req.supervisorId === userId;
                    if (isSupervisor)
                        setIsSupervisor(true);

                    // Verifica se almeno uno dei cosupervisori ha l'ID dell'utente
                    const hasCoSupervisor = req.coSupervisors.some(cosupervisor => cosupervisor === userId);

                    // Restituisce true se soddisfa almeno una delle condizioni
                    return isSupervisor || hasCoSupervisor;
                });
                setMyRequests(myReq);

            });
        }
    }, [user, refresh]);

    useEffect(() => {
        ProfessorService.fetchAllProfessors().then((res) => {
            setProfessors(res.data);
        });
    }, [refresh]);

    useEffect(() => {
        StudentService.fetchAllStudents().then((res) => {
            setStudents(res.data);
        });
    }, [refresh]);

    useEffect(() => {
        CareerService.fetchAllCareers().then((res) => {
            setExams(res.data);
        });
    }, [refresh]);

    useEffect(() => {
        if (!showsuccessmodal.show) {
            // Aggiorna la pagina dopo la chiusura del popup di successo
            setRefresh((r) => !r);
        }
    }, [showsuccessmodal.show]);


    const handleSuccess = () => {
        setShowAlertModal({
            show: true,
            type: "success",
            text: "Request accepted"
        });

        // Chiudi automaticamente il popup dopo 3 secondi
        setTimeout(() => {
            setShowAlertModal({
                show: false,
                type: "",
                text: ""
            });
            // Aggiorna la pagina dopo la chiusura del popup di successo
            setRefresh((r) => !r);
        }, 3000);
    };

    const handleAccept = async (applicationId) => {
        setShowAcceptPopup(false);
        setRequestToAccept("");
        await RequestProposalService.acceptRequestProposalProf(applicationId);
        handleSuccess();
    };

    const handleReject = async (applicationId) => {
        setShowRejectPopup(false);
        setRequestToReject("");
        await RequestProposalService.rejectRequestProposalProf(applicationId);
        handleSuccess();
    };

    const handleChange = async (applicationId) => {
        setShowChangePopup(false);
        setRequestToChange("");
        await RequestProposalService.changeRequestProposalProf(applicationId, changeMessage, JSON.parse(user).id);
        handleSuccess();
    };

    const filteredRequests = myRequests.filter((request) => {
        const userId = JSON.parse(user).id;

        // Nuova condizione aggiunta qui
        const isPending = (
            (request.secretaryStatus === 'ACCEPTED' &&
            request.supervisorStatus === 'PENDING')
            ||
            (request.secretaryStatus === 'PENDING' &&
            request.supervisorStatus === 'PENDING')
        );

        if (filter === 'supervisor') {
            return isPending && request.supervisorId === userId;
        } else if (filter === 'cosupervisor') {
            return isPending && request.coSupervisors.includes(userId);
        } else {
            return isPending; // Restituisci solo le richieste con stato 'PENDING'
        }
    });

    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop: "110px"}}>Pending Requests</h2>

                {showsuccessmodal.show ?
                    <>
                        <Modal
                            show={showsuccessmodal.show}
                        >
                            <Modal.Header>
                                <Modal.Title>
                                    {showsuccessmodal.type === "success" ? "Success" : "Error"}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {showsuccessmodal.text}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant={showsuccessmodal.type} onClick={() => setShowAlertModal({
                                    show: false,
                                    type: "",
                                    text: ""
                                })}
                                id="close-btn">Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    : null}
                {/* Aggiungi un toggle button per il filtro */}
                <div className="mt-5">
                    <ButtonGroup>
                        <Button
                            variant={filter === 'all' ? 'primary' : 'secondary'}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'supervisor' ? 'primary' : 'secondary'}
                            onClick={() => setFilter('supervisor')}
                        >
                            Supervisor
                        </Button>
                        <Button
                            variant={filter === 'cosupervisor' ? 'primary' : 'secondary'}
                            onClick={() => setFilter('cosupervisor')}
                        >
                            Cosupervisor
                        </Button>
                    </ButtonGroup>
                </div>

                <Accordion className="mt-5">
                    {
                        filteredRequests.length === 0 ? (
                            <p> You don't have any active requests yet </p>
                        ) : (

                            filteredRequests.map((request) => {
                                    const student = students.find((student) => student.id === request.studentId);
                                    const ex = exams.filter((exam) => student && (exam.studentId === student.id));
                                    return request.supervisorStatus === "PENDING" ? (
                                        <Accordion.Item eventKey={request.id} key={request.id}>
                                            <Accordion.Header>
                                                <Container className={isScreenSmall ? "d-flex flex-column" : "d-flex flex-row"}>
                                                    <Row className={"w-100"}>
                                                        <div className="col-sm-7">
                                                            {request.title}&nbsp;
                                                        </div>
                                                    </Row>
                                                    <Row className={isScreenSmall ? "mt-3 me-5" : "col-sm-4 me-5"}>
                                                        {isSupervisor && request.secretaryStatus === 'ACCEPTED' && (
                                                            <>
                                                                <ButtonGroup>
                                                                    <Button variant="success"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setShowAcceptPopup(true);
                                                                                setRequestToAccept(request.id);
                                                                            }}
                                                                            id="accept-btn">
                                                                        Accept
                                                                    </Button>{' '}
                                                                    <Button variant="secondary"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setShowChangePopup(true);
                                                                                setRequestToChange(request.id);
                                                                            }}
                                                                            id="change-btn">
                                                                        Change request
                                                                    </Button>{' '}
                                                                    <Button variant="danger"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setShowRejectPopup(true);
                                                                                setRequestToReject(request.id);
                                                                            }}
                                                                            id="reject-btn">
                                                                        Reject
                                                                    </Button>
                                                                </ButtonGroup>
                                                            </>

                                                        )

                                                        }
                                                        {
                                                            isSupervisor && request.secretaryStatus === 'PENDING' && (
                                                                <span>Waiting for secretary's approval</span>
                                                            )
                                                        }
                                                        {
                                                            isSupervisor && request.secretaryStatus === 'REJECTED' && (
                                                                <span>Secretary rejected this request</span>
                                                            )
                                                        }
                                                        {!isSupervisor && ( // se non è un supervisor
                                                            <span>You're cosupervisor</span>
                                                        )}
                                                    </Row>
                                                </Container>

                                            </Accordion.Header>
                                            <Accordion.Body style={{textAlign: 'left'}}>
                                                <Row>
                                                    <Col md={6}>
                                                        <b>Request Title:</b> {request.title}
                                                    </Col>
                                                    <Col md={6}>
                                                        <b>Supervisor:</b> {request.supervisorId}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <b>Co-Supervisor: </b>
                                                        {request.coSupervisors.map((coSupervisor) => {
                                                            const matchingProfessor = professors.find((professor) => professor.id === coSupervisor);
                                                            return matchingProfessor ? (
                                                                <span key={coSupervisor}>
                                                        {matchingProfessor.name} {matchingProfessor.surname}, &nbsp;
                                                    </span>
                                                            ) : coSupervisor + ", ";
                                                        })}
                                                    </Col>
                                                    <Col md={6}>
                                                        <b>Description:</b> {request.description}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <b>Secretary Status:</b> {request.secretaryStatus}
                                                    </Col>
                                                    <Col md={6}>
                                                        <b>Supervisor Status:</b> {request.supervisorStatus}
                                                    </Col>
                                                </Row>

                                                <h3 className="mt-3">Student</h3>
                                                {student && <Accordion className="mt-3">
                                                    <Accordion.Item eventKey={request.id}>
                                                        <Accordion.Header className={"w-100"}>
                                                            <Row className={"w-100"}>
                                                                <div className="col-sm-8">
                                                                    <strong>Student:</strong> {student.name} {student.surname} &nbsp;&nbsp;
                                                                    <strong>Status:</strong> {request.supervisorStatus}
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    {request.supervisorStatus === 'PENDING' && (
                                                                        <span style={{color: 'orange'}}>PENDING</span>
                                                                    )}
                                                                </div>
                                                            </Row>

                                                        </Accordion.Header>
                                                        <Accordion.Body style={{textAlign: 'left'}}>
                                                            <Row>
                                                                <Col md={6}>
                                                                    <b>Student id:</b> {student.id}
                                                                </Col>
                                                                <Col md={6}>
                                                                    <b>Name:</b> {student.name + " " + student.surname}
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={6}>
                                                                    <b>Gender:</b> {student.gender}
                                                                </Col>
                                                                <Col md={6}>
                                                                    <b>Nationality:</b> {student.nationality}
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={6}>
                                                                    <b>Email:</b> {student.email}
                                                                </Col>

                                                            </Row>
                                                            <div>
                                                                <h4>Degree Details</h4>
                                                                <p>
                                                                    <strong>Degree:</strong> {student.codDegree}
                                                                </p>
                                                                <p>
                                                                    <strong>Enrollment
                                                                        Year:</strong> {student.enrollmentYear}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <h4>Career Details</h4>
                                                                <Table striped bordered hover>
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Course</th>
                                                                        <th>CFU</th>
                                                                        <th>Grade</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {ex.map((exam) => (
                                                                        <tr key={exam.id}>
                                                                            <td>{exam.titleCourse}</td>
                                                                            <td>{exam.cfu}</td>
                                                                            <td>{exam.grade}</td>
                                                                        </tr>
                                                                    ))}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </Accordion.Body>

                                                    </Accordion.Item>
                                                </Accordion>}

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ) : (
                                        <p> You don't have any active requests yet </p>
                                    )

                                }
                            )
                        )
                    }
                </Accordion>
            </Container>

            <Modal
                show={showAcceptPopup}
                aria-labelledby='contained-modal-title-vcenter'
            >
                <Modal.Header>
                    <Modal.Title>
                        Accept
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to accept the application?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowAcceptPopup(false)} id="accept-no-btn">No</Button>
                    <Button variant={"danger"} onClick={() => handleAccept(requestToAccept)} id="accept-yes-btn">Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showRejectPopup}
                aria-labelledby='contained-modal-title-vcenter'
            >
                <Modal.Header>
                    <Modal.Title>
                        Reject
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to reject the application?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowRejectPopup(false)} id="reject-no-btn">No</Button>
                    <Button variant={"danger"} onClick={() => handleReject(requestToReject)} id="reject-yes-btn">Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showChangePopup}
                aria-labelledby='contained-modal-title-vcenter'
            >
                <Modal.Header>
                    <Modal.Title>
                        Change
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form.Group>
                        <Form.Label className={"h5"}>Write a message to send to the student</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Enter message"
                            value={changeMessage}
                            onChange={(e) => setChangeMessage(() => e.target.value)}
                            id="description"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowChangePopup(false)}>No</Button>
                    <Button variant={"danger"} onClick={() => handleChange(requestToChange)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );


};

export default BrowseRequests;