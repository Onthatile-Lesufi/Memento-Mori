import { Link, useNavigate } from "react-router-dom";
import "./css/LogIn.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function LogIn() {
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    let _navigate = useNavigate();

    async function GetUser() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`, {
                withCredentials: true,
            });
            if (_res.data) {
                _navigate("/");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error: ",error);
        }
    }

    async function handelLogIn() {
        try {
            const _res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                email: email,
                password: password
            },
            {
                withCredentials: true, // Ensure cookies are sent with the request
            })
            if (_res.data) {
                _navigate("/");
                window.location.reload();
            }
        } catch (error) {
            console.error('Login Error: ', error);
        }
    }

    useEffect(() => {
        GetUser();
    }, []);

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2>Log In</h2>
                <Form>
                    <Form.Control className="form-text-control" type="text" placeholder="Email" onChange={
                        (e) => setEmail(e.target.value)
                    } required/>
                    <Form.Control className="form-text-control" type="password" placeholder="Password" onChange={
                        (e) => setPassword(e.target.value)
                    } required/>
                    <Button className="log-in-button" onClick={handelLogIn}>
                        Log In
                    </Button>
                </Form>
                <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
            </div>
        </div>
    );
}

export default LogIn;