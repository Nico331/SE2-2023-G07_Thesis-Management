import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const GuestMain: React.FC = () => {
    return (
        <Container style={{marginTop:"150px"}}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body >
                            <Card.Title>Welcome back to Politecnico of Turin!</Card.Title>
                            <Card.Text>
                                Explore our available thesis proposals and discover our university opportunities.
                            </Card.Text>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button variant="primary" href="/login">Go to login!</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/*<Row className="mt-4">*/}
            {/*    <Col>*/}
            {/*        <h2>Come Funziona</h2>*/}
            {/*        <p>*/}
            {/*            Gli studenti possono consultare le proposte di tesi e contattare i professori per ulteriori informazioni.*/}
            {/*            Registrati per rimanere aggiornato sulle ultime proposte.*/}
            {/*        </p>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Container>
    );
};

export default GuestMain;
