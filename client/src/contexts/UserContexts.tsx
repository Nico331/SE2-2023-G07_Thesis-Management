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

type UserType = StudentDTO | ProfessorDTO;

export interface UserContextType {
    user: UserType | null;
    setUser: Dispatch<SetStateAction<UserType | null>>;
}

interface LogOutContextType {
    logOut: () => void;
}

interface TokenContextType {
    role: string | null;
    setRole: Dispatch<SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
})

;const LogOutContext = createContext<LogOutContextType | null>(null);

export const TokenContext = createContext<TokenContextType>({
    role: null,
    setRole: () => {},
});

interface TokenProviderProps {
    children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    useEffect(() => {
        if (role === null) {
            localStorage.removeItem('role');
        } else {
            localStorage.setItem('role', role);
        }
    }, [role]);

    return (
        <TokenContext.Provider value={{ role, setRole }}>
            {children}
        </TokenContext.Provider>
    );
};

export { LogOutContext };
