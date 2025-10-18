import { Button } from "react-bootstrap";
import "./css/TextButton.css";
import { Link } from "react-router-dom";

const TextButton = ({title, endPoint}) => {
    return (
        <Link to={endPoint}>
            <Button className="text-button">
                {title}
            </Button>
        </Link>
    )
}

export default TextButton;