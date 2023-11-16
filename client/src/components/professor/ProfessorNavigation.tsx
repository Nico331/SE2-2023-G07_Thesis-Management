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
    const [timeoutId, setTimeoutId] = useState(null);
    const handleMouseLeave = () => {
        if (timeoutId) clearTimeout(timeoutId);

        const newTimeoutId = setTimeout(() => {
            console.log("Leaved")
            setShowDropdown(false);
        }, 300);

        setTimeoutId(newTimeoutId);
    };

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
                        onMouseEnter={() => {setShowDropdown(true); if(timeoutId) clearTimeout(timeoutId)}}
                        onMouseLeave={handleMouseLeave} >
                        <NavDropdown.Item href={"/proposal-list"} > Search proposals </NavDropdown.Item>
                        <NavDropdown.Item href={"/add-proposal"} > add-proposal </NavDropdown.Item>
                        <NavDropdown.Item href={"/browse-proposals"} > professor/browse-proposals </NavDropdown.Item>
                        <NavDropdown.Item href={"/browse-applications"} > professor/browse-applications </NavDropdown.Item>
                        <NavDropdown.Divider /> {}
                        <NavDropdown.Item href={"/logout"}>Logout</NavDropdown.Item>
                    </NavDropdown>

                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default ProfessorNavigation ;
