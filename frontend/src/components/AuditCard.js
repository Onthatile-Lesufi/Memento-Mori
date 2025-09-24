import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./css/AuditCard.css";

const AuditCard = ({type, index}) => {
    const [ image,  setImage ] = useState(null);
    const [ info, setInfo ] = useState(null);

    useEffect(() => {
        switch (type) {
            case "grave":
                
                break;
            case "graveyard":
                
                break;
            default:
                break;
        }
    },[]);

    return (
        <Row className="audit-card-container">
            <Col md="3">
                <img src={image} alt="image" className="audit-card-image"/>
                <div>
                    <Button>Accept</Button>
                    <Button variant="danger">Reject</Button>
                </div>
            </Col>
            <Col md="9">
                <p>{info}</p>
            </Col>
        </Row>
    )
}

export default AuditCard;