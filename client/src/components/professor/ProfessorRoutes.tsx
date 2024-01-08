import {Route, Routes} from "react-router-dom";
import ProfessorMain from "./ProfessorMain";
import { NotFound } from "../Layouts";
import {ProfessorBrowseProposals} from "./BrowseProposals"
import React, {Dispatch, SetStateAction} from "react";
import Logout from "../login/Logout";
import ProposalForm from "./ProposalForm";
import BrowseApplications from "./BrowseApplications";
import MainNavBar from "../NavBar";
import ArchivedProposals from "./ArchivedProposals";
import Forum from "../forum/Forum";
import ForumForm from "../forum/ForumForm";
import TopicPage from "../forum/TopicPage";
import BrowseApplicationsAsCosupervisor from "./BrowseApplicationsAsCosupervisor";
import BrowseRequests from "./BrowseRequests";
import BrowseRequestsArchived from "./BrowseRequestsArchived";


type ProfessorRoutesProps = {
    setRoleState: Dispatch<SetStateAction<string | null>>;
};

const ProfessorRoutes: React.FC<ProfessorRoutesProps> = ({ setRoleState }) =>{
    return(
        <div className="App" style={{}}>
            {/* <ProfessorNavigation setRole={setRole} /> */}
            <MainNavBar setRole={setRoleState} role={"PROFESSOR"} user={undefined}/>
            <Routes>
                <Route path="/" element={ <ProfessorMain/> } >
                    <Route index element={<ProfessorMain/>} />
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/browse-proposals" element={<ProfessorBrowseProposals/>} />
                <Route path="/browse-applications" element={<BrowseApplications/>} />
                <Route path="/browse-applications-cosupervisor" element={<BrowseApplicationsAsCosupervisor/>} />
                <Route path="/add-proposal" element={<ProposalForm/>} />
                <Route path="/archived-proposals" element={<ArchivedProposals/>} />
                <Route path="/forum" element={<Forum/>} />
                <Route path="/forum/new" element={<ForumForm/>} />
                <Route path="/forum/:forumId" element={<TopicPage />} />
                <Route path="/browse-requests" element={<BrowseRequests />} />
                <Route path="/browse-requests-archived" element={<BrowseRequestsArchived />} />
                <Route path="/logout" element={<Logout setRole={setRoleState}/>} />
            </Routes>
        </div>
    )
}

export default ProfessorRoutes
