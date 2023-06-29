import React from "react";
import { Link, useHistory } from "react-router-dom";
import storage from "../../apiServices.js/storage";

function Sidebar() {
  const history = useHistory();
  return (
    <div>
      <input type="checkbox" id="sidebar-toggle" />
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="brand bran1">
            <Link to="/">
              <span id="sidebar-head">Tenant</span>
            </Link>
          </h3>
          <label
            for="sidebar-toggle"
            className="fa-solid fa-bars"
            id="t-icons"
          ></label>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/tenant-Dashboard">
                <i
                  className="fas fa-home"
                  id="t-icons"
                  title="House Details"
                ></i>
                <span id="sidebar-span">House Details</span>
              </Link>
            </li>
            {/* <li>
                        <Link to="/FeedBack">
                            <i className="fas fa-message"  id='t-icons'  title='Feedback'></i>
                            <span  id='sidebar-span'>Feedback</span>
                        </Link>
                    </li> */}
            <li>
              <Link to="/tenant-maintainanceList">
                <i
                  className="fas fa-screwdriver-wrench maint_feed"
                  id="t-icons"
                  title="Maintainance & Owner's FeedBackp"
                ></i>
                <span id="sidebar-span" className="text-left">
                  {" "}
                  Owner's FeedBack
                  <div style={{ position: "relative", left: "25%" }}>
                    & Maintenance{" "}
                  </div>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/feedback-from-owner">
                <i
                  className="fa-solid fa-comments  maint_feed"
                  id="t-icons"
                  title="Owner's FeedBackp"
                ></i>
                <span id="sidebar-span" className="text-left">
                  {" "}
                  Owner's FeedBack
                </span>
              </Link>
            </li>
            <li>
              <Link to="/tenant-profile">
                <i className="fas fa-user" id="t-icons" title="My Profile"></i>
                <span id="sidebar-span">My Profile</span>
              </Link>
            </li>

            <li
              onClick={() => {
                storage.clearAll();
                history.push("/");
              }}
            >
              <i
                className="fas fa-sign-out-alt"
                id="t-icons"
                title="Log out"
              ></i>
              <span
                className="Dnav-item Di"
                id="sidebar-span"
                style={{ position: "relative", left: "6%" }}
              >
                Log out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
