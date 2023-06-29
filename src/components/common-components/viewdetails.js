import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import Table from "react-bootstrap/Table";
export default function Viewdetails(props) {
  console.log("sjdafyt", props);
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  console.log("listedByUser", props.props);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //     setNumPages(numPages);

  // }

  const [allPropertyData, setAllPropertyData] = useState([]);
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
      authorization: `Bearer ${token}`,
    };
    axios
      .get(`${GetBaseUrl()}/feedback/all`, { headers: headers })
      .then((res) => {
        console.log("all Data", res);
        // setAllPropertyData(
        //   res.data.filter((x) => x.createdBy &&  x.createdBy._id == userDataObj._id)
        // );
      });
  };
  console.log("required Data", allPropertyData);
  return (
    <div>
      <Container>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Header className="text-center">
                    <Card.Title>
                      Name: {props.props.showUser && props.props.showUser.name}
                    </Card.Title>
                  </Card.Header>
                </Card>
              </Col>
              <Col md={12}  className="mt-2">
                <Card>
                  <Card.Header className="text-center">
                    <Card.Title>
                      Address:{" "}
                      {props.props.showUser && props.props.showUser.empAddress}
                    </Card.Title>
                  </Card.Header>
                </Card>
              </Col>

              <Col md={6}>
                <h6 className="text-center mt-2">Monthly Income</h6>
                <Card>
                  <Card.Header className="text-center">
                    <Card.Title>
                      {props.props.showUser &&
                        props.props.showUser.monthlyIncome}
                    </Card.Title>
                  </Card.Header>
                </Card>
              </Col>
              <Col md={6}>
                <h6 className="text-center mt-2">Income Source</h6>
                <Card>
                  <Card.Header className="text-center">
                    <Card.Title>
                      {props.props.showUser &&
                        props.props.showUser.incomeSource}
                    </Card.Title>
                  </Card.Header>
                </Card>
              </Col>
              <Col md={6}>
                <h6 className="text-center mt-2">AADHAR CARD</h6>
                <Card style={{ width: "" }}>
                  <Card.Img
                    variant="top"
                    src={
                      props.props.showUser
                        ? props.props.showUser.AadharCard &&
                          props.props.showUser.AadharCard.adharFrontUrl &&
                          props.props.showUser.AadharCard.adharFrontUrl
                        : publicUrl + "/assets/img/news/bgp.jpg"
                    }
                  />
                </Card>
              </Col>
              <Col md={6}>
                <h6 className="text-center mt-2">PAN CARD</h6>
                <Card style={{ width: "" }}>
                  <Card.Img
                    variant="top"
                    src={
                      props.props.showUser
                        ? props.props.showUser.PanCard &&
                          props.props.showUser.PanCard.panCardUrl &&
                          props.props.showUser.PanCard.panCardUrl
                        : publicUrl + "/assets/img/news/bgp.jpg"
                    }
                  />
                </Card>
              </Col>
              <Col md={6}>
                <h6 className="text-center mt-2">Aggrement</h6>
                {props.props.aggrementUpdatedbyUser[0]
                  .aggrementUpdatedbyUser ? (
                  <a
                    target="_blank"
                    href={
                      props.props.aggrementUpdatedbyUser[0] &&
                      props.props.aggrementUpdatedbyUser[0]
                        .aggrementUpdatedbyUser &&
                      props.props.aggrementUpdatedbyUser[0]
                        .aggrementUpdatedbyUser
                    }
                  >
                    <Button
                      style={{
                        width: "15em",
                        borderRadius: "5px",
                        right: "0.5em",
                        bottom: "2.6em",
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
                ) : (
                  <Card>
                    <h6
                      style={{
                        boxShadow:
                          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                        padding: "2px",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      Rental Agreement is Not Updated yet from tenant side
                    </h6>
                  </Card>
                )}
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
