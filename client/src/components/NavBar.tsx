import React, {useState} from 'react';
import { Navbar, Container, Row, Offcanvas, Nav, Image, Col } from 'react-bootstrap';
import VC from './VC';



export default function MainNavBar ({role, user, setRole}) {

    const [show, setShow] = useState(false);
    
    return (
        <>
            <Navbar collapseOnSelect style={{background:'#002B49', height:"80px"}} fixed="top" variant="dark" className="navbar-padding">
                <Container fluid className="p-0 d-flex justify-content-between" style={{marginLeft:"40px", marginRight:"40px"}}>
                    <Navbar.Brand className="p-0 m-0 d-inline-flex align-items-center" href='/'>
                        <Image className="" style={{background:'white', borderRadius: '3px', width: '35px', height: '35px'}} src={"../thesis-management-512.png"}/>
                         {/*<h1 className="ms-3 my-0">Thesis Management</h1>*/}
                         <Container className="p-0 ms-3 fs-1 fw-bold d-none d-md-block">Thesis Management</Container>
                    </Navbar.Brand>

                    <Col className="" md={4}>
                        {role === "PROFESSOR" || role === "STUDENT" ? <VC/> : <></>}
                    </Col>

                    <Navbar.Brand className='links'>
                        {role === "" ? <Nav.Link href='login'>Login</Nav.Link> : null }
                        {role === "PROFESSOR" || role === "STUDENT" || role === "SECRETARY" ? <Nav.Link onClick={() => setShow(true)}>Menu</Nav.Link> : null }

                        <Offcanvas 
                            show={show} 
                            onHide={() => setShow(false)} 
                            style={{background:'#005574', width: '30%'}} 
                            className={"justify-content-end"} 
                            placement='end'
                            backdrop={true}
                            scroll={true}
                        >
                            <Offcanvas.Header closeButton closeVariant='white'>
                                <Offcanvas.Title style={{color:'white'}}>
                                    <h1>Menu</h1>
                                </Offcanvas.Title>
                            </Offcanvas.Header>

                                    <Offcanvas.Body>
                                        {role === "PROFESSOR" ? ( <>
                                            <Row className='canvas'>
                                            <Row>
                                                <Nav.Link href="/" > 
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                                                    </svg>
                                                        <p className="ms-3 my-0 fs-3">Main Page</p>
                                                    </Container> 
                                                </Nav.Link>
                                            </Row>
                                                <Row>
                                                    <Nav.Link href="/browse-applications" >
                                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                            </svg>
                                                            <p className="ms-3 my-0 fs-3">My Thesis Proposals</p>
                                                        </Container>
                                                    </Nav.Link>
                                                </Row>
                                                <Row>
                                                    <Nav.Link href="/archived-proposals" >
                                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
                                                                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                                            </svg>
                                                            <p className="ms-3 my-0 fs-3">Archive</p>
                                                        </Container>
                                                    </Nav.Link>
                                                </Row>
                                                <Row>
                                                    <Nav.Link href="/add-proposal">
                                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                                            </svg>
                                                            <p className="ms-3 my-0 fs-3">Add Proposals</p>
                                                        </Container>
                                                    </Nav.Link>
                                                </Row>
                                                <Row>
                                                    <Nav.Link href="/logout">
                                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                            </svg>
                                                            <p className="ms-3 my-0 fs-3">Logout</p>
                                                        </Container>
                                                    </Nav.Link>
                                                </Row>
                                            </Row>
                                        </>): null}
                                        
                                        {role === "STUDENT" ? ( <>
                                            <Row className='canvas'>
                                            <Row>
                                                <Nav.Link href="/" > 
                                                <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                                                    </svg>
                                                        <p className="ms-3 my-0 fs-3">Main Page</p>
                                                    </Container> 
                                                </Nav.Link>
                                            </Row>
                                                <Row>
                                                    <Nav.Link href="/proposalList" >
                                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                            </svg>
                                                            <p className="ms-3 my-0 fs-3">Search proposals</p>
                                                        </Container>
                                                    </Nav.Link>
                                                </Row>
                                                <Row>
                                                    <Nav.Link href="/myApplicationList" >
                                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"/>
                                                            </svg>
                                                            <p className="ms-3 my-0 fs-3">My Applications</p>
                                                        </Container>
                                                    </Nav.Link>
                                                </Row>
                                                <Row>
                                                    <Nav.Link href="/requestForm">
                                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                                            </svg>
                                                            <p className="ms-3 my-0 fs-3">New Thesis Request</p>
                                                        </Container>
                                                    </Nav.Link>
                                                </Row>
                                                <Row>
                                                    <Nav.Link href="/logout">
                                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                            </svg>
                                                            <p className="ms-3 my-0 fs-3">Logout</p>
                                                        </Container>
                                                    </Nav.Link>
                                                </Row>
                                            </Row>
                                        </>): null}

                                {role === "ADMIN" ? ( <>
                                <Row className='canvas'>
                                    <Row><Nav.Link href="/admin/students" > Manage students </Nav.Link></Row>
                                    <Row><Nav.Link href="/admin/addStudent" > New student </Nav.Link></Row>
                                    <Row><Nav.Link href="/professor/browseproposals" > Browse Proposals</Nav.Link></Row>
                                    <Row><Nav.Link href="/logout" > Logout</Nav.Link></Row>
                                </Row>
                                </>): null}

                                {role === "SECRETARY" ? ( <>
                                <Row className='canvas'>
                                    <Row>
                                        <Nav.Link href="/" > 
                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                                            </svg>
                                                <p className="ms-3 my-0 fs-3">Main Page</p>
                                            </Container> 
                                        </Nav.Link>
                                     </Row>
                                    <Row>
                                        <Nav.Link href="/requested-proposals" > 
                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z"/><path d="M13 3v6h6"/>
                                            </svg>
                                                <p className="ms-3 my-0 fs-3">All Requested Proposals</p>
                                            </Container> 
                                        </Nav.Link>
                                     </Row>
                                     <Row>
                                        <Nav.Link href="/logout">
                                            <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                </svg>
                                                <p className="ms-3 my-0 fs-3">Logout</p>
                                            </Container>
                                        </Nav.Link>
                                    </Row>
                                </Row>
                                </>): null}

                            </Offcanvas.Body>

                        </Offcanvas>

                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}


{/* {role === "" ? (
                    <Row lg={6}>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Offcanvas style={{background:'#005574', width: '50%'}} className={"justify-content-end"} placement='end'>
                            <Offcanvas.Header closeButton closeVariant='white'>
                                <Offcanvas.Title style={{color:'white'}}>Menu</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav.Link 
                                    href="/login" 
                                    style={{color: 'white', 
                                            border: hover ? '1px solid rgba(247, 247, 247, 0.5)' : "0px solid gray" ,
                                            borderRadius: '3px',
                                            padding: hover ? '3px 9px 4px 8px' : '4px 10px 5px 9px',
                                            background: hover ? 'rgba(247, 247, 247, 0.1)' : 'transparent'}}
                                    onMouseEnter={() => setHover(true)} 
                                    onMouseOut={() => setHover(false)}
                                    onTouchStart={() => setHover(true)}
                                    onTouchEnd={() => setHover(false)} > Login</Nav.Link>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Row>) : null} */}