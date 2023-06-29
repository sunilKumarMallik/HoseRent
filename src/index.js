import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import blogdata from "./data/blogdata.json";
import Singleblogdata from "./data/single-blogdata.json";
import HomeV1 from "./components/home-v1";
import HomeV2 from "./components/home-v2";
import HomeV3 from "./components/home-v3";
import HomeV4 from "./components/home-v4";
import Property from "./components/property";
import AvilableProperty from "./components/availavbe-property";
import PropertiesByCity from "./components/properties-by-city";
import RecentProperties from "./components/recent-properties";
import PropertyDetails from "./components/property-details";
import About from "./components/about";
import Advisor from "./components/advisor";
import Pricing from "./components/pricing";
import UserList from "./components/user-list";
import Registraion from "./components/registration";
import Error from "./components/error";
import Faq from "./components/faq";
import News from "./components/news";
import NewsDetails from "./components/adminLogin";
import Contact from "./components/contact";
import SearchMap from "./components/search-map";
import SearchGrid from "./components/search-grid";
import SearchList from "./components/search-list";
import AddNew from "./components/add-property";
import Tenants from "./components/section-components/tenant";
import RentalAgreement from "./components/RentalAgreement";
import Dashbord from "./admin/dashbord";
import ConfirmEmail from "./components/confirmEmail";
import HouseDetails from "./admin/message/message";
// import Report from "./admin/customer/customer";

import Maintainance from "./admin/maintainance/maintainance";
import Dashboard from "./admin/dashboardDetails/dashboard";
import OwnerLogin from "./owner/ownerLogin";
import OwnerDashboard from "./admin/dashboardDetails/dashboard";
import Customer from "./admin/customer/customer";
import TenantBookdetails from "./components/section-components/tenantbookdetails";
import HouseListform from "./admin/message/houseListform";
import AdminLogin from "./components/adminLogin";
import AdminDashboard from "./AdminPannel/adminDashboard/adminDashboard";
import CustomerDetails from "./AdminPannel/customer/customer";
import OwnerDetails from "./AdminPannel/ownerdetails/ownerDetails";
import FeedBack from "./components/feedback/feedBack";
import TenantDashboard from "./components/tenantDashboard/tenantDashboard";
import MaintainanceTenant from "./components/tenantDashboard/maintainance";
import TenantProfile from "./components/tenantDashboard/tenantProfile";
import ChangePassword from "./components/tenantDashboard/changePassword";
import TenantNav from "./components/tenantDashboard/tenantNav";
import BookNow from "./components/section-components/bookNow";
import OtpVerification from "./components/verificationOtp/otpVerification";
import AppliedRent from "./admin/appliedRent";
import OwnerProfile from "./admin/ownerProfile";
import OwnerNav from "./admin/ownerNav";
import ChangePasswordOwner from "./admin/changePasswordOwner";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ExPayment from "./exPayment";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import AdminHouseDetails from "./AdminPannel/adminHouseDetails";
import ResetPassword from "./ResetPassword/ResetPassword";
import NodataAvailabe from "./components/tenantDashboard/noDataAvailable";
import CustomerFeedback from "./admin/customer/customer";
import maintainanceList from "./components/tenantDashboard/maintainanceList";
import PropertyFeedback from "./admin/propertyFeedback";
import FeedBackOwner from "./components/tenantDashboard/feedBackbyOwner";
import FromOwnerFeedBack from "./components/tenantDashboard/fromOwnerFeedback";
import TenantPreviousRecord from "./admin/TenantPreviousRecord";
import PricingModal from "./components/common-components/pricingModal";

class Root extends Component {
  // componentDidMount() {
  //   this.checkExpire();
  // }
  // checkExpire() {
  //   let token = localStorage.getItem("homerentuser")
  //     ? JSON.parse(localStorage.getItem("homerentuser")).token
  //     : undefined;
  //   const payload = atob(token.split(".")[1]);
  //   console.log("token expire", JSON.parse(payload));
  //   const expiration = new Date(JSON.parse(payload).exp);
  //   console.log("expiration", expiration);
  // }
  render() {
    const options = {
      // you can also just use 'bottom center'
      position: positions.TOP_CENTER,
      timeout: 5000,
      offset: "30px",
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };

    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          {/* <HashRouter basename="/"> */}
          <div>
            <Switch>
              <Route exact path="/" component={HomeV1} />
              <Route path="/home-v2" component={HomeV2} />
              <Route path="/home-v3" component={HomeV3} />
              <Route path="/home-v4" component={HomeV4} />
              <Route path="/property" component={Property} />
              <Route path="/availavbe-property" component={AvilableProperty} />
              <Route path="/properties-by-city" component={PropertiesByCity} />
              <Route path="/recent-properties" component={RecentProperties} />
              <Route path="/property-details" component={PropertyDetails} />
              <Route path="/about" component={About} />
              <Route path="/advisor" component={Advisor} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/user-list" component={UserList} />
              <Route path="/registration" component={Registraion} />
              <Route path="/error" component={Error} />
              <Route path="/faq" component={Faq} />
              <Route path="/news" component={News} />
              <Route path="/propertydetail/:id" component={PropertyDetails} />

              <Route path="/contact" component={Contact} />
              <Route path="/search-map" component={SearchMap} />
              <Route path="/search-grid" component={SearchGrid} />
              <Route path="/search-list" component={SearchList} />
              {/* add House details route  */}
              <PrivateRoute path="/add-property" component={AddNew} />
              {/* <Route path="/add-property" component={AddNew} /> */}
              {/* update getPropertyById route */}
              <PrivateRoute path="/add-property/:id" component={AddNew} />
              {/* <Route path={"/tenant"} component={Tenants} /> */}
              <Route path={"/RentalAgreement"} component={RentalAgreement} />
              {/* <Route path={"/dashbord"} component={Dashbord} /> */}
              <Route path={"/dashboardD"} component={Dashboard} />
              <PublicRoute path={"/login"} component={Tenants} />
              <Route path={"/confirm-email"} component={ConfirmEmail} />

              <Route path={"/forgotpassword"} component={ForgotPassword} />
              <Route path={"/reset-password/:id"} component={ResetPassword} />
              {/* <Route path={"/resetpassword/:id"} component={ResetPassword} /> */}

              {/* ------------------OWNER ROUTE----------------- */}
              <PrivateRoute path={"/owner"} component={OwnerDashboard} />
              <PrivateRoute
                Route
                path={"/customerFeedback"}
                component={CustomerFeedback}
              />
              <PrivateRoute
                Route
                path={"/propertyFeedback"}
                component={PropertyFeedback}
              />
              <PrivateRoute
                Route
                path={"/maintainance"}
                component={Maintainance}
              />
              <Route path={"/profile-"} component={OwnerNav} />
              <Route path={"/tenant-previous-record"} component={TenantPreviousRecord} />
              <Route path={"/owner-profile"} component={OwnerProfile} />
              <Route path={"/pricing-modal"} component={PricingModal} />
              <PrivateRoute
                Route
                path={"/appliedForRent"}
                component={AppliedRent}
              />

              {/* --------------TENANT ROUTE------------------ */}
              <PrivateRoute
                path={"/tenant-Dashboard"}
                component={TenantDashboard}
              />
              <PrivateRoute Route path={"/FeedBack"} component={FeedBack} />
              <PrivateRoute
                Route
                path={"/feedBackByOwner"}
                component={FeedBackOwner}
              />
              <PrivateRoute
                Route
                path={"/tenant-maintainance"}
                component={MaintainanceTenant}
              />
              <PrivateRoute
                Route
                path={"/tenant-maintainanceList"}
                component={maintainanceList}
              />
              <PrivateRoute
                Route
                path={"/feedback-from-owner"}
                component={FromOwnerFeedBack}
              />
              <PrivateRoute
                Route
                path={"/tenant-profile"}
                component={TenantProfile}
              />
              <Route path={"/profile"} component={TenantNav} />
              <Route path={"/datanot-Available"} component={NodataAvailabe} />

              {/*only Admin route */}
              <PublicRoute path="/admin-login" component={AdminLogin} />
              <Route path="/House-details" component={AdminHouseDetails} />

              <Route path={"/housedetails"} component={HouseDetails} />
              <PrivateRoute Route path={"/admin"} component={AdminDashboard} />
              <Route path={"/owner-login"} component={OwnerLogin} />

              <Route path={"/home-form"} component={HouseListform} />

              <Route path={"/customer-Details"} component={CustomerDetails} />
              <Route path={"/owner-Details"} component={OwnerDetails} />

              {/* <Route path={"/tenant-Dashboard"} component={TenantDashboard} /> */}

              <Route path={"/tenant-password"} component={ChangePassword} />
              <Route path={"/owner-password"} component={ChangePasswordOwner} />
              <Route path={"/Bookings"} component={BookNow} />
              <Route path={"/confirm-otp"} component={OtpVerification} />
              <Route path={"/payment"} component={ExPayment} />
            </Switch>
          </div>
          {/* </HashRouter> */}
        </Router>
      </AlertProvider>
    );
  }
}

const isAuthenticated = () => {
  const token = localStorage.getItem("homerentuser");
  const refreshToken = localStorage.getItem("refreshToken");
  if (token) return true;
  else return false;
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default withRouter(Root);

ReactDOM.render(<Root />, document.getElementById("realdeal"));
