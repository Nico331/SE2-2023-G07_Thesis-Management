import {Route, Routes} from "react-router-dom";
import GuestMain from "./GuestMain";
import Login from "../login/Login";
import React, {Dispatch, SetStateAction} from "react";
import MainNavBar from "../NavBar";

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
                <Route path="/login" element={<Login setRoleState={setRoleState}/>}/>
            </Routes>
        </>
    )
}

export default GuestRoutes
