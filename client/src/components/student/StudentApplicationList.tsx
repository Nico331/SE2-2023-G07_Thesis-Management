import React, {useState, useEffect, useContext} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css'
import ProposalService from "../../services/ProposalService";
import ApplicationService from "../../services/ApplicationService";
import ProfessorService from "../../services/ProfessorService";
import {
    Navbar,
    Container,
    Image,
    Table
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {UserContext} from "../../contexts/UserContexts";

const StudentApplicationList = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [studentApplications, setStudentApplications] = useState([]);
    const [studentProposals, setStudentProposals] = useState([]);
    const [supervisors, setSupervisors] = useState([]);

    const getDatas = async () => {
        const apps = await ApplicationService.getApplicationByStudentId(user.id.toString());
        const props = await ProposalService.fetchAllProposals();
        const profs = await ProfessorService.fetchAllProfessors();
        setStudentApplications(apps.data);
        setStudentProposals(props.data);
        setSupervisors(profs.data);
    }

    useEffect(()=>{
        getDatas();
    },[])

    return (
        <>

            <Container className="mt-5">
                <h1 className="mt-3">My Applications</h1>

                <Table className="mt-5" striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Thesis Title</th>
                        <th>Supervisor</th>
                        <th>Type</th>
                        <th>Level</th>
                        <th>Cds</th>
                        <th>Expiration Date</th>
                        <th>State of the application</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentApplications.map((row, index) => {
                        const proposal = studentProposals.find(proposal => proposal.id === row.proposalId);
                        const supervisor = supervisors.find(s => s.id === proposal.supervisor);
                        const expiration = new Date(proposal.expiration).toDateString();

                        let statusColorClass = '';
                        switch (row.status) {
                            case 'ACCEPTED':
                                statusColorClass = 'text-success'; // Verde
                                break;
                            case 'DENIED':
                                statusColorClass = 'text-danger'; // Rosso
                                break;
                            case 'PENDING':
                                statusColorClass = 'text-warning'; // Arancione
                                break;
                            default:
                                statusColorClass = '';
                                break;
                        }

                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{proposal ? proposal.title : ''}</td>
                                <td>{proposal ? supervisor.name+" "+supervisor.surname : ''}</td>
                                <td>{proposal ? proposal.type : ''}</td>
                                <td>{proposal ? proposal.level : ''}</td>
                                <td>{proposal ? proposal.cdS.join(', ') : ''}</td>
                                <td>{proposal ? expiration : ''}</td>
                                <td className={statusColorClass}>{row.status}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Container>
        </>

    )
}
export default StudentApplicationList;
