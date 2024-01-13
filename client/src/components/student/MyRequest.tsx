import React, {useContext, useEffect, useState} from 'react';
import {Form, Button, Card, ListGroup, Row, Container, Alert, Col, Modal} from 'react-bootstrap';
import CoSupervisorInput from "./CoSupervisorInput";
import dayjs from "dayjs";
import RequestProposalService from "../../services/RequestProposalService";
import {useNavigate} from "react-router-dom";
import ProfessorService from "../../services/ProfessorService";
import {UserContext} from "../../contexts/UserContexts";
import {BsPencil, BsTrash} from "react-icons/bs";
import ProposalService from "../../services/ProposalService";

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

const MyRequest: React.FC = () => {
    const {user, setUser} = useContext(UserContext);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
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
    const [modifyDisabled, setModifyDisabled] = useState<boolean>(true);

    useEffect(() => {
        ProfessorService.fetchAllProfessors().then((res) => {
            setProfessors(res.data);
        });
        RequestProposalService.fetchAllRequestProposals().then((res) => {
            setRequest(() => res.data ? res.data[res.data.length-1] : null)
        })
    }, []);


    const handleDelete = () => {
        RequestProposalService.deleteRequestProposals(request.id).then(() => {
            setShowDeletePopup(false);
            navigate("/");
        })
    };
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
            RequestProposalService.updateRequestProposal(request, request.id)
                .then(() => {
                    setAlert({
                        type: 'success',
                        message: 'The request has been modified correctly! Redirecting to the homepage in 3 seconds...'
                    });
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
        <>
            {request ? <Container>
                    <h1 style={{marginTop: "110px"}}>My Thesis Request</h1>
                    <h4> Secretary: {request.secretaryStatus} </h4>
                    <h4> Supervisor: {request.supervisorStatus} </h4>
                    {(request.secretaryStatus === "PENDING" && request.supervisorStatus == "PENDING") && <>
                        <Button className="mt-3" onClick={() => {
                            setModifyDisabled(a => !a);
                        }} variant={modifyDisabled ? "primary" : "secondary"} id="edit-mode-btn">
                            <BsPencil/> {modifyDisabled ? "Enable" : "Disable"} edit mode
                        </Button>
                        &nbsp;
                    </>}
                    {!modifyDisabled &&
                        <Button className="mt-3" onClick={() => setShowDeletePopup(true)} variant="danger" id="delete-btn">
                            <BsTrash/> Delete request
                        </Button>}
                    <Form noValidate validated={validated} className="mt-4" onSubmit={handleSubmit}>
                        <Row>
                            {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
                            <div>
                                <Form.Group id="title">
                                    <Form.Label className="h3">Title*</Form.Label>
                                    <Form.Control
                                        disabled={modifyDisabled}
                                        required
                                        type="text"
                                        placeholder="Enter title"
                                        value={request.title}
                                        onChange={(e) => setRequest({...request, title: e.target.value})}
                                        id="title"
                                    />
                                </Form.Group>
                            </div>

                        </Row>

                        <Row className={"mt-3"}>
                            <div>
                                <Form.Group id="supervisor">
                                    <Form.Label className="h3">Supervisor*</Form.Label>
                                    <Form.Control required as="select" value={request.supervisorId}
                                                  disabled={modifyDisabled}
                                                  onChange={(e) => setRequest({...request, supervisorId: e.target.value})}>
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
                                        {!modifyDisabled && <>
                                            <CoSupervisorInput onAddCoSupervisor={addCoSupervisor}
                                                               professors={professors.filter((professor) =>
                                                                   !(request?.coSupervisors.includes(professor.id)))}/>

                                            <br/>
                                        </>}
                                        <h5>
                                            Internal Co-Supervisors
                                        </h5>
                                        <ListGroup className={"mt-3"}>
                                            {request.coSupervisors.map((cs, index) => (<ListGroup.Item key={index}>
                                                {professors.filter((p) => p.id == cs).map((professor) => professor.name + ' ' + professor.surname)} &nbsp;
                                                <Button
                                                    variant="danger"
                                                    disabled={modifyDisabled}
                                                    size="sm"
                                                    className="float-right"
                                                    onClick={() => removeCoSupervisor(index)}
                                                    id={"remove-" + cs + "-btn"}
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
                                        disabled={modifyDisabled}
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter description"
                                        value={request.description}
                                        onChange={(e) => setRequest({...request, description: e.target.value})}
                                    />
                                </Form.Group>
                            </div>
                        </Row>

                        <br/>

                        {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
                        <br/>
                        <Button variant="primary" type="submit"
                                disabled={modifyDisabled} id="modify-req-btn">
                            Modify request
                        </Button>
                        <br/><br/>
                    </Form>
                </Container>
                :
                <Container className="text-center mt-5">
                    <Row>
                        <Col>
                            <h1 style={{marginTop: "110px"}}>Request not found</h1>
                            <h3>You don't have any request.</h3>
                            <Button variant="primary" onClick={() => navigate("/")}>Go back to homepage</Button>
                        </Col>
                    </Row>
                </Container>
            }
            <Modal
                show={showDeletePopup}
                aria-labelledby='contained-modal-title-vcenter'
            >
                <Modal.Header>
                    <Modal.Title>
                        Delete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the request?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowDeletePopup(false)}
                            id="delete-no-btn">No</Button>
                    <Button variant={"danger"} onClick={handleDelete} id="delete-yes-btn">Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
};

export default MyRequest;
