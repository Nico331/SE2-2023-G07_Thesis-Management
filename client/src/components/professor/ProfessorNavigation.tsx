import React, {Dispatch, SetStateAction, useState} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import { Navbar, Container, NavDropdown, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
type ProfessorNavigationProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
};

const ProfessorNavigation: React.FC<ProfessorNavigationProps> = ({ setRole }) =>{
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
                        title= {`Hi Professor`}
                        show={showDropdown}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)} >
                        <NavDropdown.Divider /> {}
                    </NavDropdown>

                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;

                    <NavDropdown title={'Professor Access'} >
                        <NavDropdown.Item href={"/proposal-list"} > Search proposals </NavDropdown.Item>
                        <NavDropdown.Item href={"/professor/add-proposal"} > add-proposal </NavDropdown.Item>
                        <NavDropdown.Item href={"/professor/browse-proposals"} > professor/browse-proposals </NavDropdown.Item>
                        <NavDropdown.Item href={"/logout"}>Logout</NavDropdown.Item>
                    </NavDropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default ProfessorNavigation ;
