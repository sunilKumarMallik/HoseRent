import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { GetBaseUrl } from "../apiServices.js/configUrl";
import Sidebar from "./tenantDashboard/sidebar";
import TenantNav from "./tenantDashboard/tenantNav";

function RentalAgreement() {
  const [image, setImage] = useState("");
  const [picture, setPicture] = useState("");
  const [state, setState] = useState("");
  const [data, setData] = useState({});

  const history = useHistory();
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  const location = useLocation();
  console.log("location", location);
  console.log("homeId", location.state.id);
  let imagealt = "image";
  useEffect(() => {
    getPropertyById();
  }, []);
  const onImageChange = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
        setImage({
          image: res.data.urls[0].url,
        });
      });
    }
  };
  const handleApi = () => {
    // const url = `${GetBaseUrl()}/filestos3`;
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    let headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .put(
        `${GetBaseUrl()}/updateProperty`,
        { _id: data._id, aggrementUpdatedbyUser: image.image },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("jwasdfyg", res.data.propertyData.createdBy._id);
        alert("data updated successfully");
        history.replace({
          pathname: "/payment",
          state: {
            price: data.monthlyRent,
            homeId: location.state.id,
            leaseDuration: data.leaseDuration,
          },
        });
        // alert("Property updated successfully")
        // this.setState({setUpdatedData:res.data })
      })
      .catch((error) => {
        console.log("error", error);
        alert("Something went wrong.Please contact helpdesk");
      });
  };
  const getPropertyById = () => {
    console.log(JSON.parse(localStorage.getItem("homerentuser")));
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    let headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .get(`${GetBaseUrl()}/getPropertyById/${location.state.id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log("sdjkjg", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(
    "Data",
    typeof data.pdfUrl,
    data?.pdfUrl?.length > 0 ? data?.pdfUrl[0].url : "null"
  );
  return (
    <div className="">
      <Sidebar />

      <div
        className="mx-auto"
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
        }}
      >
        <Card class="d-flex">
          <Card.Body>
            <Form>
              <Card>
                <Row className="mb-3">
                  <p style={{ display: "inline-block" }}>
                    <h3>Terms of Rental Agreement</h3>
                    One of the most common features while entering into a
                    property rental transaction in India is the prevalence of
                    the 11 month rental agreement or license agreements. A
                    period of 11 months is preferred by most landlords while
                    entering into property rentals, because there are two types
                    of agreements that deal with property rental in India, lease
                    agreement and leave & license agreement.{" "}
                    <a
                      href="https://esahayak.io/form/rent-agreement-orissa/"
                      target="_blank"
                      style={{ color: "#fda94f", fontSize: "1.2em" }}
                    >
                      Read More.......
                    </a>
                  </p>
                </Row>
                <div>
                  <a
                    href={data?.pdfUrl?.length > 0 && data?.pdfUrl[0].url}
                    target="_blank"
                  >
                    <Button
                      id="downloadbtn"
                      style={{
                        width: "15em",
                        borderRadius: "5px",
                        right: "-0.5em",
                        bottom: "0.6em",
                        backgroundColor: "#fda94f",
                        fontSize: "large",
                      }}
                    >
                      <i
                        class="fa-solid fa-download"
                        style={{ left: "-1em", position: "relative" }}
                      ></i>
                      Download Agreement{" "}
                    </Button>
                  </a>
                </div>
              </Card>
              <Card>
                <div
                  style={{
                    color: "var(--main-color-one)",
                    fontSize: "20px",
                    top: "8%",
                    fontWeight: " bold",
                  }}
                  id="upd"
                >
                  Upload Agreement
                </div>
                <i
                  class="fa-solid fa-upload"
                  style={{ position: "relative" }}
                ></i>
                <input
                  type="file"
                  onChange={onImageChange}
                  className="mx-2"
                  accept="application/pdf,application/vnd.ms-excel"
                />
                <br />
                <Button
                  style={{
                    width: "15em",
                    borderRadius: "5px",
                    top: "-1.5em",
                    position: "relative",
                    backgroundColor: "#fda94f",
                    fontSize: "medium",
                    letterSpacing: "2px",
                  }}
                  onClick={handleApi}
                >
                  SUBMIT AGREEMENT
                </Button>
              </Card>
            </Form>
          </Card.Body>
        </Card>
        {/* )
          })
        } */}
      </div>
    </div>
  );
}

export default RentalAgreement;
