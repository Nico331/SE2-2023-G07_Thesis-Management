import React from 'react';
import { Modal } from 'react-bootstrap';

interface LoginModalProps {
    show: boolean;
    close: () => void;
    errorLogin?: string;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
    return (
        <Modal show={props.show} onHide={props.close} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            {/*<LoginBody errorLogin={props.errorLogin} close={props.close} />*/}
        </Modal>
    );
};

export default LoginModal;
