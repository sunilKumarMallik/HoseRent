import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { Document, Page } from "react-pdf";
import { Link, useLocation } from "react-router-dom";
import { GetBaseUrl } from "../apiServices.js/configUrl";
import Sidebar from "./sidebar";
import "react-pdf/dist/esm/entry.webpack";
import CommonCarousel from "../components/Carousel/Carousel";
import { Button } from "bootstrap";
// import Sidebar from "../sidebar";
// import axios from "axios";
// import { GetBaseUrl } from "../../apiServices.js/configUrl";
function AdminHouseDetails() {
  const location = useLocation();
  console.log("location", location);
  const [allPropertyData, setAllPropertyData] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = () => {
    console.log(JSON.parse(localStorage.getItem("homerentuser")));
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    let headers = {
      authorization: `Bearer ${token}`
    };
    axios
      .get(`${GetBaseUrl()}/getAllProperties`, { headers: headers })
      .then((res) => {
        console.log("Response",res.data.filter((x) => x.createdBy._id == userDataObj._id))
        console.log(
          res.data
            .filter((y) => y.createdBy != null)
            .filter((x) => x.createdBy._id == userDataObj._id)
        );
        console.log(
          "all Data",
          res.data
            .filter((y) => y.createdBy != null)
            .filter((z) => z._id == location.state.id)
        );
        setAllPropertyData(
          res.data
            .filter((y) => y.createdBy != null)
            .filter((z) => z._id == location.state.id)
        );
      });
  };
  console.log("required Data", allPropertyData);
  const handleActive = () => {
    console.log("hello");
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      {/* <Sidebar /> */}
      {allPropertyData.map((x) => {
        console.log("required Data", allPropertyData);
        return (
          <>
            <Card
              className="mb-3"
              style={{
              
                position: "absolute",
                top: "0%",
                backgroundColor: "gainsboro"
              }}
            >
              {/* <Card.Img variant="top" src={x.image}/> */}
              <Row className="container-fluid text-center">
                <Col>
                  House Name - {" "}
                  <span className="color-darkslategrey">{x.houseName}</span>{" "}
                 <p> House No - <span>{x.houseNo}</span></p>
                </Col>
                {/* <Col sm={6} md={6} lg={6} xl={6}>
                  Area {x.area} Localities {x.localities}
                </Col> */}
              </Row>
              <Row>
                <Col>
                  {/* <Card.Img variant="top" src={x?.image[0]} /> */}
                  <CommonCarousel image={x?.image} style={{width: "auto",height: "195px"}}></CommonCarousel>
                </Col>
                </Row>
                <Row
                  style={{
                    position: "relative",
                    top: "19px",
                    backgroundColor: "white",
                   height:"220px",
                   borderRadius:"18px",
                  //  boxShadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
                  }}
                >
                  <Col className="text-center" sm={6} md={6} lg={6} xl={6}>
                    Landmark: {x.landMark}
                  </Col>
                  <Col className="text-center" sm={6} md={6} lg={6} xl={6}>
                    InteriorSize: {x.interiorSize} {x.interiorLength}
                  </Col>
                  <Col className="text-center" sm={6} md={6} lg={6} xl={6}>
                    District: {x.district}
                  </Col>
                  <Col className="text-center" sm={6} md={6} lg={6} xl={6}>
                    State: {x.state}
                  </Col>
                  <Col className="text-center" sm={6} md={6} lg={6} xl={6}>
                    Security Deposit: {x.securityDeposit}
                  </Col>
                  <Col className="text-center" sm={6} md={6} lg={6} xl={6}>
                    MonthlyRent: ₹{x.monthlyRent}
                  </Col>
                  <Col className="text-center" sm={6} md={6} lg={6} xl={6}>
                    Post Office: {x.postOffice}
                  </Col>
                  <Col className="text-center" sm={6} md={6} lg={6} xl={6}>
                    PIN: {x.pinCode}
                  </Col>
                </Row>
             
              <Card.Body className="text-center">
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <h5 className="text-center" style={{position:"relative",top:"22px"}}>Rental Bill</h5>
                  <div>
                    {/* {x.pdfUrl[0].url && (
                      <Document
                        file={x.pdfUrl[0].url}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                      </Document>
                    )} */}
                    {/* <p>
                      Page {pageNumber} of {numPages}
                    </p> */}
                    <a href={x.pdfUrl[0].url} target="_blank">
                    <button type="button" className="btn btn-info w-50" >View Rental</button>
                    </a>
                    {/* <Card.Link href={x.pdfUrl[0].url}>View RentalAgreement</Card.Link> */}
                  </div>
                  {/* <Card.Link href={x.rentalAgreement}>View RentalAgreement</Card.Link> */}
                </Col>

                <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                  <h5 className="text-center" style={{position:"relative",top:"22px"}}>Saledeed Bill</h5>
                  <div>
                  <a href={x.pdfUrl[1].url} target="_blank">
                    <button type="button" className="btn btn-info  w-50" >View SaleDeed</button>
                    </a>
                     {/* <Button variant="primary" href={x.pdfUrl[1].url}>View RentalAgreement</Button> */}
                    {/* <Card.Link href={x.pdfUrl[1].url}>View RentalAgreement</Card.Link> */}

                  </div>
                </Col>
              </Card.Body>

              <hr></hr>

              <Card.Body className="text-center">
                <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                  <h5 className="text-center" style={{position:"relative",top:"22px"}}>Electricity Bill</h5>
                  <div>
                  <a href={x.pdfUrl[2].url} target="_blank">
                    <button type="button" className="btn btn-info  w-50" >View Electricity</button>
                    </a>
                  </div>
                </Col>

                <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                  <h5 className="text-center" style={{position:"relative",top:"22px"}}>Mutation Bill</h5>
                  {/* <Card.Link href={x.mutationBill}>View Mutation Bill</Card.Link> */}
                  <div>
                  <a href={x.pdfUrl[3].url} target="_blank">
                    <button type="button" className="btn btn-info   w-50" >View Mutation</button>
                    </a>
                  </div>
                </Col>
              </Card.Body>
              <hr></hr>
              <Card.Body className="text-center">
                <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                  <h5 className="text-center" style={{position:"relative",top:"22px"}}>Water Bill</h5>
                  <div>
                  <a href={x.pdfUrl[2].url} target="_blank">
                    <button type="button" className="btn btn-info  w-50 text-center" >View</button>
                    </a>
                  </div>
                </Col>

                <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                  <h5 className="text-center" style={{position:"relative",top:"22px"}}>Property tax Bill</h5>
                  <div>
                  <a href={x.pdfUrl[2].url} target="_blank">
                    <button type="button" className="btn btn-info  w-50 text-center" >View</button>
                    </a>
                  </div>
                </Col>
              </Card.Body>
            </Card>
          </>
        );
      })}
    </div>
  );
}

export default AdminHouseDetails;
