import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./css/Grave.css";
import GraveInfoDisplayPanel from "../components/GraveInfoDisplayPanel";
import GraveCommentSection from "../components/GraveCommentSection";

function Grave () {
    const [name, setName] = useState("John Doe");
    const [image, setImage] = useState(null);
    const [idNumber, setIdNumber] = useState(null);
    const [gender, setGender] = useState("M");
    const [save, setSave] = useState(false);
    const [report, setReport] = useState(false);
    const {index} = useParams();

    function ReportGrave () {
        setReport(true);
    }

    function SaveGrave () {
        setSave(true);
    }

    return (
        <Container className="grave-container">
            <h2 className="grave-name">{name}, {gender}</h2>
            <Row>
                <Col md="6">
                    <div className="grave-image-holder">
                        <img/>
                    </div>
                </Col>
                <Col md="6">
                    <GraveInfoDisplayPanel label={"ID Number:"} info={idNumber}/>
                    <GraveInfoDisplayPanel label={"Date Of Birth:"}/>
                    <GraveInfoDisplayPanel label={"Date Of Death:"}/>
                    <GraveInfoDisplayPanel label={"Date Of Burial:"}/>
                    <GraveInfoDisplayPanel label={"Graveyard:"}/>
                </Col>
            </Row>
            <Row className="grave-button-row">
                <Col md="6" className="grave-col">
                    <Button className="grave-buttons" disabled={save} onClick={SaveGrave}>{save ? "Saved" : "Save"}</Button>
                </Col>
                <Col md="6" className="grave-col">
                    <Button className="grave-buttons" variant="danger" disabled={report} onClick={ReportGrave}>{report ? "Reported" : "Report"}</Button>
                </Col>
            </Row>
            <GraveCommentSection/>
        </Container>
    )
}

export default Grave;