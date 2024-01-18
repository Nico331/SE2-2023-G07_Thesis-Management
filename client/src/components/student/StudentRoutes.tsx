import {Route, Routes} from "react-router-dom";
import StudentMain from "./StudentMain";
import { NotFound } from "../Layouts";
import ProposalList from "./ProposalList"
import StudentApplyForm from "../student/StudentApplyForm";
import React, {Dispatch, SetStateAction} from "react";
import Logout from "../login/Logout";
import StudentApplicationsListCollapse from "./StudentApplicationsListCollapse";
import MainNavBar from "../NavBar";
import StartRequest from "./StartRequest";
import Forum from "../forum/Forum";
import ForumForm from "../forum/ForumForm";
import TopicPage from "../forum/TopicPage";
import MyRequest from "./MyRequest";

type StudentRoutesProps = {
    setRoleState: Dispatch<SetStateAction<string | null>>;
};

const StudentRoutes: React.FC<StudentRoutesProps> = ({ setRoleState }) =>{
    return(
        <>
            {/* <StudentNavigation /> */}
            <MainNavBar setRole={setRoleState} role={"STUDENT"} user={undefined}/>
            <Routes>
                <Route path="/" element={ <StudentMain/> } >
                    <Route index element={<StudentMain/>} />
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/proposalList" element={<ProposalList/>} />
                <Route path="/apply/:proposalID" element={<StudentApplyForm />} />
                <Route path="/logout" element={<Logout setRole={setRoleState}/>} />
                <Route path="/myApplicationList" element={<StudentApplicationsListCollapse/>} />
                <Route path="/requestForm" element={<StartRequest/>}/>
                <Route path="/request" element={<MyRequest/>}/>
                <Route path="/forum" element={<Forum/>} />
                <Route path="/forum/new" element={<ForumForm/>} />
                <Route path="/forum/:forumId" element={<TopicPage />} />

            </Routes>
        </>
    )
}

export default StudentRoutes
