import React, { useEffect, useState} from 'react';
import './App.css';
import './custom.scss';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import AuthCheck from "./components/login/AuthCheck";
import {
    LogOutContext,
    RoleProvider,
    TokenProvider,
    UserContext,
    UserContextType
} from "./contexts/UserContexts";
import {VirtualClockContext} from "./contexts/VirtualClockContext";
import AdminRoutes from './components/administrator/AdminRoutes'
import StudentRoutes from "./components/student/StudentRoutes";
import ProfessorRoutes from "./components/professor/ProfessorRoutes";
import GuestRoutes from "./components/guest/GuestRoutes";
import { Container } from 'react-bootstrap';
import SecretaryRoutes from './components/Secretary/SecretaryRoutes';


function App() {

    return (
        <BrowserRouter>
            <Container fluid className="App">
                <Routes>
                    <Route path="/*" element={<Main />} />
                </Routes>
            </Container>
        </BrowserRouter>

    )

}

function Main() {
    const [refresh, setRefresh] = useState(true);
    const [user, setUser] = useState<UserContextType | null>(null);
    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token") :"")
    //const [user,setUser]=useState(localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):"")

    const virtualClockValue = {refresh, setRefresh};
    const userContextValue = { user, setUser };
    const [role, setRole] = useState("");
    const navigate = useNavigate()
    // @ts-ignore
    useEffect(()=>{
        // @ts-ignore
        setUser(localStorage.getItem('user'));
        // @ts-ignore
        setRole(localStorage.getItem("role"));
    },[])
    const logOut=()=>{

        setToken('')
        localStorage.clear()
        sessionStorage.clear()
        navigate("/")
    }

    return (
            <Container style={{height: "100vh"}} fluid >
                <Container className="text-center p-0" style={{width:"100%"}} fluid>
                        <TokenProvider>
                            <RoleProvider>
                                <LogOutContext.Provider value={logOut}>
                                    <UserContext.Provider value={userContextValue}>
                                        <VirtualClockContext.Provider value={virtualClockValue}>
                                            <AuthCheck key={role}>
                                                {role==="STUDENT" ? <StudentRoutes setRoleState={setRole}/> :
                                                    role==="PROFESSOR" ? <ProfessorRoutes setRoleState={setRole}/> :
                                                        role==="ADMIN" ? <AdminRoutes setRoleState={setRole}/> :
                                                            role==="SECRETARY" ? <SecretaryRoutes setRoleState={setRole}/> :
                                                                <GuestRoutes setRoleState={setRole}/>
                                                }
                                            </AuthCheck>
                                        </VirtualClockContext.Provider>
                                    </UserContext.Provider>
                                </LogOutContext.Provider>
                            </RoleProvider>
                        </TokenProvider>
                </Container>
            </Container>
    );
}
export default App;
