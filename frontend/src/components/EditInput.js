import { Form } from "react-bootstrap";
import "./css/ContributionInput.css";

const EditInput = ({placeholder, inputType, returnFunction, previousValue}) => {
    return (
        <Form.Floating>
            <Form.Control type={inputType} defaultValue={previousValue} className="contribution-input-component" onChange={(e) => {
                returnFunction(e.target.value);
            }} required/>
            <label>{placeholder}</label>
        </Form.Floating>
    );
}

export default EditInput;