import React from "react";
import MaterialTable from "material-table";
import Sidebar from "./sidebar";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { GetBaseUrl } from "../apiServices.js/configUrl";
import { useForm } from "react-hook-form";

function PropertyFeedback(props) {
  console.log("props", props);
  const location = useLocation();
  console.log("location", location);
  const [FeedbackData, setFeedbackData] = useState({});
  const [filterData, setFilterData] = useState([]);
  
  const [rating, setRating] = useState("");
  const history = useHistory();
  const {
    register: feedbackReport,
    handleSubmit: handleFeedbackSubmit,
    reset,
  } = useForm();
  useEffect(() => {
    getFeedbackData();
  }, []);

  const getFeedbackData = () => {
    axios
      .get(
        `${GetBaseUrl()}/feedback/get/${location.state.tenantId}/${
          props.location.state.id
        }`
      )
      .then((response) => {
        console.log(response);
        let res = response.data.result[response.data.result.length-1]
        console.log(res);
        if (response.data.result.length > 0) {
        let resetData = {
          Completion: res.monthlyRent.rating,
          contractCompletion: res.completionofContract.rating,
          facilities: res.neighbours.rating,
          houseOwner: res.maintainedByTenant.rating,
          neighbors: res.behaviour.rating,
          nonPayment: res.contract.rating,
          text: res.maintainedByTenant.comment,
          text2: res.behaviour.comment,
          text3: res.neighbours.comment,
          text4: res.contract.comment,
          text5:  res.monthlyRent.comment,
          text6: res.completionofContract.comment,
        };
        reset(resetData)
        const tenantIdFilter=response.data.result.filter((item)=>{
          return item.feedBackToTenant == location.state.tenantId
        })
        console.log(tenantIdFilter);
        setFilterData(tenantIdFilter)
      }});
  };
console.log(filterData);
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  const onFeedback = (data) => {
    console.log("FeedBack data", data);
    let requestObj = {
      maintainedByTenant: {
        rating: data.houseOwner,
        comment: data.text,
      },
      behaviour: {
        rating: data.neighbors,
        comment: data.text2,
      },
      neighbours: {
        rating: data.facilities,
        comment: data.text3,
      },
      contract: {
        rating: data.nonPayment,
        comment: data.text4,
      },
      monthlyRent: {
        rating: data.Completion,
        comment: data.text5,
      },
      completionofContract: {
        rating: data.contractCompletion,
        comment: data.text6,
      },
      propertyId: props.location.state.id,
      newPropertyId: props.location.state.newPropertyId,
      feedBackToTenant: location.state.tenantId,
    };

    axios
      .post(`${GetBaseUrl()}/feedBacktoTenant/create`, requestObj)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        history.push("/owner");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeValue = (event) => {
    setRating(event.target.value);
    console.log("clicked", event.target.value);
  };
  const handleText1 = (event) => {
    console.log("your feedback here", event.target.value[0].improve);
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      <form onSubmit={handleFeedbackSubmit(onFeedback)}>
        <div className="tenfeedback d-flex justify-content-center">
          <div style={{ padding: "25px", justifyContent: "center" }}>
            <h4>We Value Your Feedback</h4>
            <p style={{ textAlign: "center" }}>
              Please complete the following form and help us improve our
              customer experience.
            </p>
          </div>
        </div>
        <Sidebar />
        <div
          className="row d-flex col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 position-relative"
          style={{ left: "25%" }}
        >
          <div
            className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center fs-4"
            style={{ fontSize: "18px" }}
          >
            Property Id :<p>{props.location.state.newPropertyId}</p>{" "}
          </div>
          <div
            className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center"
            style={{ fontSize: "18px" }}
          >
            Tenant Id:<p>{props.location.state.tenantnewId}</p>{" "}
          </div>
        </div>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">Property maintained by Tenant </p>
            <div className="rating" onChange={onChangeValue}>
              <input
                type="radio"
                name="rating"
                id="rate10"
                value="10"
                {...feedbackReport("houseOwner")}
              />
              <label for="rate10">10</label>
              <input
                type="radio"
                name="rating"
                id="rate9"
                value="9"
                {...feedbackReport("houseOwner")}
              />
              <label for="rate9">9</label>
              <input
                type="radio"
                name="rating"
                id="rate8"
                value="8"
                {...feedbackReport("houseOwner")}
              />{" "}
              <label for="rate8">8</label>
              <input
                type="radio"
                name="rating"
                id="rate7"
                value="7"
                {...feedbackReport("houseOwner")}
              />{" "}
              <label for="rate7">7</label>
              <input
                type="radio"
                name="rating"
                id="rate6"
                value="6"
                {...feedbackReport("houseOwner")}
              />{" "}
              <label for="rate6">6</label>
              <input
                type="radio"
                name="rating"
                id="rate5"
                value="5"
                {...feedbackReport("houseOwner")}
              />{" "}
              <label for="rate5">5</label>
              <input
                type="radio"
                name="rating"
                id="rate4"
                value="4"
                {...feedbackReport("houseOwner")}
              />{" "}
              <label for="rate4">4</label>
              <input
                type="radio"
                name="rating"
                id="rate3"
                value="3"
                {...feedbackReport("houseOwner")}
              />{" "}
              <label for="rate3">3</label>
              <input
                type="radio"
                name="rating"
                id="rate2"
                value="2"
                {...feedbackReport("houseOwner")}
              />{" "}
              <label for="rate2">2</label>
              <input
                type="radio"
                name="rating"
                id="rate1"
                value="1"
                {...feedbackReport("houseOwner")}
              />{" "}
              <label for="rate1">1</label>
            </div>
          </div>
        </div>
        <textarea
          onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          {...feedbackReport("text")}
        ></textarea>

        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">Behaviour of Tenant</p>
            <div className="rating" onChange={onChangeValue}>
              <input
                type="radio"
                name="rating1"
                id="rate20"
                value="10"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate20">10</label>
              <input
                type="radio"
                name="rating1"
                id="rate19"
                value="9"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate19">9</label>
              <input
                type="radio"
                name="rating1"
                id="rate18"
                value="8"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate18">8</label>
              <input
                type="radio"
                name="rating1"
                id="rate17"
                value="7"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate17">7</label>
              <input
                type="radio"
                name="rating1"
                id="rate16"
                value="6"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate16">6</label>
              <input
                type="radio"
                name="rating1"
                id="rate15"
                value="5"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate15">5</label>
              <input
                type="radio"
                name="rating1"
                id="rate14"
                value="4"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate14">4</label>
              <input
                type="radio"
                name="rating1"
                id="rate13"
                value="3"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate13">3</label>
              <input
                type="radio"
                name="rating1"
                id="rate12"
                value="2"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate12">2</label>
              <input
                type="radio"
                name="rating1"
                id="rate11"
                value="1"
                {...feedbackReport("neighbors")}
              />{" "}
              <label for="rate11">1</label>
            </div>
          </div>
        </div>

        <textarea
          onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          {...feedbackReport("text2")}
        ></textarea>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">Behaviour of Tenant to Neighbours</p>
            <div className="rating" onChange={onChangeValue}>
              <input
                type="radio"
                name="rating2"
                id="rate30"
                value="10"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate30">10</label>
              <input
                type="radio"
                name="rating2"
                id="rate29"
                value="9"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate29">9</label>
              <input
                type="radio"
                name="rating2"
                id="rate28"
                value="8"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate28">8</label>
              <input
                type="radio"
                name="rating2"
                id="rate27"
                value="7"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate27">7</label>
              <input
                type="radio"
                name="rating2"
                id="rate26"
                value="6"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate26">6</label>
              <input
                type="radio"
                name="rating2"
                id="rate25"
                value="5"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate25">5</label>
              <input
                type="radio"
                name="rating2"
                id="rate24"
                value="4"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate24">4</label>
              <input
                type="radio"
                name="rating2"
                id="rate23"
                value="3"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate23">3</label>
              <input
                type="radio"
                name="rating2"
                id="rate22"
                value="2"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate22">2</label>
              <input
                type="radio"
                name="rating2"
                id="rate21"
                value="1"
                {...feedbackReport("facilities")}
              />{" "}
              <label for="rate21">1</label>
            </div>
          </div>
        </div>
        <textarea
          onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          {...feedbackReport("text3")}
        ></textarea>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">
              Payment of Electric Bill/Water Bill/Gas Bill..etc as per Contract
            </p>
            <div className="rating" onChange={onChangeValue}>
              <input
                type="radio"
                name="rating3"
                id="rate40"
                value="10"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate40">10</label>
              <input
                type="radio"
                name="rating3"
                id="rate39"
                value="9"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate39">9</label>
              <input
                type="radio"
                name="rating3"
                id="rate38"
                value="8"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate38">8</label>
              <input
                type="radio"
                name="rating3"
                id="rate37"
                value="7"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate37">7</label>
              <input
                type="radio"
                name="rating3"
                id="rate36"
                value="6"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate36">6</label>
              <input
                type="radio"
                name="rating3"
                id="rate35"
                value="5"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate35">5</label>
              <input
                type="radio"
                name="rating3"
                id="rate34"
                value="4"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate34">4</label>
              <input
                type="radio"
                name="rating3"
                id="rate33"
                value="3"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate33">3</label>
              <input
                type="radio"
                name="rating3"
                id="rate32"
                value="2"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate32">2</label>
              <input
                type="radio"
                name="rating3"
                id="rate31"
                value="1"
                {...feedbackReport("nonPayment")}
              />{" "}
              <label for="rate31">1</label>
            </div>
          </div>
        </div>
        <textarea
          onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          {...feedbackReport("text4")}
        ></textarea>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">Payment of Monthly rent</p>
            <div className="rating" onChange={onChangeValue}>
              <input
                type="radio"
                name="rating4"
                id="rate50"
                value="10"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate50">10</label>
              <input
                type="radio"
                name="rating4"
                id="rate49"
                value="9"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate49">9</label>
              <input
                type="radio"
                name="rating4"
                id="rate48"
                value="8"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate48">8</label>
              <input
                type="radio"
                name="rating4"
                id="rate47"
                value="7"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate47">7</label>
              <input
                type="radio"
                name="rating4"
                id="rate46"
                value="6"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate46">6</label>
              <input
                type="radio"
                name="rating4"
                id="rate45"
                value="5"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate45">5</label>
              <input
                type="radio"
                name="rating4"
                id="rate44"
                value="4"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate44">4</label>
              <input
                type="radio"
                name="rating4"
                id="rate43"
                value="3"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate43">3</label>
              <input
                type="radio"
                name="rating4"
                id="rate42"
                value="2"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate42">2</label>
              <input
                type="radio"
                name="rating4"
                id="rate41"
                value="1"
                {...feedbackReport("Completion")}
              />{" "}
              <label for="rate41">1</label>
            </div>
          </div>
        </div>
        <textarea
          onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here if Delay period of any"
          {...feedbackReport("text5")}
        ></textarea>

        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">
              Overstay after completion of Contract
            </p>
            <div className="rating" onChange={onChangeValue}>
              <input
                type="radio"
                name="rating5"
                id="rate60"
                value="10"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate60">10</label>
              <input
                type="radio"
                name="rating5"
                id="rate59"
                value="9"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate59">9</label>
              <input
                type="radio"
                name="rating5"
                id="rate58"
                value="8"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate58">8</label>
              <input
                type="radio"
                name="rating5"
                id="rate57"
                value="7"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate57">7</label>
              <input
                type="radio"
                name="rating5"
                id="rate56"
                value="6"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate56">6</label>
              <input
                type="radio"
                name="rating5"
                id="rate55"
                value="5"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate55">5</label>
              <input
                type="radio"
                name="rating5"
                id="rate54"
                value="4"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate54">4</label>
              <input
                type="radio"
                name="rating5"
                id="rate53"
                value="3"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate53">3</label>
              <input
                type="radio"
                name="rating5"
                id="rate52"
                value="2"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate52">2</label>
              <input
                type="radio"
                name="rating5"
                id="rate51"
                value="1"
                {...feedbackReport("contractCompletion")}
              />{" "}
              <label for="rate51">1</label>
            </div>
          </div>
        </div>
        <textarea
          onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          {...feedbackReport("text6")}
        ></textarea>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
            marginTop: "20px",
          }}
        >
          <input
            type="submit"
            className="btn btn-primary mt-5 ml-2"
            value="Submit"
            style={{
              width: "15em",
              borderRadius: "5px",
              backgroundColor: "#fda94f",
              fontSize: "medium",
              letterSpacing: "2px",
              position: "absolute",
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default PropertyFeedback;
