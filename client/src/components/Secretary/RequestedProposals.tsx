import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Container, Modal, Row, } from 'react-bootstrap';
import { VirtualClockContext } from '../../contexts/VirtualClockContext';
import ProfessorService from '../../services/ProfessorService';
import { UserContext } from '../../contexts/UserContexts';

const RequestedProposals = () => {

    const {refresh, setRefresh} = useContext(VirtualClockContext);

    const {user, setUser} = useContext(UserContext);
    const [confirmed, setConfirmed] = useState({show: false, type: ""});
    
    // useEffect(() => {
    //     
    // }, []);

    const rp = [{
        id: 1,
        tittle: "Proposal 1",
        studentID: 1,
        supervisor: "Supervisor 1",
        cosupervisor: ["Cosupervisor 1", "Cosupervisor 2"],
        company: "Company 1",
        description: "Description 1",
        level: "Master",
        creationDate: "2021-05-05",
        acceptanceDate: "",
        secretaryStatus: "PENDING",
        supervisorStatus: "PENDING"
        },
        {
        id: 2,
        tittle: "Proposal 2",
        studentID: 2,
        supervisor: "Supervisor 2",
        cosupervisor: ["Cosupervisor 2", "Cosupervisor 3"],
        company: "Company 2",
        description: "Description 2",
        level: "Master",
        creationDate: "2021-05-05",
        acceptanceDate: "",
        secretaryStatus: "PENDING",
        supervisorStatus: "PENDING"
        },
    ]

    const [professors, setProfessors] = useState([]);
    useEffect(() => {
        ProfessorService.fetchAllProfessors().then((res) => {
            setProfessors(res.data);
        });
    }, []);

    console.log("asfsafsafsafsafsafsa");
    return (
        <>
            <Container className="d-flex flex-column" fluid style={{marginTop: "100px"}}>
                <h2>Requested Proposals</h2>
            </Container>  

            <Accordion className='mt-5' >
                {rp.map((proposal) => (
                    <Accordion.Item eventKey={proposal.id}>
                        <Accordion.Header>
                            <Row className='w-100'>
                                <Col><b>Tittle:</b> {proposal.tittle}</Col>
                                <Col><b>Supervisor:</b> {proposal.supervisor}</Col>
                                <Col><b>Student ID:</b> {proposal.studentID}</Col>
                            </Row>
                            
                        </Accordion.Header>

                        <Accordion.Body style={{textAlign:'left'}}>
                            <Row className='w-100'>
                                <Col md={6}> <b> Co-supervisor: </b> 
                                    {rp.map((rpu) => {
                                        if (rpu.id === proposal.id) {
                                            return rpu.cosupervisor.map((cosupervisor) => (
                                                <>{cosupervisor}, </>
                                            ))
                                        }
                                    })}
                                </Col>
                                <Col md={6}> <b> Company: </b> {proposal.company}</Col>
                            </Row>
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Description: </b> {proposal.description}</Col>
                                <Col md={6}> <b> Level: </b> {proposal.level}</Col>
                            </Row>
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Creation Date: </b> {proposal.creationDate}</Col>
                                <Col md={6}> <b> Acceptance Date: </b> {proposal.acceptanceDate}</Col>
                            </Row>
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Secretary Status: </b> {proposal.secretaryStatus}</Col>
                                <Col md={6}> <b> Supervisor Status: </b> {proposal.supervisorStatus}</Col>
                            </Row>
                            <Row  md={{span: 4, offset: 4}} style={{marginTop: '30px', textAlign:'center'}}>
                                <Col>
                                    <button style={{marginRight: '10px'}} className="btn btn-success" onClick={() => setConfirmed({show: true, type: 'confirm'})}>Accept</button>
                                    <button className="btn btn-danger" onClick={() => setConfirmed({show: true, type: 'reject'})}>Reject</button>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Modal show={confirmed.show} onHide={() => setConfirmed({show: false, type: ""})}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {confirmed.type==="confirm" ? <>Accept Requested Proposal</> : 
                        confirmed.type==="reject" ? <>Reject Requested Proposal</> : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {confirmed.type==="confirm" ? <>Are you sure you want to accept this proposal?</> : 
                    confirmed.type==="reject" ? <>Are you sure you want to reject this proposal?</> : null}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success">Yes</button>
                    <button className="btn btn-danger">No</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RequestedProposals;   