import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { InitializePaytm } from "./apiServices.js/payment/paytm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useEffect } from "react";
import { GetBaseUrl } from "./apiServices.js/configUrl";

function ExPayment(props) {
  // console.log("exPayment", props);
  // console.log("creditAmount", props.history.location.state.creditAmount);
  let remScore = props.history.location.state.creditAmount;
  const [updateCreditData, setUpdateCreditData] = useState(0);
  const [freeCreditData, setFreeCreditData] = useState();
  const [calculateMainSubTotal, setCalculateMainSubTotal] = useState(0);
  const [initialCreditScore, setInitialCreditScore] = useState(0);
  // Math.floor(updateCreditData/100)
  // console.log("credittttdata", freeCreditData);
  useEffect(() => {
    getCreditScoreData();
  }, []);
  let monthlyAmount = props.history.location.state.price;
  const history = useHistory();
  const location = useLocation();
  // console.log("location expa", location);
  // console.log("location of homeId", props.location.state.homeId);
  // console.log("location of homeId", props.location.state.leaseDuration);
  const [payNowActive, setPayNowActive] = React.useState(false);
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      cashReceiveDate: "",
      monthlyRent: "",
      duration: "",
      time: "",
      creditscore: "",
      free: "",
      remcreditScore: "",
    },
  });

  const getCreditScoreData = () => {
    axios.get(`${GetBaseUrl()}/user/${userDataObj._id}`).then((response) => {
      console.log(
        response.data.listedProperty.map((x) => {
          console.log(x._id);
        })
      );

      setInitialCreditScore(response.data.creditScore);
      setUpdateCreditData(response.data.creditScore);
      reset({
        monthlyRent: monthlyAmount,
        creditscore: response.data.creditScore,
        remainingCreditscore: response.data.creditScore,
      });
    });
  };
  useEffect(() => {}, []);
  const onSubmit = (data) => {
    const values = getValues();
    // console.log("values", values);
    // console.log("dfjfjdfsjsg", data);
    // reset();
    let PropertyID = props.history.location.state.homeId;
    axios
      .post(
        `${GetBaseUrl()}/rentbyCash/create/${userDataObj._id}/${PropertyID}`,
        {
          ...data,
          // cashReceiveDate: data.date,
          // creditscore: data.creditscore,
          // remainingCreditscore: data.remainingCreditscore,
          monthlyRent: data.monthlyRent,
          time: data.time,
          free: data.free,
          duration: data.duration,
          // totalDuration: data.totalDuration,
          total: data.total,
          // ownerId: userDataObj._id,
        },
        { headers: { "content-type": "application/json" } }
      )
      .then((res) => {
        console.log("Isf", res.data);
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.log("error", error);
        console.log("Something went wrong.Please contact helpdesk");
      });
    setPayNowActive(true);
  };

  const [total, setTotal] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const mainCalculationData = (e) => {
    e.preventDefault();
    let value = e.target.value;

   // console.log(value, "button clicked");
    creditScore(value, "duration");
  };
  const creditScore = (value, field) => {
    let creditobj = getValues();
    // let value = e.target.value;
    let newCreditScoreData = updateCreditData;

    if (creditobj.time == "month") {
      newCreditScoreData = 10 * parseInt(value);
    } else {
      newCreditScoreData = 10 * (parseInt(value) * 12);
    }
    setValue("creditscore", newCreditScoreData);

   // console.log(newCreditScoreData, "hy hy");

    let durationMultiple = Math.floor(parseInt(value) / 10);
    // console.log("durationMultiple", durationMultiple);

    // console.log("newCreditScoreData", newCreditScoreData);
    // console.log("initialCreditScore", initialCreditScore);
    let updatedCreditData = newCreditScoreData + initialCreditScore;
    // setUpdateCreditData(updatedCreditData);
    setValue("creditscore",updatedCreditData );
    calculateFreeData(value, "free", updatedCreditData);
    let remcreditScore = updatedCreditData % 100;
    ////console.log("dfgdf", remcreditScore);

    setValue("remainingCreditscore",remcreditScore );
    // setInitialCreditScore(remcreditScore);
    calculateData(parseInt(value), "duration");
    setValue("remcreditScore", remcreditScore);
    ////console.log(updateCreditData, "creditScoreDatacreditScoreData");
  };
  ////console.log(updateCreditData, "hggkhkhjkj");
  const calculateData = (value, field) => {
    let formObj = getValues();
    // //console.warn("formObj", formObj);

    //console.log(value);
    formObj[field] = value;
    //console.log("formObj123", formObj.monthlyRent);
    //console.log("formObjtotal", formObj.free);
    let totalValue = formObj.monthlyRent * value;
    //console.log("formObjtotal123", totalValue);
    setValue("total", totalValue);
    setTotal(totalValue);
  };

  // };
  const calculateFreeData = (value, field, updatedCreditData) => {
    //console.log(updatedCreditData, "namaste123");
    let free = Math.floor(updatedCreditData / 100);
    //console.log("jdsghfjdsgfjf", free);
    setFreeCreditData(free);
    setValue("free", free);
    calculateSubTotal(parseInt(value), "subTotal", free);
  };
  const calculateSubTotal = (value, field, free) => {
    let calculateSubTotal = getValues();
    let subTotals = value;
    calculateSubTotal[field] = subTotals;
    //console.log(calculateSubTotal);
    //console.log(freeCreditData);
    let subTotalDsuration = parseInt(calculateSubTotal.duration) + free;
    //console.log(subTotalDsuration);
    setCalculateMainSubTotal(subTotalDsuration);
    setValue("subTotalDsuration", subTotalDsuration);
    //console.log(parseInt(calculateSubTotal.duration) + free, "monj");
  };
  if (payNowActive) {
    return (
      <InitializePaytm
        payNowActive={payNowActive}
        setPayNowActive={setPayNowActive}
        amount={getValues("total")}
        homeId={props.location.state.homeId}
        leaseDuration={props.location.state.leaseDuration}
        reset={reset}
        //creditScore={calculatedCreditStore}
        //creditscore={initialCreditScore}
        getValues={getValues}
      />
    );
  }
  console.log(getValues);
  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center position-relative"
        style={{ height: "100vh" }}
      >
        <div style={{ backgroundColor: "khaki" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header>
              <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body className="" dialogClassName="">
              <Row>
                <Col>
                  <h6>Credit Score:</h6>
                  <input
                    type="text"
                    // value=calculatedCreditStore
                    // value={creditAmount}
                    // value={updateCreditData}
                    name="creditscore"
                    disabled={isDisabled}
                    className="text-center"
                    {...register("creditscore")}
                  />
                </Col>
                <Col>
                  <h6>Remaining Credit Score:</h6>
                  <input
                    type="text"
                    name="remainingCreditscore"
                    // value={initialCreditScore}
                    disabled={isDisabled}
                    {...register("remainingCreditscore")}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
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
                    // onChange={calculateData}
                  />
                </Col>
                <Col>
                  {" "}
                  <h6>Time</h6>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <select
                      aria-label="Default select example"
                      className="text-center ownerProfileResponsive position-relative duration"
                      style={{ bottom: "7px", height: "32px" }}
                      {...register("time", {
                        onChange: (e) => {
                          calculateData(e, "time");
                          //creditScore(e, "time");
                        },
                      })}

                      //onChange={calculateData}
                    >
                      <option value="">Select Month</option>
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
                    type="text"
                    name="duration"
                    className="text-center"
                    {...register("duration", {
                      onChange: (e) => {
                        mainCalculationData(e);
                      },
                    })}
                    style={{ width: "61%" }}
                    // onChange={calculateData}
                  />
                </Col>
                <Col>
                  <h6>Free</h6>
                  <input
                    name="free"
                    value={freeCreditData}
                    style={{ width: "41%" }}
                    disabled={isDisabled}
                    {...register("free")}
                  />
                </Col>

                <Col>
                  <h6>Sub Total Duration</h6>
                  <input
                    name="totalDuration"
                    value={calculateMainSubTotal}
                    style={{ width: "61%" }}
                    // {...register("totalDuration")}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-end">
                <Col>
                  <h6>Total</h6>
                  <input
                    disabled={isDisabled}
                    type="number"
                    name="total"
                    value={total}
                    className="text-center"
                    {...register("total")}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Button type="submit" variant="success">
                    Payment
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExPayment;
