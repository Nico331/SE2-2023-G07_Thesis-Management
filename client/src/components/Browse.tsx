import {Accordion, Badge, Button, Col, Row, Table} from "react-bootstrap";
import dayjs from "dayjs";
import {handleDownload} from "./professor/ArchivedProposals";
import React from "react";

const Browse = ({proposals, professors, }) => {
    return(
            <Accordion className="mt-5">
                {
                    proposals.length === 0 ? (
                        <p> You don't have active proposals yet </p>
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
                                        </div>
                                    </Row>

                                </Accordion.Header>
                                <Accordion.Body style={{textAlign: 'left'}}>
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
                                                            {application.status === 'CANCELLED' && (
                                                                <span style={{color: 'red'}}>CANCELLED</span>
                                                            )}
                                                            {application.status === 'ACCEPTED' && (
                                                                <span style={{color: 'green'}}>ACCEPTED</span>
                                                            )}
                                                            {application.status === 'REJECTED' && (
                                                                <span style={{color: 'red'}}>REJECTED</span>
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
                                                                <Button onClick={() => {
                                                                    handleDownload(application)
                                                                }}>
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

                        ))
                    )
                }
            </Accordion>
    )
}
export default Browse
