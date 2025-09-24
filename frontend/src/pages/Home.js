import { Col, Container, Row } from 'react-bootstrap';
import './css/Home.css';

function Home() {
    return (
        <Container id="home-container">
            <div className='landing-container'>
                <h1>Welcome to Memento Mori</h1>
            </div>
            <Row className='services-container'>
                <Col md="6" className='services-col'>
                    <div className='services-image'>
                        <img/>
                    </div>
                </Col>
                <Col md="6">
                </Col>
            </Row>
        </Container>
    )
}

export default Home;