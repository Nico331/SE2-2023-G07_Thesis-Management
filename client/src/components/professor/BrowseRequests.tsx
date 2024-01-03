import React, {useContext, useEffect, useState} from 'react';
import {
    Accordion,
    Card,
    Button,
    Badge,
    ListGroup,
    Modal,
    Table,
    Row,
    Col,
    Container,
    Form,
    Alert,
    Nav, ButtonGroup, AccordionItem, AccordionHeader
} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";
import UpdateProposal from "./UpdateProposal";
import {Navigate, useNavigate} from 'react-router-dom';
import ProfessorService from '../../services/ProfessorService';
import {VirtualClockContext} from "../../contexts/VirtualClockContext";
import {FaRegCopy} from "react-icons/fa";
import {BsPencil, BsTrash, BsArchive} from 'react-icons/bs';
import RequestProposalService from "../../services/RequestProposalService";
import StudentService from "../../services/StudentService";
import DegreeService from "../../services/DegreeService";
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

    const [showsuccessmodal, setShowAlertModal] = useState({show: false, text: "", type: ""});

    const [isSupervisor, setIsSupervisor] = useState(false);


    useEffect(() => {
        if (user) {
            RequestProposalService.fetchAllRequestProposals().then((res) => {
                const userId = JSON.parse(user).id;

                const myReq = res.data.filter((req) => {
                    // Verifica se il supervisorId corrisponde all'ID dell'utente
                    const isSupervisor = req.supervisorId === userId;
                    if(isSupervisor)
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

    const handleAccept = async (applicationId) => {
        setShowAcceptPopup(false);
        setRequestToAccept("");
        RequestProposalService.acceptRequestProposalProf(applicationId).then(() => {
            setShowAlertModal({
                show: true,
                type: "success",
                text: "Application accepted"
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
        });

    };

    const handleReject = async (applicationId) => {

        setShowRejectPopup(false);
        setRequestToReject("");
        RequestProposalService.rejectRequestProposalProf(applicationId).then(() => {
            setShowAlertModal({
                show: true,
                type: "success",
                text: "Application rejected"
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
        });
    };




    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop: "110px"}}>Requests</h2>

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
                                })}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    : null}

                <Accordion className="mt-5">
                    {
                        myRequests.length === 0 ? (
                            <p> You don't have active proposals yet </p>
                        ) : (

                            myRequests.map((request) => {
                                    const student = students.find((student) => student.id === request.studentId);
                                    console.log(student);
                                    const ex = exams.filter( (exam ) => exam.studentId === student.id);
                                    console.log(exams);
                                    console.log(ex);
                                    return (
                                        <Accordion.Item eventKey={request.id} key={request.id}>
                                            <Accordion.Header>
                                                <Row className={"w-100"}>
                                                    <div className="col-sm-8">
                                                        {request.title}&nbsp;
                                                    </div>
                                                </Row>
                                                <div className="col-sm-4">
                                                    {isSupervisor && request.supervisorStatus === "PENDING" && request.secretaryStatus === 'ACCEPTED' && (
                                                            <>
                                                                <ButtonGroup>
                                                                    <Button variant="success"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setShowAcceptPopup(true);
                                                                                setRequestToAccept(request.id);
                                                                            }}>
                                                                        Accept
                                                                    </Button>{' '}
                                                                    <Button variant="danger"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setShowRejectPopup(true);
                                                                                setRequestToReject(request.id);
                                                                            }}>
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
                                                </div>
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
                                                <Accordion className="mt-3">
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
                                                                    {request.supervisorStatus === 'ACCEPTED' && (
                                                                        <span style={{color: 'green'}}>ACCEPTED</span>
                                                                    )}
                                                                    {request.supervisorStatus === 'REJECTED' && (
                                                                        <span style={{color: 'red'}}>REJECTED</span>
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
                                                                    <b>Name:</b> {student.name + " "+student.surname}
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
                                                                    <strong>Enrollment Year:</strong> {student.enrollmentYear}
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
                                                </Accordion>

                                            </Accordion.Body>
                                        </Accordion.Item>
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
                    <Button variant={"secondary"} onClick={() => setShowAcceptPopup(false)}>No</Button>
                    <Button variant={"danger"} onClick={() => handleAccept(requestToAccept)}>Yes</Button>
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
                    <Button variant={"secondary"} onClick={() => setShowRejectPopup(false)}>No</Button>
                    <Button variant={"danger"} onClick={() => handleReject(requestToReject)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );


};

export default BrowseRequests;