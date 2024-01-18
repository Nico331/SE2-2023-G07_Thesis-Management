import {Route, Routes} from "react-router-dom";
import { NotFound } from "../Layouts";
import React, {Dispatch, SetStateAction} from "react";
import Logout from "../login/Logout";
import MainNavBar from "../NavBar";
import RequestedProposals from "../Secretary/RequestedProposals";
import SecretaryMain from "./SecretaryMain";

type ProfessorRoutesProps = {
    setRoleState: Dispatch<SetStateAction<string | null>>;
};

const ProfessorRoutes: React.FC<ProfessorRoutesProps> = ({ setRoleState }) =>{
    return(
        <div className="App" style={{}}>

            <MainNavBar setRole={setRoleState} role={"SECRETARY"} user={undefined}/>

            <Routes>
                <Route path="/" element={ <SecretaryMain/> } >
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/requested-proposals" element={<RequestedProposals/>} />
                <Route path="/logout" element={<Logout setRole={setRoleState}/>} />
            </Routes>
        </div>
    )
}

export default ProfessorRoutes
