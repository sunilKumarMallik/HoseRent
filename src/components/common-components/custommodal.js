import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function Custommodal(props) {
    console.log('data are',props);
    return (
        <Modal
            size={"xxl"}
            show={props. show}
            onHide={props.handleClose}
            centered
            fullscreen={true}
            dialogClassName={props.isModalXl ? "modal-xxl" : ""}>
            <Modal.Header >
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <props.Body props={props}></props.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}