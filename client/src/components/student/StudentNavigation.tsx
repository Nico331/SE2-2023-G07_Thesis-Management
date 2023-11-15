import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import { Navbar, Container, NavDropdown, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentNavigation = () => {

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

                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;

                    <NavDropdown title={'Student Access'} >
                        <NavDropdown.Item href={"/proposallist"} > Search proposals </NavDropdown.Item>
                        <NavDropdown.Item href={"/logout"} > Logout </NavDropdown.Item>
                    </NavDropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default StudentNavigation ;
