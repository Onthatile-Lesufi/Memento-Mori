import { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import "./css/ContributionMediaInput.css";
import DefaultImage from "../assets/images/WhiteSquare.png";

const ContributionMediaInput = ({defaultImage, returnFunction}) => {
    const [src, setSrc] = useState(DefaultImage);

    const OnImageAdd = (img) => {
        if (img.target.files && img.target.files[0]) {
            setSrc(URL.createObjectURL(img.target.files[0]));
            returnFunction(img.target.files[0]);
        }
    }

    useEffect(() => {
        if (defaultImage) {
            setSrc(defaultImage);
        }
    },[])

    return (
        <Col className="contribution-media-input-container">
            <img src={src} alt="contributeImage" className="contribution-media-display"/>
            <Form.Control type="file" accept="image/jpeg, image/png, image/webf" onChange={OnImageAdd} name="image" required/>
        </Col>
    );
}

export default ContributionMediaInput;