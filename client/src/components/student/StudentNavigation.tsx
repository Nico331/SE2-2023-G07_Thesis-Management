import React, {Dispatch, SetStateAction, useState} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import { Navbar, Container, NavDropdown, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VirtualClock from "../VirtualClock";

type StudentNavigationProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
};

const StudentNavigation: React.FC<StudentNavigationProps> = ({ setRole }) =>{
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
                <Navbar.Collapse className={"justify-content-end"} >
                    <NavDropdown
                        style={{
                            fontSize : '22px',
                        }}
                        title= {`Hi Student`}
                        show={showDropdown}
                        onMouseEnter={() => {setShowDropdown(true); if(timeoutId) clearTimeout(timeoutId)}}
                        onMouseLeave={handleMouseLeave} >
                        <NavDropdown.Item href={"/proposallist"} > Search proposals </NavDropdown.Item>
                        <NavDropdown.Item href={"/myApplicationList"} > My Applications </NavDropdown.Item>
                        <NavDropdown.Divider /> {}
                        <NavDropdown.Item href={"/logout"}>Logout</NavDropdown.Item>
                    </NavDropdown>

                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                </Navbar.Collapse>
            </Container>

            <div>

            <VirtualClock style={{ marginLeft: '100px' }}/>
            </div>

        </Navbar>



    );
}
export default StudentNavigation ;
