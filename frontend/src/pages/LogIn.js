import { Link, useNavigate } from "react-router-dom";
import "./css/LogIn.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function LogIn() {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    let _navigate = useNavigate();

    function handelLogIn() {
        _navigate("/");
    }

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2>Log In</h2>
                <Form onSubmit={handelLogIn}>
                    <Form.Control className="form-text-control" type="text" placeholder="Username" onChange={
                        (e) => setUsername(e.target.value)
                    } required/>
                    <Form.Control className="form-text-control" type="password" placeholder="Password" onChange={
                        (e) => setPassword(e.target.value)
                    } required/>
                    <Button type="submit">
                        Log In
                    </Button>
                </Form>
                <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
            </div>
        </div>
    );
}

export default LogIn;