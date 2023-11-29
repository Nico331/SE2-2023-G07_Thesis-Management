import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "react-bootstrap"
import axios from "axios";
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    //return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
    return <Button onClick={() =>
        axios.get("http://localhost:8082/realms/oidcrealm/protocol/openid-connect/auth?response_type=code&client_id=oidc-client&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2F&code_challenge=KZX94fx-WnQAMwAfSmTrkmJMqptQpKt6LR_w_Smye-s&code_challenge_method=S256&scope=profile+openid")
    }>Log In</Button>;
};

export default LoginButton;
