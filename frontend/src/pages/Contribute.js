import "./css/Contribute.css";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import GraveContributionForm from "../components/GraveContributionForm";
import GraveyardContributionForm from "../components/GraveyardContributionForm";

function Contribute() {
    return (
        <div className="contribute-container">
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
        </div>
    );
}

export default Contribute;