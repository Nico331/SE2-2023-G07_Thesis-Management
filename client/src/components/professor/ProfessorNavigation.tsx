import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import { Navbar, Container, NavDropdown, Image} from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {LogOutContext} from "../../contexts/UserContexts";

type ProfessorNavigationProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
};

const ProfessorNavigation: React.FC<ProfessorNavigationProps> = ({ setRole }) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const navigate = useNavigate();
    const dropdownTitle = "Hi "+user.name;
    const logOut=useContext(LogOutContext)


    const handleMouseLeave = () => {
        if (timeoutId) clearTimeout(timeoutId);

        const newTimeoutId = setTimeout(() => {
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
                {location.pathname != '/' ?
                    <Navbar.Collapse className={"justify-content-end"}>
                        <NavDropdown
                            style={{
                                fontSize : '22px',
                            }}
                            title= {dropdownTitle}
                            show={showDropdown}
                            onMouseEnter={() => {setShowDropdown(true); if(timeoutId) clearTimeout(timeoutId)}}
                            onMouseLeave={handleMouseLeave} >
                            <NavDropdown.Item onClick={() => navigate("/browse-applications")}> Browse proposals and applications </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("/browse-applications-cosupervisor")}> Browse cosupervised proposals and applications </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("/archived-proposals")}> Browse archived proposals </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("/add-proposal")}> Add proposals </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("/browse-requests")}> Browse pending students' requests </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("/browse-requests-archived")}> Browse archived students' requests </NavDropdown.Item>
                            <NavDropdown.Divider /> {}
                            <NavDropdown.Item onClick={() => logOut()}>Logout</NavDropdown.Item>
                        </NavDropdown>

                        &nbsp;&nbsp;
                        &nbsp;&nbsp;
                        &nbsp;&nbsp;
                    </Navbar.Collapse>
                    :
                    <></>
                }
            </Container>
        </Navbar>

    );
}
export default ProfessorNavigation ;
