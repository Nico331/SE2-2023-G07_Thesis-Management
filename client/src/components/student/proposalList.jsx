import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../componentsStyle.css'
import {
    Navbar,
    Container,
    Image,
    Button,
    Collapse,
    ListGroup,
    ListGroupItem,
    Card,
    CardHeader, CardBody, Row, Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ModalOfProposal} from "./StudentSearch";
import {Sidebar} from "./FiltersSidebar";
import axios from 'axios';

const ProposalList = () => {

    const props = [{id: 1, title: "prop1", supervisor: "sup1", keywords:["key1, key2, key3"], type: "in company", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "DAUIN", expiration: "25/05/2024", level: "master", cds: "computer engineering"},
                                                {id: 2, title: "prop2", supervisor: "sup2", keywords:["key1, key2"], type: "experimental", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "DAUIN", expiration: "02/07/2024", level: "bachelor", cds: "computer engineering"},
                                                {id: 3, title: "prop3", supervisor: "sup2", keywords:["key1, key2, key3"], type: "experimental", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "Ingegneri del Futuro", expiration: "14/09/2024", level: "bachelor", cds: "electronic engineering"},
                                                {id: 4, title: "prop4", supervisor: "sup1", keywords:["key1, key2, key3"], type: "theoretical", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "DAUIN", expiration: "25/05/2024", level: "master", cds: "computer engineering"},
                                                {id: 5, title: "prop5", supervisor: "sup3", keywords:["key1, key2"], type: "development", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "Ingegneri del Futuro", expiration: "02/07/2024", level: "bachelor", cds: "computer engineering"},
                                                {id: 6, title: "prop6", supervisor: "sup2", keywords:["key1, key2, key3"], type: "theoretical", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", group: "Ingegneri del Futuro", expiration: "14/09/2024", level: "bachelor", cds: "Chemical engineering"}]

    const [proposals, setProposals] = useState(props)
    const [propsOnScreen, setPropsOnScreen] = useState(props);
    const [collapseState, setCollapseState] = useState(props.reduce((a, v) => ({ ...a, [v.id]: false }), {}));
    const [showModal, setShowModal] = useState(false);
    const [proposalID, setProposalID] = useState('');

    // useEffect(() => {
    //     axios.get("http://localhost:8081/API/proposals/")
    //         .then((response) => {
    //             setProposals(response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    const handleShow = (proId) => {
        setShowModal(true);
        setProposalID(proId);
    }

    const handleClick = (navId) =>
        setCollapseState((prev) => {
            return { ...prev, [navId]: !prev[navId] };
    });

    return (
        <>
            <Navbar bg="secondary" fixed="top" variant="dark"  className="navbar-padding">
                <Container>
                    <Link to={"/"}>
                        <Navbar.Brand>
                            <Navbar.Text>
                                <Image style={{ width: 160, height: 40 }} src={"../logo_thesis_management.png"}/>
                            </Navbar.Text>
                        </Navbar.Brand>
                    </Link>
                </Container>
            </Navbar>
            <Container fluid className="p-0" style={{height:"100vh"}}>
                <Row className="h-100">
                    <Sidebar proposals={proposals} propsOnScreen={propsOnScreen} setPropsOnScreen={setPropsOnScreen}/>
                    <Col sm={8}>
                        <Container className="mx-0 ms-2 d-flex" style={{marginTop:"80px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-mortarboard-fill mt-1" viewBox="0 0 16 16">
                                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
                            </svg>
                            <Container>
                                <h4 className="ms-1">Thesis Proposals</h4>
                                <Container style={{position:"relative", height:"2px", backgroundColor:"black"}}></Container>
                            </Container>
                        </Container>
                        <ListGroup className="mt-3" variant="flush" style={{maxHeight:"82vh", overflowY:"auto"}}>
                            {propsOnScreen.map((p) =>
                                <ListGroupItem className="mt-2 p-3">
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
            {showModal ? <ModalOfProposal showModal={showModal} setShowModal={setShowModal} propsalData={propsOnScreen.reduce((a, v) => ({ ...a, [v.id]: v }), {})} proposalID={proposalID}/> : null}
        </>
    );
}
export { ProposalList };