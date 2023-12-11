import React, {useState} from 'react';
import { Navbar, Container, Row, Offcanvas, Nav, NavDropdown, Button, DropdownButton, Dropdown } from 'react-bootstrap';



export default function MainNavBar ({role, user, setRole}) {

    const [show, setShow] = useState(false);
    
    return (
        <>
            <Navbar collapseOnSelect style={{background:'#002B49', height:"80px"}} fixed="top" variant="dark" className="navbar-padding">
                <Container fluid className="p-0 d-flex justify-content-between" style={{marginLeft:"75px", marginRight:"75px"}}>
                    <Navbar.Brand className="p-0 m-0 d-inline-flex align-items-center" href='/'>
                        <img className="" style={{background:'white', borderRadius: '3px', width: '35px', height: '35px'}} src={"../thesis-management-512.png"}/>
                        <h1 className="ms-3 my-0">Thesis Management</h1>
                    </Navbar.Brand>

                    <Navbar.Brand className='links'>
                        {role === "" ? <Nav.Link href='login'>Login</Nav.Link> : null }
                        {role === "PROFESSOR" || role === "STUDENT" ? <Nav.Link onClick={() => setShow(true)}>Menu</Nav.Link> : null }

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

                                {/* {role === "" ? ( <>
                                <Row className='canvas'>
                                    <Row>
                                        <Nav.Link href="/requested-proposals" > 
                                        <Container className="p-0 m-0 d-inline-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"/>
                                                </svg>
                                                <p className="ms-3 my-0 fs-3">Requested Proposals</p>
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
                                </>): null} */}

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