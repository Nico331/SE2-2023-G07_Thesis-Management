import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import LoginButton from "../loginwithauth0/LoginButton";

const GuestMain: React.FC = () => {
    return (
        <Container style={{marginTop:"90px"}}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body >
                            <Card.Title>Bentornato al Politecnico di Torino!</Card.Title>
                            <Card.Text>
                                Esplora le proposte di tesi disponibili e scopri le opportunità che il nostro ateneo ha da offrire.
                            </Card.Text>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <LoginButton/>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h2>Come Funziona</h2>
                    <p>
                        Gli studenti possono consultare le proposte di tesi e contattare i professori per ulteriori informazioni.
                        Registrati per rimanere aggiornato sulle ultime proposte.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default GuestMain;
