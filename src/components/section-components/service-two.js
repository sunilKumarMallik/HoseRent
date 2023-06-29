import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

class ServiceTwo extends Component {


  render() {

    let publicUrl = process.env.REACT_APP_PUBLIC_URL;
    let imagealt = 'image'
    let data = sectiondata.servicetwo



    return <div className="service-area service-area-about mg-bottom-60 pb-xl-5 pd-0">
      <div className="container">

        <div class="header">
          <div>
            <div className="section-title">
              <h4 className="sub-title" style={{ color: "black" }}>{data.subtitle}</h4>
              <h2 className="title" style={{ color: "white" }}>{data.title}</h2>
              <p style={{ color: "white", position: "relative", left: "-40px" }}>{data.content1}<br /> {data.content2}</p>
            </div>
            <div className="service-slider-2 row pb-xl-5 pd-0">
                {data.items.map((item, i) =>
                  <div key={i} className="item">
                    <div className="single-intro text-center">
                      <div className="thumb" style={{marginLeft:'5%'}}>
                        <img src={publicUrl + item.icon} alt={imagealt} />
                      </div>
                      <div className="details">
                        <h4 className="title"><a href={item.url}>{item.title}</a></h4>
                        <p>{item.content1} <br /> {item.content2}</p>
                       <Link to={'/contact'}> <a className="read-more" href={item.url}>{item.btntxt}</a></Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g class="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>

      </div>
    </div>
  }
}

export default ServiceTwo