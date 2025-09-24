import { useState } from "react";
import { Col, Form } from "react-bootstrap";
import "./css/ContributionMediaInput.css";

function ContributionMediaInput() {
    const [src, setSrc] = useState(null);

    const OnImageAdd = (img) => {
        if (img.target.files && img.target.files[0]) {
          setSrc(URL.createObjectURL(img.target.files[0]));
        }
    }

    return (
        <Col className="contribution-media-input-container">
            <img src={src} alt="contributeImage" className="contribution-media-display"/>
            <Form.Control type="file" accept="image/jpeg, image/png, image/webf" onChange={OnImageAdd} required/>
        </Col>
    );
}

export default ContributionMediaInput;