import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/User.css";
import { Col, Container, Row } from "react-bootstrap";
import UserLinkCard from "../components/UserLinkCard";
import GraveImage from "../assets/images/WhiteSquare.png";
import GraveInfoDisplayPanel from "../components/GraveInfoDisplayPanel";
import axios from "axios";

function User () {
    const [username,setUsername] = useState("John Doe");
    const [graves,setGraves] = useState([]);
    const [graveCards,setGraveCards] = useState([]);
    const [grave, setGrave] = useState({
        name: "",
        id: "",
        graveyard: "",
        image: null
    });
    const {user} = useParams();

    async function DisplayGrave (tempGrave) {
        if (!tempGrave) return;
        try {
            const _graveyardRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/id=${tempGrave.graveyard_id}`);
            let _graveyard = _graveyardRes.data[0];
            let _result = {
                name: tempGrave.grave_name,
                id: tempGrave.id_number,
                graveyard: _graveyard.graveyard_name,
                image: tempGrave.grave_image
            };
            setGrave(_result);
        } catch (error) {
            console.error(error);
        }
    }

    async function GetUser() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/email=${user}`, {
                withCredentials: true,
            });
            const _user = _res.data[0];
            
            setUsername(_user.username);

            const _gravesRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/user=${_user.user_id}`);
            const _graves = _gravesRes.data;
            setGraves(_graves);
        } catch (error) {
            console.log("error: ", error)
        }
    }

    function SetCards() {
        if (graves.length <= 0) return;
        let _cards = [];
        graves.forEach(_grave => {
            _cards.push(<UserLinkCard id={_grave.id_number} returnStatement={DisplayGrave}/>);
        });
        setGraveCards(_cards);
    }

    useEffect(() => {
        GetUser();
    },[])

    useEffect(() => {
        SetCards();
    },[graves])

    return (
        <Container className="user-containers">
            <h2 className="user-title">{username}'s saved graves</h2>
            <Row>
                <Col className="user-grave-card-container" md="3">
                    {graveCards}
                </Col>
                <Col className="user-grave-info-container" md = "9">
                    <div className="user-grave-image-container">
                        <img className="user-grave-image" src={grave.image ? grave.image : GraveImage}/>
                    </div>
                    <GraveInfoDisplayPanel label="Name" info={grave.name}/>
                    <GraveInfoDisplayPanel label="ID" info={grave.id}/>
                    <GraveInfoDisplayPanel label="Graveyard" info={grave.graveyard}/>
                </Col>
            </Row>
        </Container>
    )
}

export default User;