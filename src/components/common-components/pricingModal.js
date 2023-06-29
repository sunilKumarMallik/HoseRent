import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { GetBaseUrl } from "../../apiServices.js/configUrl";

export default function PricingModal(props) {
  console.log("pricing Modal", props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Monthly Payment Reminder
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Total Credit Score :{props.creditAmount}</h4>
        <h4>Monthly Rent :{props.monthlyAmount}</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Link
          to={{
            pathname: "/payment",
            state: {
              creditAmount: props.creditAmount,
              price: props.monthlyAmount,
              homeId : props.homeId,
            },
          }}
        >
          <Button onClick={props.onHide}>Pay</Button>
        </Link>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
