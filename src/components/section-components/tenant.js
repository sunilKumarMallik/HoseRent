import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import TenantsigninForm from "./tenantsigninForm";
import Navbar from "../global-components/navbar";
class Tenants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignUp: false,
    };
  }
  render() {
    let publicUrl = process.env.REACT_APP_PUBLIC_URL ;;
    let imagealt = "image";
    let data = sectiondata.searchlist;
    return (
      <div>
        <Navbar />
          <div
            className={
              this.state.showSignUp ? "Tcontainer Tsign-up-mode" : "Tcontainer"
            }>
           <TenantsigninForm/>

            <div className="panels-container">
              <div className="panel left-panel">
                <div className="content">
                  <h3>New here ?</h3>
                  <p className="sometxt">
                   By SigningUP, You are setting up a HomeRent account and accepting to our  <em><a href="url">User Agreement</a></em> and <em><a href="url">privacy Policy</a> </em>.
                  </p>
                  <button
                    className="Tbtn transparent"
                    id="sign-up-Tbtn"
                    onClick={() =>
                      this.setState({
                        showSignUp: true,
                      })
                    }
                  >
                    Sign up
                  </button>

                </div>
                <img src="img/log.svg" className="image" alt="" />
              </div>
              <div className="panel right-panel">
                <div className="content">
                  <h3>Alrady have an Account ?</h3>
                  <p className="sometxt">
                   Get Better Data with conversational Forms, Rooms, better Pricing & More... 
                  </p>
                  <button
                    className="Tbtn transparent"
                    id="sign-in-Tbtn"
                    onClick={() => {
                      this.setState({ showSignUp: false });
                    }}
                  >
                    Sign in
                  </button>
                </div>
                <img src="img/register.svg" className="image" alt="" />
              </div>
            </div>
          </div>

          <script src="app.js"></script>
      </div>
    );
  }
}
export default Tenants;
