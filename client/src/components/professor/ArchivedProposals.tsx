import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Card, Button, Badge, ListGroup, Modal, Table, Row, Col, Container, Form, Alert, Nav} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";
import UpdateProposal from "./UpdateProposal";
import { Navigate, useNavigate } from 'react-router-dom';
import ProfessorService from '../../services/ProfessorService';

const ArchivedProposals = () => {

    const [refresh, setRefresh] = useState(false);
    const {user, setUser} = useContext(UserContext);
    useEffect(() => {
        if (user) {
            ApplicationService.getByProfessorId(JSON.parse(user).id).then((res) => {
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
    const [proposalToDelete, setProposalToDelete] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showsuccessmodal, setShowAlertModal] = useState({show: false, text: "", type: ""});


    const handleDownload = (application) => {
        const { content, name, contentType } = application.file;

        const binaryString = atob(content);
        const byteArr = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArr[i] = binaryString.charCodeAt(i);
        }

        //const blob = new Blob([byteArray]);

        const byteArray = new Int8Array(content);
        const blob = new Blob([byteArr], { type: contentType });
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


    const handleDelete = (proposalId) => {
        setShowDeletePopup(false);
        setProposalToDelete("");
        console.log(`Proposal deleted: ${proposalId}`);
        ProposalService.deleteProposal(proposalId).then(()=>{setRefresh((r)=> !r)})
    };


    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop:"110px"}}>My Archived Thesis Proposals</h2>

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
                                <Button variant={showsuccessmodal.type} onClick={() => setShowAlertModal({show: false, type: "", text: ""})}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    : null}

                <Accordion className="mt-5">
                    {proposals.map((proposal) => (
                        proposal.archived === "MANUALLY_ARCHIVED" && (
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
                                        <div className="col-sm-4">
                                            <Button className="ms-2 mt-2" variant={'danger'}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowDeletePopup(() => true);
                                                        setProposalToDelete(proposal.id)
                                                    }}> Delete </Button>
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
                                                ) : null;
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
                                            <b>Expiration Date:</b> {dayjs(proposal.expiration).toDate().toDateString()}
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
                                                                    <Button onClick={()=>{handleDownload(application)}}>
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
                    ))}
                </Accordion>
            </Container>


            <Modal
                show={showDeletePopup}
                aria-labelledby='contained-modal-title-vcenter'
            >
                <Modal.Header>
                    <Modal.Title>
                        Delete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the proposal
                    "<b>{proposals && proposalToDelete && proposals.filter((p) => p.id === proposalToDelete).pop().title}</b>"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowDeletePopup(false)}>No</Button>
                    <Button variant={"danger"} onClick={() => handleDelete(proposalToDelete)}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default ArchivedProposals;
