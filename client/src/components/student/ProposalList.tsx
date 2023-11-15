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
import StudentModalOfProposal from "./StudentModalOfProposal";
import Sidebar from "./FiltersSidebar";
import ProposalService from "../../services/ProposalService";

const ProposalList = () => {
    const profs = [
        {
            id: "12m0e9rdk2mefkw0349ikfdwde",
            name: "Elizabeth",
            surname: "Taylor",
            email: "elizabeth.taylor@university.edu",
            codGroup: "MATH-CG",
            codDepartment: "MATH-DEP",
            passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
        },
        {
            id: "wocwkje029fkm3f9834j09feio",
            name: "John",
            surname: "Smith",
            email: "john.smith@university.edu",
            codGroup: "PHYS-CG",
            codDepartment: "PHYS-DEP",
            passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
        },
        {
            id: "vmewokc304r3409fk305rtgi54r09",
            name: "Susan",
            surname: "Brown",
            email: "susan.brown@university.edu",
            codGroup: "CHEM-CG",
            codDepartment: "CHEM-DEP",
            passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
        },
        {
            id: "cmweijf39efk340f9i3k4f034f3ed",
            name: "Robert",
            surname: "Wilson",
            email: "robert.wilson@university.edu",
            codGroup: "COMP-CG",
            codDepartment: "COMP-DEP",
            passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
        },
        {
            id: "coijef0932k4f09r3igf0g54f34fr3e",
            name: "Patricia",
            surname: "Garcia",
            email: "patricia.garcia@university.edu",
            codGroup: "BIO-CG",
            codDepartment: "BIO-DEP",
            passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
        }
    ];

    const [proposals, setProposals] = useState([]);
    const [professors, setProfessors] = useState(profs);
    const [propsOnScreen, setPropsOnScreen] = useState([]);
    const [collapseState, setCollapseState] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [proposalID, setProposalID] = useState('');

    const refreshProposals = async () => {
        const response = await ProposalService.fetchAllProposals();
        setProposals(response.data);
        setPropsOnScreen(response.data);
        setCollapseState(response.data.reduce((a, v) => ({ ...a, [v.title]: false }), {}));
    };

    useEffect(() => {
        refreshProposals();
    }, []);

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
            <Container fluid className="p-0 mt-5" >
                <Row style={{marginTop:"0px"}}>
                    <Sidebar proposals={proposals} propsOnScreen={propsOnScreen} setPropsOnScreen={setPropsOnScreen} professors={professors}/>
                    <Col sm={8} style={{height: "90vh"}}>
                        <Container className="mt-4 mx-0 ms-2 d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-mortarboard-fill mt-1" viewBox="0 0 16 16">
                                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
                            </svg>
                            <Container>
                                <h4 className="ms-1">Thesis Proposals</h4>
                                <Container style={{position:"relative", height:"2px", backgroundColor:"black"}}></Container>
                            </Container>
                        </Container>
                        <ListGroup className="mt-3" variant="flush" style={{maxHeight:"80vh", overflowY:"auto"}}>
                            {propsOnScreen.map((p) =>
                                <ListGroupItem className="mt-2 p-3">
                                    <Card>
                                        <CardHeader onClick={() => handleClick(p.title)} style={{ cursor: "pointer" }}>
                                            {p.title}
                                            {collapseState[p.title] ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill ms-2" viewBox="0 0 16 16">
                                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill ms-2" viewBox="0 0 16 16">
                                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                                </svg>
                                            }
                                        </CardHeader>
                                        <Collapse in={collapseState[p.title]}>
                                            <CardBody>
                                                <Container className="ms-0 p-0">
                                                    <Container>Supervisor: {professors.find((prof) => prof.id === p.supervisor).name+" "+professors.find((prof) => prof.id === p.supervisor).surname}</Container>
                                                    <Container className="mt-1">CDS: {p.cdS.map((c) => {return c}).join(', ')}</Container>
                                                    <Container className="mt-1">Expiration Date: {new Date(p.expiration).toDateString()}</Container>
                                                    <Button className="ms-2 mt-2" onClick={() => handleShow(p.title)}>Show Proposal Details</Button>
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
            {showModal ? <StudentModalOfProposal showModal={showModal} setShowModal={setShowModal} professorData={professors.reduce((a, v) => ({...a, [v.id]: v}), {})} propsalData={propsOnScreen.reduce((a, v) => ({ ...a, [v.title]: v }), {})} proposalID={proposalID}/> : null}
        </>
    );
}
export default ProposalList;