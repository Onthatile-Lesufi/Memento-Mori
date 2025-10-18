import "./css/About.css";
import { Col, Container, Row } from "react-bootstrap";
import HeadingTextBlock from "../components/HeadingTextBlock";
import FounderImage from "../assets/images/onthatile.jpg";

function About() {
    return (
        <Container className="about-container">
            <h2 className="about-heading">About Us</h2>
            <p className="about-text"></p>
            <Row>
                <Col md="6">
                    <HeadingTextBlock heading={"Our Mission"} text={'The mission of Memento Mori is to be a complete repository of information relating to the various graves, graveyards, cemetaries and gravesites. This is all while maintaining the upmost accuracy.'}/>
                </Col>
                <Col md="6">
                    <HeadingTextBlock heading={"Services Explained"} text={'Our services primarily relate to the cataloguing data and indices relating to graves and gravesites.'}/>
                </Col>
            </Row>
            <Row className="origin-row">
                <Col md="12">
                    <HeadingTextBlock heading={"Origins"} text={"Memento Mori started as a concept in the mind of our founder, Onthatile Tumiso Lesufi. Thinking about the lack of resources available to know how to access the graves of love ones aside from elder family members, the idea was born. What if there was a website that maintained all of this information."}/>
                    <img className="founder-image" src={FounderImage}/>
                    <p>Onthatile Lesufi</p>
                    <p>Our Founder</p>
                </Col>
            </Row>
        </Container>
    )
}

export default About;