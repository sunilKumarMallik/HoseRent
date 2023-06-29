import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import storage from "../apiServices.js/storage";

function Sidebar() {
    const history = useHistory();
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div>
            <input type="checkbox" id="sidebar-toggle" />
            <div className="sidebar">
            {/* <i className="fa fa-bars newIcon" aria-hidden=""  ></i> */}
                <div className="sidebar-header ">
                    <h3 className="brand">
                        <Link to="/">
                        <span id='sidebar-head'> Owner</span>
                        </Link>
                    </h3>
                    <label for="sidebar-toggle" className="fa-solid fa-bars" id="t-icons"></label>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        <li>
                            <Link to="/owner">
                                <i className="fas fa-home" id='t-icons' title="House Details"></i>
                                <span id="sidebar-span">House Details</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/customerFeedback">
                                <i className="fas fa-user" id='t-icons' title="Customer"></i>
                                <span id="sidebar-span" >Feedback</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/maintainance">
                                <i className="fas fa-screwdriver-wrench" id='t-icons' title="Maintainance"></i>
                                <span id="sidebar-span" >Maintenance </span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/appliedForRent">
                                <i className="fas fa-money" id='t-icons' title="Applied For Rent"></i>
                                <span id="sidebar-span" >Applied For Rent</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/owner-profile">
                                <i className="fas fa-person" id='t-icons' title="Myprofile"></i>
                                <span id="sidebar-span" style={{position: "relative",left: "6%"}}
                            >Myprofile</span>
                            </Link>
                        </li>

                        <li onClick={() => { storage.clearAll(); history.push('/login') }}>
                            <i className="fas fa-sign-out-alt" id='t-icons' title="Log out"></i>
                            <span className="Dnav-item Di" id="sidebar-span"  style={{position: "relative",left: "6%"}}>Log out</span>
                        </li>

                    </ul>
                </div>
            </div>
        </div>

        
    );
}

export default Sidebar