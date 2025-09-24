import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/User.css";
import { Col, Container, Row } from "react-bootstrap";

function User () {
    const [username,setUsername] = useState("John Doe");
    const {user} = useParams();

    async function GetUser() {
        
    }

    useEffect(() => {
        GetUser();
    },[])

    return (
        <Container className="user-containers">
            <h2>{username}'s saved graves</h2>
            <Row>
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default User;