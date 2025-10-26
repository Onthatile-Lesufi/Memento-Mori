import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Grave.css";
import GraveInfoDisplayPanel from "../components/GraveInfoDisplayPanel";
import GraveCommentSection from "../components/GraveCommentSection";
import axios from "axios";
import { Buffer } from "buffer";

function Grave () {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const [grave, setGrave] = useState(null);
    const [graveImage, setGraveImage] = useState(null);
    const [graveyard, setGraveyard] = useState(null);
    const [gender, setGender] = useState("M");
    const [birthDate, setBirthDate] = useState(null);
    const [deathDate, setDeathDate] = useState(null);
    const [burialDate, setBurialDate] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [report, setReport] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [save, setSave] = useState(null);
    const {index} = useParams();
    const navigation = useNavigate();

    function HandleGraveSave() {
        if (save) {
            DeleteSave();
        } else {
            SaveGrave();
        }
    }

    function ReportGraveModal (willShow) {
        setShowModal(willShow);
    }

    async function ReportGrave () {
        if (!user) {
            alert("No user logged in\nUnable to report grave");
            return ReportGraveModal(false);
        }
        try {
            const _res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/graves/restrict`, {index});
            ReportGraveModal(false);
            setReport(true);
        } catch (error) {
            console.long(error);
        }
    }

    function AnalyseId () {
        if (!grave) return;
        //#region SetGender
            let _genderNumber = Number.parseInt(grave.id_number.slice(6,10));
            setGender(_genderNumber > 4999? "M" : "F");
        //#endregion
        
        //#region SetDeathDate
            let _deathDateString = new Date(grave.death_date);
            let _deathDate = `${_deathDateString.getDate()} ${months[_deathDateString.getMonth()]} ${_deathDateString.getFullYear()}`;
            setDeathDate(_deathDate);
        //#endregion

        //#region SetBurialDate
            let _burialDateString = new Date(grave.burial_date);
            let _burialDate = `${_burialDateString.getDate()} ${months[_burialDateString.getMonth()]} ${_burialDateString.getFullYear()}`;
            setBurialDate(_burialDate);
        //#endregion

        //#region SetBirthDate
            let _birthYear = grave.id_number.slice(0,2);
            let _birthMonth = grave.id_number.slice(2,4);
            let _birthDay = grave.id_number.slice(4,6);

            let _deathYear = new Date(grave.death_date).getFullYear();
            let _deathCentury = _deathYear.toString().slice(0,2);
            let _deathDecade = _deathYear.toString().slice(2,4);
            let _tempYear;
            if (Number.parseInt(_birthYear) >= Number.parseInt(_deathDecade)) {
                _tempYear = (_deathCentury - 1) * 100;
            } else {
                _tempYear = _deathCentury * 100;
            }
            _tempYear += Number.parseInt(_birthYear);

            let _date = `${_birthDay} ${months[Number.parseInt(_birthMonth) - 1]} ${_tempYear}`;
        setBirthDate(_date);
        //#endregion
    }

    async function CheckSave() {
        if (!user) return;
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/saves/user=${user.id}-grave=${index}`);
            if (_res.data.length <= 0) return;
            setSave(_res.data[0]);
            setIsSaved(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function DeleteSave() {
        try {
            const _res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/saves/delete=${save.save_id}`);
            setSave(null);
            setIsSaved(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function FetchGrave() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/id=${index}`);
            let _grave = _res.data[0];
            const _image = _grave.grave_image;
            console.log(user);
            if (!_grave.grave_visibility && user.role !== "admin") {
                alert("Page Quarantined\nReturning to Home");
                return navigation("/");
            }
            setReport(!_grave.grave_visibility);
            setGraveImage(_image);
            setGrave(_grave);
            await CheckSave();
        } catch (error) {
            console.error(error);
        }
    }

    async function FetchGraveyard() {
        if (!grave) return;
        try {
            const _graveyardRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/id=${grave.graveyard_id}`);
            setGraveyard(_graveyardRes.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function FetchUser() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`, {
                withCredentials: true,
            });
            if (_res.data.user) {
                setUser(_res.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function SaveGrave () {
        if (!user) {
            return alert("No user logged in\nUnable to save grave");
        }
        try {
            let _user = user.id;
            let _grave = grave.id_number;
            const _res = await axios.post(`${process.env.REACT_APP_API_URL}/api/graves/save`, {user: _user, grave: _grave});
            await CheckSave();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetchUser();
    },[])
    
    useEffect(() => {
        AnalyseId();
        FetchGraveyard();
    },[grave])
    
    useEffect(() => {
        FetchGrave();
    },[user])

    return (
        <Container className="grave-container">
            {grave && graveyard ?
            <>
                <h2 className="grave-name">{grave.grave_name}, {gender}  {user && user.role != "user" ? <Button>Edit</Button> : null}</h2> 
                <Row>
                    <Col md="6">
                        <div className="grave-image-holder">
                            <img src={graveImage} className="grave-image"/>
                        </div>
                    </Col>
                    <Col md="6" className="grave-panel-holder">
                        <GraveInfoDisplayPanel label={"ID Number:"} info={grave.id_number}/>
                        <GraveInfoDisplayPanel label={"Date Of Birth:"} info={birthDate}/>
                        <GraveInfoDisplayPanel label={"Date Of Death:"} info={deathDate}/>
                        <GraveInfoDisplayPanel label={"Date Of Burial:"} info={burialDate}/>
                        <GraveInfoDisplayPanel label={"Graveyard:"} info={graveyard.graveyard_name}/>
                    </Col>
                </Row>
                <Row className="grave-button-row">
                    <Col md="6" className="grave-col">
                        <Button className="grave-buttons" onClick={HandleGraveSave}>{isSaved ? "Saved" : "Save"}</Button>
                    </Col>
                    <Col md="6" className="grave-col">
                        <Button className="grave-buttons" variant="danger" disabled={report} onClick={() => ReportGraveModal(true)}>{report ? "Reported" : "Report"}</Button>
                    </Col>
                </Row>
                <GraveCommentSection grave={grave.id_number} user={user ? user.id : null}/>

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
            <>
                <h2>404: Page Missing</h2>
            </>}
        </Container>
    )
}

export default Grave;