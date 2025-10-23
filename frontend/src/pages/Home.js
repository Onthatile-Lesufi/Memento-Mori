import { Button, Col, Container, Row } from 'react-bootstrap';
import './css/Home.css';
import CircleImage from "../assets/images/christian-1284529_960_720.jpg";
import { Link } from 'react-router-dom';
import BlackLogo  from '../assets/graphics/Logo_Black.svg';

function Home() {
    return (
        <Container id="home-container">
            <div className='landing-container'>
                <h1 id='landing-title'>Welcome to Memento Mori</h1>
                <h3 id='landing-subtitle'>A repository Of Graves, Cemeteries and Graveyards across South Africa</h3>
                <Row id='landing-row'>
                    <Col className='landing-col' md="6">
                        <img className='landing-logo' src={BlackLogo} alt='logo.png'/>
                    </Col>
                    <Col className='landing-col' md="6">
                        <p className='landing-copy'>
                            Welcome to Memento Mori, South Africa's digital sanctuary for the departed. This is more than a store of graves—it's a living archive of memory, heritage, and history.
                            <br/><br/>Don't let the locations of important family members be lost to time. Explore South Africa's sacred spaces with absolute certainty.
                            <br/><br/>From windswept rural plots to historic city cemeteries, Memento Mori offers a curated window into the final resting places that shape our collective story.
                        </p>
                        <Link to={"/signup"}>
                            <Button className='landing-button'>Get Started</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
            <hr></hr>
            <Row className='services-container'>
                <Col md="6" className='services-col'>
                    <div className='services-image-mask'>
                        <img className='services-image' src={CircleImage}/>
                    </div>
                </Col>
                <Col className='services-col' md="6">
                    <h3 className='services-copy'>
                        <br/><br/>Search graves by name, date, or location
                            
                        <br/><br/>Discover forgotten graveyards and hidden memorials
                            
                        <br/><br/>Contribute photos, stories, and records to preserve legacy
                    </h3>
                    <Link to={"/signup"}>
                        <Button className='landing-button'>Get Started</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;