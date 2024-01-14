import React, {useContext, useEffect, useState} from 'react';
import {
    Accordion,
    Button,
    Badge,
    Table,
    Row,
    Col,
    Container,
} from 'react-bootstrap';
import ApplicationService from "../../services/ApplicationService";
import {UserContext} from "../../contexts/UserContexts";
import dayjs from "dayjs";
import ProfessorService from '../../services/ProfessorService';
import {VirtualClockContext} from "../../contexts/VirtualClockContext";
import {handleDownload} from "./ArchivedProposals";
import Browse from "../Browse";


const BrowseApplicationsAsCosupervisor = () => {
    const {refresh, setRefresh} = useContext(VirtualClockContext);

    const {user, setUser} = useContext(UserContext);
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
        <>
            <Container className="d-flex flex-column">
                <h2 style={{marginTop: "110px"}}>Co-supervised Proposals</h2>

                <Browse proposals={proposals} professors={professors}/>
            </Container>

        </>
    );
};

export default BrowseApplicationsAsCosupervisor;
