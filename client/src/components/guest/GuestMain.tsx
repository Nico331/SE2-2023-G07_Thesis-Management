import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const GuestMain: React.FC = () => {

    const [hover, setHover] = React.useState(false);

    return (
                <Row md={12} className="justify-content-center" >
                    <Col lg={8}>
                        <Card style={{marginTop: "110px"}}>
                            <Card.Body style={{height: 'auto'}}>
                                <Card.Title>Welcome back to Politecnico of Turin!</Card.Title>
                                <Card.Text>
                                    Explore our available thesis proposals and discover our university opportunities.
                                </Card.Text>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button style={{background: hover ? "#006d72" : '#00838B'}} href="/login"
                                    onMouseEnter={() => setHover(true)}
                                    onMouseOut={() => setHover(false)}
                                    onTouchStart={() => setHover(true)}
                                    onTouchEnd={() => setHover(false)} >Go to login!</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                // {/*<Row className="mt-4">*/}
                // {/*    <Col>*/}
                // {/*        <h2>Come Funziona</h2>*/}
                // {/*        <p>*/}
                // {/*            Gli studenti possono consultare le proposte di tesi e contattare i professori per ulteriori informazioni.*/}
                // {/*            Registrati per rimanere aggiornato sulle ultime proposte.*/}
                // {/*        </p>*/}
                // {/*    </Col>*/}
                // {/*</Row>*/}
            
    );
};

export default GuestMain;
