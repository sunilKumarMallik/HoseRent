import React, { Component, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";

const WhyChooseUs = (props) => {
  console.log(props.allFeedBack);
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  let imagealt = "image";
  let data = sectiondata.client;
  let PaddingTop = props.PaddingTop ? props.PaddingTop : "pd-top-90";
  let PaddingBottom = props.PaddingBottom
    ? props.PaddingBottom
    : "pd-bottom-100";

  return (
    <div className={"client-area " + PaddingTop + " " + PaddingBottom}>
      <div className="container bg-secondary rounded">
      {}
        <div className="section-title text-center">
          <h2 className="title">What Our Customers Are Saying</h2>
        </div>
        <div className="">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner" style={{position:"relative",left:"123px"}}>
                  {props.allFeedBack &&
                    props.allFeedBack.map((x, i) => {
                      console.log("all feed back", x);
                      return (
                        <div
                          className={
                            i == 0 ? `carousel-item active` : "carousel-item"
                          }
                        >
                          { (
                            <img
                              class="d-block img-thumbanail rounded text-center"
                              height={150}
                              width={150}
                              src={
                                x &&
                                x.feedBackbyuser &&
                                x.feedBackbyuser.profileImageUrl?x &&
                                x.feedBackbyuser &&
                                x.feedBackbyuser.profileImageUrl:'https://upload.wikimedia.org/wikipedia/commons/9/9e/Placeholder_Person.jpg'
                              }
                              alt="First slide"
                            />
                          )}

                          <p className="text-white">
                          Facilities available: {x.availableContract.comment}
                          </p>
                          <p className="text-white">Problem faced from Society: {x.fromSociety.comment}</p>
                 
                          <p className="text-white">
                          Maintenance  jobs: {x.maintenanceByOwner.comment}
                          </p>

                          <p className="text-white">
                          House owner: {x.rateHouseOwner.comment}
                          </p>
                          <p className="text-white">
                           Neighbours: {x.rateNeighbours.comment}
                          </p>
                          <p className="text-white">Suggestion: {x.improve.comment}</p>
                        </div>
                      );
                    })}
                </div>

                <a
                  className="carousel-control-prev "
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon controlIcon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon controlIcon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

// <div className="client-slider-2 text-center">
//                 { data.items.map( (item, i)=>
//                     <div key={ i } className="item">
//                       <div className="single-client-review">
//                         <div className="thumb">
//                         <img className="clr-img clr-img1" src={publicUrl+"/assets/img/client/person1.jpg"} alt="client" />
//                         </div>
//                         <div className="review-details">
//                           <p>{ item.content }</p>
//                           <h4>{ item.name }</h4>
//                           <p>{ item.designation }</p>
//                         </div>
//                       </div>
//                   </div>
//                  ) }
//                 </div>
