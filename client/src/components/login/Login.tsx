import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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

            setUser(user);
            console.log(user)
            navigate('/');
        } catch (error) {
            // @ts-ignore
            console.error('Errore durante il login: ', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="text-center mb-4">Login</h1>
                    <Form onSubmit={handleLogin}>
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

                        <Form.Group controlId="formBasicPassword">
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
                            <Button variant="primary" type="submit">
                                Accedi
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
