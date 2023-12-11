import {Route, Routes} from "react-router-dom";
import { NotFound } from "../Layouts";
import React, {Dispatch, SetStateAction, useState} from "react";
import Logout from "../login/Logout";
import Student from "../../types/Student";
import MainNavBar from "../NavBar";
import RequestedProposals from "./RequestedProposals";

type ProfessorRoutesProps = {
    setRoleState: Dispatch<SetStateAction<string | null>>;
};

const ProfessorRoutes: React.FC<ProfessorRoutesProps> = ({ setRoleState }) =>{
    return(
        <div className="App" style={{}}>
            {/* <ProfessorNavigation setRole={setRole} /> */}
            <MainNavBar setRole={setRoleState} role={""} user={undefined}/>
            <Routes>
                {/* <Route path="/" element={ </> } /> */}
                <Route path="/requested-proposals" element={<RequestedProposals/>} />
                <Route path="/logout" element={<Logout setRole={setRoleState}/>} />
            </Routes>
        </div>
    )
}

export default ProfessorRoutes
