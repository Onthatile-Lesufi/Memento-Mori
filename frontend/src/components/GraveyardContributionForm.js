import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ContributionMediaInput from "./ContributionMediaInput";
import ContributionInput from "./ContributionInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function GraveyardContributionForm () {
    const [name,setName] = useState(null);
    const [address,setAddress] = useState(null);
    const [province,setProvince] = useState(null);
    let _navigate = useNavigate();

    async function HandleSubmit () {
        try {
            const _res = await axios.post(`${process.env.REACT_APP_API_URL}/api/graveyards/register`, {
                name: name,
                address: address,
                province: province
            });
        } catch (error) {
            console.error("error:", error);
        }
    }

    return (
        <Form onSubmit={HandleSubmit}>
            <Container>
                <Row>
                    <Col md="12">
                        <ContributionInput placeholder={"Name"} inputType={"text"} returnFunction={setName}/>
                        <ContributionInput placeholder={"Address"} inputType={"text"} returnFunction={setAddress}/>
                        <ContributionInput placeholder={"Province"} inputType={"text"} returnFunction={setProvince}/>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default GraveyardContributionForm;