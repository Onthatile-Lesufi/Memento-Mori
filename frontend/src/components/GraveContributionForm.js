import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ContributionMediaInput from "./ContributionMediaInput";
import ContributionInput from "./ContributionInput";
import { useNavigate } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/GraveContributionForm.css";

function GraveContributionForm() {
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [dod, setDod] = useState(null);
    const [dob, setDob] = useState(null);
    const [graveyard, setGraveyard] = useState(null);
    const [graveyards, setGraveyards] = useState([]);
    const [yardNames, setYardNames] = useState([]);
    const [graveImage, setGraveImage] = useState(null);
    let _navigate = useNavigate();

    async function GetNames() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/`);
            let _graveyards = _res.data;
            if (_graveyards.length > 0) {
                setGraveyards(_graveyards);
                setYardNames(_graveyards.map((_i) => _i.graveyard_name));
            }
        } catch (error) {
            console.error("error:", error);
        }
    }

    async function HandleSubmit () {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("image", graveImage);
        formData.append("id", id);
        formData.append("dod", dod);
        formData.append("dob", dob);
        formData.append("graveyard", graveyard.graveyard_id);
        const config = {headers: {'Content-Type': 'multipart/form-data'}}
        try {  
            const _res = await axios.post(`${process.env.REACT_APP_API_URL}/api/graves/register`,formData,config);
            console.log(_res.data);
            // _navigate("/");
        } catch (error) {
            console.error("error:", error);
        }
    } 

    useEffect(() => {
        GetNames();
    },[])

    return (
        <Form onSubmit={HandleSubmit}>
            <Container>
                <Row>
                    <ContributionMediaInput returnFunction={setGraveImage}/>
                    <Col md="6">
                        <ContributionInput placeholder={"Name"} inputType={"text"} returnFunction={setName}/>
                        <ContributionInput placeholder={"ID Number"} inputType={"text"} returnFunction={setId}/>
                        <ContributionInput placeholder={"Date Of Death"} inputType={"Date"} returnFunction={setDod}/>
                        <ContributionInput placeholder={"Date Of Burial"} inputType={"Date"} returnFunction={setDob}/>
                        <Typeahead className="contribution-input-typeahead" options={yardNames} placeholder="Graveyard" onChange={(result) => {
                            let _temp = graveyards.find((_i) => _i.graveyard_name === result[0]);
                            setGraveyard(_temp);
                        }}/>
                        <Button onClick={HandleSubmit}>Submit</Button>
                        {/* <Button type="submit">Submit</Button> */}
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default GraveContributionForm;