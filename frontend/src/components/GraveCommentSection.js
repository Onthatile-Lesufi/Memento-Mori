import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./css/GraveCommentSection.css";
import { useEffect } from "react";
import axios from "axios";

const GraveCommentSection = ({grave, user}) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    async function HandleButtonPress() {
        if (commentText.length > 0) {
            try {
                const _res = await axios.post(`${process.env.REACT_APP_API_URL}/api/comments/`,{user, grave, comment: commentText});
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function GetComments() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/grave=${grave}`);
            
            let _comments = _res.data;
            let _commentIndices = [];
            _comments.forEach(_comment => {
                _commentIndices.push(<p><b>{_comment.username}</b><br/>{_comment.message_text}</p>);
            });
            setComments(_commentIndices);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetComments();
    },[]);

    return (
        <div className="grave-comment-section">
            <div className="grave-comment-form">
                <Form.Group>
                    <label>Comments:</label>
                    <Form.Control className="grave-comment-text-input" as={"textarea"} rows={2} onChange={(e) => setCommentText(e.target.value)}/>
                    <Button onClick={HandleButtonPress} className="comment-button">Comment</Button>
                </Form.Group>
            </div>
            <div className="grave-comment-container">
                {comments.length > 0 ? 
                <div>
                    {comments}
                </div>
                :
                <p className="grave-no-comments">No Comments</p>}
            </div>
        </div>
    )
}

export default GraveCommentSection;