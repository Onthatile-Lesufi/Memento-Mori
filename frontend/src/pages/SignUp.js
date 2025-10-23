import { Link, useNavigate } from "react-router-dom";
import "./css/SignUp.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function SignUp() {
    const [ username, setUsername ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState("");
    const [ isSamePassword, setIsSamePassword ] = useState(false);
    let _navigate = useNavigate();

    function ConfirmPassword (tempPassword) {
        let _result = password === tempPassword && password !== "" && tempPassword !== "";
        setIsSamePassword(_result);
    }

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

    async function RegisterUser () {
        if (!isSamePassword) return;
        try {
            const _res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
                username: username,
                email: email,
                password: password
            },
            {
                withCredentials: true, // Ensure cookies are sent with the request
            })
            
            if (_res.data) {
                _navigate("/login");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        GetUser();
    }, []);

    return (
        <div className="login-container">
            <div className="signup-form-container">
                <h2>Sign Up</h2>
                <Form>
                    <Form.Control className="form-text-control" type="text" placeholder="Email" onChange={
                        (e) => setEmail(e.target.value)
                    } required/>
                    <Form.Control className="form-text-control" type="text" placeholder="Username" onChange={
                        (e) => setUsername(e.target.value)
                    } required/>
                    <Form.Control className="form-text-control" type="password" placeholder="Password" onChange={
                        (e) => setPassword(e.target.value)
                    } required/>
                    <Form.Control className="form-text-control" type="password" placeholder="Confirm Password" onChange={
                        (e) => ConfirmPassword(e.target.value)
                    } required/>
                    <Button className="sign-up-button" onClick={RegisterUser}>
                        Sign Up
                    </Button>
                </Form>
                <p>Already have an account? <Link to={"/login"}>Log In</Link></p>
            </div>
        </div>
    );
}

export default SignUp;