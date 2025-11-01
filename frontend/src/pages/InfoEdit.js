import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ContributionMediaInput from "../components/ContributionMediaInput";
import EditInput from "../components/EditInput";
import { useParams, useNavigate } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/InfoEdit.css";

const InfoEdit = () => {
    const [grave, setGrave] = useState(null);
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [dod, setDod] = useState(null);
    const [dob, setDob] = useState(null);
    const [graveyard, setGraveyard] = useState(null);
    const [graveyards, setGraveyards] = useState([]);
    const [yardNames, setYardNames] = useState([]);
    const [graveImage, setGraveImage] = useState(null);
    const {index} = useParams();
    let navigation = useNavigate();

    async function GetGrave() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/id=${index}/graveyard`);
            let _grave = _res.data[0];
            
            setName(_grave.grave_name);
            setGraveImage(_grave.grave_image);
            setId(_grave.id_number);
            setDod(_grave.death_date);
            setDob(_grave.burial_date);

            let _deathMonth = new Date(_grave.death_date).getMonth().toString();
            if (_deathMonth.length === 1) _deathMonth = "0" + _deathMonth;
            let _deathDay = new Date(_grave.death_date).getDate().toString();
            if (_deathDay.length === 1) _deathDay = "0" + _deathDay;

            let _burialMonth = new Date(_grave.burial_date).getMonth().toString();
            if (_burialMonth.length === 1) _burialMonth = "0" + _burialMonth;
            let _burialDay = new Date(_grave.burial_date).getDate().toString();
            if (_burialDay.length === 1) _burialDay = "0" + _burialDay;

            let _deathDate = `${new Date(_grave.death_date).getFullYear()}-${_deathMonth}-${_deathDay}`;
            let _burialDate = `${new Date(_grave.burial_date).getFullYear()}-${_burialMonth}-${_burialDay}`;
            
            _grave.death_date = _deathDate;
            _grave.burial_date = _burialDate;
            
            setGrave(_grave);
            let _graveyard = {
                graveyard_id: _grave.graveyard_id,
                graveyard_name: _grave.graveyard_name,
                graveyard_province: _grave.graveyard_province,
                graveyard_address: _grave.graveyard_address
            }
            setGraveyard(_graveyard);
        } catch (error) {
            console.error("error:", error);
        }
    }

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
        formData.append("origin", index);
        const config = {headers: {'Content-Type': 'multipart/form-data'}}
        try {  
            const _res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/graves/update`,formData,config);
            
            navigation(`/grave/${index}`);
        } catch (error) {
            console.error("error:", error);
        }
    } 

    useEffect(() => {
        GetNames();
        GetGrave();
    },[])

    return (
        <Container className="edit-container">
            {grave && yardNames.length > 0 ? 
                <Form onSubmit={HandleSubmit}>
                    <h2 className="edit-heading">Edit {grave.grave_name}</h2>
                    <Row>
                        <ContributionMediaInput defaultImage={grave.grave_image} returnFunction={setGraveImage}/>
                        <Col md="6">
                            <EditInput placeholder={"Name"} inputType={"text"} returnFunction={setName} previousValue={grave.grave_name}/>
                            <EditInput placeholder={"ID Number"} inputType={"text"} returnFunction={setId} previousValue={grave.id_number}/>
                            <EditInput placeholder={"Date Of Death"} inputType={"Date"} returnFunction={setDod} previousValue={grave.death_date}/>
                            <EditInput placeholder={"Date Of Burial"} inputType={"Date"} returnFunction={setDob} previousValue={grave.burial_date}/>
                            <Typeahead defaultInputValue={grave.graveyard_name} className="contribution-input-typeahead" options={yardNames} placeholder="Graveyard" onChange={(result) => {
                                let _temp = graveyards.find((_i) => _i.graveyard_name === result[0]);
                                setGraveyard(_temp);
                            }}/>
                            <Button onClick={HandleSubmit}>Submit</Button>
                            {/* <Button type="submit">Submit</Button> */}
                        </Col>
                    </Row>
                </Form>
            :
                <></>
            }
            
        </Container>
    )
}

export default InfoEdit;