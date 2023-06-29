import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from 'react-bootstrap'
import Sidebar from './sidebar'
import axios from 'axios';
import { GetBaseUrl } from '../../apiServices.js/configUrl';
import {useHistory} from "react-router-dom";

function MaintainanceTenant(props) {
  console.log("props", props);
  console.log("propertyId", props.location.state.id);
  console.log("OwnerId", props.location.state.owner_id);
  console.log("newPropertyId", props.location.state.newPropertyId);
  const history =useHistory();
  const {
    register: maintainanceArea,
    handleSubmit: handleMaintainanceSubmit,

  } = useForm();
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  
  const onMaintainance = (data) => {
    console.log("Maintainance data", data);
    let reqObj = {
      request: data.name,
      reqDate:data.date,
      maintenancebyuser: userDataObj._id,
      propertyId: props.location.state.id,
      newPropertyId:props.location.state.newPropertyId,
      houseName:props.location.state.houseName,
      houseNo:props.location.state.houseNo,
      // listedByUsers:userName,
      ownerId:props.location.state.owner_id,
      // status:"pending"
    }

    axios
      .post(`${GetBaseUrl()}/maintenance/create`, reqObj)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        history.push('/tenant-Dashboard')

      })
      .catch((err) => {
        console.log(err);
        //alert(err.response)
      });
  };
 

  return (
    <div>
      <div className="Dcontainer " style={{ position: "relative", left: "140px", marginBottom: "3%" }}>
        <Sidebar />
        <section className="Dmain-maintainance">
          <div className="Dmain-top">
            <h2 className="Dtitle">HomeRent</h2>
           
          </div>

          <div className="Mcontainer">
            <div className="Mcontainer_inside">
              <h3 className='text-light'>Request for any kind of Maintainance</h3>
              <p className="Mpara text-light">please spcify your Request</p>

              <form onSubmit={handleMaintainanceSubmit(onMaintainance)}>
                <textarea type="text" rows="5" cols="75" {...maintainanceArea("name")} />
                <div className='text-light h5'>Date</div>
                <div>
                  <input type="date" className='border border-light text-light w-50 p-2' {...maintainanceArea("date")} />
                </div>
                <Button type="submit" className="menbtn w-50">send</Button>
              </form>

              <p className="Mpara text-light">or connect with Social Platforms</p>
              <div className="social_connects">
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  )
}

export default MaintainanceTenant