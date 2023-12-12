import {Route, Routes} from "react-router-dom";
import { NotFound } from "../Layouts";
import React, {Dispatch, SetStateAction, useState} from "react";
import Logout from "../login/Logout";
import Student from "../../types/Student";
import MainNavBar from "../NavBar";
import RequestedProposals from "../Secretary/RequestedProposals";
import Login from "../login/Login";
import GuestMain from "../guest/GuestMain";
import SecretaryMain from "./SecretaryMain";

type ProfessorRoutesProps = {
    setRoleState: Dispatch<SetStateAction<string | null>>;
};

const ProfessorRoutes: React.FC<ProfessorRoutesProps> = ({ setRoleState }) =>{
    return(
        <div className="App" style={{}}>

            <MainNavBar setRole={setRoleState} role={""} user={undefined}/>

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
