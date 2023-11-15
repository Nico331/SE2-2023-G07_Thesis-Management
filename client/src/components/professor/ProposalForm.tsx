import React, {useState} from 'react';
import {Form, Button, Card, ListGroup, Row, Container} from 'react-bootstrap';
import CoSupervisorInput from "./CoSupervisorInput";
import {FaTimes} from "react-icons/fa";
import GroupInput from "./GroupInput";
import CdsInput from "./CdsInput";
import dayjs from "dayjs";
import ProposalService from "../../services/ProposalService";

const ProposalForm = () => {
    const [proposal, setProposal] = useState({
        id: null,
        archived: false,
        title: '',
        supervisor: '',
        coSupervisors: [],
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


    const [newKeyword, setNewKeyword] = useState('');

    const addCoSupervisor = (coSupervisor) => {
        setProposal({...proposal, coSupervisors: [...proposal.coSupervisors, coSupervisor]});
    };

    const removeCoSupervisor = (index) => {
        const updatedCoSupervisors = [...proposal.coSupervisors];
        updatedCoSupervisors.splice(index, 1);
        setProposal({...proposal, coSupervisors: updatedCoSupervisors});
    };

    const addKeyword = () => {
        if (newKeyword) {
            setProposal({...proposal, keywords: [...proposal.keywords, newKeyword]});
            setNewKeyword('');
        }
    };

    const removeKeyword = (index) => {
        const updatedKeywords = [...proposal.keywords];
        updatedKeywords.splice(index, 1);
        setProposal({...proposal, keywords: updatedKeywords});
    };


    const addGroup = (group) => {
        setProposal({...proposal, groups: [...proposal.groups, group]});
    };

    const removeGroup = (index) => {
        const updatedGroups = [...proposal.groups];
        updatedGroups.splice(index, 1);
        setProposal({...proposal, groups: updatedGroups});
    };
    const addCds = (cds) => {
        setProposal({...proposal, cdS: [...proposal.cdS, cds]});
    };

    const removeCds = (index) => {
        const updatedCds = [...proposal.cdS];
        updatedCds.splice(index, 1);
        setProposal({...proposal, cdS: updatedCds});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await ProposalService.createProposal(proposal);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <div className="col-lg-6 col-md-12">
                        <Form.Group controlid="title">
                            <Form.Label className="h3">Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={proposal.title}
                                onChange={(e) => setProposal({...proposal, title: e.target.value})}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <Form.Group controlid="type">
                            <Form.Label className="h3">Type</Form.Label>
                            <Form.Control as="select" custom value={proposal.type}
                                          onChange={(e) => setProposal({...proposal, type: e.target.value})}>
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
                <Row className={"mt-3"}>
                    <div className="col-lg-6 col-md-12">
                        <Form.Group controlid="level">
                            <Form.Label className="h3">Level</Form.Label>
                            <Form.Control as="select" custom value={proposal.level}
                                          onChange={(e) => setProposal({...proposal, level: e.target.value})}>
                                <option value="">Select the type</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <Form.Group controlid="expiration">
                            <Form.Label className="h3">Expiration</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter expiration"
                                value={proposal.expiration.format("YYYY-MM-DD")}
                                onChange={(e) => setProposal({...proposal, expiration: dayjs(e.target.value)})}
                            />
                        </Form.Group>
                    </div>
                </Row>
                <Row className={"mt-3"}>
                    <div className="col-lg-6 col-md-12">
                        <Form.Group controlid="supervisor">
                            <Form.Label className="h3">Supervisor</Form.Label>
                            <Form.Control as="select" custom value={proposal.supervisor}
                                          onChange={(e) => setProposal({...proposal, supervisor: e.target.value})}>
                                <option value="">Select the supervisor</option>
                                <option value="1">Marco Torchiano</option>
                                <option value="2">Riccardo Sisto</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Label className="h3">Co-Supervisors</Form.Label>
                        <Card className={"mt-3 mb-3"}>
                            <Card.Body>
                                <CoSupervisorInput onAddCoSupervisor={addCoSupervisor}/>

                                <ListGroup className={"mt-3"}>
                                    {proposal.coSupervisors.map((cs, index) => (<ListGroup.Item key={index}>
                                        {cs} Nome {cs} Cognome  - {cs} Email &nbsp;
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
                            </Card.Body>

                        </Card>
                    </div>
                    <div className="col-lg-6 col-md-12">

                        <Form.Label className="h3">Research Groups</Form.Label>
                        <Card className={"mt-3 mb-3"}>
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
                <Row className={"mt-3"}>
                    <div className="col-lg-6 col-md-12">
                        <Form.Label className="h3">Keywords</Form.Label>
                        <Card className={"mb-3"}>
                            <Card.Body>

                                <ListGroup controlid="newKeyword">
                                    <div className="d-flex align-items-center">
                                        <div className="col-lg-8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter keyword"
                                                value={newKeyword}
                                                onChange={(e) => setNewKeyword(e.target.value)}
                                            />
                                        </div>
                                        &nbsp;&nbsp;
                                        <div className="col-lg-4">
                                            <Button variant="primary" onClick={addKeyword}>
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
                    <div className="col-lg-6 col-md-12">
                        <Form.Group controlid="description">
                            <Form.Label className="h3">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter description"
                                value={proposal.description}
                                onChange={(e) => setProposal({...proposal, description: e.target.value})}
                            />
                        </Form.Group>
                    </div>
                </Row>
                <Row className={"mt-3"}>
                    <div className="col-lg-6 col-md-12">
                        <Form.Group controlid="requiredKnoledge">
                            <Form.Label className="h3">Required Knowledge</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter required knowloedge"
                                value={proposal.requiredKnowledge}
                                onChange={(e) => setProposal({...proposal, requiredKnowledge: e.target.value})}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <Form.Group controlid="notes">
                            <Form.Label className="h3">Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter notes"
                                value={proposal.notes}
                                onChange={(e) => setProposal({...proposal, notes: e.target.value})}
                            />
                        </Form.Group>
                    </div>
                </Row>
                <br/>
                <Form.Label className="h3">CdS</Form.Label>
                <Card className={"mt-3 mb-3"}>
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
                <br/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br/><br/>
            </Form>
        </Container>
    );
};

export default ProposalForm;
