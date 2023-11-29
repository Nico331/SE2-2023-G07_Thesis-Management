import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import AuthCheck from "./components/login/AuthCheck";
import {RoleContext, RoleProvider, TokenProvider, UserContext, UserContextType} from "./contexts/UserContexts";
import AdminRoutes from './components/administrator/AdminRoutes'
import StudentRoutes from "./components/student/StudentRoutes";
import ProfessorRoutes from "./components/professor/ProfessorRoutes";
import GuestRoutes from "./components/guest/GuestRoutes";
import { Container } from 'react-bootstrap';
import MainNavBar from "./components/NavBar";




function App() {
    const [user, setUser] = useState<UserContextType | null>(null);
    const userContextValue = { user, setUser };
    const [role, setRole] = useState("");
    // @ts-ignore
    useEffect(()=>{
        // @ts-ignore
        setUser(localStorage.getItem('user'));
        // @ts-ignore
        setRole(localStorage.getItem("role"));
        console.log(role);
        console.log(user);
    },[])

    return (
        <>
            <Container style={{height: "100vh"}} fluid >
                <Container className="text-center" style={{width:"100%"}} fluid>
                    <BrowserRouter>
                        <TokenProvider>
                            <RoleProvider>
                                <UserContext.Provider value={userContextValue}>
                                    <AuthCheck key={role}>
                                        {console.log(role)}
                                        {role==="STUDENT" ? <StudentRoutes setRoleState={setRole}/> :
                                            role==="PROFESSOR" ? <ProfessorRoutes setRoleState={setRole}/> :
                                                role==="ADMIN" ? <AdminRoutes setRoleState={setRole}/> :
                                                    <GuestRoutes setRoleState={setRole}/>
                                        }
                                    </AuthCheck>
                                </UserContext.Provider>
                            </RoleProvider>
                        </TokenProvider>
                    </BrowserRouter>
                </Container>
            </Container>
        </>
    );
}

export default App;

    /*
    <Container fluid className="App">
                            <Routes>
                                <Route path="/" element={<Main />} />
                                <Route path="/proposal-list" element={<ProposalList setStudentProposalID={setStudentProposalID} />} />
                                <Route path="/professor/add-proposal" element={<ProposalForm />} />
                                <Route path="/professor/browse-proposals" element={<ProfessorBrowseProposals setProfessorProposalID={setProfessorProposalID} />} />
                                <Route path="/apply" element={<StudentApplyForm studentProposalID={studentProposalID} />} />
                            </Routes>
                        </Container>
     */
