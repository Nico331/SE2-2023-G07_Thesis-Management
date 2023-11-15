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
import axios from 'axios';
import dayjs from "dayjs";

const ProposalList = (props) => {
    const prop = [
        {
            title: "Advanced Robotics Control Systems",
            supervisor: "12m0e9rdk2mefkw0349ikfdwde",
            coSupervisors: ["Dr. John Doe", "Dr. Jane Smith"],
            keywords: ["robotics", "control systems", "automation"],
            type: "Development",
            groups: ["RoboTech Group"],
            description: "Design and development of sophisticated control systems for industrial robotics.",
            requiredKnowledge: "C++, ROS, control theory",
            notes: "Experience with robotic arms preferred.",
            expiration: new Date("2022-12-31"),
            level: "PhD",
            cdS: ["Engineering", "Robotics"],
            archived: false
        },
        {
            title: "Blockchain-based Supply Chain Management",
            supervisor: "12m0e9rdk2mefkw0349ikfdwde",
            coSupervisors: ["Prof. Sarah Connor"],
            keywords: ["blockchain", "supply chain", "distributed ledger"],
            type: "Research",
            groups: ["BlockChain Group"],
            description: "Exploration of blockchain technology to enhance transparency in supply chain management.",
            requiredKnowledge: "Solidity, smart contracts, Ethereum",
            notes: "Prior project work with blockchain platforms is a plus.",
            expiration: new Date("2024-12-31"),
            level: "Masters",
            cdS: ["Computer Science", "Information Systems"],
            archived: false
        },
        {
            title: "Quantum Computing Algorithms for Cryptography",
            supervisor: "wocwkje029fkm3f9834j09feio",
            coSupervisors: [],
            keywords: ["quantum computing", "cryptography", "algorithms"],
            type: "Research",
            groups: ["QuantumAlgo Group"],
            description: "Development of new algorithms for cryptography using quantum computing principles.",
            requiredKnowledge: "Quantum physics, algorithm design, Python",
            notes: "Basic understanding of quantum mechanics is necessary.",
            expiration: new Date("2023-09-31"),
            level: "PhD",
            cdS: ["Physics", "Computer Science"],
            archived: false
        },
        {
            title: "Artificial Intelligence in Healthcare Diagnostics",
            supervisor: "wocwkje029fkm3f9834j09feio",
            coSupervisors: ["Dr. Eric Foreman"],
            keywords: ["AI", "healthcare", "diagnostics"],
            type: "Application Development",
            groups: ["AIHealth Group"],
            description: "Application of AI techniques to improve accuracy and efficiency in healthcare diagnostics.",
            requiredKnowledge: "Machine learning, Python, medical knowledge",
            notes: "Experience with healthcare data sets is beneficial.",
            expiration: new Date("2023-12-11"),
            level: "Masters",
            cdS: ["Biotechnology", "Health Informatics"],
            archived: false
        },
        {
            title: "Deep Learning for Autonomous Vehicle Navigation",
            supervisor: "vmewokc304r3409fk305rtgi54r09",
            coSupervisors: ["Dr. Chris Urmson"],
            keywords: ["deep learning", "autonomous vehicles", "navigation"],
            type: "Research and Development",
            groups: ["AutoNav Group"],
            description: "Creating deep learning models to solve problems in autonomous vehicle navigation.",
            requiredKnowledge: "TensorFlow, Python, computer vision",
            notes: "Background in transportation engineering is a plus.",
            expiration: new Date("2023-12-31"),
            level: "PhD",
            cdS: ["Artificial Intelligence", "Automotive Engineering"],
            archived: false
        },
        {
            title: "Renewable Energy Systems and Grid Integration",
            supervisor: "vmewokc304r3409fk305rtgi54r09",
            coSupervisors: ["Prof. Maria Skłodowska-Curie"],
            keywords: ["renewable energy", "grid integration", "sustainability"],
            type: "Research",
            groups: ["EcoEnergy Group"],
            description: "Research into the integration of renewable energy systems into the current power grid.",
            requiredKnowledge: "Electrical engineering, power systems, MATLAB",
            notes: "Prior experience with solar or wind energy systems is appreciated.",
            expiration: new Date(),
            level: "Masters",
            cdS: ["Electrical Engineering", "Environmental Science"],
            archived: false
        },
        {
            title: "Machine Learning Optimization for E-commerce",
            supervisor: "cmweijf39efk340f9i3k4f034f3ed",
            coSupervisors: [],
            keywords: ["machine learning", "e-commerce", "optimization"],
            type: "Research and Development",
            groups: ["EcommAI Group"],
            description: "Utilizing machine learning to optimize various aspects of e-commerce platforms.",
            requiredKnowledge: "Data analysis, Python, ML frameworks",
            notes: "Strong analytical skills and experience with large data sets required.",
            expiration: new Date("2024-01-31"),
            level: "Masters",
            cdS: ["Business Informatics", "Data Science"],
            archived: false
        },
        {
            title: "VR-based Training Environments for Surgery",
            supervisor: "cmweijf39efk340f9i3k4f034f3ed",
            coSupervisors: ["Dr. Addison Montgomery"],
            keywords: ["virtual reality", "surgical training", "interactive simulation"],
            type: "Development",
            groups: ["MediVR Group"],
            description: "Developing interactive VR environments for training surgeons.",
            requiredKnowledge: "Unity, C#, 3D modeling",
            notes: "Experience with medical simulations is a plus.",
            expiration: new Date("2024-05-31"),
            level: "Masters",
            cdS: ["Medical Technology", "Computer Graphics"],
            archived: false
        },
        {
            title: "Big Data Analytics for Internet of Things (IoT)",
            supervisor: "coijef0932k4f09r3igf0g54f34fr3e",
            coSupervisors: ["Dr. Vinton Cerf"],
            keywords: ["big data", "IoT", "analytics"],
            type: "Data Analysis",
            groups: ["IoTData Group"],
            description: "Analysis of large datasets generated by IoT devices to gain insights and improve efficiency.",
            requiredKnowledge: "Hadoop, Spark, IoT protocols",
            notes: "Experience with sensor data and real-time analytics preferred.",
            expiration: new Date("2024-11-31"),
            level: "PhD",
            cdS: ["Information Technology", "Data Analytics"],
            archived: false
        },
        {
            title: "Cybersecurity Measures in Financial Technology",
            supervisor: "coijef0932k4f09r3igf0g54f34fr3e",
            coSupervisors: ["Dr. Alan Kay"],
            keywords: ["cybersecurity", "fintech", "risk management"],
            type: "Research",
            groups: ["FinSec Group"],
            description: "Studying and developing advanced cybersecurity measures for financial technology applications.",
            requiredKnowledge: "Cryptography, network security, fintech knowledge",
            notes: "Experience with blockchain or digital payment systems is valuable.",
            expiration: new Date("2024-12-31"),
            level: "Masters",
            cdS: ["Cybersecurity", "Financial Engineering"],
            archived: false
        }
    ];
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

    const [proposals, setProposals] = useState(prop.sort((a,b) => {
        if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0
    }));
    const [professors, setProfessors] = useState(profs);
    const [propsOnScreen, setPropsOnScreen] = useState(prop);
    const [collapseState, setCollapseState] = useState(prop.reduce((a, v) => ({ ...a, [v.title]: false }), {}));
    const [showModal, setShowModal] = useState(false);
    const [proposalID, setProposalID] = useState('');

    // useEffect(() => {
    //     axios.get("http://localhost:8081/API/proposals/")
    //         .then((response) => {
    //             setProposals(response.data);
    //             setPropsOnScreen(response.data);
    //             setCollapseState(response.data.reduce((a, v) => ({ ...a, [v.title]: false }), {}));
    //             console.log(proposals);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    const handleShow = (proId) => {
        setShowModal(true);
        setProposalID(proId);
        props.setStudentProposalID(proId);
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
                    <Sidebar proposals={proposals} propsOnScreen={propsOnScreen} setPropsOnScreen={setPropsOnScreen} professors={professors}/>
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
                                                    <Container className="mt-1">Expiration Date: {p.expiration.toDateString()}</Container>
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
