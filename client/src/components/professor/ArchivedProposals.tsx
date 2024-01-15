import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Button, Badge, Table, Row, Col, Container, Form,} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import UpdateProposal from "./UpdateProposal";
import ProfessorService from '../../services/ProfessorService';
import AccordionBody from "../AccordionBody";
export const handleDownload = (application) => {
    const {content, name, contentType} = application.file;

    const binaryString = atob(content);
    const byteArr = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArr[i] = binaryString.charCodeAt(i);
    }

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

const ArchivedProposals = () => {

    const [refresh, setRefresh] = useState(false);
    // @ts-ignore
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
        ProfessorService.fetchAllProfessors().then((res: { data: React.SetStateAction<never[]>; }) => {
            setProfessors(res.data);
        });
    }, []);

    const [proposals, setProposals] = useState([]);

    const [showModifyPage, setShowModifyPage] = useState(false);
    const [modifyproposal, setModifyProposal] = useState([]);
    const [pageType, setPageType] = useState("");
    // @ts-ignore
    const [showsuccessmodal, setShowAlertModal] = useState({show: false, text: "", type: ""});
    // @ts-ignore
    const [successcopy, setSuccessCopy] = useState(false);



    const handlemodify = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, proposalsID: any) => {
        e.stopPropagation();
        setPageType("modify");
        setShowModifyPage(true);
        // @ts-ignore
        setModifyProposal(proposals.find(a => a.id === proposalsID));
    }

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProposals = proposals.filter((proposal) => {
        // Perform your filtering logic here based on the searchQuery
        return proposal.title.toLowerCase().includes(searchQuery.toLowerCase());
    });


    return (
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop: "110px"}}>My Archived Thesis Proposals</h2>
                <Form.Control
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="mt-3"
                />


                <Accordion className="mt-5">
                    {filteredProposals.length === 0 ? (
                        <p>You don't have archived proposals yet</p>
                    ) : (
                        filteredProposals.map((proposal) => (

                                    <Accordion.Item eventKey={proposal.id} key={proposal.id}>
                                        <Accordion.Header>
                                            <Row className={"w-100"}>
                                                <div className="col-sm-8">
                                                    {proposal.title}&nbsp;
                                                    {proposal.level === "Bachelor" && <Badge>
                                                        {proposal.level}
                                                    </Badge>}
                                                    {proposal.level === "Masters" && <Badge bg={"danger"}>
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
                                                    {proposal.archived === "MANUALLY_ARCHIVED" && <Badge bg={"warning"}>
                                                        {proposal.archived}
                                                    </Badge>}
                                                </div>
                                                <div className="col-sm-4">
                                                    {proposal.applications.every(application => application.status !== 'ACCEPTED') && (
                                                        <Button
                                                            className="ms-2 mt-2"
                                                            variant={'primary'}
                                                            onClick={(e) => handlemodify(e, proposal.id)}
                                                            id="restore-btn"
                                                        >
                                                            Modify
                                                        </Button>
                                                    )}
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
                                                                    <AccordionBody application = {application}/>
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

            {showModifyPage ? <UpdateProposal setShowModifyPage={setShowModifyPage} modifyproposal={modifyproposal}
                                              setShowAlertModal={setShowAlertModal} setRefresh={setRefresh}
                                              pagetype={pageType} setsuccesscopy={setSuccessCopy}/> : null}
        </>
    );
};

export default ArchivedProposals;
