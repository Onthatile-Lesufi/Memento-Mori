import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./css/Audit.css";
import AuditCard from "../components/AuditCard";

function Audit() {
    const [ cards, setCards ] = useState([]);

    async function FetchAuditCards() {
        
    }

    useEffect (() => {
        FetchAuditCards();
    },[])

    return (
        <Container id="audit-container">
            {cards}
            <AuditCard/>
        </Container>
    )
}

export default Audit;