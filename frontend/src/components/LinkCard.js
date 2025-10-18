import "./css/LinkCard.css";
import GraveImage from "../assets/images/grave-3241769_1280.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LinkCard = ({name,link,image}) => {
    const [isHovering, setIsHovering] = useState(false);
    const navigation = useNavigate();

    function OnClickInvoked () {
        navigation(link);
    }

    return (
        <div className="link-card-container" onClick={OnClickInvoked} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <img className="link-card-image" src={image ? image : GraveImage} alt=""/>
            {isHovering ?
                <div className="link-card-name-container">
                    <h3 className="link-card-name">{name ? name : "Name"}</h3>
                </div>
            :
                null
            }
        </div>
    )
} 

export default LinkCard;