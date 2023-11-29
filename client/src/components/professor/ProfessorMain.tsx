import React, {useState} from "react";
import {ProfessorBrowseProposals} from './BrowseProposals'
import {useNavigate} from "react-router-dom";
import {Container, Image, Button} from "react-bootstrap";

const ProfessorMain= () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    let navigate = useNavigate();

    return (
        <Container className="d-flex flex-column" style={{height:"90vh"}}>
            <Container className="mt-5 text-center">
                <h1>Hi {user.name}!</h1>
                <h1>Welcome to Polito thesis management system</h1>
            </Container>
            <Container className="mt-3 d-flex flex-column align-items-center">
                <Button className="mt-5 fs-3" variant="outline-primary" style={{borderRadius:"30px", width:"400px", height:"60px"}} onClick={() => navigate("/add-proposal")}>Add a new thesis proposal</Button>
                <Button className="mt-5 fs-3" variant="outline-primary" style={{borderRadius:"30px", width:"400px", height:"60px"}} onClick={() => navigate("/browse-applications")}>My thesis proposals</Button>
            </Container>
            <Container className="d-flex justify-content-center" style={{marginTop:"15vh"}}>
                <Image style={{ width: 350, height: 150 }} src={"../logoPolito.png"}/>
            </Container>
        </Container>
    );
}

export default ProfessorMain
