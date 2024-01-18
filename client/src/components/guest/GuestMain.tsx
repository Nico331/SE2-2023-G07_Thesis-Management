import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

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
    );
};

export default GuestMain;
