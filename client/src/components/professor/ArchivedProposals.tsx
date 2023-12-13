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
    Nav
} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";
import UpdateProposal from "./UpdateProposal";
import {Navigate, useNavigate} from 'react-router-dom';
import ProfessorService from '../../services/ProfessorService';

const ArchivedProposals = () => {

    const [refresh, setRefresh] = useState(false);
    const {user, setUser} = useContext(UserContext);
    useEffect(() => {
        if (user) {
            ApplicationService.getByProfessorIdArchived(JSON.parse(user).id).then((res) => {
                setProposals(res.data);
            })
        }

    }, [user, refresh]);

    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        ProfessorService.fetchAllProfessors().then((res) => {
            setProfessors(res.data);
        });
    }, []);

    const [proposals, setProposals] = useState([]);

    const handleDownload = (application) => {
        const {content, name, contentType} = application.file;

        const binaryString = atob(content);
        const byteArr = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArr[i] = binaryString.charCodeAt(i);
        }

        //const blob = new Blob([byteArray]);

        const byteArray = new Int8Array(content);
        const blob = new Blob([byteArr], {type: contentType});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.className = "button";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };


    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop: "110px"}}>My Archived Thesis Proposals</h2>

                <Accordion className="mt-5">
                    {proposals.length === 0 ? (
                        <p>You don't have archived proposals yet</p>
                    ) : (
                        proposals.map((proposal) => (

                                    <Accordion.Item eventKey={proposal.id} key={proposal.id}>
                                        <Accordion.Header>
                                            <Row className={"w-100"}>
                                                <div className="col-sm-8">
                                                    {proposal.title}&nbsp;
                                                    {proposal.level === "Bachelor" && <Badge>
                                                        {proposal.level}
                                                    </Badge>}
                                                    {proposal.level === "Masters" && <Badge bg={"success"}>
                                                        {proposal.level}
                                                    </Badge>}
                                                    {proposal.level === "PhD" && <Badge bg={"secondary"}>
                                                        {proposal.level}
                                                    </Badge>}
                                                </div>
                                                <div className="col-sm-8">
                                                    {proposal.archived === "EXPIRED" && <Badge bg={"info"}>
                                                        {proposal.archived}
                                                    </Badge>}
                                                </div>
                                            </Row>

                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Row>
                                                <Col md={6}>
                                                    <b>Thesis Title:</b> {proposal.title}
                                                </Col>
                                                <Col md={6}>
                                                    <b>Supervisor:</b> {proposal.supervisor}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <b>Co-Supervisor: </b>
                                                    {proposal.coSupervisors.map((coSupervisor) => {
                                                        const matchingProfessor = professors.find((professor) => professor.id === coSupervisor);
                                                        return matchingProfessor ? (
                                                            <span key={coSupervisor}>
                                                        {matchingProfessor.name} {matchingProfessor.surname}, &nbsp;
                                                    </span>
                                                        ) : coSupervisor + ", ";
                                                    })}
                                                </Col>
                                                <Col md={6}>
                                                    <b>Type:</b> {proposal.type}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <b>Required Knowledge:</b> {proposal.requiredKnowledge}
                                                </Col>
                                                <Col md={6}>
                                                    <b>Level:</b> {proposal.level}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <b>CdS:</b> {proposal.cdS.map((cdS) => {
                                                    return <>{cdS},</>
                                                })}
                                                </Col>
                                                <Col md={6}>
                                                    <b>Expiration
                                                        Date:</b> {dayjs(proposal.expiration).toDate().toDateString()}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <b>Description:</b> {proposal.description}
                                                </Col>
                                                <Col>
                                                    <b>Groups:</b> {proposal.groups.map((group) => {
                                                    return <>{group},</>
                                                })}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <b>Notes:</b> {proposal.notes}
                                                </Col>
                                            </Row>


                                            <Accordion className="mt-3">
                                                {proposal.applications.map((application, index) => (
                                                        application.status === 'ACCEPTED' && (
                                                            <>
                                                                <h3 className="mt-3">Accepted Application</h3>
                                                                <Accordion.Item eventKey={application.id}>
                                                                    <Accordion.Header className={"w-100"}>
                                                                        <Row className={"w-100"}>
                                                                            <div className="col-sm-8">
                                                                                <strong>Student:</strong> {application.student.name} {application.student.surname} &nbsp;&nbsp;
                                                                                <strong>Status:</strong> {application.status}
                                                                            </div>
                                                                        </Row>
                                                                    </Accordion.Header>
                                                                    <Accordion.Body>
                                                                        <div>
                                                                            <h4>Degree Details</h4>
                                                                            <p>
                                                                                <strong>Degree:</strong> {application.student.codDegree}
                                                                            </p>
                                                                            <p>
                                                                                <strong>Enrollment
                                                                                    Year:</strong> {application.student.enrollmentYear}
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
                                                                                {application.student.listExams.map((exam) => (
                                                                                    <tr key={exam.id}>
                                                                                        <td>{exam.titleCourse}</td>
                                                                                        <td>{exam.cfu}</td>
                                                                                        <td>{exam.grade}</td>
                                                                                    </tr>
                                                                                ))}
                                                                                </tbody>
                                                                            </Table>
                                                                        </div>
                                                                        {application.file && <Row>
                                                                            <Col>
                                                                                <b>Attachment: &nbsp;
                                                                                    <Button onClick={() => {
                                                                                        handleDownload(application)
                                                                                    }}>
                                                                                        Download File
                                                                                    </Button>
                                                                                </b>
                                                                            </Col>
                                                                        </Row>}
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            </>
                                                        )
                                                    )
                                                )}
                                            </Accordion>
                                        </Accordion.Body>
                                    </Accordion.Item>

                            )
                        ))
                    }
                </Accordion>
            </Container>


        </>
    );
};

export default ArchivedProposals;
