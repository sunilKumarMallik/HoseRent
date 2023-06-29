import MaterialTable from "material-table";
import React from "react";

import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import Sidebar from "./sidebar";

function FeedBackOwner(props) {
  console.log("fdu", props.location.state);
  const history = useHistory();
  const [availableContractRating, setAvailableContractRating] = useState();
  const [availableContractComment, setAvailableContractComment] = useState();
  const [fromSocietyRating, setFromSocietyRating] = useState();
  const [fromSocietyComment, setFromSocietyComment] = useState();
//   const [contact, setContact] = useState();
//   const [improveComment, setImproveComment] = useState();
  const [monthlyrentRating, setMonthlyrentRating] = useState();
  const [monthlyrentComment, setMonthlyrentComment] = useState();
  const [rateHouseOwnerRating, setRateHouseOwnerRating] = useState();
  const [rateHouseOwnerComment, setRateHouseOwnerComment] = useState();
  const [rateNeighboursRating, setRateNeighboursRating] = useState();
  const [rateNeighboursComment, setRateNeighboursComment] = useState();
  const [completionofContractRating, setCompletionofContractRating] = useState();
  const [completionofContractComment, setCompletionofContractComment] = useState();


  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    axios
      .get(`${GetBaseUrl()}/feedbackfortenant/${userDataObj._id}/${props.location.state.propertyId}`)
      .then((res) => {
        let requiredData= res.data.result
        console.log(requiredData)
        console.log(requiredData.monthlyRent.rating)
       
        if (res.data.result.length > 0) {
          setAvailableContractRating( requiredData.neighbours.rating);
          setAvailableContractComment( requiredData.neighbours.comment);
          setFromSocietyRating( requiredData.contract.rating);
          setFromSocietyComment( requiredData.contract.comment);
        //   setContact( requiredData.contact);
        //   setImproveComment( requiredData.improve.comment);
        setMonthlyrentRating(requiredData.monthlyRent.rating);
        setMonthlyrentComment(requiredData.monthlyRent.comment);
          setRateHouseOwnerRating( requiredData.maintainedByTenant.rating);
          setRateHouseOwnerComment( requiredData.maintainedByTenant.comment);
          setRateNeighboursRating( requiredData.behaviour.rating);
          setRateNeighboursComment( requiredData.behaviour.comment);
          setCompletionofContractRating(requiredData.completionofContract.rating);
          setCompletionofContractComment(requiredData.completionofContract.comment)
        }
      });
  };

//   console.log("required feedback Data", contact);

  return (
    <div>
      <div className="container">
        <Sidebar />

        <div style={{ position: "relative", left: "45%" }}>
          <p style={{ fontSize: "18px" }}>Property Id: </p>
          <p>{props.location.state.newPropertyId}</p>
          
          
        </div>
        <h4>{(availableContractRating === !(undefined)) || (availableContractRating === (undefined))  ? "Owner not updated the feedback yet " : "Owner already updated the Feedback" }</h4>
        <p>{ console.log(availableContractRating)}</p>
        <div className="mainfeedback-container">
          <div className="box">
            <p className="feedbox-title">Property maintained by Tenant</p>
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
            <p className="feedbox-title">Behaviour of Tenant</p>
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
            Behaviour of Tenant to Neighbours
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
            Payment of Electric Bill/Water Bill/Gas Bill..etc as per Contract
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
            Payment of Monthly rent
            </p>
            <div className="rating" id="ratingStyle5">
              {[...Array(10)]
                .map((x, m) => {
                  return (
                    <>
                      <input
                        type="radio"
                        name="monthlyrent"
                        id={`rate${m + 1}`}
                        value={m + 1}
                        disabled={true}
                        checked={monthlyrentRating == m + 1}
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
          value={monthlyrentComment}
          //   {...feedbackReport("text5")}
        ></textarea>
  
        <div className="mainfeedback-container">
        <div className="box">
          <p className="feedbox-title">
          Overstay after completion of Contract
          </p>
          <div className="rating" id="ratingStyle6">
            {[...Array(10)]
              .map((x, n) => {
                return (
                  <>
                    <input
                      type="radio"
                      name="completionofContract"
                      id={`rate${n + 1}`}
                      value={n + 1}
                      disabled={true}
                      checked={completionofContractRating == n + 1}
                    />
                    <label for={`rate${n + 1}`}>{n + 1}</label>
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
        value={completionofContractComment}
        //   {...feedbackReport("text5")}
      ></textarea>
     
      
      </div>
    </div>
  );
}

export default FeedBackOwner;
