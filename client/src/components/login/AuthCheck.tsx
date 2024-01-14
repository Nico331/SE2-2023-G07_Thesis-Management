import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { TokenContext } from '../../contexts/UserContexts';
import LoginModal from './LoginModal';

interface AuthCheckProps {
    children: ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    // @ts-ignore
    const { role, setRole } = useContext(TokenContext);
    const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);

    const handleLogin = (): void => {
        setRole('student');
    };

    useEffect(() => {
        if (!role) {
            setLoginModalOpen(true);
        }
    }, [role]);

    return (
        <>
            {isLoginModalOpen && (
                <LoginModal onLogin={handleLogin} onClose={() => setLoginModalOpen(false)} />
            )}
            {children}
        </>
    );
};

export default AuthCheck;
