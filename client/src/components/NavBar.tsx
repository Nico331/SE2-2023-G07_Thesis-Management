import React, {useContext, useEffect, useState} from 'react';
import {Navbar, Container, Row, Offcanvas, Nav, Image, Col} from 'react-bootstrap';
import VC from './VC';
import {UserContext} from "../contexts/UserContexts";
import {useNavigate} from "react-router-dom";


export default function MainNavBar({role, undef_user, setRole}) {
    const [show, setShow] = useState(false);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [helloScreenSmall, setHelloScreenSmall] = useState(window.matchMedia('(max-width: 1000px)').matches);
    const [headerScreenSmall, setHeaderScreenSmall] = useState(window.matchMedia('(max-width: 700px)').matches);

    useEffect(() => {
        const handleResize = () => {
            setHelloScreenSmall(window.innerWidth <= 1000);
            setHeaderScreenSmall(window.innerWidth <= 770);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const Hello = () => {
        if (!helloScreenSmall) {
            return (
                <span className="d-none d-sm-block">
                <Col className="" md={2}>
                    Hi,
                    {role === "PROFESSOR" ? " Prof." : ""}
                    {role === "PROFESSOR" || role === "STUDENT" || role === "SECRETARY" ? JSON.parse(user) && (" " + JSON.parse(user).name + " " + JSON.parse(user).surname) : ""}
                </Col>
            </span>
            );
        }
    };

    return (
        <>
            <Navbar collapseOnSelect style={{background: '#002B49', height: "80px"}} fixed="top" variant="dark"
                    className="navbar-padding">
                <Container fluid className="p-0 d-flex justify-content-between"
                           style={{marginLeft: "40px", marginRight: "40px"}}>
                    <Navbar.Brand className="p-0 m-0 d-inline-flex align-items-center" href='/'>
                        <Image className=""
                               style={{background: 'white', borderRadius: '3px', width: '35px', height: '35px'}}
                               src={"../thesis-management-512.png"}/>
                        {headerScreenSmall ? <></> : <Container className="p-0 ms-3 fs-1 fw-bold d-none d-sm-block">Thesis Management</Container>}
                    </Navbar.Brand>

                    <Col className="" md={4}>
                        {role === "PROFESSOR" || role === "STUDENT" || role === "SECRETARY" ?
                            <VC />
                            :
                            <></>}
                    </Col>

                    <Navbar.Brand className='links p-0'>
                        {role === "" ?
                            <Nav.Link onClick={()=>navigate('login')}>
                                Login</Nav.Link> : null}
                        {role === "PROFESSOR" || role === "STUDENT" || role === "SECRETARY" ?
                            <>
                                <Nav.Link onClick={() => setShow(true)} id="menu">
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Hello />
                                        &nbsp;&nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35"
                                             viewBox="0 0 50 50"
                                             >
                                            <path fill="#FFFFFF"
                                                  d="M 3 8 A 2.0002 2.0002 0 1 0 3 12 L 47 12 A 2.0002 2.0002 0 1 0 47 8 L 3 8 z M 3 23 A 2.0002 2.0002 0 1 0 3 27 L 47 27 A 2.0002 2.0002 0 1 0 47 23 L 3 23 z M 3 38 A 2.0002 2.0002 0 1 0 3 42 L 47 42 A 2.0002 2.0002 0 1 0 47 38 L 3 38 z"></path>
                                        </svg>
                                    </div>
                                </Nav.Link>
                            </>
                            : null}

                        <Offcanvas
                            show={show}
                            onHide={() => setShow(false)}
                            style={headerScreenSmall ? {background: '#002B49', width: '100%', height: '50%'} : {background: '#002B49', width: '30%'}}
                            className={"justify-content-end"}
                            placement={headerScreenSmall ? 'top' : 'end'}
                            backdrop={true}
                            scroll={true}
                        >
                            <Offcanvas.Header closeButton closeVariant='white'>
                                <Offcanvas.Title style={{color: 'white'}}>
                                    <h1>Menu</h1>
                                </Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                {role === "PROFESSOR" ? (<>
                                    <Row className='canvas'>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/");
                                                setShow(false);
                                            }} id='menu-mainpage'>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center" id='professor-menu-mainpage'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="#ffffff"
                                                         stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round">
                                                        <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                                                        <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Main Page</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/add-proposal");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-plus-lg"
                                                         viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Add Proposals</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/browse-applications");
                                                setShow(false);
                                            }} id='menu-myproposals'>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-search"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">My Thesis Proposals</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/browse-applications-cosupervisor");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg width="28" height="28" className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Co-supervised Proposals</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/archived-proposals");
                                                setShow(false);
                                            }} id="menu-archive">
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-archive"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Archive</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/browse-requests");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    {/* Icona per Pending Requests */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm-.5 11a.5.5 0 0 1 1 0v2.5a.5.5 0 0 1-1 0V11zM8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1z"/></svg>
                                                    <p className="ms-3 my-0 fs-3">Pending Requests</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/browse-requests-archived");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-folder2-open" viewBox="0 0 16 16">
                                                        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Archived Requests</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/forum");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-chat-right-text" viewBox="0 0 16 16">
                                                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                                                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Forum</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/logout");
                                                setShow(false);
                                            }} id="menu-logout">
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-box-arrow-right"
                                                         viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                        <path fillRule="evenodd"
                                                              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Logout</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                    </Row>
                                </>) : null}

                                {role === "STUDENT" ? (<>
                                    <Row className='canvas'>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center" id="student-menu-mainpage">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="#ffffff"
                                                         stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round">
                                                        <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                                                        <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Main Page</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/proposalList");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center" id="menu-search">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-search"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Search proposals</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/myApplicationList");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center" id="menu-myapplications">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-check-lg"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">My Applications</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/requestForm");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-plus-lg"
                                                         viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">New Thesis Request</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/request");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center" id="menu-myThesisRequests">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-question-lg" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">My thesis request</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/forum");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-chat-right-text" viewBox="0 0 16 16">
                                                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                                                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Forum</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/logout");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-box-arrow-right"
                                                         viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                        <path fillRule="evenodd"
                                                              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Logout</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                    </Row>
                                </>) : null}

                                {role === "ADMIN" ? (<>
                                    <Row className='canvas'>
                                        <Row>
                                            <Nav.Link onClick={()=>navigate("/admin/students")}>
                                                Manage students </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=>navigate("/admin/addStudent")}>
                                                New student </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=>navigate("/professor/browseproposals")}>
                                                Browse
                                            Proposals</Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=>navigate("/logout")}>
                                                Logout</Nav.Link></Row>
                                    </Row>
                                </>) : null}

                                {role === "SECRETARY" ? (<>
                                    <Row className='canvas'>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="#ffffff"
                                                         stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round">
                                                        <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                                                        <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Main Page</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/requested-proposals");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="#ffffff"
                                                         stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round">
                                                        <path
                                                            d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z"/>
                                                        <path d="M13 3v6h6"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">All Requested Proposals</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                        <Row>
                                            <Nav.Link onClick={()=> {
                                                navigate("/logout");
                                                setShow(false);
                                            }}>
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                         fill="currentColor" className="bi bi-box-arrow-right"
                                                         viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                        <path fillRule="evenodd"
                                                              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                    </svg>
                                                    <p className="ms-3 my-0 fs-3">Logout</p>
                                                </Container>
                                            </Nav.Link>
                                        </Row>
                                    </Row>
                                </>) : null}

                            </Offcanvas.Body>

                        </Offcanvas>

                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}