import React, {useState} from 'react';
import {Form, Button, Card, ListGroup, Row} from 'react-bootstrap';
import CoSupervisorInput from "./CoSupervisorInput";
import {FaTimes} from "react-icons/fa";
import GroupInput from "./GroupInput";
import CdsInput from "./CdsInput";
import dayjs from "dayjs";

const ProposalForm = () => {
    const [proposal, setProposal] = useState({
        title: '',
        supervisor: '',
        coSupervisors: [],
        keywords: [],
        type: '',
        groups: [],
        description: '',
        requiredKnowledge: '',
        notes: [],
        expiration: dayjs(),
        level: '',
        cdS: [],
    });


    const [newKeyword, setNewKeyword] = useState('');

    const addCoSupervisor = (coSupervisor) => {
        setProposal({...proposal, coSupervisors: [...proposal.coSupervisors, {...coSupervisor}]});
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
        setProposal({...proposal, groups: [...proposal.groups, {...group}]});
    };

    const removeGroup = (index) => {
        const updatedGroups = [...proposal.groups];
        updatedGroups.splice(index, 1);
        setProposal({...proposal, groups: updatedGroups});
    };
    const addCds = (cds) => {
        setProposal({...proposal, cdS: [...proposal.cdS, {...cds}]});
    };

    const removeCds = (index) => {
        const updatedCds = [...proposal.cdS];
        updatedCds.splice(index, 1);
        setProposal({...proposal, cdS: updatedCds});
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Send `proposal` data to the server via a POST request here
        console.log(proposal);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <div className="col-md-6 col-sm-12">
                    <Form.Group controlId="title">
                        <Form.Label className="h3">Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={proposal.title}
                            onChange={(e) => setProposal({...proposal, title: e.target.value})}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6 col-sm-12">
                    <Form.Group controlId="type">
                        <Form.Label className="h3">Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter type"
                            value={proposal.type}
                            onChange={(e) => setProposal({...proposal, type: e.target.value})}
                        />
                    </Form.Group>
                </div>
            </Row>
            <Row className={"mt-3"}>
                <div className="col-md-6 col-sm-12">
                    <Form.Group controlId="level">
                        <Form.Label className="h3">Level</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter level"
                            value={proposal.level}
                            onChange={(e) => setProposal({...proposal, level: e.target.value})}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6 col-sm-12">
                    <Form.Group controlId="expiration">
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
                <div className="col-md-6 col-sm-12">
                    <Form.Group controlId="supervisor">
                        <Form.Label className="h3">Supervisor</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter supervisor"
                            value={proposal.supervisor}
                            onChange={(e) => setProposal({...proposal, supervisor: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Label className="h3">Co-Supervisors</Form.Label>
                    <Card className={"mt-3 mb-3"}>
                        <Card.Body>
                            <CoSupervisorInput onAddCoSupervisor={addCoSupervisor}/>

                            <ListGroup className={"mt-3"}>
                                {proposal.coSupervisors.map((cs, index) => (<ListGroup.Item key={index}>
                                    {cs.name} {cs.surname} - {cs.email} &nbsp;
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
                <div className="col-md-6 col-sm-12">

                    <Form.Label className="h3">Research Groups</Form.Label>
                    <Card className={"mt-3 mb-3"}>
                        <Card.Body>
                            <GroupInput onAddGroup={addGroup}/>

                            <ListGroup className={"mt-3"}>
                                {proposal.groups.map((g, index) => (<ListGroup.Item key={index}>
                                    {g.name} &nbsp;
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
                <div className="col-md-6 col-sm-12">
                    <Form.Label className="h3">Keywords</Form.Label>
                    <Card className={"mb-3"}>
                        <Card.Body>

                            <ListGroup controlId="newKeyword">
                                <div className="d-flex align-items-center">
                                    <div className="col-md-8">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter keyword"
                                            value={newKeyword}
                                            onChange={(e) => setNewKeyword(e.target.value)}
                                        />
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="col-md-4">
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
                <div className="col-md-6 col-sm-12">
                    <Form.Group controlId="description">
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
                <div className="col-md-6 col-sm-12">
                    <Form.Group controlId="requiredKnoledge">
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
                <div className="col-md-6 col-sm-12">
                    <Form.Group controlId="notes">
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
                            {cds.name} &nbsp;
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
        </Form>);
};

export default ProposalForm;