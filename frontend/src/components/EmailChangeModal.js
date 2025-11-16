import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap"

const EmailChangeModal = ({showModal, modalChangeFunction, EmailChangeFunction}) => {
    const [email, setEmail] = useState("");

    return(
        <Modal show={showModal} onHide={() => modalChangeFunction(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Change Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control placeholder="New Email" onChange={(e) => setEmail(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    if (email.length > 0) {
                        EmailChangeFunction(email);
                        modalChangeFunction(false);
                    }
                }}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={() => modalChangeFunction(false)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EmailChangeModal;