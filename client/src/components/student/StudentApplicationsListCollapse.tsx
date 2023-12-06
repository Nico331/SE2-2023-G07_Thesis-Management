import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Card, Button, Badge, ListGroup, Modal, Table, Row, Col, Container, Form} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";
import ProfessorService from "../../services/ProfessorService";

const StudentApplicationsListCollapse = () => {


    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [studentApplications, setStudentApplications] = useState([]);
    const [studentProposals, setStudentProposals] = useState([]);
    const [supervisors, setSupervisors] = useState([]);

    const getDatas = async () => {
        const apps = await ApplicationService.getApplicationByStudentId(user.id.toString());
        const props = await ProposalService.fetchAllProposals();
        const profs = await ProfessorService.fetchAllProfessors();
        setStudentApplications(apps.data);
        setStudentProposals(props.data);
        setSupervisors(profs.data);
    }

    useEffect(() => {
        getDatas();
    }, [])

    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop:"110px"}}>My Thesis Proposals Applications</h2>
                <Accordion className="mt-4">
                    {studentApplications.map((application, index) => {
                        const proposal = studentProposals.find(proposal => proposal.id === application.proposalId);
                        const supervisor = supervisors.find(s => s.id === proposal.supervisor);
                        const expiration = new Date(proposal.expiration).toDateString();

                        console.log(application)

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
                                            {application.status === "REJECTED" && <Badge bg={"danger"}>
                                                {application.status}
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
        </>
    );


};

export default StudentApplicationsListCollapse;