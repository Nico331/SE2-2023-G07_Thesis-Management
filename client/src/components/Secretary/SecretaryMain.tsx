import React from 'react';
import { Button, Container } from 'react-bootstrap';

const SecretaryMain = () => {
    return (
        <>
            <Container className="d-flex flex-column" fluid style={{marginTop: "100px"}}>
                <h2>Secretary Main</h2>
            </Container>
            <Container className="d-flex flex-column" fluid style={{marginTop: "100px"}}>
                <Button variant="primary" onClick={() => {}}>Requested Proposals</Button>
            </Container>
        </>
    );
};

export default SecretaryMain;