import { Button, Container, Form } from "react-bootstrap";
import { MoveLeft, MoveRight, Paperclip } from "lucide-react";
import "./css/UserEdit.css";
import PasswordChangeModal from "../components/PasswordChangeModal";
import NameChangeModal from "../components/NameChangeModal";
import EmailChangeModal from "../components/EmailChangeModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
    const [passwordStatus, setPasswordStatus] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const [nameStatus, setNameStatus] = useState(false);
    const [ id, setId ] = useState(null);
    const navigation = useNavigate();
    const {user} = useParams();

    async function ChangeEmail(email) {
        try {
            const _res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/update/email`, {
                id,
                email
            },
            {
                withCredentials: true, // Ensure cookies are sent with the request
            })
            navigation(`/user/${email}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function ChangePassword(password) {
        try {
            const _res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/update/password`, {
                id,
                password
            },
            {
                withCredentials: true, // Ensure cookies are sent with the request
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function ChangeName(username) {
        try {
            const _res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/update/username`, {
                id,
                username
            },
            {
                withCredentials: true, // Ensure cookies are sent with the request
            })
            navigation(`/user/${user}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function GetUser() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`, {
                withCredentials: true,
            });
            
            if (_res && _res.data.user && _res.data.authentication) {
                setId(_res.data.user.id);
            } else {

            }
        
        } catch (error) {
            console.error("Error: ",error);
        }
    }

    useEffect(() => {
        GetUser();
    }, []);

    return (
        <div className="User-Edit-Container">
            <div className="User-Edit-Panel">
                <Link to={`/user/${user}`}>Return to profile -{">"}</Link>
                <br/>
                <br/>
                <h2>Account Settings</h2>
                <div className="change-category-button" onClick={()=> setNameStatus(true)}>
                    <p className="change-category-name">Username</p>
                    <MoveRight className="change-category-arrow"/>
                </div>
                <div className="change-category-button" onClick={()=> setEmailStatus(true)}>
                    <p className="change-category-name">Email</p>
                    <MoveRight className="change-category-arrow"/>
                </div>
                <div className="change-category-button" onClick={()=> setPasswordStatus(true)}>
                    <p className="change-category-name">Password</p>
                    <MoveRight className="change-category-arrow"/>
                </div>
            </div>
            <PasswordChangeModal showModal={passwordStatus} modalChangeFunction={setPasswordStatus} PasswordChangeFunction={ChangePassword}/>
            <EmailChangeModal showModal={emailStatus} modalChangeFunction={setEmailStatus} EmailChangeFunction={ChangeEmail}/>
            <NameChangeModal showModal={nameStatus} modalChangeFunction={setNameStatus} NameChangeFunction={ChangeName}/>
        </div>

    )
}

export default UserEdit;