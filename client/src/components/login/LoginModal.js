import {ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useState} from "react";
import LoginBody from "./LoginBody";

function LoginModal(props){

    return(
        <>
            <>
                <Modal show={props.show} onHide={props.close} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <ListGroup horizontal>
                            </ListGroup>
                        </Modal.Title>
                    </Modal.Header>
                        <LoginBody errorLogin={props.errorLogin}  close={props.close} />:
                </Modal>
            </>
        </>
    )
}
export default LoginModal