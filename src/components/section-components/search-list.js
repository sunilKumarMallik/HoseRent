import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from '../commoncomponents/loader';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReactStars from "react-rating-stars-component";
import _, { map } from 'underscore';

class SearchList extends Component {
  constructor() {
    super();
    this.state = {
      allPropertyData: [],
      filterData: [],
      isLoading: false,
      value: [2000, 78000],
      sqValue: [60, 6500],
      starKeyForce:0
    }
  }
  componentDidMount() {

    this.setState({ isLoading: true })
    axios.get("http://35.175.188.100:8099/api/getAllProperties").then(res => {
      this.setState({ isLoading: false })
      console.log("all Data", res.data)
      this.setState({ allPropertyData: res.data, filterData: res.data }, () => {
        console.log("all Data", this.state.allPropertyData)
      })
    })

    console.log("all Data", this.state.allPropertyData)
  }


  getTotalrating(feedBack) {
    let feedbackObj = {...feedBack};
  
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
   // console.log(avgfeedback);
    return avgfeedback;
   

  }

  render() {


    function valuetext(value) {
      return `${value}°C`;
    }

    function valuetext2(sqValue) {
      return '${sqValue}°C';
    }

    const handleChange = (event, newValue) => {
      console.log("value is ", newValue[0])
      this.setState({
        filterData: this.state.allPropertyData.filter(item =>
          item.monthlyRent <= newValue[1] && item.monthlyRent >= newValue[0])
      })
      this.setState({ value: newValue });
    };
const handleRatingChange =(e)=>{
console.log(e.target.value)
let requiredData = this.state.filterData.length ? this.state.filterData : this.state.allPropertyData ;

let sortedData=requiredData.sort((a,b)=>{
  // console.log("diff",  this.getTotalrating(a.feedBack)-this.getTotalrating(b.feedBack))
  let rating1= this.getTotalrating(a.feedback
    );
  let rating2 =this.getTotalrating(b.feedback
    );
  console.log("rating1",rating1);
  console.log("rating2",rating2);
  return comparator(rating1, rating2, e.target.value)
});

this.setState((prevState, props) => ({
  filterData:sortedData,
  starKeyForce:prevState.starKeyForce 
  +1
}));
}
const handlePricingChange =(e)=>{
  let requiredData = this.state.filterData.length ? this.state.filterData : this.state.allPropertyData ; 
console.log('ascending and descending filter',e.target.value)
if(e.target.value=='asc'){
  this.setState({
    filterData: requiredData.sort((a,b) => b.monthlyRent-a.monthlyRent)
  })
}else if(e.target.value=='dsc'){
  this.setState({
    filterData: requiredData.sort((a,b) => a.monthlyRent-b.monthlyRent)
  })
}

}
const comparator=(rating1, rating2, order)=>{
  return order=="asc"? rating2-rating1: rating1-rating2;
}
    const handleChange2 = (event, newValue) => {
      console.log("value is ", newValue[0])
      this.setState({
        filterData: this.state.allPropertyData.filter(item =>
          item.interiorSize <= newValue[1] && item.interiorSize >= newValue[0])
      })
      this.setState({ sqValue: newValue });
    };
    const handlePropertiesFilter = (event) => {
      if (event.target.value === "All Properties") {
        this.setState({ filterData: this.state.allPropertyData })
      }
      else {
        // let requiredData = this.state.filterData.length ? this.state.filterData : this.state.allPropertyData ;
        this.setState({
          filterData: this.state.allPropertyData.filter(item =>
            item.propertyType === event.target.value)
        })
      }
    };
    const handleBedRoomFilter = (event) => {
      if (event.target.value === " ") {
        this.setState({ filterData: this.state.allPropertyData })
      }
      else {
        this.setState({
          filterData: this.state.allPropertyData.filter(item =>
            item.noOfBedRooms === event.target.value)
        })
      }
    };
    const handleBathRoomFilter = (event) => {
      if (event.target.value === " ") {
        this.setState({ filterData: this.state.allPropertyData })
      }
      else {
        this.setState({
          filterData: this.state.allPropertyData.filter(item =>
            item.noOfBathRoom === event.target.value)
        })
      }
    };

    const handleParkingFilter = (event) => {
      if (event.target.value == " ") {
        this.setState({ filterData: this.state.allPropertyData })
      }
      else {
        this.setState({
          filterData: this.state.allPropertyData.filter(item =>
            item.noOfParking == event.target.value)
        })
      }
    };
    const handleFurnishingFilter = (event) => {
      if (event.target.value == "Unfurnished") {
        this.setState({ filterData: this.state.allPropertyData })
      }
      else {
        this.setState({
          filterData: this.state.allPropertyData.filter(item =>
            item.furnishingStatus == event.target.value)
        })
      }
    };
    const handleAvailableFilter = (event) => {
      if (event.target.value == "All") {
        this.setState({ filterData: this.state.allPropertyData })
      }
      else {
        this.setState({
          filterData: this.state.allPropertyData.filter(item =>
            item.availableFor == event.target.value)
        })
      }
    };


    let publicUrl = process.env.REACT_APP_PUBLIC_URL;
    let imagealt = 'image'
    let data = sectiondata.featuredproperties
    let Customclass = this.props.Customclass ? this.props.Customclass : 'pd-top-60'
    if (this.state.isLoading) {
      return <Loader />
    }
    else {
     let filteredData= this.state.filterData.map(x=> {return {...x, rating:this.getTotalrating(x.feedback)}});
     console.log("sortedData", filteredData.map(x=>x.rating))
     console.log("dat",filteredData);
      return (
        <div className="search-page-wrap pd-top-100 pd-bottom-70">
          <div className="search-container">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-3 col-lg-4 sitebar">
                  <h6 className="filter-title mb-4">
                    <img
                      className="mr-3"
                      src={publicUrl + "/assets/img/icons/18.png"}
                      alt={imagealt}
                    />
                    More Filters
                  </h6>
                  <form className="widget widget-sidebar-search-wrap">
                    <div className="widget-sidebar-search">
                      <div className="widget-sidebar-item-wrap rld-single-input left-icon">
                        <input
                          type="text"
                          placeholder="Entry Landmark Location"
                        />
                      </div>
                      <div className="widget-sidebar-item-wrap rld-single-select">
                        <select
                          className="select single-select"
                          onChange={(e) => handlePropertiesFilter(e)}
                        >
                          <option value={"All Properties"}>All Properties</option>
                          <option value={"Residential Apartment"}>Residential Apartment</option>
                          <option value={"Independent House"}>Independent House</option>
                          {/* <option value={3}>Properties 3</option> */}
                        </select>
                      </div>
                      <div className="widget-sidebar-item-wrap rld-price-slider-wrap">
                        <div className="title">Any Price</div>
                        <div className="price">
                          <span>₹2000</span>
                          <span className="float-right">₹60000</span>
                        </div>
                        <Box>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={this.state.value}
                            onChange={handleChange}
                            defaultValue={2000}
                            step={500}
                            min={2000}
                            max={60000}
                            sx={{
                              width: 210,
                              color: '#fda94f',
                            }}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                          />
                        </Box>
                      </div>
                      <div className="widget-sidebar-item-wrap rld-single-select-wrap mb-0">
                        <div className="title d-inline-block float-left mb-0 pt-2">
                          <i className='fa-solid fa-indian-rupee-sign' style={{ color: "#000", fontSize: '1em' }} />
                          Price Sorted by
                        </div>
                        <div className="rld-single-select d-inline-block float-right">
                          <select className="select single-select"
                            onChange={handlePricingChange}
                          >
                            <option value={"All"}>All</option>
                            <option value={"asc"}>high-to-low</option>
                            <option value={"dsc"}>low-to-high</option>
                          </select>
                        </div>
                      </div>

                      <div className="widget-sidebar-item-wrap rld-price-slider-wrap">
                        <div className="title">Size</div>
                        <div className="price">
                          <span>600</span>
                          <span className="float-right">6500sqf/m</span>
                        </div>
                        <Box>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={this.state.sqValue}
                            onChange={handleChange2}
                            defaultValue={1000}
                            step={100}
                            min={600}
                            max={6500}
                            sx={{
                              width: 210,
                              color: '#fda94f',
                            }}
                            valueLabelDisplay="auto"
                            getAriaValueText2={valuetext2}
                          />
                        </Box>
                      </div>

                      <div className="widget-sidebar-item-wrap rld-single-select-wrap mb-0">
                        <div className="title d-inline-block float-left mb-0 pt-2">
                          <i className='fa-solid fa-star' style={{ color: "#000", fontSize: '1em' }} />
                          Sorted by Ratings
                        </div>
                        <div className="rld-single-select d-inline-block float-right">
                          <select className="select single-select" onChange={handleRatingChange}>
                            <option value={"any"}>Any</option>
                            <option value={"asc"}>high-to-low</option>
                            <option value={"dsc"}>low-to-high</option>
                          </select>
                        </div>
                      </div>

                      <div className="widget-sidebar-item-wrap rld-single-select-wrap mt-2">
                        <div className="title d-inline-block float-left mb-0 pt-2">
                          Bedroom
                        </div>
                        <div className="rld-single-select d-inline-block float-right">
                          <select className="select single-select"
                            onChange={(e) => {
                              handleBedRoomFilter(e)
                            }}
                          >
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"4"}>4</option>
                            <option value={"5"}>5+</option>
                          </select>
                        </div>
                      </div>
                      <div className="widget-sidebar-item-wrap rld-single-select-wrap">
                        <div className="title d-inline-block float-left mb-0 pt-2">
                          Bathroom
                        </div>
                        <div className="rld-single-select d-inline-block float-right">
                          <select className="select single-select"
                            onChange={(e) => {
                              handleBathRoomFilter(e)
                            }}>
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"4"}>4</option>
                          </select>
                        </div>
                      </div>
                      <div className="widget-sidebar-item-wrap rld-single-select-wrap mb-0">
                        <div className="title d-inline-block float-left mb-0 pt-2">
                          Parking
                        </div>
                        <div className="rld-single-select d-inline-block float-right">
                          <select className="select single-select"
                            onChange={(e) => {
                              handleParkingFilter(e)
                            }}>
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"4"}>4</option>
                          </select>
                        </div>
                      </div>

                      <div className="widget-sidebar-item-wrap rld-single-select-wrap mb-0">
                        <div className="title d-inline-block float-left mb-0 pt-2">
                          Furnishing status:
                        </div>
                        <div className="rld-single-select d-inline-block float-right">
                          <select className="select single-select"
                            onChange={(e) => {
                              handleFurnishingFilter(e)
                            }}>
                            <option value={"Unfurnished"}>Unfurnished</option>
                            <option value={"Semifurnished"}>Semifurnished</option>
                            <option value={"Furnished"}>Furnished</option>
                          </select>
                        </div>
                      </div>

                      <div className="widget-sidebar-item-wrap rld-single-select-wrap mb-0">
                        <div className="title d-inline-block float-left mb-0 pt-2">
                          Available For
                        </div>
                        <div className="rld-single-select d-inline-block float-right">
                          <select className="select single-select"
                            onChange={(e) => {
                              handleAvailableFilter(e)
                            }}>
                            <option value={"All"}>All</option>
                            <option value={"Family"}>Family</option>
                            <option value={"Single Women"}>Single Women</option>
                            <option value={"Single Men"}>Single Men</option>
                            <option value={"Tenants with Company Lease"}>Tenants with Company Lease</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-yellow" onClick={() => this.setState({ filterData: this.state.allPropertyData })}>
                        <span className="left">
                          <i class="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        Reset Filters
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-xl-8 col-lg-8">
              

                  {filteredData.map((item, index) => {
                    console.log("mapRating", `${index}:${item.rating}`)
                    {/* console.log('item', item) */ }
                    return (
                      <div  className="single-feature style-two">
                        <div className="thumb">
                          <img src={item.image ? item.image[0] : publicUrl + "/assets/img/icons/bghouse.jpg"} alt="img" id='ximg' />
                        </div>
                        <div className="details">
                          <div className="details-wrap">
                            <p className="author">
                              <i className="fa fa-user" /> {item.ownerName}
                            </p>
                            <h3>
                              {item.houseName}
                            </h3>
                            <h6>Id- {item.newPropertyId}</h6>
                            <h6 className="title readeal-top">
                              <Link to={item.url}>{item.title}</Link>
                            </h6>
                            <h6 className="title readeal-top">
                              <Link to={item.url}>{item.title}</Link>
                            </h6>
                            <ul className="info-list">
                              {/* { item.features.map( ( features, i )=>
                            <li key={ i } ><i className={ features.icon } /> { features.title }</li>
                           ) }   */}
                              <div className='row d-flex'>
                                <div className='col-5 col-sm-5 col-md-5 col-lg-5'>
                                  <li><img src={publicUrl + "/assets/img/icons/1.png"} alt="img" /> {item.area}</li>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7 col-lg-7'>
                                  <li>
                                    <i className='fa fa-bed' style={{ color: "#fda94f", fontSize: '1em' }}></i>
                                    {item.noOfBedRooms} Bed
                                  </li>
                                </div>
                              </div>
                              <div className='row d-flex'>
                                <div className='col-5 col-sm-5 col-md-5 col-lg-5'>
                                  <li><i className='fa fa-car' style={{ color: "#fda94f", fontSize: '1em' }}></i> {item.noOfParking} Parking</li>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7 col-lg-7'>
                                  <li>
                                    <i className='fa fa-couch' style={{ color: "#fda94f", fontSize: '1em' }}></i>
                                    {item.noOfBathRoom}Bath
                                  </li>
                                </div>
                              </div>
                              <div className='row d-flex'>
                                <div className='col-5 col-sm-5 col-md-5 col-lg-5'>
                                  <li><i className='fa fa-users' style={{ color: "#fda94f", fontSize: '1em' }}></i> {item.availableFor}</li>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7 col-lg-7'>
                                  <li>
                                    <i className='fa fa-home' style={{ color: "#fda94f", fontSize: '1.3em' }}></i>
                                    {item.propertyType}
                                  </li>
                                </div>
                              </div>
                              <div className='row d-flex'>
                                <div className='col-5 col-sm-5 col-md-5 col-lg-5'>
                                  <li>
                                    <i className='fa fa-bath' style={{ color: "#fda94f", fontSize: '1em' }}> </i>
                                    {item.furnishingStatus}
                                  </li>
                              

                                  <li style={{ fontSize: '25px', whiteSpace: 'nowrap', marginTop: '10px' }}>
                                    <i className='fa-solid fa-indian-rupee-sign' style={{ color: "#fda94f", fontSize: '1em' }}> </i>
                                    {item.monthlyRent} /Month
                                  </li>
                                  <ReactStars
                                    key={this.state.starKeyForce}
                                    edit={false}
                                    count={5}
                                    value={
                                      filteredData[index].rating
                                    
                                    }
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    filledIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                  />
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
                  })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SearchList;
