import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../commoncomponents/loader';
import ReactStars from 'react-rating-stars-component';

class Property extends Component {
  constructor() {
    super();
    this.state = {
      allPropertyData: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({isLoading:true})
    axios.get("http://35.175.188.100:8099/api/getAllProperties").then(res => {
      this.setState({isLoading: false});
      console.log("all Property Data", res.data)
      this.setState({ allPropertyData: res.data }, () => {
        console.log("all Data", this.state.allPropertyData)
      })
    })
    console.log('all PRopertyData', this.state.allPropertyData)
  }
  getTotalrating(feedBack) {
    let feedbackObj = feedBack;
    let sum = 0;
    let avgfeedback = 0;
    let totalFeedBack = 50;
    for (const rate in feedbackObj) {
      {
        if (feedbackObj[rate] && feedbackObj[rate].rating)
          sum += parseFloat(feedbackObj[rate].rating);
      }
    }

    avgfeedback = (((sum / totalFeedBack) * 100) / 2) / 10;
    console.log(avgfeedback);
    return avgfeedback;
  }

  render() {

    let publicUrl = process.env.REACT_APP_PUBLIC_URL;
    let imagealt = 'image'
    let data = sectiondata.property

    if (this.state.isLoading) {
      return <Loader />
    }
    else {
      return <div className="property-area pd-top-100 pd-bottom-70">
        <div className="container">
          {/*Property filter Start*/}
          <div className="property-filter-area row custom-gutter">
            <div className="gallery-sizer col-1" />
            {/*property item Start*/}
            {this.state.allPropertyData.map((item, i) => {
              console.log('item', item)
              return (
                <div key={i} className="col-lg-3 col-sm-6 ">
                  <div className="single-feature">
                    <div className="thumb">
                      {item.isBooked && <h3 className="text-white" id="booked">booked</h3>}
                      <img src={item.image ? item.image[0] : publicUrl + "/assets/img/icons/bghouse.jpg"} alt="img" id='ximg' style={{ height: "180px", width: "100%" }} />
                    </div>
                    <div className="details">
                      <p className="author"><i className="fa fa-user" /> {item.ownerName}</p>
                      <h3>
                        {item.houseName}
                      </h3>
                      <h3> <i class="fa-solid fa-indian-rupee-sign"></i> {item.monthlyRent} /Month</h3>
                      <ReactStars
                          edit={false}
                            count={5}
                            value={
                              item.feedback
                                ? this.getTotalrating(item.feedback)
                                : 0
                            }
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            filledIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                      <ul className="info-list">

                        <div className='row d-flex'>
                          <div className='col-5 col-sm-5 col-md-5 col-lg-5'>
                            <li><img src={publicUrl + "/assets/img/icons/1.png"} alt="img" /> {item.area}</li>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7 col-lg-7'>
                            <li>
                              <i className='fa fa-bed' style={{ color: "#fda94f" }}></i>
                              {item.noOfBedRooms} Bed
                            </li>
                          </div>
                        </div>
                        <div className='row d-flex'>
                          <div className='col-5 col-sm-5 col-md-5 col-lg-5'>
                            <li>
                              <i className='fa fa-bath' style={{ color: "#fda94f" }}> </i>
                              {item.noOfBathRoom} bath
                            </li>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7 col-lg-7'>
                            <li><img src={publicUrl + "/assets/img/icons/7.png"} alt="img" /> {item.interiorSize} {item.interiorLength}</li>

                          </div>
                        </div>

                      </ul>
                      <ul className="contact-list">
                        {/* <li><a className="phone" href="#"><i className="fa fa-phone" /></a></li>
                      <li><a className="message" href="#"><img src={publicUrl + "/assets/img/icons/8.png"} alt="img" /></a></li> */}
                        <li className="readeal-top"><Link className="btn btn-yellow" to={`/propertydetail/${item._id}`}>View Details</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            }
            )}
          </div>
        </div>
      </div>

    }
  }
}

export default Property