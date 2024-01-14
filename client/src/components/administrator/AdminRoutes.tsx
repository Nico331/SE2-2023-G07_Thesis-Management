import React from "react";
import {Route, Routes} from "react-router-dom";
import AdminMain from "./AdminMain";
import NewStudent from "./NewStudent";
import { NotFound } from "../Layouts";
import StudentApplyForm from "../student/StudentApplyForm";
import MainNavBar from "../NavBar";


function AdminRoutes({setRoleState}){
    return(
        <>
            {/* <AdminNavigation /> */}
            <MainNavBar role={"ADMIN"} user={undefined} setRole={setRoleState}/>
            <Routes>
                <Route path="/" element={ <AdminMain/> } >
                    <Route index element={<AdminMain/>} />
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/admin/addStudent" element={ <NewStudent/> } />
                <Route path="/apply" element={<StudentApplyForm />} />
                {/*<Route path="/login" element={<LoginBody/>}/>*/}
            </Routes>
        </>
    )
}

export default AdminRoutes
