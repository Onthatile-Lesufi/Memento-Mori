import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap"

const NameChangeModal = ({showModal, modalChangeFunction, NameChangeFunction}) => {
    const [name, setName] = useState("");
    return(
        <Modal show={showModal} onHide={() => modalChangeFunction(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Change Username</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control placeholder="New Username" onChange={(e) => setName(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    if (name.length > 0) {
                        NameChangeFunction(name);
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

export default NameChangeModal;