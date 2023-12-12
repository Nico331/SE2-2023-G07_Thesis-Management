import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Card, Button, Badge, ListGroup, Modal, Table, Row, Col, Container, Form, Alert, Nav} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";
import UpdateProposal from "./UpdateProposal";
import { Navigate, useNavigate } from 'react-router-dom';
import ProfessorService from '../../services/ProfessorService';
import {VirtualClockContext} from "../../contexts/VirtualClockContext";

const BrowseApplications = () => {
    const {refresh, setRefresh} = useContext(VirtualClockContext);

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
    const [showModifyPage, setShowModifyPage] = useState(false);
    const [modifyproposal, setModifyProposal] = useState([]);
    const [showsuccessmodal, setShowAlertModal] = useState({show: false, text: "", type: ""});
    const [successcopy, setSuccessCopy] = useState(false);

    const [pageType, setPageType] = useState("");

    const [showArchivePopup, setShowArchivePopup] = useState(false);
    const [proposalToArchive, setProposalToArchive] = useState("");

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
        console.log(`Proposal deleted: ${proposalId}`);
        ProposalService.deleteProposal(proposalId).then(()=>{setRefresh((r)=> !r)})
    };

    const handlemodify = (e, proposalsID) => {
        e.stopPropagation();
        setPageType("modify");
        setShowModifyPage(true);
        setModifyProposal(proposals.find(a => a.id === proposalsID));
    }

    const handlecopy = (e, proposalsID) => {
        e.stopPropagation();
        setPageType("copy");
        setShowModifyPage(true);
        setModifyProposal(proposals.find(a => a.id === proposalsID));
    }

    const handleArchive = (proposalID) => {
        setShowArchivePopup(false);
        setProposalToArchive("");
        console.log("proposal archived: "+proposalID);
        ProposalService.archiveProposal(proposalID).then( () => {setRefresh ((r) => !r)});


    }


    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop:"110px"}}>My Thesis Proposals</h2>

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
                        proposal.archived != "MANUALLY_ARCHIVED" && (
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
                                        <Button className="ms-2 mt-2" variant={'primary'} onClick={(e) => handlecopy(e, proposal.id)} >Copy</Button>
                                        <Button className="ms-2 mt-2" variant={'secondary'} onClick={(e) => handlemodify(e, proposal.id)}> Modify </Button>
                                        <Button className="ms-2 mt-2" variant={'danger'}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowDeletePopup(() => true);
                                                    setProposalToDelete(proposal.id)
                                                }}> Delete </Button>
                                        <Button className="ms-2 mt-2" variant={'warning'} onClick={(e) => {
                                            e.stopPropagation();
                                            setShowArchivePopup(() => true);
                                            setProposalToArchive(proposal.id);
                                        }}> Archive </Button>
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

                                <h3 className="mt-3">Applications</h3>
                                <Accordion className="mt-3">
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
                                                        {application.status === 'CANCELLED' && (
                                                            <span style={{ color: 'red' }}>CANCELLED</span>
                                                        )}
                                                        {application.status === 'ACCEPTED' && (
                                                            <span style={{ color: 'green' }}>ACCEPTED</span>
                                                        )}
                                                        {application.status === 'REJECTED' && (
                                                            <span style={{ color: 'green' }}>REJECTED</span>
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
                                        </Accordion.Item>))}
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        )
                    ))}
                </Accordion>
            </Container>

            {showModifyPage ? <UpdateProposal setShowModifyPage={setShowModifyPage} modifyproposal={modifyproposal} setShowAlertModal={setShowAlertModal} setRefresh={setRefresh} pagetype={pageType} setsuccesscopy={setSuccessCopy} /> : null}

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

            <Modal
                show={showArchivePopup}
                aria-labelledby='contained-modal-title-vcenter'
            >
                <Modal.Header>
                    <Modal.Title>
                        Archive
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to archive the proposal?
                    "<b>{proposals && proposalToArchive && proposals.filter((p) => p.id === proposalToArchive).pop().title}</b>"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowArchivePopup(false)}>No</Button>
                    <Button variant={"danger"} onClick={() => handleArchive(proposalToArchive)}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={successcopy} 
                onHide={() => setSuccessCopy(false)}
                size="xl"
                centered
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Proposal Copied</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{wordWrap: 'break-word'}} id={'Stu-Modal-Details'}>
                    <Row>
                        <Col>
                            <p>Proposal copied successfully!</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() =>setSuccessCopy(false)}>Ok</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BrowseApplications;
