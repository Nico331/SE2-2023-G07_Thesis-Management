import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Card, Button, Badge, ListGroup, Modal, Table, Row, Col, Container, Form} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";
import ProfessorService from "../../services/ProfessorService";
import {VirtualClockContext} from "../../contexts/VirtualClockContext";
import RequestProposalService from "../../services/RequestProposalService";

interface Request {
    id: string | null;
    title: string;
    studentId: string;
    supervisorId: string;
    coSupervisors: string[];
    description: string;
    acceptanceDate: dayjs.Dayjs;
    secretaryStatus: string;
    supervisorStatus: string;
}

const StudentApplicationsListCollapse = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [studentApplications, setStudentApplications] = useState([]);
    const [studentProposals, setStudentProposals] = useState([]);
    const [supervisors, setSupervisors] = useState([]);

    const {refresh, setRefresh} = useContext(VirtualClockContext);
    const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
    const [applicationToWithdraw, setApplicationToWithdraw] = useState("");
    const [hasRequest, setHasRequest] = useState(false);
    const [showRequestPopup, setShowRequestPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);


    const [request, setRequest] = useState<Request>({
        id: null,
        title: '',
        studentId: user.id.toString(),
        supervisorId: '',
        coSupervisors: [],
        description: '',
        acceptanceDate: null,
        secretaryStatus: 'PENDING',
        supervisorStatus: 'PENDING'
    });
    const getData = async () => {
        const apps = await ApplicationService.getApplicationByStudentId(user.id.toString());
        const props = await ProposalService.fetchAllProposals();
        const profs = await ProfessorService.fetchAllProfessors();
        const reqs = await RequestProposalService.fetchAllRequestProposals();
        setStudentApplications(apps.data);
        setStudentProposals(props.data);
        setSupervisors(profs.data);
        if(reqs.data.some((req) => req.studentId === user.id.toString() ) )
            setHasRequest(true);


    }


    const handleWithdraw = (proposalID) => {
        setShowWithdrawPopup(false);
        ApplicationService.withdrawApplication(proposalID).then(() => {
            setRefresh((r) => !r)
        });


    }

    const handleStartRequest = (request) => {
        setShowRequestPopup(false);
        RequestProposalService.createRequestProposal(request).then( () => {
            setRefresh( (r) => !r)
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
            }, 3000); // Nascondi il messaggio dopo 3 secondi
        });
    }

    useEffect(() => {
        getData();
    }, [refresh])

    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop:"110px"}}>My Thesis Proposals Applications</h2>
                <Accordion className="mt-4">
                    {studentApplications.map((application, index) => {
                        const proposal = studentProposals.find(proposal => proposal.id === application.proposalId);
                        const supervisor = supervisors.find(s => s.id === proposal.supervisor);
                        const expiration = new Date(proposal.expiration).toDateString();

                        const handleDownload = () => {
                            const { content, name, contentType } = application.file;

                            const binaryString = atob(content);
                            const byteArr = new Uint8Array(binaryString.length);
                            for (let i = 0; i < binaryString.length; i++) {
                                byteArr[i] = binaryString.charCodeAt(i);
                            }

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


                        return (
                            <Accordion.Item eventKey={proposal.id} key={proposal.id}>
                                <Accordion.Header>
                                    <Row className={"w-100"}>
                                        <div className="col-sm-8">
                                            {proposal.title}&nbsp;
                                            {application.status === "PENDING" && <Badge bg={"warning"}>
                                                {application.status}
                                            </Badge>}
                                            {application.status === "ACCEPTED" && <Badge bg={"success"}>
                                                {application.status}
                                            </Badge>}
                                            {application.status === ("REJECTED") && <Badge bg={"danger"}>
                                                {application.status}
                                            </Badge>}
                                            {application.status === ("CANCELLED") && <Badge bg={"danger"}>
                                                {application.status}
                                            </Badge>}
                                        </div>
                                        <div className="col-sm-2">
                                            {!hasRequest && application.status === "ACCEPTED" && <Button
                                                variant="primary"
                                                onClick={(e) => {
                                                    setRequest(req => ({
                                                        ...req, // Mantieni i valori esistenti
                                                        title: proposal.title,
                                                        supervisorId: proposal.supervisor,
                                                        coSupervisors: proposal.coSupervisors,
                                                        description: proposal.description,
                                                    }))
                                                    setShowRequestPopup(true);
                                                    e.stopPropagation()
                                                }}
                                                id="start-request-btn"
                                            >
                                                Start Request
                                            </Button>}
                                        </div>
                                        <div className="col-sm-2">
                                            {application.status === "PENDING" && <Button
                                                variant="primary"
                                                onClick={(e) => {
                                                    setApplicationToWithdraw(application.id)
                                                    setShowWithdrawPopup(true);
                                                    e.stopPropagation()
                                                }}
                                                id="withdraw-btn"
                                            >
                                                Withdraw
                                            </Button>}
                                        </div>
                                    </Row>

                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col md={6}>
                                            <b>Thesis Title:</b> {proposal.title}
                                        </Col>
                                        <Col md={6}>
                                            <b>Supervisor:</b> {supervisor.name}, {supervisor.surname }
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
                                    <Row>
                                        <Col>
                                            <b>Status:</b> {application.status}
                                        </Col>
                                    </Row>
                                    {application.file && <Row>
                                        <Col>
                                            <b>Attachment: &nbsp;
                                                <Button onClick={handleDownload}>
                                                    Download File
                                                </Button>
                                            </b>
                                        </Col>
                                    </Row>}


                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}

                </Accordion>
            </Container>
            <Modal
                show={showWithdrawPopup}
                aria-labelledby='contained-modal-title-vcenter'
            >
                <Modal.Header>
                    <Modal.Title>
                        Withdraw application
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to withdraw the application? ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowWithdrawPopup(false)} id="withdraw-no-btn">No</Button>
                    <Button variant={"danger"} onClick={() => handleWithdraw(applicationToWithdraw)} id="withdraw-yes-btn">Yes</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showRequestPopup}
                aria-labelledby='contained-modal-title-vcenter'
            >
                <Modal.Header>
                    <Modal.Title>
                        Start Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to send a Start Request for this application ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowRequestPopup(false)} id="withdraw-no-btn">No</Button>
                    <Button variant={"danger"} onClick={() => handleStartRequest(request)} id="withdraw-yes-btn">Yes</Button>
                </Modal.Footer>
            </Modal>
            {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Your request has been sent with success, you can now see it in "My Request" section.
                </div>
            )}
        </>
    );


};

export default StudentApplicationsListCollapse;