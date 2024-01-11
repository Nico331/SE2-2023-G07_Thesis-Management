import React, {useContext, useEffect, useState} from 'react';
import {Form, Button, Card, ListGroup, Row, Container, Alert} from 'react-bootstrap';
import CoSupervisorInput from "./CoSupervisorInput";
import {FaTimes} from "react-icons/fa";
import GroupInput from "./GroupInput";
import CdsInput from "./CdsInput";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";
import {useNavigate} from "react-router-dom";
import ProfessorService from "../../services/ProfessorService";
import {UserContext} from "../../contexts/UserContexts";

interface Professor {
    id: string;
    name: string;
    surname: string;
}
interface ExternalCoSupervisor {
    email: string;
    name: string;
    surname: string;
}

interface Proposal {
    id: string | null;
    archived: string;
    title: string;
    supervisor: string;
    coSupervisors: string[];
    externalCoSupervisors: ExternalCoSupervisor[];
    keywords: string[];
    type: string;
    groups: string[];
    description: string;
    requiredKnowledge: string;
    notes: string;
    expiration: dayjs.Dayjs;
    level: string;
    cdS: string[];
}

const ProposalForm: React.FC = () => {
    const {user, setUser} = useContext(UserContext);
    const [proposal, setProposal] = useState<Proposal>({
        id: null,
        archived: 'NOT_ARCHIVED',
        title: '',
        supervisor: JSON.parse(user).id,
        coSupervisors: [],
        externalCoSupervisors: [],
        keywords: [],
        type: '',
        groups: [],
        description: '',
        requiredKnowledge: '',
        notes: '',
        expiration: dayjs(),
        level: '',
        cdS: [],
    });

    const [professors, setProfessors] = useState<Professor[]>([]);

    const [isScreenSmall, setIsScreenSmall] = useState(window.matchMedia('(max-width: 995px)').matches);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.matchMedia('(max-width: 995px)').matches);
        };

        const mediaQueryList = window.matchMedia('(max-width: 995px)');
        mediaQueryList.addListener(handleResize);

        // Pulizia dell'event listener
        return () => {
            mediaQueryList.removeListener(handleResize);
        };
    }, []);

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

    const [newKeyword, setNewKeyword] = useState<string>('');

    const addCoSupervisor = (coSupervisor: string, externalCoSupervisor: ExternalCoSupervisor) => {
        if(!coSupervisor){
            setProposal({...proposal, externalCoSupervisors: [...proposal.externalCoSupervisors, externalCoSupervisor]});
        }else{
            setProposal({...proposal, coSupervisors: [...proposal.coSupervisors, coSupervisor]});
        }
    };

    const removeCoSupervisor = (index: number) => {
        const updatedCoSupervisors = [...proposal.coSupervisors];
        updatedCoSupervisors.splice(index, 1);
        setProposal({...proposal, coSupervisors: updatedCoSupervisors});
    };
    const removeCoSupervisorExt = (index: number) => {
        const updatedCoSupervisors = [...proposal.externalCoSupervisors];
        updatedCoSupervisors.splice(index, 1);
        setProposal({...proposal, externalCoSupervisors: updatedCoSupervisors});
    };

    const addKeyword = () => {
        if (newKeyword) {
            setProposal({...proposal, keywords: [...proposal.keywords, newKeyword]});
            setNewKeyword('');
        }
    };

    const removeKeyword = (index: number) => {
        const updatedKeywords = [...proposal.keywords];
        updatedKeywords.splice(index, 1);
        setProposal({...proposal, keywords: updatedKeywords});
    };

    const addGroup = (group: string) => {
        setProposal({...proposal, groups: [...proposal.groups, group]});
    };

    const removeGroup = (index: number) => {
        const updatedGroups = [...proposal.groups];
        updatedGroups.splice(index, 1);
        setProposal({...proposal, groups: updatedGroups});
    };

    const addCds = (cds: string) => {
        setProposal({...proposal, cdS: [...proposal.cdS, cds]});
    };

    const removeCds = (index: number) => {
        const updatedCds = [...proposal.cdS];
        updatedCds.splice(index, 1);
        setProposal({...proposal, cdS: updatedCds});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        let errorMessage = '';
        if (proposal.title.length === 0) {
            valid = false;
            errorMessage += `Title should have a value, `;
        }
        if (proposal.type.length === 0) {
            valid = false;
            errorMessage += `Type should have a value, `;
        }
        if (proposal.level.length === 0) {
            valid = false;
            errorMessage += `Level should have a value, `;
        }
        if (proposal.supervisor.length === 0) {
            valid = false;
            errorMessage += `Supervisor should have a value, `;
        }

        if (valid) {
            ProposalService.createProposal(proposal)
                .then(() => {
                    setAlert({type: 'success', message: 'The proposal has been created correctly! Redirecting to the homepage in 3 seconds...'});
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                })
                .catch(() => {
                    setAlert({type: 'danger', message: 'Error!'});
                });
        } else {
            setValidated(true);
            setAlert({type: 'danger', message: errorMessage});
        }
    };

    // @ts-ignore
    return (
        <Container className={isScreenSmall ? "p-0" : ""}>
            <h1 style={{marginTop: "110px"}}>New Thesis Proposal</h1>
            <Button variant="info" onClick={()=>{
                setProposal({
                    id: null,
                    archived: 'NOT_ARCHIVED',
                    title: 'Machine learning techniques for optimizing energy consumption in buildings',
                    supervisor: JSON.parse(user).id,
                    coSupervisors: ['p300002'],
                    externalCoSupervisors: [{name:"Dario", surname:"Marchitelli", email:"dario002@hotmail.it"}],
                    keywords: ['Artificial Intelligence', 'Artificial Neural Networks', 'Neural Networks'],
                    type: 'Development',
                    groups: ['DAUIN'],
                    description: 'Development of a predictive control model with innovative techniques of machine learning for the control of heating and cooling of buildings',
                    requiredKnowledge: 'C++, machine learning',
                    notes: 'The thesis project could be used by an external company',
                    expiration: dayjs('2024-02-04').add(1, 'hour'),
                    level: 'Masters',
                    cdS: ['Computer Engineering'],
                });
            }}>
                <i className="bi bi-database"></i> Populate with Test Data
            </Button>
            <Form noValidate validated={validated} className="mt-4" onSubmit={handleSubmit}>
                <Row>
                    {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Group id="title">
                            <Form.Label className="h3">Title*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter title"
                                value={proposal.title}
                                onChange={(e) => setProposal({...proposal, title: e.target.value})}
                                id="title-input"
                            />
                        </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Group id="type">
                            <Form.Label className="h3">Type*</Form.Label>
                            <Form.Control required as="select" value={proposal.type}
                                          onChange={(e) => setProposal({...proposal, type: e.target.value})}
                                          id="type-input">
                                <option value="">Select the type</option>
                                <option value="In company">In company</option>
                                <option value="Experimental">Experimental</option>
                                <option value="Literature based">Literature based</option>
                                <option value="Theoretical">Theoretical</option>
                                <option value="Development">Development</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                </Row>

                <Row>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Group id="level">
                            <Form.Label className="h3">Level*</Form.Label>
                            <Form.Control required as="select" value={proposal.level}
                                          onChange={(e) => setProposal({...proposal, level: e.target.value})}
                                          id="level-input">
                                <option value="">Select the type</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Group id="expiration">
                            <Form.Label className="h3">Expiration*</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                placeholder="Enter expiration"
                                value={proposal.expiration.format("YYYY-MM-DD")}
                                onChange={(e) => {
                                    e.target.value === "" ?
                                        setProposal({...proposal, expiration: dayjs()})
                                    :
                                        setProposal({...proposal, expiration: dayjs(e.target.value)});
                                }}
                                min={new Date().toISOString().split("T")[0]}
                                id="exp-input"
                            />
                        </Form.Group>
                    </div>
                </Row>

                <Row>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Group id="supervisor">
                            <Form.Label className="h3">Supervisor*</Form.Label>
                            <Form.Control as="select" value={proposal.supervisor} disabled
                                          onChange={(e) => setProposal({...proposal, supervisor: e.target.value})}
                                          id="supervisor">
                                <option value="">Select the supervisor</option>
                                {
                                    professors.map((professor) => <option
                                        value={professor.id}>{professor.name}{' '}{professor.surname}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Label className="h3 mt-3">Co-Supervisors</Form.Label>
                        <Card className={"mb-3"}>
                            <Card.Body>
                                <CoSupervisorInput onAddCoSupervisor={addCoSupervisor}
                                                   professors={professors.filter((professor) =>
                                                       !(proposal?.coSupervisors.includes(professor.id)))}/>
                                <br/>
                                <h5>
                                    Internal Co-Supervisors
                                </h5>
                                <ListGroup className={"mt-3"}>
                                    {proposal.coSupervisors.map((cs, index) => (<ListGroup.Item key={index}>
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
                                <h5>
                                    External Co-Supervisors
                                </h5>
                                <ListGroup className={"mt-3"}>
                                    {proposal.externalCoSupervisors.map((cs: ExternalCoSupervisor, index) => (
                                        <ListGroup.Item key={index}>
                                        { cs.email} &nbsp;
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="float-right"
                                            onClick={() => removeCoSupervisorExt(index)}
                                        >
                                            Remove
                                        </Button>
                                    </ListGroup.Item>))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Label className="h3">Research Groups</Form.Label>
                        <Card className={"mb-3"}>
                            <Card.Body>
                                <GroupInput onAddGroup={addGroup}/>
                                <ListGroup className={"mt-3"}>
                                    {proposal.groups.map((g, index) => (<ListGroup.Item key={index}>
                                        {g} &nbsp;
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="float-right"
                                            onClick={() => removeGroup(index)}
                                        >
                                            Remove
                                        </Button>
                                    </ListGroup.Item>))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                </Row>

                <Row>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Label className="h3">Keywords</Form.Label>
                        <Card className={"mb-3"}>
                            <Card.Body>
                                <ListGroup>
                                    <div className="d-flex align-items-center">
                                        <div className="col-lg-8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter keyword"
                                                value={newKeyword}
                                                onChange={(e) => setNewKeyword(e.target.value)}
                                                id="keyword-input"
                                            />
                                        </div>
                                        &nbsp;&nbsp;
                                        <div className="col-lg-4">
                                            <Button id='add-keyword-btn' variant="primary" onClick={addKeyword}>
                                                Add keyword
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        {proposal.keywords.map((keyword, index) => (
                                            <Button variant="primary" key={index} className="m-2"
                                                    onClick={() => removeKeyword(index)}>
                                                {keyword}{' '}<FaTimes/>
                                            </Button>))}
                                    </div>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Group id="description">
                            <Form.Label className="h3">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter description"
                                value={proposal.description}
                                onChange={(e) => setProposal({...proposal, description: e.target.value})}
                                id="description"
                            />
                        </Form.Group>
                    </div>
                </Row>
                <Row>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Group id="requiredKnoledge">
                            <Form.Label className="h3">Required Knowledge</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter required knowloedge"
                                value={proposal.requiredKnowledge}
                                onChange={(e) => setProposal({...proposal, requiredKnowledge: e.target.value})}
                                id="requiredKnoledge"
                            />
                        </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-4">
                        <Form.Group id="notes">
                            <Form.Label className="h3">Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter notes"
                                value={proposal.notes}
                                onChange={(e) => setProposal({...proposal, notes: e.target.value})}
                                id="notes"
                            />
                        </Form.Group>
                    </div>
                </Row>
                <br/>
                <div className="mt-4 4">
                    <Form.Label className="h3">CdS</Form.Label>
                    <Card className={"mb-3"}>
                        <Card.Body>
                            <CdsInput onAddCds={addCds}/>
                            <ListGroup className={"mt-3"}>
                                {proposal.cdS.map((cds, index) => (<ListGroup.Item key={index}>
                                    {cds} &nbsp;
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="float-right"
                                        onClick={() => removeCds(index)}
                                    >
                                        Remove
                                    </Button>
                                </ListGroup.Item>))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>

                {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
                <br/>
                <Button id='submit-btn' variant="primary" type="submit">
                    Submit
                </Button>
                <br/><br/>
            </Form>
        </Container>
    );
};

export default ProposalForm;
