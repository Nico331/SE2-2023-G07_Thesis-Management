import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Form, Button, Image, Alert} from 'react-bootstrap';
import {RoleContext, TokenContext, UserContext} from "../../contexts/UserContexts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export type LoginProps = {
    setRoleState: Dispatch<SetStateAction<string | null>>;
}
const Login: React.FC<LoginProps> = ({setRoleState}) => {
    const [alert, setAlert] = useState(false);
    const [validated, setValidated] = useState(false);
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    // @ts-ignore
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);
    // @ts-ignore
    const { token, setToken } = useContext(TokenContext)
    // @ts-ignore
    const { role, setRole } = useContext(RoleContext)

    const credentialsWrong = () => {
        setAlert(true);
        setValidated(true);
        // setEmailOrUsername('');
        setPassword('');
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/API/login', {
                username:emailOrUsername,
                password
            });
            if(response.status !== 200)  { credentialsWrong(); return; }

            const { jwt } = response.data;
            localStorage.setItem("token", jwt)
            sessionStorage.setItem("token", jwt)
            setToken(jwt)
            const decodedJwt = jwtDecode(jwt);
            // @ts-ignore
            const userRole: string = decodedJwt["realm_access"]["roles"].find((value)=> value==="PROFESSOR" || value==="STUDENT" || value==="SECRETARY");
            localStorage.setItem("role", userRole);
            sessionStorage.setItem("role", userRole);
            const userInfo = await axios.get(
                // @ts-ignore
                `http://localhost:8081/API/${userRole==="PROFESSOR" ? 
                    "professors" : userRole==="STUDENT" ?  
                        "students" : "secretaries"
                }/${decodedJwt["email"].toString().split("@")[0]}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwt
                    }
                }
            )
            localStorage.setItem('user', JSON.stringify(userInfo.data));
            sessionStorage.setItem("user", JSON.stringify(userInfo.data));
            setUser(JSON.stringify(userInfo.data));
            setRole(userRole.toString())
            setRoleState(userRole.toString());
            navigate('/');
        } catch (error) {
            // @ts-ignore
            credentialsWrong();
            console.error('Errore durante il login: ', error);
        }
    };

    return (
        <Container className="p-0 d-flex flex-column">
            <Container className="p-0 d-flex flex-column align-items-center justify-content-center" style={{marginTop:"130px"}}>
                {alert ? <Alert variant="danger" style={{width:"50vh"}} onClick={() => setAlert(false)}>
                    Invalid username or password!
                </Alert> : <></>}
                <Container className="p-3 mt-4 border border-2 d-flex flex-column" style={{borderRadius:"30px", maxWidth: "450px", minWidth: "300px", minHeight:"440px", maxHeight:"475px"}}>
                    <Container className="p-2 mt-5 d-flex justify-content-center">
                        <Image style={{ width: 263, height: 110 }} src={"../Polito-Logo.png"}/>
                    </Container>
                    <Container style={{height: 'inherit'}}>
                        <Form noValidate className="mt-4" validated={validated} onSubmit={handleLogin}>
                            <Form.Group id="formBasicEmail">
                                <Form.Label>Email o Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Inserisci email o username"
                                    value={emailOrUsername}
                                    onChange={(e) => setEmailOrUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mt-4" id="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center" >
                                <Button className="mt-4" variant="primary" type="submit" style={{background: hover ? "#006d72" : '#00838B'}}
                                        onMouseEnter={() => setHover(true)}
                                        onMouseOut={() => setHover(false)}
                                        onTouchStart={() => setHover(true)}
                                        onTouchEnd={() => setHover(false)}>
                                    Log in
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
};

export default Login;
