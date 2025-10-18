import { Button, Col, Container, Row } from 'react-bootstrap';
import './css/Home.css';
import CircleImage from "../assets/images/christian-1284529_960_720.jpg";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Container id="home-container">
            <div className='landing-container'>
                <h1 id='landing-title'>Welcome to Memento Mori</h1>
                <h3 id='landing-subtitle'>A repository Of Graves, Cemeteries and Graveyards across South Africa</h3>
                <Row></Row>
                <Link to={"/signup"}>
                    <Button className='landing-button'>Get Started</Button>
                </Link>
            </div>
            <hr></hr>
            <Row className='services-container'>
                <Col md="6" className='services-col'>
                    <div className='services-image-mask'>
                        <img className='services-image' src={CircleImage}/>
                    </div>
                </Col>
                <Col md="6">
                    <p></p>
                    <Link to={"/signup"}>
                        <Button className='landing-button'>Get Started</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;