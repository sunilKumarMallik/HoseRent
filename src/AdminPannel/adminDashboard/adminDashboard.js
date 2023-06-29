
import React, { useEffect, useState} from "react";
import Sidebar from '../../AdminPannel/sidebar'
import axios from 'axios';
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [allPropertyData, setAllPropertyData] = useState([])
  useEffect(()=>{
    axios.get(`${GetBaseUrl()}/getAllProperties`).then(res =>{
      console.log("all Data",res)
      setAllPropertyData(res.data);})
  }, [])
  console.log("required Data", allPropertyData);
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  return (
    <div>
   <Sidebar/>
   <div class="admcontainer">
        <div class="admheader">
        <Link to="/">
        <img
          src={publicUrl + "/assets/img/icons/bg-logo2.png"}
          alt="logo"
          className="main-logo" style={{width:"5em"}}
        />
      </Link>
   <h2 data-text="HomeRent" className='Header'>HomeRent</h2>
        </div>
        <div class="admcontent">
            <div class="admcards">
                <div class="admcard">
                    <div class="admbox">
                        <h3>2194</h3>
                        <h5>Houses</h5>
                    </div>
                    <div class="icon-case">
                        <img src="students.png" alt=""/>
                    </div>
                </div>
                <div class="admcard">
                    <div class="admbox">
                        <h3>53</h3>
                        <h5>Tenants</h5>
                    </div>
                    <div class="icon-case">
                        <img src="teachers.png" alt=""/>
                    </div>
                </div>
                <div class="admcard">
                    <div class="admbox">
                        <h3>5</h3>
                        <h5>Owners</h5>
                    </div>
                    <div class="icon-case">
                        <img src="schools.png" alt=""/>
                    </div>
                </div>
                <div class="admcard">
                    <div class="admbox">
                        <h3>350000</h3>
                        <h5>Income</h5>
                    </div>
                    <div class="icon-case">
                        <img src="income.png" alt=""/>
                    </div>
                </div>
            </div>
            <div class="admcontent-2">
                <div class="recent-payments">
                    <div class="admtitle">
                        <h3>Customer Details</h3>
                    </div>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>House Name</th>
                            <th>Monthly Rent</th>
                            <th>Option</th>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>St. James College</td>
                            <td>$120</td>
                            <td><a href="#" class="admbtn">View</a></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>St. James College</td>
                            <td>$120</td>
                            <td><a href="#" class="admbtn">View</a></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>St. James College</td>
                            <td>$120</td>
                            <td><a href="#" class="admbtn">View</a></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>St. James College</td>
                            <td>$120</td>
                            <td><a href="#" class="admbtn">View</a></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>St. James College</td>
                            <td>$120</td>
                            <td><a href="#" class="admbtn">View</a></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>St. James College</td>
                            <td>$120</td>
                            <td><a href="#" class="admbtn">View</a></td>
                        </tr>
                    </table>
                </div>
                <div class="new-students">
                    <div class="admtitle">
                        <h3>Owner</h3>
                        <a href="#" class="admbtn">View All</a>
                    </div>
                    <table>
                        <tr>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>option</th>
                        </tr>
                        <tr>
                            <td><img src="user.png" alt=""/></td>
                            <td>John Steve Doe</td>
                            <td><img src="info.png" alt=""/></td>
                        </tr>
                        <tr>
                            <td><img src="user.png" alt=""/></td>
                            <td>John Steve Doe</td>
                            <td><img src="info.png" alt=""/></td>
                        </tr>
                        <tr>
                            <td><img src="user.png" alt=""/></td>
                            <td>John Steve Doe</td>
                            <td><img src="info.png" alt=""/></td>
                        </tr>
                        <tr>
                            <td><img src="user.png" alt=""/></td>
                            <td>John Steve Doe</td>
                            <td><img src="info.png" alt=""/></td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
    </div>
  
    </div>
  )
}

export default AdminDashboard