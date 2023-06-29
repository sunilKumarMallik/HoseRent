import React from "react";
import { Container, Button, Form, Navbar } from "react-bootstrap";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";

function OwnerNav() {


  return (



    <div>
      <div className="row ">
        <div class="row">
    <div class="col-xs-6 text-left" style={{position: "relative" , left: "5%"}}>
        <div class="previous">
        <Link to="owner-profile">
          <button type="button" class="btn btn-default btn-lg">
              <span class="glyphicon glyphicon-chevron-left">Profile Details</span>
          </button>
          </Link>
        </div>
    </div>
    <div class="col-xs-6 text-right" style={{position: "relative" , left: "8%"}}>   
        <div class="next">
        <Link to="owner-password">
          <button type="button" class="btn btn-default btn-lg">
              <span class="glyphicon glyphicon-chevron-right">Change Password</span>
          </button>
          </Link>
        </div>
    </div>
</div>
      </div>

    </div>

  );
}

export default OwnerNav;
