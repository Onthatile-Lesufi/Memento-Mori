import { Form } from "react-bootstrap";
import "./css/ContributionInput.css";

const ContributionInput = ({placeholder, inputType, returnFunction}) => {
    return (
        <Form.Floating>
            <Form.Control type={inputType} className="contribution-input-component" onChange={(e) => {
                returnFunction(e.target.value);
            }} required/>
            <label>{placeholder}</label>
        </Form.Floating>
    );
}

export default ContributionInput;