import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import { Navbar, Container, Nav, Row, Offcanvas} from 'react-bootstrap';

const GuestNavigation = () => {

    const [hover, setHover] = useState(false);

    return (
        <Navbar collapseOnSelect style={{background:'#002B49'}} fixed="top" variant="dark" className="navbar-padding" expand="md">
            <Container>
                <Row lg={6} md={12}>
                    <Navbar.Brand href='/'>
                        <img style={{background:'white', borderRadius: '3px', width: '32px', height: '32px'}} src={"../thesis-management-512.png"} alt={"null"}/>
                        {' '} Thesis Managment
                    </Navbar.Brand>
                </Row>
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
                </Row>


                {/* <Navbar.Toggle /> */}
                {/*<Navbar.Collapse className={"justify-content-end"}>*/}
                {/*    <NavDropdown*/}
                {/*        style={{*/}
                {/*            fontSize : '22px',*/}
                {/*        }}*/}
                {/*        title= {`Hi Guest`}*/}
                {/*        show={showDropdown}*/}
                {/*        onMouseEnter={() => setShowDropdown(true)}*/}
                {/*        onMouseLeave={() => setShowDropdown(false)} >*/}
                {/*        <NavDropdown.Item href={"/login"} > Login </NavDropdown.Item>*/}
                {/*        <NavDropdown.Divider /> {}*/}
                {/*    </NavDropdown>*/}

                {/*    &nbsp;&nbsp;*/}
                {/*    &nbsp;&nbsp;*/}
                {/*    &nbsp;&nbsp;*/}

                {/*</Navbar.Collapse>*/}
            </Container>
        </Navbar>

    );
}
export default GuestNavigation ;
