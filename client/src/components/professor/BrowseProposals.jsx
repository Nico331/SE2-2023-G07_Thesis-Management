import {
    Container,
    Row,
    Col,
    ListGroupItem,
    Card,
    CardHeader,
    Collapse,
    CardBody,
    Button,
    ListGroup, Modal
} from "react-bootstrap";
import React, {useState} from "react";
import ProfessorModalOfProposal from "./ProfessorModalOfProposal";


function ProfessorBrowseProposals (props){

    const prop = [{id: 1, title: "prop1", supervisor: "sup1", keywords:["key1", "key2", "key3"], type: "in company", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "DAUIN", expiration: "2024/05/25", level: "master", cds: "computer engineering"},
        {id: 2, title: "prop2", supervisor: "sup2", keywords:["key1", "key2"], type: "experimental", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "DAUIN", expiration: "2024/07/02", level: "bachelor", cds: "computer engineering"},
        {id: 3, title: "prop3", supervisor: "sup2", keywords:["key1", "key2", "key3"], type: "experimental", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "Ingegneri del Futuro", expiration: "2024/09/14", level: "bachelor", cds: "electronic engineering"},
        {id: 4, title: "prop4", supervisor: "sup1", keywords:["key1", "key2", "key3"], type: "theoretical", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "DAUIN", expiration: "2024/05/25", level: "master", cds: "computer engineering"},
        {id: 5, title: "prop5", supervisor: "sup3", keywords:["key1", "key2"], type: "development", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "Ingegneri del Futuro", expiration: "2024/07/02", level: "bachelor", cds: "computer engineering"},
        {id: 6, title: "prop6", supervisor: "sup2", keywords:["key1", "key2", "key3"], type: "theoretical", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "Ingegneri del Futuro", expiration: "2024/08/10", level: "bachelor", cds: "Chemical engineering"}]

    const [proposals, setProposals] = useState(prop)
    const [propsOnScreen, setPropsOnScreen] = useState(prop);
    const [collapseState, setCollapseState] = useState(prop.reduce((a, v) => ({ ...a, [v.id]: false }), {}));
    const [showModal, setShowModal] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [proposalID, setProposalID] = useState('');


    const handleShow = (proId) => {
        setShowModal(true);
        setProposalID(proId);
        props.setProfessorProposalID(proId);
    }

    const handleClick = (navId) =>
        setCollapseState((prev) => {
            return { ...prev, [navId]: !prev[navId] };
        });

    const deleteproposal = (proid) => {

    }

    return(
        <>
            <Container fluid className="p-0">
                <Row>
                    <Col md={4} style={{backgroundColor:"#e0e0e0", height:'100vh'}}>

                    </Col>

                    <Col md={8}>
                        <Container className="mx-0 ms-2 d-flex" style={{marginTop:"10px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-mortarboard-fill mt-1" viewBox="0 0 16 16">
                                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
                            </svg>
                            <Container>
                                <h4 className="ms-1">Thesis Proposals</h4>
                                <Container style={{position:"relative", height:"2px", backgroundColor:"black"}}></Container>
                            </Container>
                        </Container>

                        <ListGroup className="mt-3" variant="flush" style={{maxHeight:"90vh", overflowY:"auto"}}>
                            {propsOnScreen.map((p) =>
                                <ListGroupItem className="mt-2 p-3" key={p.id}>
                                    <Card>
                                        <CardHeader onClick={() => handleClick(p.id)} style={{ cursor: "pointer" }}>
                                            {p.title}
                                            {collapseState[p.id] ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill ms-2" viewBox="0 0 16 16">
                                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill ms-2" viewBox="0 0 16 16">
                                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                                </svg>
                                            }
                                        </CardHeader>
                                        <Collapse in={collapseState[p.id]}>
                                            <CardBody>
                                                <Container className="ms-0 p-0">
                                                    <Container>Supervisor: {p.supervisor}</Container>
                                                    <Container>CDS: {p.cds}</Container>
                                                    <Container>Expiration Date: {p.expiration}</Container>
                                                    <Button className="ms-2 mt-2" onClick={() => handleShow(p.id)}>Show Proposal Details</Button>
                                                    <Button className="ms-2 mt-2" variant={'secondary'} > Modify </Button>
                                                    <Button className="ms-2 mt-2" variant={'danger'} onClick={() => setShowPopUp(true)}> Delete </Button>
                                                </Container>
                                            </CardBody>
                                        </Collapse>
                                    </Card>
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            {showModal ? <ProfessorModalOfProposal showModal={showModal} setShowModal={setShowModal} proposalID={proposalID} propsalData={propsOnScreen.reduce((a, v) => ({ ...a, [v.id]: v }), {})}/> : null}

            {showPopUp ? <DeleteProposal setShowPopUp={setShowPopUp} /> : null}
        </>
    )
}

const DeleteProposal = (props) => {
    return (
        <>
            <Modal show={props.setShowPopUp}>
                <Modal.Header>
                    <Modal.Title>
                        Are you sure you want to delete the proposal?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => props.setShowPopUp(false)}>No</Button>
                    <Button variant={"danger"} onClick={() => }>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export {ProfessorBrowseProposals, DeleteProposal};