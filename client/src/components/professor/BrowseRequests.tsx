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




    useEffect(() => {
        if (user) {
            RequestProposalService.fetchAllRequestProposals().then((res) => {
                const myReq = res.data.filter((req) => req.supervisorId === JSON.parse(user).id);
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






    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop: "110px"}}>Requests</h2>

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
        </>
    );


};

export default BrowseRequests;