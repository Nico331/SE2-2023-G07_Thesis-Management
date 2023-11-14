import {Alert, Button, Form, Modal} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {TokenContext, UserContext} from "../../contexts/UserContexts";
import {useNavigate} from "react-router-dom";
//import jwtDecode from "jwt-decode";
const jwtDecode = (jwt) =>{
    return jwt;
}
function LoginBody(props){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [userEmail,setUserEmail]=useState(localStorage.getItem("username")?localStorage.getItem("username"):"")
    const [message, setMessage] = useState(props.errorLogin);
    const {token,setToken}=useContext(TokenContext)
    const {user,setUser}=useContext(UserContext)
    const navigate=useNavigate()
    let role = "";

    const saveUser=(data)=>{
        setUser(data)
        localStorage.setItem("user",JSON.stringify(data))
    }

    useEffect(() => {
        setMessage(props.errorLogin);
    }, [props.errorLogin])

    const validateLogin=(data)=>{

        setToken(data["jwt"])
        localStorage.setItem("token",data["jwt"])
        sessionStorage.setItem("token",data["jwt"])
        const tk = jwtDecode(data["jwt"]);
        setUserEmail(tk["email"])
        localStorage.setItem("email",tk["email"])
        localStorage.setItem("username",tk["preferred_username"])
        role =tk["realm_access"]["roles"].find((value)=> /^app_/.test(value))
        localStorage.setItem("role",role)

        if(jwtDecode(data["jwt"])["resource_access"]["realm-management"]?.roles.includes("create-client")) {
            saveUser(
                {
                    name: "Admin",
                    role: "app_admin"
                }
            )
            localStorage.setItem("role","app_admin")
        } else {
            fetch(role==="app_user"?"/API/profiles/" + tk["email"]:"/API/expert/interns/" +tk["email"], {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data["jwt"]
                }
            })
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => saveUser(data)).then(()=>navigate("/"))
                    }
                    else if(response.status===404){
                        navigate("/profiles/add")
                    }

                })
        }
    }

    const handleSubmit = (event) => {
        setMessage('');
        //event.preventDefault();
        const credentials = { username, password };
        let validate = true;
        if (username==="" || password.length < 2)
            validate = false;
        if (validate) {
            const body={
                "username":username,
                "password":password
            }
            fetch('/API/login',{method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((response) => {
                    if(response.ok){
                        response.json().then((data) => validateLogin(data)).then(props.close)
                        setMessage('');
                    }
                    else{
                        setMessage("Invalid Username or password");
                    }
                })
                .catch((error) => console.log(error));
        }
        else {
            setMessage("Invalid Username or password");
        }
    };
    return(<>
        <Modal.Body>
            <Form className="login" onKeyPress={event=> {if (event.key==="Enter"){ return handleSubmit()}}}>
                <Form.Group controlid='Username' className="loginField" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="username" type='email' value={username} onChange={ev => { setUsername(ev.target.value); setMessage("") }} />
                </Form.Group>
                <Form.Group controlid='Password' className="loginField">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="password" type='password' value={password} onChange={ev => { setPassword(ev.target.value); setMessage("") }} />
                </Form.Group>
                {message && message !== '' && <Alert className="loginField" variant="danger">{message}</Alert>}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>{ props.close(); navigate("/")}}>Go Home</Button>
            <Button className="loginButton" onClick={handleSubmit}>Login</Button>
        </Modal.Footer>
    </>)
}
export default LoginBody