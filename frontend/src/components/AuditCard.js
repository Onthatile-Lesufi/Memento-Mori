import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./css/AuditCard.css";
import GraveImage from "../assets/images/pexels-koolshooters-6495752.jpg";

const AuditCard = ({type, index}) => {
    const [ image,  setImage ] = useState(null);
    const [ info, setInfo ] = useState();
    const [ isHovering, setIsHovering ] = useState(false);

    useEffect(() => {
        switch (type) {
            case "grave":
                
                break;
            case "graveyard":
                
                break;
            default:
                break;
        }
    },[]);

    return (
        <div className="audit-card-container" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="audit-card-image-col">
                <div className="audit-card-image-container">
                    <img src={image ? image : GraveImage} alt="image" className="audit-card-image"/>
                </div>
            </div>
            <div className="audit-card-text-col">
                <p><b>Name:</b></p>
                {type === "grave" ?
                <>
                    <p><b>ID Number:</b> {info ? info.id : null}</p>
                    <p><b>Date of Death:</b> {info ? info.dod : null}</p>
                    <p><b>Date of Burial:</b> {info ? info.dob : null}</p>
                    <p><b>Graveyard:</b> {info ? info.graveyard : null}</p>
                </>
                :
                <>
                    <p><b>Address:</b> {info ? info.address : null}</p>
                    <p><b>City:</b> {info ? info.city : null}</p>
                </>}
            </div>
            {isHovering ?
                <div className="audit-card-button-container">
                    <Button className="audit-card-button">Accept</Button>
                    <Button variant="danger" className="audit-card-button">Reject</Button>
                </div>
            :
                null
            }
            
        </div>
    )
}

export default AuditCard;