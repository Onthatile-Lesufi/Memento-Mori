import "./css/Contribute.css";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import GraveContributionForm from "../components/GraveContributionForm";
import GraveyardContributionForm from "../components/GraveyardContributionForm";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Contribute() {
    const [user,setUser] = useState(null);
    const navigation = useNavigate();

    async function CheckRole() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`, {
                withCredentials: true,
            });
            if (_res) {
                let _user = _res.data.user;
                if (!_user || _user.role !== "admin") {
                    alert("Insufficient rights\nReturning to Home");
                    navigation("/");
                    return;
                }
                setUser(_res);
            }
        
        } catch (error) {
            console.error("Error: ",error);
            alert("Unable to confirm user role\nReturning to Home");
            navigation("/");
        }
    }

    useEffect(() => {
        CheckRole();
    },[])

    return (
        <Container className="contribute-container">
            {user?
                <Tab.Container id="left-tabs-example" defaultActiveKey="grave">
                    <Row className="tab-button-row">
                        <Nav id="contribution-nav-container" variant="pills">
                            <Col>
                                <Nav.Item>
                                    <Nav.Link eventKey="grave">Grave</Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col>
                                <Nav.Item>
                                    <Nav.Link eventKey="graveyard">Graveyard</Nav.Link>
                                </Nav.Item>
                            </Col>
                        </Nav>
                    </Row>
                    <Row className="tab-content-display">
                        <Tab.Content>
                            <Tab.Pane eventKey="grave">{<GraveContributionForm/>}</Tab.Pane>
                            <Tab.Pane eventKey="graveyard">{<GraveyardContributionForm/>}</Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            :
                <></>
            }
            
        </Container>
    );
}

export default Contribute;