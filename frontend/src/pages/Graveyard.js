import { Container, Row } from "react-bootstrap";
import "./css/Graveyard.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import axios from "axios";

const Graveyard = () => {
    const [graveyard, setGraveyard] = useState(null);
    const [cards,setCards] = useState([]);
    const {index} = useParams();

    async function FetchGraveyard() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/id=${index}`);
            setGraveyard(_res.data[0]);
        } catch (error) {
            console.error("error:", error);
        }
    }

    async function FetchGraveCards() {
        let _cards = [];
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/graveyard=${index}`);
            let _data = _res.data;
            if (_data.length > 0) {
                _data.forEach(_i => {
                    _cards.push(<LinkCard name={_i.grave_name} link={`/grave/${_i.id_number}`}/>);
                });
                setCards(_cards);
            }
            
        } catch (error) {
            console.error("error:", error);
        }
    }

    useEffect(() => {
        FetchGraveyard();
    },[]);

    useEffect(() => {
        FetchGraveCards();
    },[graveyard]);

    return (
        <Container className="graveyard-container">
            <h2>{graveyard ? graveyard.graveyard_name : "null"}</h2>
            <p>Address: {graveyard ? graveyard.graveyard_address : "null"}</p>
            <div className="graveyard-grid">{cards}</div>
        </Container>
    )
}

export default Graveyard;