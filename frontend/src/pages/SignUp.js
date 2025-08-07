import { Link } from "react-router-dom";
import "./css/SignUp.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function SignUp() {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ isSamePassword, setIsSamePassword ] = useState(false);

    function ConfirmPassword (tempPassword) {
        console.log(password === tempPassword);
        setIsSamePassword(password === tempPassword);
    }

    function RegisterUser () {

    }

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2>Sign Up</h2>
                <Form onSubmit={RegisterUser}>
                    <Form.Control type="text" placeholder="Username" onChange={
                        (e) => setUsername(e.target.value)
                    }/>
                    <Form.Control type="password" placeholder="Password" onChange={
                        (e) => setPassword(e.target.value)
                    }/>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={
                        (e) => ConfirmPassword(e.target.value)
                    }/>
                    <Button type={ isSamePassword ? "submit" : "button"}>
                        Submit
                    </Button>
                </Form>
                <p>Already have an account? <Link to={"/login"}>Log In</Link></p>
            </div>
        </div>
    );
}

export default SignUp;