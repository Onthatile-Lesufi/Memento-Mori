import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ContributionMediaInput from "./ContributionMediaInput";
import ContributionInput from "./ContributionInput";
import { useNavigate } from "react-router-dom";

function GraveyardContributionForm () {
    let _navigate = useNavigate();

    function HandleSubmit () {
        _navigate("/");
    }

    return (
        <Form onSubmit={HandleSubmit}>
            <Container>
                <Row>
                    <ContributionMediaInput/>
                    <Col>
                        <ContributionInput placeholder={"Name"} inputType={"text"}/>
                        <ContributionInput placeholder={"Address"} inputType={"text"}/>
                        <ContributionInput placeholder={"City"} inputType={"text"}/>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default GraveyardContributionForm;