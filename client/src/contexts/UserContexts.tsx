import React, { createContext, Dispatch, SetStateAction, useEffect, useState, ReactNode } from "react";

type StudentDTO = {
    id: string;
    surname: string;
    name: string;
    gender: string;
    nationality: string;
    email: string;
    codDegree: string;
    enrollmentYear: number;
};

type ProfessorDTO = {
    id: string;
    name: string;
    surname: string;
    email: string;
    codGroup: string;
    codDepartment: string;
};

type UserType = ProfessorDTO | StudentDTO ;

export interface UserContextType {
    user: string;
    setUser: Dispatch<SetStateAction<string>>;
}
export interface RoleContextType {
    role: string | null;
    setRole: Dispatch<SetStateAction<string | null>>;
}

interface LogOutContextType {
    logOut: () => void;
}

interface TokenContextType {
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
})

export const RoleContext = createContext<RoleContextType>({
    role: null,
    setRole: () => {},
})
;const LogOutContext = createContext<LogOutContextType | null>(null);

export const TokenContext = createContext<TokenContextType>({
    token: null,
    setToken: () => {},
});

interface TokenProviderProps {
    children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (token === null) {
            localStorage.removeItem('token');
        } else {
            localStorage.setItem('token', token);
        }
    }, [token]);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};
interface RoleProviderProps {
    children: ReactNode;
}
export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    useEffect(() => {
        if (role === null) {
            localStorage.removeItem('role');
        } else {
            localStorage.setItem('role', role);
        }
    }, [role]);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};
export { LogOutContext };
