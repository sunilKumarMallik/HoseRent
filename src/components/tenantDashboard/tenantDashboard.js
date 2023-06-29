import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import Sidebar from "./sidebar";
import { RiDeleteBinFill } from "react-icons/ri";
import NodataAvailabe from "./noDataAvailable";
import PricingModal from "../common-components/pricingModal";

function TenantDashboard() {
  const history = useHistory();
  let params = useParams();
  const [userData, setUserData] = useState();
  const [allPropertyData, setAllPropertyData] = useState({});
  // const [propertyId, setPropertyId] = useState({});
  const [creditData, setCreditData] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [updateCreditData, setUpdateCreditData] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  useEffect(() => {
    getProfileData();
    getAllProperty();
    // getCreditData();
    // getData();
    console.log(
      "some jason data from pricing modal",
      JSON.parse(localStorage.getItem("homerentuser"))
    );
  }, []);
  //   const getData = ()=>{
  //     setPropertyId( allPropertyData.map((x)=>{
  //       console.log(x._id)
  //     }))
  //   }
  // console.log(propertyId);
  console.log(allPropertyData);
  // const getCreditData=()=>{
  //   axios.get(`${GetBaseUrl()}/getCreditScore/${userDataObj._id}`).then((response) => {
  //     console.log(response.data);
  //     setCreditData(response.data)

  //   })
  // }
  const getAllProperty = () => {
    let localHomerentUser = localStorage.getItem("homerentuser");
    let token = localHomerentUser
      ? JSON.parse(localHomerentUser).token
      : undefined;
    if (JSON.parse(localHomerentUser).user.role != "tenant") {
      history.goBack();
    }
    let userName = localHomerentUser
      ? JSON.parse(localHomerentUser).user.name
      : "";
    console.log("value", userName);
    let headers = {
      authorization: `Bearer ${token}`,
    };
    console.log("token is",token);
    axios
      .get(`${GetBaseUrl()}/getSubscribedProperty/${userDataObj._id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log("all Data", res);
        setAllPropertyData(res.data.data);
      });
  };
  const getProfileData = () => {
    axios.get(`${GetBaseUrl()}/user/${userDataObj._id}`).then((response) => {
      console.log("response", response.data.creditScore);
      setUserData(response.data);
    });
  };
  const onPropertyClicked = (propertyId) => {
    console.log("userData",userData);
    let monthlyRent = userData.listedProperty.filter((x)=>{
  return x._id==propertyId;
    })
    setMonthlyAmount(monthlyRent ? monthlyRent[0].monthlyRent : 0);
    setCreditAmount(userData.creditScore);
    setModalShow(true);

  };
  console.log("Hello", creditData);
  console.log("Monthlyamount", monthlyAmount);
  console.log("Creditamount", creditAmount);
  console.log("updateCreditData", updateCreditData);
  // const [jeri]=creditData;
  // console.log("dfg",jeri);
  const onRemoveProperty = (id) => {
    console.log("id", id);
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;

    let headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .delete(
        `${GetBaseUrl()}/removePropertyFromUser/${id}/${userDataObj._id}`,
        { headers: headers }
      )
      .then((res) => {
        console.log("Response data", res);
        getAllProperty();
        alert("Data Deleted successfully");
        console.log(res);
        // getAllData();
      })
      .catch((error) => console.log(error));
  };
  console.log("required Data", allPropertyData);
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  let imagealt = "image";
  return (
    <div className="tenant-dboard">
      <Sidebar />
      <section className="Dmain">
        <div className="Dusers">
          <div
            className="row justify-content-around ml-0"
            style={{ position: "relative" }}
          >
            {allPropertyData && allPropertyData.length > 0 ? (
              allPropertyData.map((item) => {
                console.log(item);
                console.log(item._id);
                console.log(item.houseName);
                console.log(item.createdBy);
                console.log(item.newPropertyId);
                console.log(item.isBookedByUser);

                return (
                  <div
                    className=" col-md-2 col-lg-3 col-xl-4 col-sm-12 "
                    key={item._id}
                  >
                    <Card
                      style={{ width: "18rem", borderRadius: "10px" }}
                      className="mb-4 text-center Dcard"
                    >
                      <Card.Img
                        variant="top"
                        src={item.image[0]}
                        height={"200px"}
                      />
                      <div className="card-delete-icon">
                        {item && !item.isBooked && userDataObj._id && (
                          <RiDeleteBinFill
                            className="text-dark"
                            style={{ fontSize: "2.2rem" }}
                            title="Delete"
                            onClick={() => onRemoveProperty(item._id)}
                          />
                        )}
                      </div>
                      <Card.Body>
                        <div className="col-12">
                          <ul className="info-list">
                            <li className="mb-3 mt-2">
                              <div
                                style={{
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                <h6 className="text-black">
                                  ID -{item.newPropertyId}
                                </h6>
                              </div>
                              <div className="row d-flex justify-content-center">
                                <img
                                  style={{ marginTop: "5px" }}
                                  src={publicUrl + "/assets/img/icons/1.png"}
                                  height="20"
                                  width="20"
                                  alt="img"
                                />
                                <h4
                                  style={{ marginLeft: "10px" }}
                                  className="text-black"
                                >
                                  {item.area}
                                </h4>
                              </div>
                            </li>
                            <div className="row justify-content-center text-center">
                              <img
                                style={{ position: "relative", left: "-25px" }}
                                src={publicUrl + "/assets/img/icons/28.png"}
                                alt="img"
                              />
                              <h4>{item.houseName}</h4>
                            </div>

                            <div
                              className="row d-flex justify-content-around"
                              style={{ marginTop: "15px" }}
                            >
                              <li>
                                <div className="col-12 d-flex justify-content-center">
                                  <i
                                    className="fa fa-bed mx-2"
                                    style={{ color: "#fda94f" }}
                                  >
                                    {" "}
                                  </i>
                                  <p>{item.noOfBedRooms}</p>
                                  <p className="mx-2">Bed</p>
                                </div>
                              </li>
                              <li>
                                <div className="col-12 d-flex justify-content-center">
                                  <i
                                    className="fa fa-bath mx-2"
                                    style={{ color: "#fda94f" }}
                                  ></i>
                                  <p>{item.noOfBathRoom} </p>
                                  <p className="mx-2">Bath</p>
                                </div>
                              </li>
                            </div>

                            <div className="row d-flex justify-content-around">
                              <div className="col-sm-6 d-flex justify-content-center">
                                <li>
                                  <img
                                    src={publicUrl + "/assets/img/icons/7.png"}
                                    alt="img"
                                    className="mb-1"
                                    style={{ height: "15px" }}
                                  />
                                  <p className="mb-1">{item.interiorSize}</p>
                                  <p className="mx-2 text-capitalize">SQ. ft</p>
                                </li>
                              </div>
                              <div className="col-sm-6 d-flex justify-content-center">
                                <li>
                                  {/* <img src={publicUrl + "/assets/img/icons/7.png"} alt="img" /> */}
                                  <i
                                    className="fa fa-car"
                                    style={{ color: "#fda94f", height: "20px" }}
                                  />
                                  <p className="mb-1">{item.noOfParking}</p>
                                  <p className="mx-2 text-capitalize">
                                    Parking
                                  </p>
                                </li>
                              </div>
                            </div>
                          </ul>
                          {item &&
                          item.isBookedByUser &&
                          item.isBookedByUser === userDataObj._id &&
                          item.transactionId &&
                          item.transactionId !== "" ? (
                            <div>
                              <Button
                                variant="primary"
                                onClick={() => onPropertyClicked(item._id)}
                              >
                                Payment
                              </Button>
                              {creditData && creditData.length > 0 ? (
                                creditData.map((m)=>{
                                  return console.log('hello', m)
                                })
                              ): (<p className="d-none">hello</p>)}
                              <PricingModal
                                monthlyAmount={monthlyAmount}
                                creditAmount={creditAmount}
                                homeId={item._id}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                              />
                              <Link
                                to={{
                                  pathname: "/FeedBack",
                                  state: {
                                    id: item._id,
                                    newPropertyId: item.newPropertyId,
                                  },
                                }}
                              >
                                <button id="probtn" className="mb-3">
                                  Feedback
                                </button>
                              </Link>
                              <Link
                                to={{
                                  pathname: "/tenant-maintainance",
                                  state: {
                                    owner_id: item.createdBy,
                                    id: item._id,
                                    newPropertyId: item.newPropertyId,
                                    houseName: item.houseName,
                                    houseNo: item.houseNo,
                                  },
                                }}
                              >
                                <button id="probtn">Maintainance</button>
                              </Link>
                            </div>
                          ) : item &&
                            item.isBookedByUser &&
                            item.isBookedByUser === userDataObj._id &&
                            item &&
                            item.isBooked ? (
                            <Link
                              to={{
                                pathname: "/RentalAgreement",
                                state: { id: item._id },
                              }}
                            >
                              <button id="probtn">
                                click here to RentalAgreement
                              </button>
                            </Link>
                          ) : item && item.isBooked ? (
                            <p>Booked</p>
                          ) : (
                            <h6 style={{ textShadow: "0 0 3px #FF0000" }}>
                              Please Wait For Owner's Approval{" "}
                            </h6>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ) : (
              <NodataAvailabe />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TenantDashboard;
