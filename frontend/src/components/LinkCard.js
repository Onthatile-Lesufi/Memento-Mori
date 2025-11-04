import "./css/LinkCard.css";
import GraveImage from "../assets/images/WhiteSquare.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LinkCard = ({name,link,image}) => {
    const navigation = useNavigate();

    function OnClickInvoked () {
        navigation(link);
    }

    return (
        <div className="link-card-container" onClick={OnClickInvoked}>
            <img className="link-card-image" src={image ? image : GraveImage} alt=""/>
            <div className="link-card-name-container">
                <h3 className="link-card-name">{name ? name : "Name"}</h3>
            </div>
        </div>
    )
} 

export default LinkCard;