import React from "react";
import {Route, Routes} from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import AdminMain from "./AdminMain";
import NewStudent from "./NewStudent";
import { NotFound } from "../Layouts";
import LoginBody from "../login/LoginBody";
import StudentApplyForm from "../student/StudentApplyForm";
import StudentApplicationList from "../student/StudentApplicationList";


function AdminRoutes(){
    return(
        <>
            <AdminNavigation />
            <Routes>
                <Route path="/" element={ <AdminMain/> } >
                    <Route index element={<AdminMain/>} />
                    <Route path="/*" element={ <NotFound/> } />
                </Route>
                <Route path="/admin/addStudent" element={ <NewStudent/> } />
                <Route path="/apply" element={<StudentApplyForm />} />
                <Route path="/login" element={<LoginBody/>}/>
            </Routes>
        </>
    )
}

export default AdminRoutes
