import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/User.css";
import { Col, Container, Row } from "react-bootstrap";
import LinkCard from "../components/LinkCard";
import GraveImage from "../assets/images/grave-3241769_1280.jpg";
import GraveInfoDisplayPanel from "../components/GraveInfoDisplayPanel";
import axios from "axios";

function User () {
    const [username,setUsername] = useState("John Doe");
    const {user} = useParams();

    async function GetUser() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/email=${user}`, {
                withCredentials: true,
            });
            const _user = _res.data[0];
            setUsername(_user.username);
        } catch (error) {
            console.log("error: ", error)
        }
    }

    useEffect(() => {
        GetUser();
    },[])

    return (
        <Container className="user-containers">
            <h2 className="user-title">{username}'s saved graves</h2>
            <Row>
                <Col className="user-grave-card-container" md="3">
                    <LinkCard/>
                    <LinkCard/>
                    <LinkCard/>
                    <LinkCard/>
                    <LinkCard/>
                    <LinkCard/>
                    <LinkCard/>
                    <LinkCard/>
                    <LinkCard/>
                </Col>
                <Col className="user-grave-card-container" md = "9">
                    <div className="user-grave-image-container">
                        <img className="user-grave-image" src={GraveImage}/>
                    </div>
                    <GraveInfoDisplayPanel/>
                    <GraveInfoDisplayPanel/>
                    <GraveInfoDisplayPanel/>
                </Col>
            </Row>
        </Container>
    )
}

export default User;