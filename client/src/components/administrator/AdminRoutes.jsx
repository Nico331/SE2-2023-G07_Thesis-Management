import {Route, Routes} from "react-router-dom";
import { AdminNavigation } from "./AdminNavigation";
import {AdminMain} from "./AdminMain";
import {NewStudent} from "./NewStudent";
import { NotFound } from "../Layouts"

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
            </Routes>
        </>
    )
}

export { AdminRoutes }