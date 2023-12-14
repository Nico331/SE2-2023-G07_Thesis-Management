import React, {useState} from 'react';
import {Button, Container, Row, Image, Col, Card} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

const ZoomableContainer = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    let navigate = useNavigate();

    const containerStyle = {
        transition: 'transform 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        backgroundColor: isHovered ? '#002B49' : '#ffffff', // Cambia il colore al passaggio del mouse
        margin: '10px',
        padding: '5px',
        borderRadius: '5px',
        cursor: "pointer",
        display: 'flex',
        height: '100%'
    };

    return (
        <>
        <Col xs={12} md={4}></Col>
        <Col xs={12} md={4}>
            <Container
                style={containerStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate(props.link)}
            >
                <Card style={{flex:1}}>
                    <Card.Body>
                        <Card.Title>
                            {props.title}
                            <svg className="ms-2" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Card.Title>
                        <Card.Text className="mt-3">{props.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </Col>
        <Col xs={12} md={4}></Col>
        </>
    );
};

const SecretaryMain = () => {
    return (
        <>
        <Container className="d-flex flex-column" style={{height:"100vh"}}>
            <Container className="d-flex flex-column justify-content-between" style={{marginTop:"120px", height:"100%", paddingBottom:"40px"}}>
                <Container className="p-3 text-center">
                    {/* <h1>Hi {user.name}!</h1> */}
                    <h1>Welcome to Polito thesis management system</h1>
                </Container>
                <Container>
                    <Row>
                        <ZoomableContainer title={"Requested Proposals"} link={"/requested-proposals"} description={"Check the requested proposals."}></ZoomableContainer>
                    </Row>
                </Container>
                <Container className="p-5 d-flex justify-content-center">
                    <Image className="ratio ratio-16x9" style={{ maxWidth: 400, maxHeight: 167 }} src={"../logoPolito.png"}/>
                </Container>
            </Container>
        </Container>
        </>
    );
};

export default SecretaryMain;