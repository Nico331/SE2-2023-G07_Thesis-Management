import React from 'react';
import { Button, Container, Row, Image } from 'react-bootstrap';
import { ZoomableContainer } from '../professor/ProfessorMain';

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
                    {/*<Button className="fs-3" variant="outline-primary" style={{borderRadius:"30px", width:"400px", height:"60px"}} onClick={() => navigate("/add-proposal")}>Add a new thesis proposal</Button>*/}
                    {/*<Button className="mt-4 fs-3" variant="outline-primary" style={{borderRadius:"30px", width:"400px", height:"60px"}} onClick={() => navigate("/browse-applications")}>My thesis proposals</Button>*/}
                    {/*<Button className="mt-4 fs-3" variant="outline-primary" style={{borderRadius:"30px", width:"400px", height:"60px"}} onClick={() => navigate("/archived-proposals")}>Archive</Button>*/}
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