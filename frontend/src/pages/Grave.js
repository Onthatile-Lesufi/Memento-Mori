import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./css/Grave.css";
import GraveInfoDisplayPanel from "../components/GraveInfoDisplayPanel";
import GraveCommentSection from "../components/GraveCommentSection";
import axios from "axios";
import { Buffer } from "buffer";

function Grave () {
    const [grave, setGrave] = useState(null);
    const [graveImage, setGraveImage] = useState(null);
    const [graveyard, setGraveyard] = useState(null);
    const [gender, setGender] = useState("M");
    const [birthDate, setBirthDate] = useState("M");
    const [save, setSave] = useState(false);
    const [report, setReport] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {index} = useParams();

    function ReportGraveModal (willShow) {
        setShowModal(willShow);
    }

    function ReportGrave () {
        ReportGraveModal(false);
        setReport(true);
    }

    function SaveGrave () {
        setSave(!save);
    }

    function AnalyseId () {
        if (!grave) return;
        let _genderNumber = Number.parseInt(grave.id_number.slice(6,10));
        setGender(_genderNumber > 4999? "M" : "F")

        let _birthYear = grave.id_number.slice(0,2);
        let _birthMonth = grave.id_number.slice(2,4);
        let _birthDay = grave.id_number.slice(4,6);

        let _deathYear = new Date(grave.death_date).getFullYear();
        let _deathCentury = _deathYear.toString().slice(0,2);
        let _deathDecade = _deathYear.toString().slice(2,4);
        if (Number.parseInt(_birthYear) > Number.parseInt(_deathDecade)) {
            // let _tempYear = Number.parseInt(_deathCentury -)
        }
        console.log(_deathCentury);
        

        // let _date = Date.parse(`${_year}-${_month}-${_day}`);
    }

    async function FetchGrave() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/id=${index}`);
            let _grave = _res.data[0];
            let _image = _grave.grave_image.data;
            console.log(_image)
            const buff = Buffer.from(_image).toString("base64"); // Node.js Buffer
            console.log(buff);
            const blob = new Blob([buff], { type: 'image/jpeg' }); // JavaScript Blob

            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                // setGraveImage(URL.createObjectURL(blob));
                // console.log(URL.createObjectURL(blob));
                setGraveImage(reader.result);
                console.log(reader.result);
            }
            
            setGrave(_grave);
        } catch (error) {
            console.error(error);
        }
    }

    async function FetchGraveyard() {
        try {
            const _graveyardRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/id=${grave.graveyard_id}`);
            setGraveyard(_graveyardRes.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        FetchGrave();
    },[])

    useEffect(() => {
        if (grave) console.log(grave.grave_image);
        AnalyseId();
        FetchGraveyard();
    },[grave])

    return (
        <Container className="grave-container">
            {grave && graveyard ?
            <>
                <h2 className="grave-name">{grave.grave_name}, {gender}</h2>
                <Row>
                    <Col md="6">
                        <div className="grave-image-holder">
                            <img src={`${graveImage}`}/>
                        </div>
                    </Col>
                    <Col md="6" className="grave-panel-holder">
                        <GraveInfoDisplayPanel label={"ID Number:"} info={grave.id_number}/>
                        <GraveInfoDisplayPanel label={"Date Of Birth:"} info={birthDate}/>
                        <GraveInfoDisplayPanel label={"Date Of Death:"} info={grave.death_date}/>
                        <GraveInfoDisplayPanel label={"Date Of Burial:"} info={grave.burial_date}/>
                        <GraveInfoDisplayPanel label={"Graveyard:"} info={graveyard.graveyard_name}/>
                    </Col>
                </Row>
                <Row className="grave-button-row">
                    <Col md="6" className="grave-col">
                        <Button className="grave-buttons" onClick={SaveGrave}>{save ? "Saved" : "Save"}</Button>
                    </Col>
                    <Col md="6" className="grave-col">
                        <Button className="grave-buttons" variant="danger" disabled={report} onClick={() => ReportGraveModal(true)}>{report ? "Reported" : "Report"}</Button>
                    </Col>
                </Row>
                <GraveCommentSection/>

                <Modal show={showModal} onHide={() => ReportGraveModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Report {grave.grave_name}'s page?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You are about to flag the page of {grave.grave_name} are you sure that is what you want do to?<br/><br/>If so, consider leaving a reason to make our moderator's life easier {"(e.g. Vandalism, Incorrect Information, etc)"}</p>
                        <Form.Control placeholder="Report reason"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => ReportGraveModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={ReportGrave}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            :
            <></>}
        </Container>
    )
}

export default Grave;