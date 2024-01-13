import React, {useContext, useEffect, useState} from "react";
import {Alert, Button, Card, Container, Form, ListGroup, Modal, Row, Col} from "react-bootstrap";
import dayjs from "dayjs";
import CoSupervisorInput from "./CoSupervisorInput";
import GroupInput from "./GroupInput";
import {FaTimes} from "react-icons/fa";
import CdsInput from "./CdsInput";
import ProfessorService from "../../services/ProfessorService";
import {useNavigate} from "react-router-dom";
import ProposalService from "../../services/ProposalService";
import { UserContext } from "../../contexts/UserContexts";
import { Prev } from "react-bootstrap/esm/PageItem";


function UpdateProposal (props) {

    const {user, setUser} = useContext(UserContext);

    const [updatedprop, setUpdatedprop] = useState({
        id: null,
        title: props.modifyproposal.title,
        supervisor: JSON.parse(user).id,
        coSupervisors: props.modifyproposal.coSupervisors,
        externalCoSupervisors: props.modifyproposal.externalCoSupervisors || [],
        keywords: props.modifyproposal.keywords,
        type: props.modifyproposal.type,
        groups: props.modifyproposal.groups,
        description: props.modifyproposal.description,
        requiredKnowledge: props.modifyproposal.requiredKnowledge,
        notes: props.modifyproposal.notes,
        expiration: dayjs(props.modifyproposal.expiration),
        level: props.modifyproposal.level,
        cdS: props.modifyproposal.cdS,
        archived: props.modifyproposal.archived,
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
        ProposalService.getProposalById(props.modifyproposal.id).then((res) =>{
            console.log("getbyid: " + res.data.title);
        })
    }, []); */

    const navigate = useNavigate()


    const [coalert, setCoAlert] = useState({type: "", message: "", show: false});

    const [supalert, setSupAlert] = useState({type: "", message: "", show: false});

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

    const updateSupervisor = (newsupervisor) => {
        if (!updatedprop.coSupervisors.find((cs) => cs === newsupervisor ? true : false)) {
            setSupAlert({type: "", message: "", show: false});
            setUpdatedprop({...updatedprop, supervisor: newsupervisor});
        } else {
            setSupAlert({type: "danger", message: "The new supervisor is in the co-supervisors list.", show: true});
            setTimeout(() => {
                setSupAlert({type: "", message: "", show: false});
            }, 5000);
        }
    };

    console.log({updatedprop})

    const addCoSupervisor = (coSupervisor, externalCosupervisor) => {
        if(externalCosupervisor){
            setUpdatedprop({...updatedprop, externalCoSupervisors: [...updatedprop.externalCoSupervisors, externalCosupervisor]});
            return
        }
        if (coSupervisor !== updatedprop.supervisor) {
            setCoAlert({type: "", message: "", show: false});
            setUpdatedprop({...updatedprop, coSupervisors: [...updatedprop.coSupervisors, coSupervisor]});
        } else {
            setCoAlert({type: "danger", message: "The supervisor cannot be the same as the co-supervisor!", show: true});
            setTimeout(() => {
                setCoAlert({type: "", message: "", show: false});
            }, 5000);

        }
    };

    const removeCoSupervisor = (index) => {
        const updatedCoSupervisors = [...updatedprop.coSupervisors];
        updatedCoSupervisors.splice(index, 1);
        setUpdatedprop({...updatedprop, coSupervisors: updatedCoSupervisors});
    };
    const removeCoSupervisorExt = (index: number) => {
        const updatedCoSupervisors = [...updatedprop.externalCoSupervisors];
        updatedCoSupervisors.splice(index, 1);
        setUpdatedprop({...updatedprop, externalCoSupervisors: updatedCoSupervisors});
    };

    const addKeyword = () => {
        if (newKeyword) {
            setUpdatedprop({...updatedprop, keywords: [...updatedprop.keywords, newKeyword]});
            setNewKeyword('');
        }
    };

    const removeKeyword = (index) => {
        const updatedKeywords = [...updatedprop.keywords];
        updatedKeywords.splice(index, 1);
        setUpdatedprop({...updatedprop, keywords: updatedKeywords});
    };


    const addGroup = (group) => {
        setUpdatedprop({...updatedprop, groups: [...updatedprop.groups, group]});
    };

    const removeGroup = (index) => {
        const updatedGroups = [...updatedprop.groups];
        updatedGroups.splice(index, 1);
        setUpdatedprop({...updatedprop, groups: updatedGroups});
    };
    const addCds = (cds) => {
        setUpdatedprop({...updatedprop, cdS: [...updatedprop.cdS, cds]});
    };

    const removeCds = (index) => {
        const updatedCds = [...updatedprop.cdS];
        updatedCds.splice(index, 1);
        setUpdatedprop({...updatedprop, cdS: updatedCds});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setShowModifyPage(false);
        let valid = true;
        let errorMessage = "";
        if(updatedprop.title.length === 0){
            valid = false;
            errorMessage += `Title should have a value`
        }
        if(updatedprop.type.length === 0){
            valid = false;
            errorMessage += `Type should have a value`
        }
        if(updatedprop.level.length === 0){
            valid = false;
            errorMessage += `Level should have a value`
        }
        if(updatedprop.supervisor.length === 0){
            valid = false;
            errorMessage += `Supervisor should have a value`
        }

        if(valid && props.pagetype === "modify"){
            updatedprop.id = props.modifyproposal.id;
            ProposalService.updateProposal(updatedprop.id, updatedprop).then(() => {
                props.setShowAlertModal({show: true, text: "Proposal updated successfully!", type: "success"});
                props.setRefresh((r)=> !r)
            }).catch(() => {
                props.setShowAlertModal({show: true, text: "Something unexpexted happened!", type: "danger"});
            });
        } else if (valid && props.pagetype === "copy") {
            ProposalService.createProposal(updatedprop).then(() => {
                props.setShowAlertModal({show: true, text: "Proposal created successfully!", type: "success"});
                props.setRefresh((r)=> !r)
            }).catch(() => {
                props.setShowAlertModal({show: true, text: "Something unexpexted happened!", type: "danger"});
            });
        } else {
            props.setShowAlertModal({show: true, text: errorMessage, type: "danger"});
        }
    };

    // -------------------------------------------

    return (
        <>
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

                {/*/----------------------/*/}

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
                                        placeholder= {props.modifyproposal.title}
                                        value={updatedprop.title}
                                        onChange={(e) => setUpdatedprop({...updatedprop, title: e.target.value})}
                                        id="title-input"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-lg-6 col-md-12 mt-4">
                                <Form.Group id="type">
                                    <Form.Label className="h3">Type</Form.Label>
                                    <Form.Control as="select"
                                        value={updatedprop.type}
                                        onChange={(e) => setUpdatedprop({...updatedprop, type: e.target.value})}
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
                                    <Form.Control as="select"  value={updatedprop.level}
                                                  onChange={(e) => setUpdatedprop({...updatedprop, level: e.target.value})}
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
                                        value={updatedprop.expiration.format("YYYY-MM-DD")}
                                        onChange={(e) => setUpdatedprop({...updatedprop, expiration: dayjs(e.target.value)})}
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
                                    {supalert.show ?
                                        <Alert className="mt-3" variant={supalert.type} show={supalert.show} onClose={() => setSupAlert(false)} dismissible>
                                            {supalert.message}
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
                                        <CoSupervisorInput updatedprop={updatedprop} setCoAlert={setCoAlert} coalert={coalert} onAddCoSupervisor={addCoSupervisor} professors={professors}/>
                                        <br/>
                                        {/*<ListGroup className={"mt-3"}>*/}
                                        {/*    {updatedprop.coSupervisors.concat(updatedprop.externalCoSupervisors && updatedprop.externalCoSupervisors.map((it: ExternalCoSupervisor)=>it.email)).map((cs, index) => (<ListGroup.Item key={index}>*/}
                                        {/*        {professors.filter((p) => p.id == cs).length ? (professors.filter((p) => p.id == cs).map((professor) => professor.name + ' ' + professor.surname)) : cs} &nbsp;*/}
                                        {/*        <Button*/}
                                        {/*            variant="danger"*/}
                                        {/*            size="sm"*/}
                                        {/*            className="float-right"*/}
                                        {/*            onClick={() => removeCoSupervisor(index)}*/}
                                        {/*            id={"remove-" + cs}*/}
                                        {/*        >*/}
                                        {/*            Remove*/}
                                        {/*        </Button>*/}
                                        {/*    </ListGroup.Item>))}*/}
                                        {/*</ListGroup>*/}
                                        <h5>
                                            Internal Co-Supervisors
                                        </h5>
                                        <ListGroup className={"mt-3"}>
                                            {updatedprop.coSupervisors.map((cs, index) => (<ListGroup.Item key={index}>
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
                                            {updatedprop.externalCoSupervisors.map((cs: ExternalCoSupervisor, index) => (
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
                                            {updatedprop.groups.map((g, index) => (<ListGroup.Item key={index}>
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
                                                {console.log(updatedprop.keywords)}
                                                {updatedprop.keywords.map((keyword, index) => (
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
                                        value={updatedprop.description}
                                        onChange={(e) => setUpdatedprop({...updatedprop, description: e.target.value})}
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
                                        value={updatedprop.requiredKnowledge}
                                        onChange={(e) => setUpdatedprop({...updatedprop, requiredKnowledge: e.target.value})}
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
                                        value={updatedprop.notes}
                                        onChange={(e) => setUpdatedprop({...updatedprop, notes: e.target.value})}
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
                                        {updatedprop.cdS.map((cds, index) => (<ListGroup.Item key={index}>
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
                {/*-----------------------*/}
                <Modal.Footer className="mt-3">
                    <Button variant="danger" onClick={() => props.setShowModifyPage(false)}>Cancel</Button>
                    {props.pagetype === "modify" ? <Button onClick={(e) => handleSubmit(e)} id="update-btn">Update</Button> : <Button variant="success" onClick={(e) => handleSubmit(e)} id="create-copy-btn">Create a Copy</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateProposal;
