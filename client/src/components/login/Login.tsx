import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Form, Button, Image, Alert} from 'react-bootstrap';
import { UserContext} from "../../contexts/UserContexts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import MainNavBar from '../NavBar';

export type LoginProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
}
const Login: React.FC<LoginProps> = ({setRole}) => {
    const [alert, setAlert] = useState(false);
    const [validated, setValidated] = useState(false);
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const credentialsWrong = () => {
        setAlert(true);
        setValidated(true);
        setEmailOrUsername('');
        setPassword('');
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/API/login', {
                username:emailOrUsername,
                password
            });

            const { user, jwt } = response.data;
            console.log(jwt)
            // @ts-ignore
            localStorage.setItem('role', jwt);
            setRole(jwt);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(JSON.stringify(user));
            console.log("Navigo")
            {user === undefined ? credentialsWrong() : navigate('/');}
        } catch (error) {
            // @ts-ignore
            console.error('Errore durante il login: ', error);
        }
    };

    return (
        <Container className="d-flex flex-column">
            <Container className="d-flex flex-column align-items-center" style={{marginTop: "120px"}}>
                {alert ? <Alert variant="danger" style={{width:"50vh"}} onClick={() => setAlert(false)}>
                    Invalid username or password!
                </Alert> : <></>}
                <Container className="mt-4 border border-2 d-flex flex-column" style={{borderRadius:"30px", height:"60vh", width:"50vh"}}>
                    <Container className="mt-5 d-flex justify-content-center">
                        <Image style={{ width: 263, height: 110 }} src={"../Polito-Logo.png"}/>
                    </Container>
                    <Container style={{height: 'inherit'}}>
                        <Form noValidate className="mt-5" validated={validated} onSubmit={handleLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email o Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Inserisci email o username"
                                    value={emailOrUsername}
                                    onChange={(e) => setEmailOrUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mt-4" controlId="formBasicPassword">
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
                                <Button className="mt-5" variant="primary" type="submit" style={{background: hover ? "#006d72" : '#00838B'}}
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
