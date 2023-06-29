import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { GetBaseUrl } from "../apiServices.js/configUrl";
import Sidebar from "./sidebar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Custommodal from "../components/common-components/custommodal";
import Viewdetails from "../components/common-components/viewdetails";
import InhandCashModal from "../components/common-components/InhandCashModal";

function AppliedRent(props) {
  console.log("All data is",props)
  const location = useLocation();
  const history = useHistory();
  console.log("location", location);
  const [allPropertyData, setAllPropertyData] = useState([]);
  const [listedByUser, setListedByUser] = useState([]);
  const [showUser, setShowUser] = useState({});
  const [handlePayment, setHandlePaymet] = useState({});
  const [userId, setUserId] = useState("");
  const [monthlyRent, setMonthlyRent] = useState([]);
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;

  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = () => {
    console.log(JSON.parse(localStorage.getItem("homerentuser")));
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    let headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .get(`${GetBaseUrl()}/getAllProperties`, { headers: headers })
      .then((res) => {
        console.log(
          "all Data",
          res.data
            .filter((y) => y.createdBy != null)
            .filter((x) => x.createdBy._id == userDataObj._id)
            .filter((z) => z._id == location.state.id)
        );
        console.log(res.data)
        setAllPropertyData(
          res.data
            .filter((y) => y.createdBy != null)
            .filter(
              (x) =>
                x.createdBy._id == userDataObj._id && x.listedByUsers.length > 0
            )
            .filter((z) => z._id == location.state.id)
        );
        console.log(
          "my new data",
          res.data
            .filter((y) => y.createdBy != null)
            .filter(
              (x) =>
                x.createdBy._id == userDataObj._id && x.listedByUsers.length > 0
            )
            .filter((z) => z._id == location.state.id)[0]
        );
        setListedByUser(
          res.data
            .filter((y) => y.createdBy != null)
            .filter(
              (x) =>
                x.createdBy._id == userDataObj._id && x.listedByUsers.length > 0
            )
            .filter((z) => z._id == location.state.id)[0]?.listedByUsers
        );
        console.log(res.data)
        setUserId(allPropertyData.map((x)=>{
    return x._id
   }))
   
      });
  };
  console.log("hi Jsd",userId);
  console.log("required Data", allPropertyData);
  let filterData =  allPropertyData.filter(x=>{
    console.log("firstMessage",x.listedByUsers.map((t)=>{
      console.log("damburu",t._id)
    })) ;
    console.log("firstMessage",x.monthlyRent) ;
  })
  console.log("see Data",allPropertyData.monthlyRent);
  // console.log("is Data", listedByUser.map((x)=>{
  //   return x.listedProperty[0]
  // }));
  // console.log("monthlyrent",monthlyRent);
  const handleActive = () => {
    console.log("hello");
  };
  const handlAssignRoom = (data) => {
    console.log("View tenant feedBack", data);

    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    let headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .put(
        `${GetBaseUrl()}/updateProperty`,
        { _id: location.state.id, isBookedByUser: data._id, isBooked: true },
        { headers: headers }
      )
      .then((response) => {
        axios
          .post(`${GetBaseUrl()}/user/${userDataObj._id}`, {
            isPropertyAssigned: location.state.id,
            isOwnerApproved: true,
          })
          .then((result) => {
            alert("Assigned the room");
            getAllData();
            console.log("isPropertyAssigned", location.state.id);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  const [show, setShow] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const handleClose = () => setShow(false);
  const Close = () => setShowPayment(false);
  const handleShow = (data) => {
    console.log(data);
    setShowUser(data);
    setShow(true);
  };
  const handlePaymentData = (data) => {
    console.log(data);
    setHandlePaymet(data);
    setShowPayment(true);
  };

  const handleDeleteOfTenant = (data) => {
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    console.log("tokennnnn", token);
    let headers = {
      authorization: `Bearer ${token}`,
    };
    console.log(headers);
    axios
      .post(
        `${GetBaseUrl()}/deleteTenant/${location.state.id}`,
        { tenantId: data._id },
        { headers: headers }
      )
      .then(() => {
        console.log(data);
        alert("Data Deleted successfully");
        getAllData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center customer">
        <Sidebar />
        <section>
          <div className="ml-4 ownerTable">
            <div className="Dmain-top">
              <h2 className="Dtitle">Customer List</h2>
            </div>
            <MaterialTable
              title={"List"}
              columns={[
                {
                  title: "Avatar",
                  field: "  ",
                  render: (rowData) => (
                    <img
                      src={rowData.profileImageUrl}
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  ),
                },
                { title: "Tenant Name", field: "name" },
                { title: "Email", field: "email" },
                {
                  title: "Owner's past FeedBack",
                  field: "",
                  render: (rowdata) => {
                    console.log(rowdata);
                    return (
                      <Link to={{ pathname: '/tenant-previous-record',
                      state: { 
                        // It is a property id
                        id: props.location.state.id,
                        tenantId:rowdata._id,
                        newPropertyId:props.location.state.newPropertyId,
                        tenantnewId: rowdata.tenantNewId,
                      },
                    }}
                      
                      > <i
                        className="fa-solid fa-star fa-lg"
                        style={{ color: "gold", cursor: "pointer"}}
                      ></i></Link>
                     
                    );
                  },
                },

                { title: "Mobile", field: "mobile" },
                {
                  title: "Pan Card",
                  field: "PanCard.number",
                },
                {
                  title: "Aadhar",
                  field: "AadharCard.number",
                },
        
                 {
                  title: "Action",
                  field: "",
                  render: (rowdata) => {
                    console.log(rowdata);
                    return (
                      <Button
                        disabled={
                          allPropertyData &&
                          allPropertyData.length &&
                          allPropertyData[0].isBooked
                        }
                        variant="primary"
                        className="bt btn"
                        onClick={(data) => handlAssignRoom(rowdata)}
                      >
                        {allPropertyData &&
                        allPropertyData.length &&
                        allPropertyData[0] &&
                        allPropertyData[0].isBooked
                          ? "Already Assigned"
                          : "Assign"}
                      </Button>
                    );
                  },
                },
                {
                  title: "View",
                  field: "",
                  render: (rowdata) => {
                    console.log("data khgf",rowdata)
                    return (
                      <i
                        className="fa-solid fa-eye fa-xl"
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          handleShow(rowdata);
                        }}
                      ></i>
                    );
                  },
                },
                {
                  title: "Owner's past FeedBack",
                  field: "",
                  render: (rowdata) => {
                    console.log(rowdata);
                    return (
                      <Link to={{ pathname: '/tenant-previous-record',
                      state: { 
                        // It is a property id
                        id: props.location.state.id,
                        tenantId:rowdata._id,
                        newPropertyId:props.location.state.newPropertyId,
                        tenantnewId: rowdata.tenantNewId,
                      },
                    }}
                      
                      > <i
                        className="fa-solid fa-eye fa-lg"
                        style={{ color: "blue", cursor: "pointer" }}
                      ></i></Link>
                     
                    );
                  },
                },

                {
                  title: "Status",
                  field: "status",
                  render: (rowdata) => {
                    console.log("data pay",rowdata)
                    return (
                      
                      <i
                        className="	fa fa-cc-amex fa-xl"
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          handlePaymentData(rowdata);
                        }}
                      ></i>
                    );
                  },
                },
                {
                  title: "Action(delete customer)",
                  field: "",
                  render: (rowdata) => {
                    return (
                      <i
                        className="fa fa-trash fa-xl"
                        style={{ fontSize: "30px", cursor: "pointer" }}
                        onClick={() => {
                          handleDeleteOfTenant(rowdata);
                          // history.push('${rowdata._id}')
                        }}
                      ></i>
                    );
                  },
                },
      
              ]}
              data={listedByUser}
            />
          </div>
        </section>
      <InhandCashModal
      
      rent = {props.location.state.monthlyRent}
      showPayment={showPayment}
      // title={"TENANT DETAILS"}
      handleClose={Close}
      // Body={Viewdetails}
      // aggrementUpdatedbyUser={allPropertyData}
      showUser={handlePayment}
      // isModalXl={true}
    />
      <Custommodal
        show={show}
        title={"TENANT DETAILS"}
        handleClose={handleClose}
        Body={Viewdetails}
        aggrementUpdatedbyUser={allPropertyData}
        showUser={showUser}
        isModalXl={true}
      />
    </div>
  );
}

export default AppliedRent;
