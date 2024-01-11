import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import { Navbar, Container, NavDropdown, Image} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {LogOutContext} from "../../contexts/UserContexts";

type StudentNavigationProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
};

const StudentNavigation: React.FC<StudentNavigationProps> = ({ setRole }) =>{
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
        <Navbar bg="secondary" fixed="top" variant="dark"  className="navbar-padding" >
            <Container style={{ marginRight: '100px' }}>
                <Link to={"/"}>
                    <Navbar.Brand>
                        <Navbar.Text>
                            <Image style={{ width: 160, height: 40 }} src={"../logo_thesis_management.png"}/>
                        </Navbar.Text>
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle />
                {location.pathname != '/' ?
                    <Navbar.Collapse className={"justify-content-end"} >
                        <NavDropdown
                            style={{
                                fontSize : '22px',
                            }}
                            title= {dropdownTitle}
                            show={showDropdown}
                            onMouseEnter={() => {setShowDropdown(true); if(timeoutId) clearTimeout(timeoutId)}}
                            onMouseLeave={handleMouseLeave} >
                            <NavDropdown.Item onClick={() => navigate("/proposalList")}> Search proposals </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("/myApplicationList")} > My Applications </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("/requestForm")} > New Thesis Request </NavDropdown.Item>
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
export default StudentNavigation ;
