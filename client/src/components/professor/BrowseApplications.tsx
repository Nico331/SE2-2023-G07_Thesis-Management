import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Card, Button, Badge, ListGroup, Modal, Table, Row, Col, Container, Form} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";

const BrowseApplications = () => {

    const [refresh, setRefresh] = useState(false);
    const {user, setUser} = useContext(UserContext);
    useEffect(() => {
        if (user) {
            ApplicationService.getByProfessorId(JSON.parse(user).id).then((res) => {
                setProposals(res.data);
            })


        }

    }, [user, refresh]);
    const [proposals, setProposals] = useState([]);
    const [proposalToDelete, setProposalToDelete] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleAccept = async (application) => {
        // Handle accept logic
        try{
            await ApplicationService.acceptApplication(application.id)
            setRefresh((r)=> !r)
        }catch{
            console.error('Errore durante l\'invio al server:');
        }
        console.log(`Application accepted for student: ${application.student.name} ${application.student.surname}`);

    };

    const handleReject = async (application) => {
        // Handle reject logic
        try{
            await ApplicationService.rejectApplication(application.id)
            setRefresh((r)=> !r)
        }catch{
            console.error('Errore durante l\'invio al server:');
        }
        console.log(`Application rejected for student: ${application.student.name} ${application.student.surname}`);
    };
    const handleDelete = (proposalId) => {
        setShowDeletePopup(false);
        setProposalToDelete("");
        ProposalService.deleteProposal(proposalId).then(()=>{setRefresh((r)=> !r)})
    };


    return (
        <>
            <Container>
                <h2>Thesis Proposals</h2>
                <Accordion>
                    {proposals.map((proposal) => (
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
                                    <div className="col-sm-4">
                                        <Button className="ms-2 mt-2" variant={'secondary'} onClick={(e) => {
                                            e.stopPropagation();
                                        }}> Modify </Button>
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
                                        <b>Co-Supervisor:</b> {proposal.coSupervisors.map((coSupervisor) => {
                                        return <>{coSupervisor},</>
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

                                <h3>Applications</h3>
                                <Accordion>
                                    {proposal.applications.map((application, index) => (
                                        <Accordion.Item eventKey={application.id}>
                                            <Accordion.Header className={"w-100"}>
                                                <Row className={"w-100"}>
                                                    <div className="col-sm-8">
                                                        <strong>Student:</strong> {application.student.name} {application.student.surname} &nbsp;&nbsp;
                                                        <strong>Status:</strong> {application.status}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        {application.status === 'PENDING' && (
                                                            <>
                                                                <Button variant="success"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleAccept(application);
                                                                        }}>
                                                                    Accept
                                                                </Button>{' '}
                                                                <Button variant="danger"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleReject(application);
                                                                        }}>
                                                                    Reject
                                                                </Button>
                                                            </>
                                                        )}
                                                        {application.status === 'REJECTED' && (
                                                            <span style={{ color: 'red' }}>REJECTED</span>
                                                        )}
                                                        {application.status === 'ACCEPTED' && (
                                                            <span style={{ color: 'green' }}>ACCEPTED</span>
                                                        )}

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
                                            </Accordion.Body>
                                        </Accordion.Item>))}
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
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

export default BrowseApplications;
