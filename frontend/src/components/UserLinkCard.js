import "./css/LinkCard.css";
import GraveImage from "../assets/images/grave-3241769_1280.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLinkCard = ({id, returnStatement}) => {
    const [grave, setGrave] = useState(null);
    const navigation = useNavigate();

    function OnClickInvoked () {
        if (returnStatement) returnStatement(grave);
    }

    async function LoadCard() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/id=${id}`);
            setGrave(_res.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        LoadCard();
    },[]);

    return (
        <div className="link-card-container" onClick={OnClickInvoked}>
            <img className="link-card-image" src={grave && grave.grave_image ? grave.grave_image : GraveImage} alt=""/>
            <div className="link-card-name-container">
                <h3 className="link-card-name">{grave && grave.grave_name ? grave.grave_name : "Name"}</h3>
            </div>
        </div>
    )
} 

export default UserLinkCard;