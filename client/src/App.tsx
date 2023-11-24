import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import AuthCheck from "./components/login/AuthCheck";
import { TokenProvider, UserContext, UserContextType} from "./contexts/UserContexts";
import AdminRoutes from './components/administrator/AdminRoutes'
import StudentRoutes from "./components/student/StudentRoutes";
import ProfessorRoutes from "./components/professor/ProfessorRoutes";
import GuestRoutes from "./components/guest/GuestRoutes";
function App() {
    const [user, setUser] = useState<UserContextType | null>(null);
    const userContextValue = { user, setUser };
    const [role, setRole] = useState("");
    // @ts-ignore
    useEffect(()=>{
        // @ts-ignore
        setRole(localStorage.getItem("role"));
        // @ts-ignore
        setUser(localStorage.getItem('user'));
        console.log(role);
        console.log(user);
    },[])

    return (
        <BrowserRouter>
            <TokenProvider>
                <UserContext.Provider value={userContextValue}>
                    <AuthCheck key={role}>
                        {console.log(role)}
                        {role==="STUDENT" ? <StudentRoutes setRole={setRole}/> :
                            role==="PROFESSOR" ? <ProfessorRoutes setRole={setRole}/> :
                                role==="ADMIN" ? <AdminRoutes setRole={setRole}/> :
                                    <GuestRoutes setRole={setRole}/>
                        }
                    </AuthCheck>
                </UserContext.Provider>
            </TokenProvider>
        </BrowserRouter>
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
