import {Route, Routes} from "react-router-dom";
import ProfessorNavigation  from "./ProfessorNavigation";
import ProfessorMain from "./ProfessorMain";
import { NotFound } from "../Layouts";
import {ProfessorBrowseProposals} from "./BrowseProposals"
import React, {Dispatch, SetStateAction, useState} from "react";
import Logout from "../login/Logout";
import ProposalForm from "./ProposalForm";
import BrowseApplications from "./BrowseApplications";
import Student from "../../types/Student";
import MainNavBar from "../NavBar";

type ProfessorRoutesProps = {
    setRoleState: Dispatch<SetStateAction<string | null>>;
};

const ProfessorRoutes: React.FC<ProfessorRoutesProps> = ({ setRoleState }) =>{
    return(
        <>
            <div className="App" style={{paddingTop: 70}}>
            {/* <ProfessorNavigation setRole={setRole} /> */}
                { <MainNavBar setRole={setRoleState} role={"PROFESSOR"} user={undefined}/> }
            <Routes>
                <Route path="/" element={ <ProfessorMain/> } >
                    <Route index element={<BrowseApplications/>} />
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/browse-proposals" element={<ProfessorBrowseProposals/>} />
                <Route path="/browse-applications" element={<BrowseApplications/>} />
                <Route path="/add-proposal" element={<ProposalForm/>} />
                <Route path="/logout" element={<Logout setRole={setRoleState}/>} />
            </Routes>
            </div>
        </>
    )
}

export default ProfessorRoutes
