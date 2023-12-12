import {Route, Routes} from "react-router-dom";
import  GuestNavigation  from "./GuestNavigation";
import GuestMain from "./GuestMain";
import  NotFound  from "../Layouts";
import Login from "../login/Login";
import React, {Dispatch, SetStateAction} from "react";
import MainNavBar from "../NavBar";
import RequestedProposals from "../Secretary/RequestedProposals";

type GuestRoutesProps = {
    setRoleState: Dispatch<SetStateAction<string | null>>;
};

const GuestRoutes: React.FC<GuestRoutesProps> = ({setRoleState }) =>{
    return(
        <>
            {/* <GuestNavigation /> */}
            <MainNavBar role={""} user={undefined} setRole={setRoleState}/>
            <Routes>
                <Route path="/" element={ <GuestMain/> } >
                    <Route index element={<GuestMain/>} />
                    {/*<Route path="/*" element={ <NotFound/> } />*/}
                </Route>
                <Route path="/requested-proposals" element={<RequestedProposals/>} />
                <Route path="/login" element={<Login setRoleState={setRoleState}/>}/>
            </Routes>
        </>
    )
}

export default GuestRoutes
