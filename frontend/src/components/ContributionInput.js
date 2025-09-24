import { Form } from "react-bootstrap";
import "./css/ContributionInput.css";

const ContributionInput = ({placeholder, inputType}) => {
    return (
        <Form.Floating>
            <Form.Control type={inputType} className="contribution-input-component" required/>
            <label>{placeholder}</label>
        </Form.Floating>
    );
}

export default ContributionInput;