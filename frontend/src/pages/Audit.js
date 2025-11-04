import { useEffect, useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import "./css/Audit.css";
import AuditCard from "../components/AuditCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Audit() {
    const [ graveCards, setGraveCards ] = useState([]);
    const [ graveyardCards, setGraveyardCards ] = useState([]);
    const [ graves, setGraves ] = useState([]);
    const [ graveyards, setGraveyards ] = useState([]);
    const [ user, setUser ] = useState(null);
    const navigation = useNavigate();

    function ReloadPage () {
        window.location.reload();
    }

    function GenerateGraveCards () {
        let _graveCards = [];
        let _n = 0;
        graves.forEach(_grave => {
            _graveCards.push(<AuditCard type={"grave"} index={_grave.id_number} removeFunction={ReloadPage}/>);
            _n++;
        });
        setGraveCards(_graveCards);
    }

    function GenerateGraveyardCards () {
        let _graveyardCards = [];
        let _n = 0;
        graveyards.forEach(_graveyard => {
            _graveyardCards.push(<AuditCard type={"graveyard"} index={_graveyard.graveyard_id} removeFunction={ReloadPage}/>);
        });
        setGraveyardCards(_graveyardCards);
    }

    async function CheckRole() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`, {
                withCredentials: true,
            });
            if (_res) {
                let _user = _res.data.user;
                if (!_user || _user.role !== "admin") {
                    alert("Not an admin\nReturning to Home");
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

    async function FetchAuditCards() {
        try {
            const _graveRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/restricted`, {
                withCredentials: true,
            });
            const _graveyardRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/restricted`, {
                withCredentials: true,
            });
            let _graves = _graveRes.data;
            setGraves(_graves);
            

            let _graveyards = _graveyardRes.data;
            
        } catch (error) {
            console.error("Error: ",error);
        }
    }

    useEffect (() => {
        CheckRole();
    },[])

    useEffect (() => {
        FetchAuditCards();
    },[user])
    
    useEffect (() => {
        GenerateGraveCards();
    },[graves])

    useEffect (() => {
        GenerateGraveyardCards();
    },[graveyards])

    return (
        <Container id="audit-container">
            {user ? 
                <>
                    <h2 id="audit-title">Audit</h2>
                    <Accordion className="audit-accordion" defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Graves</Accordion.Header>
                            <Accordion.Body className="audit-card-holder">
                                {graveCards}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Graveyards</Accordion.Header>
                            <Accordion.Body className="audit-card-holder">
                                {graveyardCards}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </>
                :
                <></>
            }
            
        </Container>
    )
}

export default Audit;