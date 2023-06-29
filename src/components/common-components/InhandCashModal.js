import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import Accordion from "react-bootstrap/Accordion";

function InhandCashModal(props) {
  console.log("tee", props);
  console.log("user Id", props.showUser._id);
  // console.log("property Id", props.showUser);
  // Here we find property id
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  console.log(userDataObj._id);
  const [isDisabled, setIsDisabled] = useState(true);
  const [userData, setUserData] = useState();
  const [updateCreditData, setUpdateCreditData] = useState(0);

  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      cashReceiveDate: "",
      creditscore: "",
      monthlyRent: "",
      // total: "",
      duration: "",
      time: "",
    },
  });
  const getProfileData = () => {
    axios.get(`${GetBaseUrl()}/user/${userDataObj._id}`).then((response) => {
      console.log("response", response.data);
      setUserData(response.data);
    });
  };
  useEffect(() => {
    getProfileData();
    reset({
      monthlyRent: props.rent,
    });
  }, []);

  const onSubmit = (data) => {
    // console.log("data is", data);
    axios
      .post(
        `${GetBaseUrl()}/rentbyCash/create/${props.showUser._id}/${
          props.showUser.listedProperty
        }`,
        {
          ...data,
          cashReceiveDate: data.date,
          creditscore: data.creditscore,
          monthlyRent: data.monthlyRent,
          time: data.time,
          duration: data.duration,
          total: data.total,
          ownerId: userDataObj._id,
        },
        { headers: { "content-type": "application/json" } }
      )
      .then((res) => {
        axios
          .get(`${GetBaseUrl()}/user/${props.showUser._id}`)
          .then((response) => {
            console.log("response is", response);
            axios
              .post(`${GetBaseUrl()}/user/${props.showUser._id}`, {
                creditScore: data.creditscore + response.data.creditScore,
              })
              .then((res) => {
                alert("Data updated successfuly");
              })
              .catch((error) => {
                console.log("error", error);
                alert("Something went wrong.Please contact helpdesk");
              });
            console.log("Isf", res.data);
          })
          .catch((error) => {
            console.log("error", error);
            alert("Something went wrong.Please contact helpdesk");
          });
      });
    reset();
  };
  // useEffect(() => {
  //   reset({
  //     monthlyRent: props.rent,
  //   });
  // }, []);
  // const [creditscore, setCreditscore] = useState("0");
  const creditScore = (e, field) => {
    let creditobj = getValues();
    let value = e.target.value;
    creditobj[field] = value;
    console.log("creditobj ra main", creditobj);
    if (creditobj.time == "month") {
      creditobj.creditscore = 10 * creditobj.duration;
    } else {
      creditobj.creditscore = 10 * creditobj.duration * 12;
    }

    setValue("creditscore", creditobj.creditscore);
    console.log(creditobj.creditscore, "hello there");
  };

  const calculateData = (e, field) => {
    let formObj = getValues();
    console.warn("formObj", formObj);
    let value = e.target.value;
    formObj[field] = value;
    console.log("formObj", formObj);
    if (formObj.time == "month") {
      formObj.total = formObj.monthlyRent * formObj.duration;
    } else {
      formObj.total = formObj.monthlyRent * formObj.duration * 12;
    }

    setValue("total", formObj.total);
    console.log(formObj.total, "hello there");
  };
  const [total, setTotal] = useState(0);

  return (
    <div>
      <Modal show={props.showPayment} onHide={props.handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Modal.Title>Rent By Cash of Tenant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="p-2">
              <Col>
                <h6>Cash Receive Date</h6>
                <input
                  type="date"
                  name="cashReceiveDate"
                  {...register("cashReceiveDate")}
                />
              </Col>
              <Col>
                <h6>Credit Score:</h6>
                <input
                  type="text"
                  name="creditScore"
                  // value={updateCreditData }
                  disabled={isDisabled}
                  className="text-center"
                  {...register("creditscore")}
                />
              </Col>
            </Row>
            <Row className="p-2 mt-3">
              <Col>
                {" "}
                <h6>MonthlyRent</h6>
                <input
                  type="number"
                  name="monthlyRent"
                  className="text-center"
                  // value={props.rent}
                  keepValues={true}
                  disabled={isDisabled}
                  {...register("monthlyRent")}
                />
              </Col>
              <Col md={{ span: 2, offset: 2 }}>
                {" "}
                <h6>Time</h6>
                <Form.Group as={Col} controlId="formGridEmail">
                  <select
                    aria-label="Default select example"
                    className="text-center ownerProfileResponsive position-relative duration"
                    style={{ bottom: "6px", height: "32px" }}
                    {...register("time", {
                      onChange: (e) => {
                        // calculateData(e, "duration");
                        creditScore(e, "time");
                        calculateData(e, "time");
                      },
                    })}
                  >
                    <option value=""></option>
                    <option value="month" className="text-center">
                      Month
                    </option>
                    <option value="year" className="text-center">
                      Year{" "}
                    </option>
                  </select>
                </Form.Group>
              </Col>
              <Col>
                <h6>Duration</h6>
                <input
                  style={{ width: "61%" }}
                  type="number"
                  name="duration"
                  className="text-center"
                  {...register("duration", {
                    onChange: (e) => {
                      calculateData(e, "duration");
                      creditScore(e, "duration");
                    },
                  })}
                />
              </Col>
            </Row>
            <Row className="p-2">
              <Col>
                <h6>Total</h6>
                <input
                  type="text"
                  name="total"
                  value={total}
                  className="text-center"
                  {...register("total")}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Modal.Footer>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Button variant="secondary" onClick={props.handleClose}>
                  Close
                </Button>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Button
                  type="submit"
                  variant="success"
                  onClick={props.handleClose}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default InhandCashModal;
