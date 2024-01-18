import React, {useContext, useEffect, useState} from 'react';
import {
    Container,
} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import ProfessorService from '../../services/ProfessorService';
import {VirtualClockContext} from "../../contexts/VirtualClockContext";
import Browse from "../Browse";


const BrowseApplicationsAsCosupervisor = () => {
    const {refresh} = useContext(VirtualClockContext);

    const {user} = useContext(UserContext);
    useEffect(() => {
        if (user) {
            ApplicationService.getByCosupervisorId(JSON.parse(user).id).then((res) => {
                setProposals(res.data);
            })
        }

    }, [user, refresh]);

    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        ProfessorService.fetchAllProfessors().then((res) => {
            setProfessors(res.data);
        });
    }, []);

    const [proposals, setProposals] = useState([]);
    return (
            <Container className="d-flex flex-column">
                <h2 style={{marginTop: "110px"}}>Co-supervised Proposals</h2>

                <Browse proposals={proposals} professors={professors}/>
            </Container>
    );
};

export default BrowseApplicationsAsCosupervisor;
