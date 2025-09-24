import "./css/About.css";
import { Col, Container, Row } from "react-bootstrap";
import HeadingTextBlock from "../components/HeadingTextBlock";

function About() {
    return (
        <div className="about-container">
            <h2 className="about-heading">About Us</h2>
            <p></p>
            <Container>
                <Row>
                    <Col md="4">
                        <HeadingTextBlock heading={"Our Mission"} text={`helo\ngelo`}/>
                    </Col>
                    <Col md="4">
                        <HeadingTextBlock heading={"Our Team"} text={``}/>
                    </Col>
                    <Col md="4">
                        <HeadingTextBlock heading={"Our Services"} text={``}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About;