import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Form, Button, Image} from 'react-bootstrap';
import { UserContext} from "../../contexts/UserContexts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export type LoginProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
}
const Login: React.FC<LoginProps> = ({setRole}) => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

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
            navigate('/');
        } catch (error) {
            // @ts-ignore
            console.error('Errore durante il login: ', error);
        }
    };

    return (
            <Container className="border border-2 d-flex flex-column" style={{borderRadius:"30px", height:"60vh", width:"50vh", marginTop: "65px"}}>
                <Container className="mt-3 d-flex justify-content-center">
                    <Image style={{ width: 250, height: 100 }} src={"../Polito-Logo.png"}/>
                </Container>
                <Container style={{height: 'inherit'}}>
                    <Form className="mt-4" onSubmit={handleLogin} style={{height: 'inherit'}}>
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

                        <div className="d-flex justify-content-center">
                            <Button className="mt-5" variant="primary" type="submit" style={{height:"5vh", width:"20vh"}}>
                                Log in
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Container>
    );
};

export default Login;
