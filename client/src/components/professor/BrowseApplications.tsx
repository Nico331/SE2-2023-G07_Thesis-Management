import React from 'react';
import {Accordion, Card, Button, Badge, ListGroup, Modal, Table, Row, Col, Container, Form} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";

const BrowseApplications = () => {
    const proposals = [
        {
            id: '1',
            title: 'Thesis Proposal 1',
            supervisor: 'Prof. Smith',
            coSupervisors: ['Prof. Johnson', 'Prof. Brown'],
            keywords: ['React', 'Java', 'Web Development'],
            type: 'Master',
            groups: ['Group A', 'Group B'],
            description: 'Description for Proposal 1',
            requiredKnowledge: 'Knowledge 1',
            notes: 'Notes 1',
            expiration: new Date('2023-12-31'),
            level: 'Advanced',
            cdS: ['CDS1', 'CDS2'],
            archived: false,
            applications: [
                {
                    id: '1',
                    student: {
                        id: '101',
                        surname: 'Doe',
                        name: 'John',
                        gender: 'Male',
                        nationality: 'US',
                        email: 'john.doe@example.com',
                        degree: {
                            id: '201',
                            codDegree: 'DEG1',
                            titleDegree: 'Computer Science',
                        },
                        enrollmentYear: 2021,
                        listExams: [
                            {
                                id: '301',
                                studentId: '101',
                                codCourse: 'COURSE1',
                                titleCourse: 'Introduction to Programming',
                                cfu: 6,
                                grade: 28,
                                date: '2023-01-15',
                            },
                            {
                                id: '301',
                                studentId: '101',
                                codCourse: 'COURSE1',
                                titleCourse: 'Introduction to Programming',
                                cfu: 6,
                                grade: 28,
                                date: '2023-01-15',
                            },
                        ],
                    },
                    status: 'PENDING',
                },
                {
                    id: '2',
                    student: {
                        id: '101',
                        surname: 'Doe',
                        name: 'John',
                        gender: 'Male',
                        nationality: 'US',
                        email: 'john.doe@example.com',
                        degree: {
                            id: '201',
                            codDegree: 'DEG1',
                            titleDegree: 'Computer Science',
                        },
                        enrollmentYear: 2021,
                        listExams: [
                            {
                                id: '301',
                                studentId: '101',
                                codCourse: 'COURSE1',
                                titleCourse: 'Introduction to Programming',
                                cfu: 6,
                                grade: 28,
                                date: '2023-01-15',
                            },
                            {
                                id: '301',
                                studentId: '101',
                                codCourse: 'COURSE1',
                                titleCourse: 'Introduction to Programming',
                                cfu: 6,
                                grade: 28,
                                date: '2023-01-15',
                            },
                        ],
                    },
                    status: 'APPROVED',
                },
                // Add more applications as needed
            ],
        },
        {
            id: '2',
            title: 'Thesis Proposal 2',
            supervisor: 'Prof. Smith',
            coSupervisors: ['Prof. Johnson', 'Prof. Brown'],
            keywords: ['React', 'Java', 'Web Development'],
            type: 'Bachelor',
            groups: ['Group A', 'Group B'],
            description: 'Description for Proposal 1',
            requiredKnowledge: 'Knowledge 1',
            notes: 'Notes 1',
            expiration: new Date('2023-12-31'),
            level: 'Advanced',
            cdS: ['CDS1', 'CDS2'],
            archived: false,
            applications: [
                {
                    id: '3',
                    student: {
                        id: '101',
                        surname: 'Doe',
                        name: 'John',
                        gender: 'Male',
                        nationality: 'US',
                        email: 'john.doe@example.com',
                        degree: {
                            id: '201',
                            codDegree: 'DEG1',
                            titleDegree: 'Computer Science',
                        },
                        enrollmentYear: 2021,
                        listExams: [
                            {
                                id: '301',
                                studentId: '101',
                                codCourse: 'COURSE1',
                                titleCourse: 'Introduction to Programming',
                                cfu: 6,
                                grade: 28,
                                date: '2023-01-15',
                            },
                            {
                                id: '301',
                                studentId: '101',
                                codCourse: 'COURSE1',
                                titleCourse: 'Introduction to Programming',
                                cfu: 6,
                                grade: 28,
                                date: '2023-01-15',
                            },
                        ],
                    },
                    status: 'PENDING',
                },
                {
                    id: '4',
                    student: {
                        id: '101',
                        surname: 'Doe',
                        name: 'John',
                        gender: 'Male',
                        nationality: 'US',
                        email: 'john.doe@example.com',
                        degree: {
                            id: '201',
                            codDegree: 'DEG1',
                            titleDegree: 'Computer Science',
                        },
                        enrollmentYear: 2021,
                        listExams: [
                            {
                                id: '301',
                                studentId: '101',
                                codCourse: 'COURSE1',
                                titleCourse: 'Introduction to Programming',
                                cfu: 6,
                                grade: 28,
                                date: '2023-01-15',
                            },
                            {
                                id: '301',
                                studentId: '101',
                                codCourse: 'COURSE1',
                                titleCourse: 'Introduction to Programming',
                                cfu: 6,
                                grade: 28,
                                date: '2023-01-15',
                            },
                        ],
                    },
                    status: 'APPROVED',
                },
                // Add more applications as needed
            ],
        },
        // Add more proposals as needed
    ];
    const [selectedApplication, setSelectedApplication] = React.useState(null);

    const handleAccept = async (application) => {
        // Handle accept logic
        /* try{
            await ApplicationService.acceptApplication(application.id)
        }catch{
            console.error('Errore durante l\'invio al server:', error);
        } */
        console.log(`Application accepted for student: ${application.student.name} ${application.student.surname}`);

    };

    const handleReject = (application) => {
        // Handle reject logic
        /* try{
            await ApplicationService.rejectApplication(application.id)
        }catch{
            console.error('Errore durante l\'invio al server:', error);
        } */
        console.log(`Application rejected for student: ${application.student.name} ${application.student.surname}`);
    };


    return (
        <Container>
            <h2>Thesis Proposals</h2>
            <Accordion>
                {proposals.map((proposal) => (
                    <Accordion.Item eventKey={proposal.id} key={proposal.id}>
                        <Accordion.Header>
                            {proposal.title}&nbsp;
                            {proposal.type === "Bachelor" ? <Badge>
                                {proposal.type}
                            </Badge> : <Badge bg="success">
                                {proposal.type}
                            </Badge>}
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
                                    <b>Expiration Date:</b> {proposal.expiration.toDateString()}
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
                                                                    onClick={() => handleAccept(application)}>
                                                                Accept
                                                            </Button>{' '}
                                                            <Button variant="danger"
                                                                    onClick={() => handleReject(application)}>
                                                                Reject
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </Row>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div>
                                                <h4>Degree Details</h4>
                                                <p>
                                                    <strong>Degree:</strong> {application.student.degree.titleDegree}
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
    );
};

export default BrowseApplications;
