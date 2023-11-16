import {Route, Routes} from "react-router-dom";
import ProfessorNavigation  from "./ProfessorNavigation";
import ProfessorMain from "./ProfessorMain";
import { NotFound } from "../Layouts";
import {ProfessorBrowseProposals} from "./BrowseProposals"
import React, {Dispatch, SetStateAction} from "react";
import Logout from "../login/Logout";
import ProposalForm from "./ProposalForm";
import BrowseApplications from "./BrowseApplications";
type ProfessorRoutesProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
};

const ProfessorRoutes: React.FC<ProfessorRoutesProps> = ({ setRole }) =>{
    return(
        <>
            <div className="App" style={{paddingTop: 70}}>
            <ProfessorNavigation setRole={setRole} />
            <Routes>
                <Route path="/" element={ <BrowseApplications/> } >
                    <Route index element={<BrowseApplications/>} />
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/browse-proposals" element={<ProfessorBrowseProposals/>} />
                <Route path="/browse-applications" element={<BrowseApplications/>} />
                <Route path="/add-proposal" element={<ProposalForm/>} />
                <Route path="/logout" element={<Logout setRole={setRole}/>} />
            </Routes>
            </div>
        </>
    )
}

export default ProfessorRoutes
