import { Link } from "react-router-dom";
import "./css/LogIn.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function LogIn() {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2>Log In</h2>
                <Form>
                    <Form.Control type="text" placeholder="Username" onChange={
                        (e) => setUsername(e.target.value)
                    }/>
                    <Form.Control type="password" placeholder="Password" onChange={
                        (e) => setPassword(e.target.value)
                    }/>
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
                <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
            </div>
        </div>
    );
}

export default LogIn;