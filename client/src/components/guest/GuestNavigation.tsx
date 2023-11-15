import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import { Navbar, Container, NavDropdown, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GuestNavigation = () => {

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <Navbar bg="secondary" fixed="top" variant="dark"  className="navbar-padding">
            <Container>
                <Link to={"/"}>
                    <Navbar.Brand>
                        <Navbar.Text>
                            <Image style={{ width: 160, height: 40 }} src={"../logo_thesis_management.png"}/>
                        </Navbar.Text>
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle />
                <Navbar.Collapse className={"justify-content-end"}>
                    <NavDropdown
                        style={{
                            fontSize : '22px',
                        }}
                        title= {`Hi Guest`}
                        show={showDropdown}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)} >
                        <NavDropdown.Item href={"/login"} > Login </NavDropdown.Item>
                        <NavDropdown.Divider /> {}
                    </NavDropdown>

                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default GuestNavigation ;
