import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../componentsStyle.css'
import {
    Container,
    Button,
    Collapse,
    ListGroup,
    ListGroupItem,
    Card,
    CardHeader, CardBody, Row, Col
} from 'react-bootstrap';
import StudentModalOfProposal from "./StudentModalOfProposal";
import Sidebar from "./FiltersSidebar";
import ProposalService from "../../services/ProposalService";
import ProfessorService from "../../services/ProfessorService";
import ClockService from "../../services/ClockService";
import VC from "../VC";
import dayjs from "dayjs";

const ProposalList = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [proposals, setProposals] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [propsOnScreen, setPropsOnScreen] = useState([]);
    const [collapseState, setCollapseState] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [proposalID, setProposalID] = useState('');
    const [proposalTitle, setProposalTitle] = useState('');
    const [refresh, setRefresh] = useState(true);
    const [resetFilters, setResetFilters] = useState(true);
    const [date, setDate] = useState(dayjs);

    const refreshProposals = async () => {
        const response = await ProposalService.getAllByStudent(user.id);
        setProposals(response.data);
        setPropsOnScreen(response.data.sort((a,b) => {return a.title.localeCompare(b.title)}));
        setCollapseState(response.data.reduce((a, v) => ({ ...a, [v.title]: false }), {}));
    };

    const getProfessors = async () => {
        const response = await ProfessorService.fetchAllProfessors();
        setProfessors(response.data);
    };

    const setClock = async () => {
        await ClockService.setClock(date.format('YYYY-MM-DDTHH:mm:ss'));
    };

    useEffect(() => {
        setClock();
        refreshProposals();
        getProfessors();
    }, [refresh]);

    const handleShow = (proId, proTitle) => {
        setShowModal(true);
        setProposalID(proId);
        setProposalTitle(proTitle);
    };

    const handleClick = (navId) => {
        setCollapseState((prev) => {
            return { ...prev, [navId]: !prev[navId] };
        });
    };

    // const refreshPage = async () => {
    //     setDate(dayjs());
    //     await ClockService.resetClock();
    //     setRefresh(!refresh);
    //     setResetFilters(!resetFilters);
    // };

    return (
        <>
            <Container fluid className="px-5">
                <Row style={{height:"100vh"}}>
                    <Sidebar proposals={proposals} setPropsOnScreen={setPropsOnScreen} professors={professors} resetFilters={resetFilters} setResetFilters={setResetFilters} date={date}/>
                    <Col sm={7} style={{marginTop:"80px"}}>
                        <Container className="mx-0 ms-1 d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-mortarboard-fill mt-1" viewBox="0 0 16 16">
                                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
                            </svg>
                            <Container>
                                <Row>
                                    <Col className="text-start">
                                        <h2 className="ms-1">Thesis Proposals</h2>
                                    </Col>
                                    <Col className="text-end">
                                        {/*<Button className="me-5" style={{backgroundColor:"transparent", borderColor:"transparent", borderRadius:"100px",  color:"black"}} onClick={() => refreshPage()}>*/}
                                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">*/}
                                        {/*        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>*/}
                                        {/*        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>*/}
                                        {/*    </svg>*/}
                                        {/*</Button>*/}
                                    </Col>
                                </Row>
                                <Container style={{position:"relative", height:"2px", backgroundColor:"black"}}></Container>
                            </Container>
                        </Container>
                        <Container className="mt-4 ms-3 border" style={{borderRadius:"20px"}}>
                            <ListGroup className="ms-4 me-5 p-2" variant="flush" style={{minHeight:"20vh", maxHeight:"65vh", overflowY:"auto"}}>
                                {   propsOnScreen.length === 0 ?
                                    <Container className="d-flex align-items-center justify-content-center" style={{height:"18vh"}}>
                                        <h1>No results</h1>
                                    </Container>
                                    :
                                    propsOnScreen.map((p) =>
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
                                                            <Container className="mt-1">CDS: {p.cdS.map((c) => {return c}).join(', ')}</Container>
                                                            <Container className="mt-1">Expiration Date: {new Date(p.expiration).toDateString()}</Container>
                                                            <Button className="ms-2 mt-2" onClick={() => handleShow(p.id, p.title)}>Show Proposal Details</Button>
                                                        </Container>
                                                    </CardBody>
                                                </Collapse>
                                            </Card>
                                        </ListGroupItem>
                                    )
                                }
                            </ListGroup>
                        </Container>
                        <Container className="ms-5 mt-4 border" style={{borderRadius:"20px", padding: "10px", maxWidth:"46vh"}}>
                            <VC refresh={refresh} setRefresh={setRefresh} date={date} setDate={setDate}/>
                        </Container>
                    </Col>
                </Row>

            </Container>
            {showModal ? <StudentModalOfProposal showModal={showModal} setShowModal={setShowModal} professors={professors.reduce((a, v) => ({...a, [v.id]: v}), {})} propsalData={propsOnScreen.reduce((a, v) => ({ ...a, [v.title]: v }), {})} proposalID={proposalID} proposalTitle={proposalTitle}/> : null}
        </>
    );
}
export default ProposalList;
