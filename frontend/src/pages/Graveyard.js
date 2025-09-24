import { Container } from "react-bootstrap";
import "./css/Graveyard.css";
import { useState } from "react";

const Graveyard = () => {
    const [gyName, setGyName] = useState("Graveyard");

    return (
        <Container className="graveyard-container">
            <h2>{gyName}</h2>
        </Container>
    )
}

export default Graveyard;