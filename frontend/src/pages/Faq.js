import { Accordion, Container } from "react-bootstrap";
import "./css/Faq.css";

function Faq() {
    return (
        <Container className="faq-container">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <Accordion className="faq-accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>What services do we offer?</Accordion.Header>
                    <Accordion.Body>
                        Memento Mori is a digital archive dedicated to cataloging and preserving the graves, cemeteries, and 
                        memorial sites across South Africa. Our platform provides tools for exploration, research, and remembrance.
                        <br/><br/>Here's a breakdown of our core offerings:
                        <ul>
                            <li><b>Grave & Cemetery Database</b><br/> Search a growing collection of graves, cemeteries, and memorials across South Africa. Filter by cemetery to find specific individuals or explore historical burial grounds.</li>
                            <li><b>User Contributions</b><br/> Upload transcriptions, and personal stories to help preserve the memory of those who came before us. Every contribution helps expand and enrich the archive.</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Why does the website have accounts?</Accordion.Header>
                    <Accordion.Body>
                        The existence of accounts is primarily for the convenience of our userbase.
                        Using our account system users are able to save the details of a grave, comment on graves and more easily share grave details with other users.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>What if a certain grave or graveyard is not present on the database?</Accordion.Header>
                    <Accordion.Body>
                        In the event of a grave/graveyard missing from our database then consider reaching out to 
                        any one of our 24/7 admin team or contribution team with the missing entry. They will attempt to verify the missing entry.
                        If the are able to verify the missing entry it will be added to our database. 
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>How do I become a contributor?</Accordion.Header>
                    <Accordion.Body>
                        We care a lot about our mission and thus we only let a small group of 
                        people contribute to our website. If you feel that our values align with your own. Then consider reaching out to 
                        any one of our 24/7 admin team and we can discuss your fit within our team's structure.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>How do I contact the admins?</Accordion.Header>
                    <Accordion.Body>
                        <p><b>Onthatile Lesufi:</b><br/>Email: onthatumi@outlook.com</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

export default Faq;