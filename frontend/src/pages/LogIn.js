import { Link, useNavigate } from "react-router-dom";
import "./css/LogIn.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function LogIn() {
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    let _navigate = useNavigate();

    async function handelLogIn() {
        try {
            const _res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                email: email,
                password: password
            },
            {
                withCredentials: true, // Ensure cookies are sent with the request
            })
            console.log(_res);
            _navigate("/");
        } catch (error) {
            console.error('Login Error: ', error);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2>Log In</h2>
                {/* <Form onSubmit={handelLogIn}> */}
                <Form >
                    <Form.Control className="form-text-control" type="text" placeholder="Email" onChange={
                        (e) => setEmail(e.target.value)
                    } required/>
                    <Form.Control className="form-text-control" type="password" placeholder="Password" onChange={
                        (e) => setPassword(e.target.value)
                    } required/>
                    <Button onClick={handelLogIn}>
                        Log In
                    </Button>
                </Form>
                <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
            </div>
        </div>
    );
}

export default LogIn;