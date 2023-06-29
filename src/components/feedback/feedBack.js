import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { useHistory, useLocation } from "react-router-dom";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import RatingChanged from "../ratingChanged";
import Sidebar from "../tenantDashboard/sidebar";
function FeedBack(props) {
  console.log("props", props);
  const location = useLocation();
  console.log("location", location);
  const [FeedbackData, setFeedbackData] = useState({});
  const [rating, setRating] = useState("");
  const history =useHistory();
  const {
    register: feedbackReport,
    handleSubmit: handleFeedbackSubmit,
  } = useForm();
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  const onFeedback = (data) => {
    console.log("FeedBack data", data);
    let requestObj = {
      rateHouseOwner: {
        rating: data.houseOwner,
        comment: data.text,
      },
      rateNeighbours: {
        rating: data.neighbors,
        comment: data.text2,
      },
      availableContract: {
        rating: data.facilities,
        comment: data.text3,
      },
      fromSociety: {
        rating: data.nonPayment,
        comment: data.text4,
      },
      maintenanceByOwner: {
        rating: data.Completion,
        comment: data.text5,
      },
      improve: {
        comment: data.text6,
      },
      contact: data.contact,
      propertyId: props.location.state.id,
      newPropertyId: props.location.state.newPropertyId,
      feedBackbyuser:userDataObj._id
    };

    axios
      .post(`${GetBaseUrl()}/feedback/create`, requestObj)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        history.push('/tenant-Dashboard')
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
        <div style={{ position: "relative", left: "45%" }}>
          <p style={{ fontSize: "18px" }}>Property Id: </p>
          <p>{props.location.state.newPropertyId}</p>
        </div>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">Rate House Owner</p>
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
            <p className="feedbox-title">Rate Neighbours</p>
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
            <p className="feedbox-title">
              Facilities available as per contract
            </p>
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
              Problem faced from society/others due to non-payment of Society
              Bill/Local authority Bills
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
            <p className="feedbox-title">
              Completion of Maintenance jobs by Owner
            </p>
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
          placeholder="please specify your problem here"
          {...feedbackReport("text5")}
        ></textarea>
        <div className="textfeed">
          <p style={{ position: "relative", left: "-60px" }}>
            Tell us how we can improve
          </p>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols="1"
            {...feedbackReport("text6")}
          ></textarea>
        </div>
        <div className="textfeed">
          <p style={{ position: "relative", left: "-120px" }}>
            Would you like to a representative to contact you?
          </p>
        </div>

        <div
          className="col ml-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ textAlign: "center" }}>
            <span>
              <input
                type="radio"
                name="row-3"
                value={true}
                data-col="5"
                {...feedbackReport("contact")}
              />
            </span>
            <span>Yes</span>
          </p>
          <p style={{ textAlign: "center" }}>
            <span>
              <input
                type="radio"
                name="row-3"
                value={false}
                data-col="5"
                {...feedbackReport("contact")}
              />
            </span>
            <span>No</span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
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

export default FeedBack;
