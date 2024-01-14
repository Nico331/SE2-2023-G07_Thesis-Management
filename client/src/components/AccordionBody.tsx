import {Accordion, Button, Col, Row, Table} from "react-bootstrap";
import React from "react";
import {handleDownload} from "./professor/ArchivedProposals";

const AccordionBody = ({application})=>{
    return(
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
    )
}
export default AccordionBody
