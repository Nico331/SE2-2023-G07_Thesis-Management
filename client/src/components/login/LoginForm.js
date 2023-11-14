import {useContext, useState} from "react";
import {TokenContext, UserContext} from "../../contexts/UserContexts";
import {useNavigate} from "react-router-dom";
import {Container, ListGroup, ListGroupItem} from "react-bootstrap";
import LoginFormBody from "./LoginFormBody";

function LoginForm(props) {

    return (
        <>
            <Container>
                { <LoginFormBody/>}
            </Container>
        </>
    )
}
export default LoginForm