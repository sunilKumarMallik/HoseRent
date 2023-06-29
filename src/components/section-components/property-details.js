import React, { useEffect, useState } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import CommonCarousel from "../Carousel/Carousel";

const PropertyDetails = (props) => {
  console.log("all props", props.allPropertyImage);
  let params = useParams();
  const onSelectProperty = (data) => {};
  // useEffect(()=>{
  //   console.log("data is",props.allPropertyImage)
  // },[])
  // {Object.keys(props.allPropertyData).map(function(key) {
  //   return <div>Key: {key}, Value: {props.allPropertyData[key]}</div>;
  // })}
  console.log("required Data", props.allPropertyData.feedback);
  // console.log("required Data",  {Object.keys(props.allPropertyData).map(function(key) {
  //   return <div>Key: {key}, Value: {props.allPropertyData[key]}</div>;
  // })});
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  let imagealt = "image";

  return (
    <div className="property-details-area">
      <div className="bg-gray pd-top-100 pd-bottom-90">
        <div className="container">
          <div className="row ">
            <div className="property-details-head">
              <div className="property-details-slider">
                <div className="item">
                  {props.allPropertyImage && props.allPropertyImage.length && (
                    <CommonCarousel
                      image={props.allPropertyImage}
                    ></CommonCarousel>
                  )}
                </div>
              </div>
              <div className="property-details-slider-info row">
                <div className="col-sm-4">
                  <h5>House Name-</h5>
                  <h3>{props.allPropertyData.houseName}</h3>
                  <span>Flat/House No- {props.allPropertyData.houseNo}</span>
                </div>
                <div className="col-sm-4 text-center">
                  <div>
                    <h2>
                      {" "}
                      <i class="fa-solid fa-indian-rupee-sign"></i>
                      {props.allPropertyData.monthlyRent}
                    </h2>
                  </div>
                </div>
                <div
                  className="col-sm-4"
                  style={{
                    position: "relative",
                    top: "-38px",
                    textAlign: "center",
                    right: "-43px",
                  }}
                >
                  {props.allPropertyData.isBooked ? (
                    <h5 className="mt-5">Already Booked Look at new one</h5>
                  ) : (
                    <h6 className="mt-5">
                      Click below the Reserve now button for book room
                      <div>
                        <i class="fa-solid fa-arrow-down fa-xl"></i>
                      </div>
                    </h6>
                  )}
                  <div cl>
                    <button
                      disabled={props.allPropertyData.isBooked}
                      onClick={() => {
                        props.onSelectProperty(params.id);
                      }}
                      className="btn text-center reservebtn"
                    >
                      {props.allPropertyData.isBooked ? (
                        "Booked"
                      ) : (
                        <h4 className="text-white">RESERVE NOW</h4>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row pd-top-90">
          <div className="col-lg-9">
            <div className="property-info mb-5">
              <div className="row" id="selectprops">
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6">
                  <div className="single-property-info">
                    <h5>Bedrooms</h5>
                    <p>
                      <i className="fa fa-bed" />
                      {props.allPropertyData.noOfBedRooms}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6">
                  <div className="single-property-info">
                    <h5>Bathrooms</h5>
                    <p>
                      <i className="fa fa-bath" />
                      {props.allPropertyData.noOfBathRoom}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6">
                  <div className="single-property-info">
                    <h5>Interior Size</h5>
                    <p>
                      <img
                        src={publicUrl + "/assets/img/icons/7.png"}
                        alt={imagealt}
                      />
                      {props.allPropertyData.interiorSize}{" "}
                      {props.allPropertyData.interiorLength}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6">
                  <div className="single-property-info">
                    <h5>Security Deposit</h5>
                    <p>
                      <i class="fa-solid fa-indian-rupee-sign"></i>
                      {props.allPropertyData.securityDeposit}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6 pd-top-20 ">
                  <div className="single-property-info">
                    <h5>State</h5>
                    <p>
                      <img
                        src={publicUrl + "/assets/img/icons/2.png"}
                        alt={imagealt}
                      />
                      {props.allPropertyData.state}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6 pd-top-20 ">
                  <div className="single-property-info">
                    <h5>District</h5>
                    <p>
                      <img
                        src={publicUrl + "/assets/img/icons/2.png"}
                        alt={imagealt}
                      />
                      {props.allPropertyData.district}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6 pd-top-20 ">
                  <div className="single-property-info">
                    <h5>Parking</h5>
                    <p>
                      <i className="fa fa-car" />
                      {props.allPropertyData.noOfParking}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6  pd-top-20 ">
                  <div className="single-property-info">
                    <h5>Area</h5>
                    <p>
                      <i class="fa-brands fa-adn"></i>
                      {props.allPropertyData.area}
                    </p>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6 pd-top-20 ">
                  <div className="single-property-info">
                    <h5>Available For</h5>
                    <p>
                      <i class="fa fa-person"></i>
                      {props.allPropertyData.availableFor}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6 pd-top-20 ">
                  <div className="single-property-info">
                    <h5>Available Status</h5>
                    <p>
                      <i class="fa fa-clock"></i>
                      {props.allPropertyData.availableFrom}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="property-news-single-card style-two border-bottom-yellow">
              <h4>House Description</h4>
              <p>{props.allPropertyData.description}</p>
            </div>

            <div className="property-news-single-card border-bottom-yellow">
              {/* <h4>Amenities</h4>
               */}
              <div className="row" style={{ position: "relative", left: "5%" }}>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6">
                  <h4 className="amenitiesheading">Amenitiies</h4>
                  <ul className="rld-list-style mb-3 mb-sm-0 listamenities">
                    {props.allPropertyData.amenities &&
                      props.allPropertyData.amenities.map((x) => {
                        return (
                          <li>
                            <i className="fa fa-check" /> {x}
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-6 col-xl-6">
                  <h4 className="amenitiesheading">Furnishing Amenitiies</h4>
                  <ul className="rld-list-style mb-3 mb-sm-0 listamenities">
                    {props.allPropertyData.furnishingAmenities &&
                      props.allPropertyData.furnishingAmenities.map((y) => {
                        return (
                          <li>
                            <i className="fa fa-check" /> {y}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="property-news-single-card border-bottom-yellow">
              <h4>House Location</h4>
              <div className="detailsresponsive">
                <iframe
                  width="80%"
                  height="500"
                  frameborder="0"
                  scrolling="yes"
                  marginwidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=bhubaneswar+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a
                    href="https://www.maps.ie/distance-area-calculator.html"
                    width={350}
                    style={{ border: 0 }}
                    allowFullScreen
                  >
                    area maps
                  </a>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyDetails;
