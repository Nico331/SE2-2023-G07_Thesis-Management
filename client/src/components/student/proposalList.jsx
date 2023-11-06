import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../componentsStyle.css'
import { Navbar, Container, Modal, Image, Button, Collapse, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ModalOfProposal} from "./StudentSearch";

const ProposalList = () => {

    const proposals = [{id: 1, title: "prop1", supervisor: "sup1", keywords:["key1, key2, key3"], type: "master", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", expiration: "25/05/2024", level: "master", cds: "computer engineering"},
                                                {id: 2, title: "prop2", supervisor: "sup2", keywords:["key1, key2"], type: "master", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", expiration: "02/07/2024", level: "bachelor", cds: "computer engineering"},
                                                {id: 3, title: "prop3", supervisor: "sup2", keywords:["key1, key2, key3"], type: "master", description: "thesis about ...", required_knowledge: "required_knowledge", notes: "no notes", expiration: "14/09/2024", level: "bachelor", cds: "electronic engineering"}]


    const [propTest, setproptest] = useState(proposals.reduce((a, v) => ({ ...a, [v.id]: v }), {}));
    const [collapseState, setCollapseState] = useState(proposals.reduce((a, v) => ({ ...a, [v.id]: false }), {}));
    const [showModal, setShowModal] = useState(false);
    const [proposalID, setProposalID] = useState('');

    const handleshow = (proid) => {
        setShowModal(true);
        setProposalID(proid);
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
            <ListGroup className="" style={{marginTop:"80px"}} variant="flush">
                {proposals.map((p) =>
                    <ListGroupItem onClick={() => handleClick(p.id)} style={{ cursor: "pointer" }}>
                        <h3>
                            {p.title}
                            {collapseState[p.id] ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill ms-2" viewBox="0 0 16 16">
                                                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                                    </svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill ms-2" viewBox="0 0 16 16">
                                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                                    </svg>
                            }
                        </h3>
                        <Collapse in={collapseState[p.id]}>
                            <Container className="ms-0 p-0">
                                <Container>
                                    Supervisor: {p.supervisor}
                                    <Button className="ms-5" onClick={() => handleshow(p.id)}>Show Proposal</Button>
                                </Container>
                                <Container>Co-supervisor: ?</Container>
                                <Container>Type: {p.type}</Container>
                                <Container>Type: {p.type}</Container>
                                <Container>Description: {p.description}</Container>
                                <Container>Required Knowledge: {p.required_knowledge}</Container>
                                <Container>Notes: {p.notes}</Container>
                                <Container>Expiration Date: {p.expiration}</Container>
                                <Container>Level: {p.level}</Container>
                                <Container>CDS: {p.cds}</Container>
                            </Container>
                        </Collapse>
                    </ListGroupItem>
                )}
            </ListGroup>
            {showModal ? <ModalOfProposal showModal={showModal} setShowModal={setShowModal} propsalData={propTest} proposalID={proposalID}/> : null}
        </>
    );
}
export { ProposalList };