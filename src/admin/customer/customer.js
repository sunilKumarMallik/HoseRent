import MaterialTable from "material-table";
import React from "react";
import Sidebar from "../sidebar";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";

function CustomerFeedback(props) {
  console.log("fdu", props.location.state.id);
  const history = useHistory();
  const [availableContractRating, setAvailableContractRating] = useState();
  const [availableContractComment, setAvailableContractComment] = useState();
  const [fromSocietyRating, setFromSocietyRating] = useState();
  const [fromSocietyComment, setFromSocietyComment] = useState();
  const [contact, setContact] = useState();
  const [improveComment, setImproveComment] = useState();
  const [maintenanceByOwnerRating, setMaintenanceByOwnerRating] = useState();
  const [maintenanceByOwnerComment, setMaintenanceByOwnerComment] = useState();
  const [rateHouseOwnerRating, setRateHouseOwnerRating] = useState();
  const [rateHouseOwnerComment, setRateHouseOwnerComment] = useState();
  const [rateNeighboursRating, setRateNeighboursRating] = useState();
  const [rateNeighboursComment, setRateNeighboursComment] = useState();

  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    axios
      .get(`${GetBaseUrl()}/feedback/${props.location.state.id}`)
      .then((res) => {
        let requiredData= res.data.result[res.data.result.length-1]
        console.log(typeof(requiredData))
       
        if (res.data.result.length > 0) {
          setAvailableContractRating( requiredData.availableContract.rating);
          setAvailableContractComment( requiredData.availableContract.comment);
          setFromSocietyRating( requiredData.fromSociety.rating);
          setFromSocietyComment( requiredData.fromSociety.comment);
          setContact( requiredData.contact);
          setImproveComment( requiredData.improve.comment);
          setMaintenanceByOwnerRating(
             requiredData.maintenanceByOwner.rating
          );
          setMaintenanceByOwnerComment(
             requiredData.maintenanceByOwner.comment
          );
          setRateHouseOwnerRating( requiredData.rateHouseOwner.rating);
          setRateHouseOwnerComment( requiredData.rateHouseOwner.comment);
          setRateNeighboursRating( requiredData.rateNeighbours.rating);
          setRateNeighboursComment( requiredData.rateNeighbours.comment);
        }
      });
  };

  console.log("required feedback Data", contact);

  return (
    <div>
      <div className="container">
        <Sidebar />

        <div style={{ position: "relative", left: "45%" }}>
          <p style={{ fontSize: "18px" }}>Property Id: </p>
          <p>{props.location.state.newPropertyId}</p>
          
          
        </div>
        <h4>{(availableContractRating === !(undefined)) || (availableContractRating === (undefined))  ? "Tenant not updated the feedback yet " : "Tenant already updated the Feedback" }</h4>
        <p>{ console.log(availableContractRating)}</p>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">Rate House Owner</p>
            <div className="rating" id="ratingStyle1">
              {[...Array(10)]
                .map((x, i) => {
                  return (
                    <>
                      <input
                        type="radio"
                        name="rateHouseOwner"
                        id={`rate${i + 1}`}
                        value={i + 1}
                        disabled={true}
                        checked={
                          rateHouseOwnerRating  == i + 1
                        }
                      />
                      <label for={`rate${i + 1}`}>{i + 1}</label>
                    </>
                  );
                })
                .reverse()}
            </div>
          </div>
        </div>
        <textarea
          //   onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          value={rateHouseOwnerComment}
        ></textarea>

        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">Rate Neighbours</p>
            <div className="rating" id="ratingStyle2">
              {[...Array(10)]
                .map((x, j) => {
                  return (
                    <>
                      <input
                        type="radio"
                        name="rateNeighbours"
                        id={`rate${j + 1}`}
                        value={j + 1}
                        disabled={true}
                        checked={rateNeighboursRating == j + 1}
                      />
                      <label for={`rate${j + 1}`}>{j + 1}</label>
                    </>
                  );
                })
                .reverse()}
            </div>
          </div>
        </div>

        <textarea
          //   onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          value={rateNeighboursComment}
          //   {...feedbackReport("text2")}
        ></textarea>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">
              Facilities available as per contract
            </p>
            <div className="rating" id="ratingStyle3">
              {[...Array(10)]
                .map((x, k) => {
                  return (
                    <>
                      <input
                        type="radio"
                        name="availableContract"
                        id={`rate${k + 1}`}
                        value={k + 1}
                        disabled={true}
                        checked={availableContractRating == k + 1}
                      />
                      <label for={`rate${k + 1}`}>{k + 1}</label>
                    </>
                  );
                })
                .reverse()}
            </div>
          </div>
        </div>
        <textarea
          //   onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          value={availableContractComment}
          //   {...feedbackReport("text3")}
        ></textarea>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">
              Problem faced from society/others due to non-payment of Society
              Bill/Local authority Bills
            </p>
            <div className="rating" id="ratingStyle4">
              {[...Array(10)]
                .map((x, l) => {
                  return (
                    <>
                      <input
                        type="radio"
                        name="fromSociety"
                        id={`rate${l + 1}`}
                        value={l + 1}
                        disabled={true}
                        checked={fromSocietyRating == l + 1}
                      />
                      <label for={`rate${l + 1}`}>{l + 1}</label>
                    </>
                  );
                })
                .reverse()}
            </div>
          </div>
        </div>
        <textarea
          //   onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          value={fromSocietyComment}
          //   {...feedbackReport("text4")}
        ></textarea>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">
              Completion of Maintenance jobs by Owner
            </p>
            <div className="rating" id="ratingStyle5">
              {[...Array(10)]
                .map((x, m) => {
                  return (
                    <>
                      <input
                        type="radio"
                        name="maintenanceByOwner"
                        id={`rate${m + 1}`}
                        value={m + 1}
                        disabled={true}
                        checked={maintenanceByOwnerRating == m + 1}
                      />
                      <label for={`rate${m + 1}`}>{m + 1}</label>
                    </>
                  );
                })
                .reverse()}
            </div>
          </div>
        </div>
        <textarea
          //   onChange={handleText1}
          className="feedbackTextarea"
          rows="2"
          cols="50"
          placeholder="please specify your problem here"
          value={maintenanceByOwnerComment}
          //   {...feedbackReport("text5")}
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
            value={improveComment}
            // {...feedbackReport("text6")}
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
          <td style={{ textAlign: "center" }}>
            <span>
              <input
                type="radio"
                name="contact"
                value="yes"
                data-col="5"
                checked={contact == true}
                // {...feedbackReport("contact")}
              />
            </span>
            <span>Yes</span>
          </td>
          <td style={{ textAlign: "center" }}>
            <span>
              <input
                type="radio"
                name="contact"
                value="No"
                data-col="5"
                checked={contact == false}
                // {...feedbackReport("contact")}
              />
            </span>
            <span>No</span>
          </td>
        </div>
      </div>
    </div>
  );
}

export default CustomerFeedback;
