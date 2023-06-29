import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import storage from "../../apiServices.js/storage";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    let publicUrl = process.env.REACT_APP_PUBLIC_URL;
    let imgattr = "logo";
    let anchor = "#";

    return (
      <div>
        <div className="navbar-area">
          <nav className="navbar navbar-area navbar-expand-lg">
            <div className="container nav-container">
              <div className="responsive-mobile-menu">
                <button
                  className="menu toggle-btn d-block d-lg-none"
                  data-toggle="collapse"
                  data-target="#realdeal_main_menu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="icon-left" />
                  <span className="icon-right" />
                </button>
              </div>
              <div className="logo readeal-top">
                <Link to="/">
                  <img
                    src={publicUrl + "/assets/img/icons/bg-logo2.png"}
                    alt="logo"
                    className="main-logo"
                  />
                </Link>
              </div>
              {/* <div className="nav-right-part nav-right-part-mobile">
                <Link className="btn btn-yellow" to="/add-property">
                  ADD NEW HOME{" "}
                  <span className="right">
                    <i className="la la-plus" />
                  </span>
                </Link>
              </div> */}
              <div className="collapse navbar-collapse" id="realdeal_main_menu">
                <ul className="navbar-nav menu-open readeal-top">
                  <li>
                    {/* className="menu-item-has-children current-menu-item" */}
                    <a href="/">Home</a>
                    {/* <ul className="sub-menu">
                      <li>
                        <Link to="/">Home 01</Link>
                      </li>
                      <li>
                        <Link to="/home-v2">Home 02</Link>
                      </li>
                      <li>
                        <Link to="/home-v3">Home 03</Link>
                      </li>
                      <li>
                        <Link to="/home-v4">Home 04</Link>
                      </li>
                    </ul> */}
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Property</a>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/property">Property</Link>
                      </li>
                      <li>
                        <Link to="/availavbe-property">
                          Propertys Availavbe
                        </Link>
                      </li>
                      <li>
                        <Link to="/properties-by-city">Property By City</Link>
                      </li>
                      {/* <li>
                        <Link to="/recent-properties">Property Recenty</Link>
                      </li> */}
                    </ul>
                  </li>

                  <li>
                        <Link to="/About">About Us</Link>
                      </li>

                 {/*  <li className="menu-item-has-children">
                    <a href="#">Pages</a>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/About">About</Link>
                      </li>
                      <li>
                        <Link to="/advisor">Advisor</Link>
                      </li>
                      <li>
                        <Link to="/search-list">Search List</Link>
                      </li>
                     
                      <li>
                        <Link to="/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link to="/pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link to="/user-list">User List</Link>
                      </li>
                      <li>
                        <Link to="/Registration">Registration</Link>
                      </li>
                      <li>
                        <Link to="/error">404</Link>
                      </li> 
                    </ul>
                  </li>
                  */}
             {/* {storage.isAuthenticated() &&    */}
               {/* <li className="menu-item-has-children">
                    <a href="#">Activities</a>
                    <ul className="sub-menu">
                      <h6 className="heading-sub-menu">My Activies</h6>
                      <li>
                        <Link to="">Contacted Properties</Link>
                      </li>
                      <li>
                        <Link to="">Viewed Properties</Link>
                      </li>
                      <li>
                        <Link to="">ShortListed Properties</Link>
                      </li>
                      <li>
                        <Link to="/search-grid">Search Grid</Link>
                      </li>
                      <li>
                        <Link to="">Recommendations</Link>
                      </li>
                    </ul>
                  </li> */}
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Profile</a>
                    <ul className="sub-menu">
                    {storage?.isAuthenticated()?.user?.name && 
                    <p className="text-center"> Hi {storage?.isAuthenticated()?.user?.name}</p>
                    }
                    {storage.isAuthenticated() ? (
                      <>
                         <li>
                         <Link  className="text-center" to={storage.isAuthenticated()&&storage.isAuthenticated().user.role=="owner"?"/owner":
                         storage.isAuthenticated()&&storage.isAuthenticated().user.role=="tenant"?"/tenant-Dashboard": storage.isAuthenticated()&&storage.isAuthenticated().user.role=="Admin"?"/admin": ""}>Dashboard</Link>
                       </li>
                       <li>
                      <a className="text-center"
                   style={{cursor:"pointer", backgroundColor:"#B22222"}}
                        onClick={() => {
                          storage.clearAll();
                          
                          window.location.reload(false)
                          //;history.pushState('/')
                        }}
                        variant="danger"
                      >
                        Log Out
                      </a>
                      </li>
                      </>
                    ) : (          
                      <Link to="/login">
                      <div className="text-center">Login</div>
                      </Link>
                    )}
                      </ul>
                    </li>
                  {/* <li className="menu-item">
                    {storage.isAuthenticated() ? (
                      <a
                   style={{cursor:"pointer"}}
                        onClick={() => {
                          storage.clearAll();
                          
                          window.location.reload(false)
                          //;history.pushState('/')
                        }}
                        variant="danger"
                      >
                        Log Out
                      </a>
                    ) : (            
                      <Link to="/login">Login</Link>
                    )} */}

                    {/* <ul className="sub-menu">
                    <h8 className="heading-sub-menu">Login</h8>
                      <li>
                        <Link to="/admin-login">Admin Login</Link>
                      </li>
                      <li>
                        <Link to="/owner-login">Owner Login</Link>
                      </li>
                      <li>
                        <Link to="/tenant-login">Tenant Login</Link>
                      </li>
                    </ul> */}
                  {/* </li> */}
                </ul>
              </div>
              {/* <div className="nav-right-part nav-right-part-desktop readeal-top">
                <Link className="btn btn-yellow" to="/add-property">
                  ADD NEW HOME{" "}
                  <span className="right">
                    <i className="la la-plus" />
                  </span>
                </Link>
              </div> */}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
