import React, {Dispatch, SetStateAction, useContext, useEffect} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {LogOutContext, UserContext} from "../../contexts/UserContexts";
import {useNavigate} from "react-router-dom";
export type LogoutProps = {
    setRole: Dispatch<SetStateAction<string | null>>;
}
const Logout: React.FC<LogoutProps> = ({setRole}) => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const logOut=useContext(LogOutContext)


    useEffect(()=>{
        // @ts-ignore
        localStorage.setItem('role', "");
        setRole("");
        setUser("");
        // @ts-ignore
        logOut();
        navigate('/');
    },[])

    return (
        <>
        </>
    );
};

export default Logout;
