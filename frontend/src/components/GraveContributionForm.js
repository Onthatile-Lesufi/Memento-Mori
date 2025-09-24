import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ContributionMediaInput from "./ContributionMediaInput";
import ContributionInput from "./ContributionInput";
import { useNavigate } from "react-router-dom";

function GraveContributionForm() {
    let _navigate = useNavigate();

    function HandleSubmit () {
        _navigate("/");
    } 

    return (
        <Form onSubmit={HandleSubmit}>
            <Container>
                <Row>
                    <ContributionMediaInput/>
                    <Col md="6">
                        <ContributionInput placeholder={"Name"} inputType={"text"}/>
                        <ContributionInput placeholder={"ID Number"} inputType={"text"}/>
                        <ContributionInput placeholder={"Date Of Death"} inputType={"Date"}/>
                        <ContributionInput placeholder={"Date Of Burial"} inputType={"Date"}/>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default GraveContributionForm;