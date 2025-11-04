import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./css/AuditCard.css";
import GraveImage from "../assets/images/WhiteSquare.png";
import axios from "axios";
import { data } from "react-router-dom";

const AuditCard = ({type, index, removeFunction}) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const [ image,  setImage ] = useState(null);
    const [ info, setInfo ] = useState();
    const [ isHovering, setIsHovering ] = useState(false);

    async function ClearGrave() {
        try {
            const _res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/graves/clear`, {
                index: index
            });
            removeFunction();
        } catch (error) {
            console.log(error);
        }
    }

    async function ClearGraveyard() {
        try {
            const _res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/graveyards/clear`, {
                index: index
            });
            removeFunction();
        } catch (error) {
            console.log(error);
        }
    }

    async function DeleteGrave() {
        try {
            const _res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/graves/delete=${index}`);
            removeFunction();
        } catch (error) {
            console.log(error);
        }
    }

    async function DeleteGraveyard() {
        try {
            const _res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/graveyards/delete=${index}`);
            removeFunction();
        } catch (error) {
            console.log(error);
        }
    }

    async function GetGrave() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/id=${index}`);
            let _data = _res.data[0];

            let _deathDateString = new Date(_data.death_date);
            let _deathDate = `${_deathDateString.getDate()} ${months[_deathDateString.getMonth()]} ${_deathDateString.getFullYear()}`;

            let _burialDateString = new Date(_data.burial_date);
            let _burialDate = `${_burialDateString.getDate()} ${months[_burialDateString.getMonth()]} ${_burialDateString.getFullYear()}`;

            const _graveyardRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/id=${_data.graveyard_id}`);
            let _gyData = _graveyardRes.data[0];

            let _info = {
                name: _data.grave_name,
                id_number: _data.id_number,
                death_date: _deathDate,
                burial_date: _burialDate,
                graveyard: _gyData.graveyard_name
            }
            
            setInfo(_info);
            setImage(_data.grave_image);
        } catch (error) {
            console.log(error);
        }
    }

    async function GetGraveyard() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/id=${index}`);
            let _data = _res.data[0];
            console.log(_data);

            let _info = {
                name: _data.graveyard_name,
                address: _data.graveyard_address,
                province: _data.graveyard_province
            }
            
            setInfo(_info);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        switch (type) {
            case "grave":
                GetGrave();
                break;
            case "graveyard":
                GetGraveyard();
                break;
            default:
                break;
        }
    },[]);

    return (
        <div className="audit-card-container" id={`${index}-${type}-audit-card`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="audit-card-image-col">
                <div className="audit-card-image-container">
                    <img src={image ? image : GraveImage} alt="image" className="audit-card-image"/>
                </div>
            </div>
            <div className="audit-card-text-col">
                <p><b>Name:</b> {info ? info.name : null}</p>
                {type === "grave" ?
                <>
                    <p><b>ID Number:</b> {info ? info.id_number : null}</p>
                    <p><b>Date of Death:</b> {info ? info.death_date : null}</p>
                    <p><b>Date of Burial:</b> {info ? info.burial_date : null}</p>
                    <p><b>Graveyard:</b> {info ? info.graveyard : null}</p>
                </>
                :
                <>
                    <p><b>Address:</b> {info ? info.address : null}</p>
                    <p><b>Province:</b> {info ? info.province : null}</p>
                </>}
            </div>
            {isHovering ?
                <div className="audit-card-button-container">
                    <Button className="audit-card-button" onClick={type === "grave" ? ClearGrave : ClearGraveyard}>Accept</Button>
                    <Button variant="danger" className="audit-card-button" onClick={type === "grave" ? DeleteGrave : DeleteGraveyard}>Reject</Button>
                </div>
            :
                null
            }
            
        </div>
    )
}

export default AuditCard;