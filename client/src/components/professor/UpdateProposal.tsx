import React, {useContext, useEffect, useState} from "react";
import {Alert, Button, Card, Container, Form, ListGroup, Modal, Row, Col} from "react-bootstrap";
import dayjs from "dayjs";
import CoSupervisorInput from "./CoSupervisorInput";
import GroupInput from "./GroupInput";
import {FaTimes} from "react-icons/fa";
import CdsInput from "./CdsInput";
import ProfessorService from "../../services/ProfessorService";
import ProposalService from "../../services/ProposalService";
import { UserContext } from "../../contexts/UserContexts";


function UpdateProposal (props) {

    const {user} = useContext(UserContext);

    const [updatedProp, setUpdatedProp] = useState({
        id: null,
        title: props.modifyProposal.title,
        supervisor: JSON.parse(user).id,
        coSupervisors: props.modifyProposal.coSupervisors,
        externalCoSupervisors: props.modifyProposal.externalCoSupervisors || [],
        keywords: props.modifyProposal.keywords,
        type: props.modifyProposal.type,
        groups: props.modifyProposal.groups,
        description: props.modifyProposal.description,
        requiredKnowledge: props.modifyProposal.requiredKnowledge,
        notes: props.modifyProposal.notes,
        expiration: dayjs(props.modifyProposal.expiration),
        level: props.modifyProposal.level,
        cdS: props.modifyProposal.cdS,
        archived: props.modifyProposal.archived,
    });

    interface ExternalCoSupervisor {
        email: string;
        name: string;
        surname: string;
    }

    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        ProfessorService.fetchAllProfessors().then((res) => {
            setProfessors(res.data);
        });
    }, []);

    /* useEffect(() => {
        ProposalService.getProposalById(props.modifyProposal.id).then((res) =>{
            console.log("getbyid: " + res.data.title);
        })
    }, []); */


    const [coAlert, setCoAlert] = useState({type: "", message: "", show: false});

    const [suPalert, setSuPalert] = useState({type: "", message: "", show: false});

    const [alert, setAlert] = useState({type: "", message: ""});

    const [newKeyword, setNewKeyword] = useState('');

    const [isScreenSmall, setIsScreenSmall] = useState(window.matchMedia('(max-width: 995px)').matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 995px)');

        const handleResize = (event) => {
            setIsScreenSmall(event.matches);
        };

        mediaQueryList.addEventListener('change', handleResize);

        return () => {
            mediaQueryList.removeEventListener('change', handleResize);
        };
    }, []);

    console.log({updatedProp})

    const addCoSupervisor = (coSupervisor, externalCosupervisor) => {
        if(externalCosupervisor){
            setUpdatedProp({...updatedProp, externalCoSupervisors: [...updatedProp.externalCoSupervisors, externalCosupervisor]});
            return
        }
        if (coSupervisor !== updatedProp.supervisor) {
            setCoAlert({type: "", message: "", show: false});
            setUpdatedProp({...updatedProp, coSupervisors: [...updatedProp.coSupervisors, coSupervisor]});
        } else {
            setCoAlert({type: "danger", message: "The supervisor cannot be the same as the co-supervisor!", show: true});
            setTimeout(() => {
                setCoAlert({type: "", message: "", show: false});
            }, 5000);

        }
    };

    const removeCoSupervisor = (index) => {
        const updatedCoSupervisors = [...updatedProp.coSupervisors];
        updatedCoSupervisors.splice(index, 1);
        setUpdatedProp({...updatedProp, coSupervisors: updatedCoSupervisors});
    };
    const removeCoSupervisorExt = (index: number) => {
        const updatedCoSupervisors = [...updatedProp.externalCoSupervisors];
        updatedCoSupervisors.splice(index, 1);
        setUpdatedProp({...updatedProp, externalCoSupervisors: updatedCoSupervisors});
    };

    const addKeyword = () => {
        if (newKeyword) {
            setUpdatedProp({...updatedProp, keywords: [...updatedProp.keywords, newKeyword]});
            setNewKeyword('');
        }
    };

    const removeKeyword = (index) => {
        const updatedKeywords = [...updatedProp.keywords];
        updatedKeywords.splice(index, 1);
        setUpdatedProp({...updatedProp, keywords: updatedKeywords});
    };


    const addGroup = (group) => {
        setUpdatedProp({...updatedProp, groups: [...updatedProp.groups, group]});
    };

    const removeGroup = (index) => {
        const updatedGroups = [...updatedProp.groups];
        updatedGroups.splice(index, 1);
        setUpdatedProp({...updatedProp, groups: updatedGroups});
    };
    const addCds = (cds) => {
        setUpdatedProp({...updatedProp, cdS: [...updatedProp.cdS, cds]});
    };

    const removeCds = (index) => {
        const updatedCds = [...updatedProp.cdS];
        updatedCds.splice(index, 1);
        setUpdatedProp({...updatedProp, cdS: updatedCds});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setShowModifyPage(false);
        let valid = true;
        let errorMessage = "";
        if(updatedProp.title.length === 0){
            valid = false;
            errorMessage += `Title should have a value`
        }
        if(updatedProp.type.length === 0){
            valid = false;
            errorMessage += `Type should have a value`
        }
        if(updatedProp.level.length === 0){
            valid = false;
            errorMessage += `Level should have a value`
        }
        if(updatedProp.supervisor.length === 0){
            valid = false;
            errorMessage += `Supervisor should have a value`
        }

        if(valid && props.pagetype === "modify"){
            updatedProp.id = props.modifyProposal.id;
            ProposalService.updateProposal(updatedProp.id, updatedProp).then(() => {
                props.setSuccessCopy({show: true, text: "Proposal updated successfully!", type: "success"});
                props.setRefresh((r)=> !r)
            }).catch(() => {
                props.setSuccessCopy({show: true, text: "Something unexpexted happened!", type: "danger"});
            });
        } else if (valid && props.pagetype === "copy") {
            ProposalService.createProposal(updatedProp).then(() => {
                props.setSuccessCopy({show: true, text: "Proposal created successfully!", type: "success"});
                props.setRefresh((r)=> !r)
            }).catch(() => {
                props.setSuccessCopy({show: true, text: "Something unexpexted happened!", type: "danger"});
            });
        } else {
            props.setSuccessCopy({show: true, text: errorMessage, type: "danger"});
        }
    };

    // -------------------------------------------

    return (
            <Modal
                show={true}
                size={"xl"}
                onHide={() => props.setShowModifyPage(false)}
            >
                <Modal.Header closeButton>
                    {props.pagetype === "modify" ?
                        <Modal.Title>Update proposal</Modal.Title>
                        :
                        <Modal.Title>Create a copy</Modal.Title>
                    }

                </Modal.Header>

                <Modal.Body>

                <Container>

                </Container>

                <Container className={isScreenSmall ? "p-0" : ""}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
                            <div className="col-lg-6 col-md-12 mt-4">
                                <Form.Group id="title">
                                    <Form.Label className="h3">Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder= {props.modifyProposal.title}
                                        value={updatedProp.title}
                                        onChange={(e) => setUpdatedProp({...updatedProp, title: e.target.value})}
                                        id="title-input"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-lg-6 col-md-12 mt-4">
                                <Form.Group id="type">
                                    <Form.Label className="h3">Type</Form.Label>
                                    <Form.Control as="select"
                                        value={updatedProp.type}
                                        onChange={(e) => setUpdatedProp({...updatedProp, type: e.target.value})}
                                        id="type-input"
                                    >
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
                                    <Form.Label className="h3">Level</Form.Label>
                                    <Form.Control as="select"  value={updatedProp.level}
                                                  onChange={(e) => setUpdatedProp({...updatedProp, level: e.target.value})}
                                                  id="level-input"
                                    >
                                        <option value="">Select the type</option>
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Masters">Masters</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-lg-6 col-md-12 mt-4">
                                <Form.Group id="expiration">
                                    <Form.Label className="h3">Expiration</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter expiration"
                                        value={updatedProp.expiration.format("YYYY-MM-DD")}
                                        onChange={(e) => setUpdatedProp({...updatedProp, expiration: dayjs(e.target.value)})}
                                        min={new Date().toISOString().split("T")[0]}
                                        id="exp-input"
                                    />
                                </Form.Group>
                            </div>
                        </Row>

                        <Row className="mt-4">
                            <Col lg={6} md={12}>
                                <Form.Group id="supervisor">
                                    <Form.Label className="h3">Supervisor</Form.Label>
                                    <Form.Control type="text"
                                        placeholder={JSON.parse(user).name + ' ' + JSON.parse(user).surname}
                                        disabled
                                        readOnly/>
                                    {suPalert.show ?
                                        <Alert className="mt-3" variant={suPalert.type} show={suPalert.show} onClose={() => setSuPalert(false)} dismissible>
                                            {suPalert.message}
                                        </Alert>
                                    : null}
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={12}> </Col>
                        </Row>

                        <Row>
                            <div className="col-lg-6 col-md-12 mt-4">
                                <Form.Label className="h3">Co-Supervisors</Form.Label>
                                <Card className={"mb-3"}>
                                    <Card.Body>
                                        <CoSupervisorInput updatedProp={updatedProp} setCoAlert={setCoAlert} coAlert={coAlert} onAddCoSupervisor={addCoSupervisor} professors={professors}/>
                                        <br/>
                                        <h5>
                                            Internal Co-Supervisors
                                        </h5>
                                        <ListGroup className={"mt-3"}>
                                            {updatedProp.coSupervisors.map((cs, index) => (<ListGroup.Item key={index}>
                                                {professors.filter((p) => p.id == cs).map((professor) => professor.name + ' ' + professor.surname)} &nbsp;
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="float-right"
                                                    onClick={() => removeCoSupervisor(index)}
                                                    id={"remove-" + cs}
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
                                            {updatedProp.externalCoSupervisors.map((cs: ExternalCoSupervisor, index) => (
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
                                                </ListGroup.Item>))
                                            }
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
                                            {updatedProp.groups.map((g, index) => (<ListGroup.Item key={index}>
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
                                                    <Button variant="primary" onClick={addKeyword} id="add-keyword-btn">
                                                        Add keyword
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                {updatedProp.keywords.map((keyword, index) => (
                                                    <Button variant="primary" key={index} className="m-2"
                                                            onClick={() => removeKeyword(index)}
                                                            id={"remove-" + index}>
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
                                        value={updatedProp.description}
                                        onChange={(e) => setUpdatedProp({...updatedProp, description: e.target.value})}
                                    />
                                </Form.Group>
                            </div>
                        </Row>

                        <Row className={"mt-3"}>
                            <div className="col-lg-6 col-md-12">
                                <Form.Group id="requiredKnoledge">
                                    <Form.Label className="h3">Required Knowledge</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter required knowloedge"
                                        value={updatedProp.requiredKnowledge}
                                        onChange={(e) => setUpdatedProp({...updatedProp, requiredKnowledge: e.target.value})}
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
                                        value={updatedProp.notes}
                                        onChange={(e) => setUpdatedProp({...updatedProp, notes: e.target.value})}
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
                                        {updatedProp.cdS.map((cds, index) => (<ListGroup.Item key={index}>
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
                    </Form>
                </Container>
                </Modal.Body>
                <Modal.Footer className="mt-3">
                    <Button variant="danger" onClick={() => props.setShowModifyPage(false)}>Cancel</Button>
                    {props.pagetype === "modify" ? <Button onClick={(e) => handleSubmit(e)} id="update-btn">Update</Button> : <Button variant="success" onClick={(e) => handleSubmit(e)} id="create-copy-btn">Create a Copy</Button>}
                </Modal.Footer>
            </Modal>
    )
}

export default UpdateProposal;
