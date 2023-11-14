import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import { Navbar, Container, NavDropdown, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavigation = () => {

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
                        title= {`Hi Admin`}
                        show={showDropdown}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)} >
                        <NavDropdown.Item href={"/admin/students"} > Manage students </NavDropdown.Item>
                        <NavDropdown.Item href={"/admin/addStudent"} > New student </NavDropdown.Item>
                        <NavDropdown.Item href={"/professor/browseproposals"} > Browse Proposals</NavDropdown.Item>
                        <NavDropdown.Divider /> {}
                    </NavDropdown>

                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;

                    <NavDropdown title={'Student Access'} >
                        <NavDropdown.Item href={"/proposallist"} > Search proposals </NavDropdown.Item>
                        <NavDropdown.Item href={"/login"} > Login </NavDropdown.Item>
                    </NavDropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export { AdminNavigation };