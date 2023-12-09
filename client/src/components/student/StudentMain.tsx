import React, {useState} from "react";
import ProposalList from "./ProposalList";
import {Button, Container, Image} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentMain = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    let navigate = useNavigate();

    return (
        <Container className="d-flex flex-column" style={{height:"100vh"}}>
            <Container className="d-flex flex-column justify-content-between" style={{marginTop:"120px", height:"100%", paddingTop:"10px", paddingBottom:"80px"}}>
                <Container className="text-center">
                    <h1>Hi {user.name}!</h1>
                    <h1>Welcome to Polito thesis management system</h1>
                </Container>
                <Container className="d-flex flex-column align-items-center">
                    <Button className="fs-3" variant="outline-primary" style={{borderRadius:"30px", width:"400px", height:"60px"}} onClick={() => navigate("/proposalList")}>Search for a thesis proposal</Button>
                    <Button className="mt-5 fs-3" variant="outline-primary" style={{borderRadius:"30px", width:"400px", height:"60px"}} onClick={() => navigate("/myApplicationList")}>My proposals applications</Button>
                </Container>
                <Container className="d-flex justify-content-center">
                    <Image style={{ width: 400, height: 167 }} src={"../logoPolito.png"}/>
                </Container>
            </Container>
        </Container>
    );
}
export default StudentMain
