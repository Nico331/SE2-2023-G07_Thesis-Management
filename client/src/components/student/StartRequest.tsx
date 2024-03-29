import React, {useContext, useEffect, useState} from 'react';
import {Form, Button, Card, ListGroup, Row, Container, Alert} from 'react-bootstrap';
import CoSupervisorInput from "./CoSupervisorInput";
import dayjs from "dayjs";
import RequestProposalService from "../../services/RequestProposalService";
import {useNavigate} from "react-router-dom";
import ProfessorService from "../../services/ProfessorService";
import {UserContext} from "../../contexts/UserContexts";

interface Professor {
    id: string;
    name: string;
    surname: string;
}

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

const StartRequest: React.FC = () => {
    const {user} = useContext(UserContext);
    const [request, setRequest] = useState<Request>({
        id: null,
        title: '',
        studentId: JSON.parse(user).id,
        supervisorId: '',
        coSupervisors: [],
        description: '',
        acceptanceDate: null,
        secretaryStatus: 'PENDING',
        supervisorStatus: 'PENDING'
    });

    const [professors, setProfessors] = useState<Professor[]>([]);

    useEffect(() => {
        ProfessorService.fetchAllProfessors().then((res) => {
            setProfessors(res.data);
        });
    }, []);

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const [alert, setAlert] = useState<{
        type: string;
        message: string
    }>({type: '', message: ''});



    const addCoSupervisor = (coSupervisor: string) => {
            setRequest({...request, coSupervisors: [...request.coSupervisors, coSupervisor]});

    };


    const removeCoSupervisor = (index: number) => {
        const updatedCoSupervisors = [...request.coSupervisors];
        updatedCoSupervisors.splice(index, 1);
        setRequest({...request, coSupervisors: updatedCoSupervisors});
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        let errorMessage = '';
        if (request.title.length === 0) {
            valid = false;
            errorMessage += `Title should have a value, `;
        }

        if (request.supervisorId.length === 0) {
            valid = false;
            errorMessage += `Supervisor should have a value, `;
        }

        if (valid) {
            RequestProposalService.createRequestProposal(request)
                .then(() => {
                    setAlert({type: 'success', message: 'The request has been created correctly! Redirecting to the homepage in 3 seconds...'});
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                })
                .catch((e) => {
                    setAlert({type: 'danger', message: 'Error! ' + e.response.data});
                });
        } else {
            setValidated(true);
            setAlert({type: 'danger', message: errorMessage});
        }
    };

    // @ts-ignore
    return (
        <Container>
            <h1 style={{marginTop: "110px"}}>New Thesis Request</h1>
            {/*<Button variant="info" onClick={()=>{*/}
            {/*    setRequest({*/}
            {/*            id: null,*/}
            {/*            title: 'Blockchain applied to the sharing mobility',*/}
            {/*            studentId: JSON.parse(user).id,*/}
            {/*            supervisorId: 'p300001',*/}
            {/*            coSupervisors: ['p300002'],*/}
            {/*            description: 'Development of a blockchain system to apply at the sharing mobility',*/}
            {/*            acceptanceDate: null,*/}
            {/*            secretaryStatus: 'PENDING',*/}
            {/*            supervisorStatus: 'PENDING'*/}
            {/*        }*/}
            {/*    );*/}
            {/*}}>*/}
            {/*    <i className="bi bi-database"></i> Populate with Test Data*/}
            {/*</Button>*/}
            <Form noValidate validated={validated} className="mt-5" onSubmit={handleSubmit}>
                <Row>
                    {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
                    <div >
                        <Form.Group id="title">
                            <Form.Label className="h3">Title*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter title"
                                value={request.title}
                                onChange={(e) => setRequest({...request, title: e.target.value})}
                                id="title-input"
                            />
                        </Form.Group>
                    </div>

                </Row>

                <Row className={"mt-3"}>
                    <div >
                        <Form.Group id="supervisor">
                            <Form.Label className="h3">Supervisor*</Form.Label>
                            <Form.Control required as="select" value={request.supervisorId}
                                          onChange={(e) => setRequest({...request, supervisorId: e.target.value})}
                                          id="supervisor-input">
                                <option value="">Select the supervisor</option>
                                {
                                    professors.map((professor) =>
                                        <option value={professor.id} key={professor.id}>
                                            {professor.name} {professor.surname}
                                        </option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Label className="h3">Co-Supervisors</Form.Label>
                        <Card className={"mt-3 mb-3"}>
                            <Card.Body>
                                <CoSupervisorInput onAddCoSupervisor={addCoSupervisor}
                                                   professors={professors.filter((professor) =>
                                                       !(request?.coSupervisors.includes(professor.id)))}/>

                                <br/>
                                <h5>
                                    Internal Co-Supervisors
                                </h5>
                                <ListGroup className={"mt-3"}>
                                    {request.coSupervisors.map((cs, index) => (<ListGroup.Item key={index}>
                                        {professors.filter((p) => p.id == cs).map((professor) => professor.name + ' ' + professor.surname)} &nbsp;
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="float-right"
                                            onClick={() => removeCoSupervisor(index)}
                                        >
                                            Remove
                                        </Button>
                                    </ListGroup.Item>))}
                                </ListGroup>
                                <br/>
                            </Card.Body>

                        </Card>
                    </div>

                </Row>
                <Row className={"mt-3"}>

                    <div>
                        <Form.Group id="description">
                            <Form.Label className="h3">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter description"
                                value={request.description}
                                onChange={(e) => setRequest({...request, description: e.target.value})}
                                id="description-input"
                            />
                        </Form.Group>
                    </div>
                </Row>

                <br/>

                {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
                <br/>
                <Button variant="primary" type="submit" id="submit-btn">
                    Submit
                </Button>
                <br/><br/>
            </Form>
        </Container>
    );
};

export default StartRequest;
