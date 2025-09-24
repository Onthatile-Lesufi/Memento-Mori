import { useState } from "react";
import { Form } from "react-bootstrap";
import "./css/GraveCommentSection.css";

const GraveCommentSection = ({grave}) => {
    const [comments, setComments] = useState([]);

    return (
        <div className="grave-comment-section">
            <div className="grave-comment-form">
                <Form.Group>
                    <label>Comments:</label>
                    <Form.Control className="grave-comment-text-input" as={"textarea"} rows={2}/>
                </Form.Group>
            </div>
            <div className="grave-comment-container">
                {comments.length > 0 ? <div></div>
                :
                <p className="grave-no-comments">No Comments</p>}
            </div>
        </div>
    )
}

export default GraveCommentSection;