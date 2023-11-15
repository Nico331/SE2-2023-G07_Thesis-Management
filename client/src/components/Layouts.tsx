import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export function NotFound() {
    return (
        <>
            <h2>PAGE NOT FOUND!</h2>
            <Link to="/">
                <Button variant="primary">Go Home!</Button>
            </Link>
        </>
    );
}

export default { NotFound }