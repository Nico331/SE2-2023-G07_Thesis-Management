import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Container, Modal, Row, } from 'react-bootstrap';
import { VirtualClockContext } from '../../contexts/VirtualClockContext';
import ProfessorService from '../../services/ProfessorService';
import { UserContext } from '../../contexts/UserContexts';
import axios from 'axios';
import SecretaryService from '../../services/SecretaryService';

const RequestedProposals = () => {

    const {refresh, setRefresh} = useContext(VirtualClockContext);

    const {user, setUser} = useContext(UserContext);
    const [confirmed, setConfirmed] = useState({show: false, type: "", id: ""});
    
    // useEffect(() => {
    //     
    // }, []);

    const rp = [{
        id: "1",
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
        id: "2",
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

    // const [professors, setProfessors] = useState([]);
    // useEffect(() => {
    //     ProfessorService.fetchAllProfessors().then((res) => {
    //         setProfessors(res.data);
    //     });
    // }, []);

    const [rps, setRps] = useState([]);
    useEffect(() => {
        SecretaryService.fetchAllRequestProposals().then((res) => {
            setRps(res.data);
        });
    }, [rps]);

    const acceptRP = (id) => {
        setConfirmed({show: false, type: "", id: ""});
        SecretaryService.acceptRquestedProposalbySecretary(id).then((res) => {
            console.log(res.data);
        });
    }

    const rejectRP = (id) => {
        setConfirmed({show: false, type: "", id: ""});
        SecretaryService.rejectRquestedProposalbySecretary(id).then((res) => {
            console.log(res.data);
        });
    }

    console.log(rps);
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
                                <Col sm={8}>{proposal.tittle}</Col>
                                <Col sm={4}>
                                    <button style={{marginRight: '10px'}} className="btn btn-success" onClick={() => setConfirmed({show: true, type: 'confirm', id:proposal.id})}>Accept</button>
                                    <button className="btn btn-danger" onClick={() => setConfirmed({show: true, type: 'reject', id:proposal.id})}>Reject</button>
                                </Col>
                            </Row>
                            
                        </Accordion.Header>

                        <Accordion.Body style={{textAlign:'left'}}>
                            <Row className='w-100'>
                                <Col md={6}><b>tittle:</b> {proposal.tittle}</Col>
                                <Col md={6}><b>Student ID:</b> {proposal.studentID}</Col>
                            </Row>
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Co-supervisor: </b> 
                                    {/* {rp.map((rpu) => {
                                        if (rpu.id === proposal.id) {
                                            return rpu.cosupervisor.map((cosupervisor) => (
                                                <>{cosupervisor}, </>
                                            ))
                                        }
                                    })} */}
                                </Col>
                                <Col md={6}><b>Supervisor:</b> {proposal.supervisor}</Col>
                                
                            </Row>
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Company: </b> {proposal.company}</Col>
                                
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
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Description: </b> {proposal.description}</Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Modal show={confirmed.show} onHide={() => setConfirmed({show: false, type: "", id: ""})}>
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
                    <button className="btn btn-success" onClick={() => acceptRP(confirmed.id)}>Yes</button>
                    <button className="btn btn-danger" onClick={() => rejectRP(confirmed.id)}>No</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RequestedProposals;   