import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Modal, Row, } from 'react-bootstrap';
import { VirtualClockContext } from '../../contexts/VirtualClockContext';
import ProfessorService from '../../services/ProfessorService';
import { UserContext } from '../../contexts/UserContexts';
import SecretaryService from '../../services/SecretaryService';
import Request from '../../types/Request';
import Professor from "../../types/Professor";

const RequestedProposals = () => {

    const {refresh, setRefresh} = useContext(VirtualClockContext);

    const {user} = useContext(UserContext);
    const [confirmed, setConfirmed] = useState({show: false, type: "", id: ""});
    const [result, setResult] = useState({show: false, type: "", text: ""});
    const [rps, setRps] = useState<Array<Request>>([]);

    const [isScreenSmall, setIsScreenSmall] = useState(window.matchMedia('(max-width: 650px)').matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 650px)');

        const handleResize = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => {
            setIsScreenSmall(event.matches);
        };

        mediaQueryList.addEventListener('change', handleResize);

        return () => {
            mediaQueryList.removeEventListener('change', handleResize);
        };
    }, []);

    const [professors, setProfessors] = useState<Array<Professor>>([]);
    useEffect(() => {
        ProfessorService.fetchAllProfessors().then((res: { data: React.SetStateAction<never[]>; }) => {
            setProfessors(res.data);
        });
    }, []);

    useEffect(() => {
        if (user){
            SecretaryService.fetchAllRequestProposals().then((res: { data: React.SetStateAction<never[]>; }) => {
                // @ts-ignore
                setRps(res.data);
            });
        }
    }, [refresh]);

    const acceptRP = async (id: string) => {
            setConfirmed({show: false, type: "", id: ""});
            SecretaryService.acceptRquestedProposalbySecretary(id).then((res: { status: number; }) => {
                if(res.status === 200){
                    setResult({show: true, type: 'success', text: 'Proposal accepted'});
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

    const rejectRP = (id: string) => {
        setConfirmed({show: false, type: "", id: ""});
        SecretaryService.rejectRquestedProposalbySecretary(id).then((res: { status: number; }) => {
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
                {rps.length === 0 ? (
                    <p> There are not any requested proposal </p>
                ) :
                rps.map((proposal) => (
                    <Accordion.Item eventKey={proposal.id} key={proposal.id}>
                        <Accordion.Header>
                            <Row className='w-100'>
                            {isScreenSmall ?
                                <><Row>{proposal.title}</Row>
                                    <Row className="mt-3">
                                        {
                                            proposal.secretaryStatus === "PENDING" ?
                                                <Container className="d-flex flex-row">
                                                    <Button style={{marginRight: '10px'}}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setConfirmed({show: true, type: 'confirm', id: proposal.id})
                                                                }
                                                            }
                                                    variant='success' id="accept-btn">Accept</Button>
                                                    <Button className="btn btn-danger"
                                                        onClick={(e) => {
                                                                e.stopPropagation();
                                                                setConfirmed({show: true, type: 'reject', id: proposal.id})
                                                            }
                                                        }
                                                    variant='danger' id="reject-btn">Reject</Button>
                                                </Container>
                                            :

                                                <div>
                                                    {proposal.secretaryStatus === "REJECTED" ?
                                                        <div style={{color:"red"}}> REJECTED </div> :
                                                        <div style={{color:"green"}}> ACCEPTED </div>
                                                    }
                                                </div>

                                        }
                                    </Row></>
                                :
                                <><Col sm={8}>{proposal.title}</Col>
                                    <Col sm={4}>
                                        {
                                            proposal.secretaryStatus === "PENDING" ? <>
                                                    <Button style={{marginRight: '10px'}}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setConfirmed({show: true, type: 'confirm', id: proposal.id})
                                                            }
                                                            }
                                                            variant='success' id="accept-btn">Accept</Button>

                                                    <Button className="btn btn-danger"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setConfirmed({show: true, type: 'reject', id: proposal.id})
                                                            }
                                                            }
                                                            variant='danger' id="reject-btn">Reject</Button></>
                                                :
                                                    <div>
                                                        {proposal.secretaryStatus === "REJECTED" ?
                                                            <div style={{color:"red"}}> REJECTED </div> :
                                                            <div style={{color:"green"}}> ACCEPTED </div>
                                                        }
                                                    </div>
                                        }
                                    </Col></>
                            }
                            </Row>
                        </Accordion.Header>

                        <Accordion.Body style={{textAlign:'left'}}>
                            <Row className='w-100'>
                                <Col md={6}><b>Title:</b> {proposal.title}</Col>
                                <Col md={6}><b>Student ID:</b> {proposal.studentId}</Col>
                            </Row>
                            <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Co-supervisor: </b>
                                    {proposal.coSupervisors.map((cosupervisor) => {
                                        return professors.map((professor) => {
                                            if (professor.id === cosupervisor) {
                                                return <>{professor.name} {professor.surname}, </>
                                            } else return <></>
                                        })
                                    })}
                                </Col>
                                <Col md={6}><b>Supervisor:</b> {professors.map((professor) => professor.id === proposal.supervisorId ?  professor.name + " " + professor.surname : null)} ({proposal.supervisorId})</Col>

                            </Row>
                            {/* <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Company: </b> {proposal.company}</Col>

                                <Col md={6}> <b> Level: </b> {proposal.level}</Col>
                            </Row> */}
                            {/* <Row className='w-100' style={{marginTop: '10px'}}>
                                <Col md={6}> <b> Creation Date: </b> {proposal.creationDate}</Col>
                                <Col md={6}> <b> Acceptance Date: </b> {proposal.acceptanceDate}</Col>
                            </Row> */}
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
                    {
                        confirmed.type==="confirm" ?
                            <button className="btn btn-success" onClick={() => acceptRP(confirmed.id)} id="accept-yes-btn">Yes</button> :
                            <button className="btn btn-success" onClick={() => rejectRP(confirmed.id)} id="reject-yes-btn">Yes</button>
                    }
                    <button className="btn btn-danger" onClick={() => {
                        setConfirmed({show: false, type: ""});
                        setRefresh(!refresh);
                    }} id="acc-reject-no-btn">No</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RequestedProposals;
