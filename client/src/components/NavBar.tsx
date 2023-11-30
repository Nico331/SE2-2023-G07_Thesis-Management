import React, {useState} from 'react';
import { Navbar, Container, Row, Offcanvas, Nav, NavDropdown, Button, DropdownButton, Dropdown } from 'react-bootstrap';



export default function MainNavBar ({role, user, setRole}) {

    const [show, setShow] = useState(false);
    
    return (
        <>
            <Navbar collapseOnSelect style={{background:'#002B49'}} fixed="top" variant="dark" className="navbar-padding" expand="xxl">
                <Container>
                    <Row lg={6} md={12}>
                        <Navbar.Brand href='/'>
                            <img style={{background:'white', borderRadius: '3px', width: '32px', height: '32px'}} src={"../thesis-management-512.png"}/>
                            {' '} Thesis Managment
                        </Navbar.Brand>
                    </Row>
                    
                    <Row lg={6} className='links'>
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
                                <Offcanvas.Title style={{color:'white'}}>Menu</Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                {role === "PROFESSOR" ? ( <>
                                <Row className='canvas'>
                                    <Row><Nav.Link href="/browse-applications" >Browse proposals and applications </Nav.Link></Row>
                                    <Row><Nav.Link href="/add-proposal">Add proposals</Nav.Link></Row>
                                    <Row><Nav.Link href="/logout" >Logout</Nav.Link></Row>
                                </Row>
                                </>): null}
                                
                                {role === "STUDENT" ? ( <>
                                <Row className='canvas'>
                                    <Row><Nav.Link href="/proposalList" > Search proposals</Nav.Link></Row>
                                    <Row><Nav.Link href="/myApplicationList" > My Applications</Nav.Link></Row>
                                    <Row><Nav.Link href="/logout" > Logout</Nav.Link></Row>
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

                            </Offcanvas.Body>

                        </Offcanvas>

                    </Row>

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