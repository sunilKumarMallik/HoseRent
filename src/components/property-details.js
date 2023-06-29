import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import PropertyDetailsSection from "./section-components/property-details";
import RecomandProperties from "./section-components/recomand-properties";
import Footer from "./global-components/footer";
import Client from "./section-components/client";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { GetBaseUrl } from "../apiServices.js/configUrl";
import { useState } from "react";
import { useEffect } from "react";
// import { toast ,ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const PropertyDetails = (props) => {
  console.log(props.data);
  const history = useHistory();
  let params = useParams();
  const [myPropertyData, setMyPropertyData] = useState([]);
  const [allPropertyData, setAllPropertyData] = useState({});
  const [allPropertyImage, setAllPropertyImage] = useState([]);
  const [allFeedBack, setALLfeedBack] = useState([]);

  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;

  const onSelectProperty = (data) => {
    if (userDataObj && userDataObj.role == "owner") {
      alert("You Are not a tenant to access this  ");
      history.push("/owner");
      return;
    }
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    let headers = {
      authorization: `Bearer ${token}`,
    };
    if (!userObj) {
      history.push("/login");
      return;
    }
    axios
      .post(`${GetBaseUrl()}/user/${userDataObj._id}`, { listedProperty: data })
      .then((response) => {
        console.log(response.data);
        axios
          .put(
            `${GetBaseUrl()}/updateListUser`,
            { _id: data, listedByUsers: userDataObj._id },
            {
              headers: headers,
            }
          )
          .then((response) => {
            history.push({
              pathname: "/tenant-Dashboard",
              state: { properId: data },
            });
          })
          .catch((errorData) => {
            console.log("error", errorData);
          });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPropertyDetails();
  }, []);
  const getPropertyDetails = () => {
    console.log("props", params);
    if (params && params.id) {
      axios.get(`${GetBaseUrl()}/getAllProperties`).then((res) => {
        setAllPropertyImage(
          res.data?.filter((x) => x._id === params.id)[0].image
        );
        let filterData = res.data.filter((x) => x._id == params.id)[0];
        setAllPropertyData(filterData);
        getAllFeedBackByid(filterData._id);
        // props.setMyPropertyData(filterData)
      });
    }
  };

  function getAllFeedBackByid(pid) {
    axios.get(`${GetBaseUrl()}/feedback/${pid}`).then((feedRes) => {
      console.log(feedRes);
      setALLfeedBack(feedRes.data.result);
    });
  }

  return (
    <div>
      {/* <ToastContainer/> */}
      <Navbar />
      <PageHeader headertitle="Property Details" />
      <PropertyDetailsSection
        onSelectProperty={onSelectProperty}
        allPropertyData={allPropertyData}
        allPropertyImage={allPropertyImage}
        setMyPropertyData={setMyPropertyData}
      />

      {/* <Link to={"/tenant-Dashboard"}> */}

      <Client
        PaddingTop="pd-top-40"
        PaddingBottom="0"
        allPropertyData={allPropertyData}
        allFeedBack={allFeedBack}
      />
      <Footer />
    </div>
  );
};

export default PropertyDetails;
