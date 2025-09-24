import { Link, useNavigate } from "react-router-dom";
import "./css/SignUp.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function SignUp() {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ isSamePassword, setIsSamePassword ] = useState(false);
    let _navigate = useNavigate();

    function ConfirmPassword (tempPassword) {
        console.log(password === tempPassword);
        setIsSamePassword(password === tempPassword);
    }

    function RegisterUser () {
        if (!isSamePassword) return;
        _navigate("/")
    }

    return (
        <div className="login-container">
            <div className="signup-form-container">
                <h2>Sign Up</h2>
                <Form onSubmit={RegisterUser}>
                    <Form.Control className="form-text-control" type="text" placeholder="Username" onChange={
                        (e) => setUsername(e.target.value)
                    } required/>
                    <Form.Control className="form-text-control" type="password" placeholder="Password" onChange={
                        (e) => setPassword(e.target.value)
                    } required/>
                    <Form.Control className="form-text-control" type="password" placeholder="Confirm Password" onChange={
                        (e) => ConfirmPassword(e.target.value)
                    } required/>
                    <Button type={"submit"}>
                        Sign Up
                    </Button>
                </Form>
                <p>Already have an account? <Link to={"/login"}>Log In</Link></p>
            </div>
        </div>
    );
}

export default SignUp;