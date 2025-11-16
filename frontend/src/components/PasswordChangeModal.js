import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap"

const PasswordChangeModal = ({showModal, modalChangeFunction, PasswordChangeFunction}) => {
    const [ password, setPassword ] = useState("");
    const [ isSamePassword, setIsSamePassword ] = useState(false);

    function ConfirmPassword (tempPassword) {
        let _result = password === tempPassword && password !== "" && tempPassword !== "";
        setIsSamePassword(_result);
    }

    return(
        <Modal show={showModal} onHide={() => modalChangeFunction(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type="password" placeholder="New Password" style={{marginBottom: 2 +"vh"}} onChange={(e) => setPassword(e.target.value)}/>
                <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => ConfirmPassword(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    if (isSamePassword) {
                        PasswordChangeFunction(password);
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

export default PasswordChangeModal;