import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

class Service extends Component {


    render() {

    let publicUrl = process.env.REACT_APP_PUBLIC_URL ;
        let imagealt = 'image'
        let data = sectiondata.services


    return <div className="service-area h1-service-slider-area">
        <div className="container">
          <div className="service-slider d-flex col">
            { data.items.map( ( item, i )  =>
                <div key={ i } className="item itemstyle">
                  <div className="single-service text-center">
                    <div className="thumb double-img">
                      <img src={ publicUrl+item.icon } alt="icons" />
                    </div>
                    <div className="details readeal-top">
                      <h4><Link to="/properties-by-city">{ item.title }</Link></h4>
                      <Link className="readmore-btn" to="/properties-by-city">{ item.btntxt } <i className="la la-arrow-right" /></Link>
                    </div>
                  </div>
                </div>
             ) }
          </div>
        </div>
      </div>


        }
}

export default Service