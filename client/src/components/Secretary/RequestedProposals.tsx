import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Modal, Row, } from 'react-bootstrap';
import { VirtualClockContext } from '../../contexts/VirtualClockContext';
import ProfessorService from '../../services/ProfessorService';
import { UserContext } from '../../contexts/UserContexts';
import axios from 'axios';
import SecretaryService from '../../services/SecretaryService';

const RequestedProposals = () => {

    const {refresh, setRefresh} = useContext(VirtualClockContext);

    const {user, setUser} = useContext(UserContext);
    const [confirmed, setConfirmed] = useState({show: false, type: "", id: ""});
    const [result, setResult] = useState({show: false, type: "", text: ""});

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
        if (user){
            SecretaryService.fetchAllRequestProposals().then((res) => {
                setRps(res.data);
            });
        }
    }, [refresh]);

    const acceptRP = async (id) => {
            setConfirmed({show: false, type: "", id: ""});
            SecretaryService.acceptRquestedProposalbySecretary(id).then((res) => {
                if(res.status === 200){
                    setResult({show: true, type: 'success', text: 'Proposal accepted'});
                    setTimeout(() => {
                        setResult({show: false, type: "", text: ""});
                        // setRefresh(!refresh);
                    }, 3000);
                }else{
                    setResult({show: true, type: 'error', text: "Error, try again later"});
                    setTimeout(() => {
                        setResult({show: false, type: "", text: ""});
                        // setRefresh(!refresh);
                    }, 3000);
                }
            });
    }

    const rejectRP = (id) => {
        setConfirmed({show: false, type: "", id: ""});
        SecretaryService.acceptRquestedProposalbySecretary(id).then((res) => {
            if(res.status === 200){
                setResult({show: true, type: 'success', text: 'Proposal Rejected'});
                setTimeout(() => {
                    setResult({show: false, type: "", text: ""});
                    setRefresh(!refresh);
                }, 3000);
            }else{
                setResult({show: true, type: 'error', text: "Error, try again later"});
                setTimeout(() => {
                    setResult({show: false, type: "", text: ""});
                    setRefresh(!refresh);
                }, 3000);
            }
        });
    }

    return (
        <>
            <Container className="d-flex flex-column" fluid style={{marginTop: "100px"}}>
                <Row>
                    <h2>Requested Proposals</h2>
                </Row>
            </Container>  

            <Accordion className='mt-5' >
                {rp.length === 0 ? (
                    <p> There are any requested proposal </p>
                ) : 
                rps.map((proposal) => (
                    <Accordion.Item eventKey={proposal.id} key={proposal.id}>
                        <Accordion.Header>
                            <Row className='w-100'>
                                <Col sm={8}>{proposal.title}</Col>
                                <Col sm={4}>
                                    <Button style={{marginRight: '10px'}} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmed({show: true, type: 'confirm', id:proposal.id})}
                                    }
                                    variant='success'>Accept</Button>

                                    <Button className="btn btn-danger" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmed({show: true, type: 'reject', id:proposal.id})}
                                    }
                                    variant='danger'>Reject</Button>
                                </Col>
                            </Row>
                        </Accordion.Header>

                        <Accordion.Body style={{textAlign:'left'}}>
                            <Row className='w-100'>
                                <Col md={6}><b>Title:</b> {proposal.title}</Col>
                                <Col md={6}><b>Student ID:</b> {proposal.studentId}</Col>
                            </Row>
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}><b>Supervisor:</b> {proposal.supervisorId}</Col>
                                <Col md={6}> <b> Co-supervisor: </b>
                                    {rp.map((rpu) => {
                                        if (rpu.id === proposal.id) {
                                            return rpu.cosupervisor.map((cosupervisor) => (
                                                <>{cosupervisor}, </>
                                            ))
                                        }
                                    })}
                                </Col>
                            </Row>
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                {/*<Col md={6}> <b> Company: </b> {proposal.company}</Col>*/}
                                
                                <Col md={6}> <b> Level: </b> {proposal.level}</Col>
                            </Row>
                            {/*<Row className='w-100' style={{marginTop: '10px'}}>*/}
                            {/*    <Col md={6}> <b> Creation Date: </b> {proposal.creationDate}</Col>*/}
                            {/*    <Col md={6}> <b> Acceptance Date: </b> {proposal.acceptanceDate}</Col>*/}
                            {/*</Row>*/}
                            {/*<Row className='w-100' style={{marginTop: '10px'}}>*/}
                            {/*    <Col md={6}> <b> Secretary Status: </b> {proposal.secretaryStatus}</Col>*/}
                            {/*    <Col md={6}> <b> Supervisor Status: </b> {proposal.supervisorStatus}</Col>*/}
                            {/*</Row>*/}
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Description: </b> {proposal.description}</Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Modal show={result.show} onHide={() => setResult({show: false, type: "", text: ""})}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {result.type==="success" ? <>Success</> : 
                        result.type==="error" ? <>Error</> : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {result.text}
                </Modal.Body>
            </Modal>
            
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