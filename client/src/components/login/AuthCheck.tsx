import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { TokenContext } from '../../contexts/UserContexts';
import LoginModal from './LoginModal';

interface AuthCheckProps {
    children: ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    const { role, setRole } = useContext(TokenContext);
    const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);

    const handleLogin = (): void => {
        // Qui dovresti implementare la logica di login.
        // Per esempio, dopo un login di successo:
        setRole('student'); // o 'professor', 'admin', etc.
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
