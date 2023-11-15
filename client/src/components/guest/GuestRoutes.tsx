import {Route, Routes} from "react-router-dom";
import  GuestNavigation  from "./GuestNavigation";
import GuestMain from "./GuestMain";
import  NotFound  from "../Layouts";
import Login from "../login/Login";
import React, {Dispatch, SetStateAction} from "react";
type GuestRoutesProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
};

const GuestRoutes: React.FC<GuestRoutesProps> = ({ setRole }) =>{
    return(
        <>
            <GuestNavigation />
            <Routes>
                <Route path="/" element={ <GuestMain/> } >
                    <Route index element={<GuestMain/>} />
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/login" element={<Login setRole={setRole}/>}/>
            </Routes>
        </>
    )
}

export default GuestRoutes
