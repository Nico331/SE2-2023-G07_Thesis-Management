import React from 'react';
import { Modal } from 'react-bootstrap';
import LoginBody from './LoginBody';

interface LoginModalProps {
    show: boolean;
    close: () => void;
    errorLogin?: string; // Rendi questa prop opzionale se non è sempre passata
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
    return (
        <Modal show={props.show} onHide={props.close} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <LoginBody errorLogin={props.errorLogin} close={props.close} />
        </Modal>
    );
};

export default LoginModal;
