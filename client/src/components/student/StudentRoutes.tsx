import {Route, Routes} from "react-router-dom";
import StudentNavigation from "./StudentNavigation";
import StudentMain from "./StudentMain";
import { NotFound } from "../Layouts";
import ProposalList from "./ProposalList"
import StudentApplyForm from "../student/StudentApplyForm";
import React, {Dispatch, SetStateAction} from "react";
import Logout from "../login/Logout";
import StudentApplicationsListCollapse from "./StudentApplicationsListCollapse";

type StudentRoutesProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
};

const StudentRoutes: React.FC<StudentRoutesProps> = ({ setRole }) =>{
    console.log("In admin")
    return(
        <>
            <StudentNavigation />
            <Routes>
                <Route path="/" element={ <StudentMain/> } >
                    <Route index element={<StudentMain/>} />
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/proposalList" element={<ProposalList/>} />
                <Route path="/apply/:proposalID" element={<StudentApplyForm />} />
                <Route path="/logout" element={<Logout setRole={setRole}/>} />
                <Route path="/myApplicationList" element={<StudentApplicationsListCollapse/>} />
            </Routes>
        </>
    )
}

export default StudentRoutes
