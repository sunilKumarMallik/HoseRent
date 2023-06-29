import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../sidebar";
import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import MaterialTable from "material-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { IconButton } from "@mui/material";

function OwnerDashboard() {
  const history = useHistory();
  const [allPropertyData, setAllPropertyData] = useState([]);
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
    if (JSON.parse(localStorage.getItem("homerentuser")).user.role != "owner") {
      alert("You are not an owner to access this");
      history.goBack();
    }
    let headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .get(`${GetBaseUrl()}/getAllProperties`, { headers: headers })
      .then((res) => {
        console.log("all Data", res);
        setAllPropertyData(
          res.data.filter(
            (x) => x.createdBy && x.createdBy._id == userDataObj._id
          )
        );
      });
  };
  console.log(
    "required Data",
    allPropertyData.map((x) => {
      console.log("Hello", x.transactionId + x.newPropertyId);
    })
  );

  const onRemoveProperty = (id) => {
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    if (JSON.parse(localStorage.getItem("homerentuser")).user.role != "owner") {
      alert("You are not an owner to access this");
      history.goBack();
    }
    let headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .delete(`${GetBaseUrl()}/deleteProperty/${id}`, { headers: headers })
      .then((res) => {
        alert("Data Deleted successfully");
        console.log(res);
        getAllData();
      })
      .catch((error) => console.log(error));
  };

  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  let imagealt = "image";
  console.log("userId", userDataObj._id);

  return (
    <div className="d-flex align-items-center justify-content-center dashBack">
        <div>
          <Sidebar />
          <div className="d-flex align-items-center justify-content-center mt-4">
          <button
            className="AddNewbtn"
            type="button"
            onClick={() => {
              history.push("/add-property");
            }}
          >
            Add New{" "}
            <i
              class="fa fa-home ml-2 mb-2"
              aria-hidden="true"
              style={{ fontSize: "30px" }}
            ></i>{" "}
          </button>
          </div>
          <section>
            <div className="ml-4 ownerTable">
              <div className="Dmain-top">
                <h2 className="Dtitle"></h2>
              </div>

              <MaterialTable
                title={"House List"}
                columns={[
                  {
                    title: "Avatar",
                    field: " ",
                    cellStyle: {
                      width: 100,
                      wordWrap: "break-word",
                    },
                    headerStyle: {
                      width: 100,
                    },
                    render: (rowData) => (
                      <img
                        src={rowData.image[0]}
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    ),
                  },
                  {
                    title: "Id",
                    field: "newPropertyId",
                    cellStyle: {
                      width: 100,
                      wordWrap: "break-word",
                      position: "relative",
                      right: "20px",
                    },
                  },
                  {
                    title: "House Name",
                    field: "houseName",
                    cellStyle: {
                      width: 150,
                      wordWrap: "break-word",
                    },
                    headerStyle: {
                      width: 150,
                    },
                    render: (data) => {
                      console.log(data);
                      return (
                        <Link
                          to={{
                            pathname: "/appliedForRent",
                            state: { 
                              // It is a property id
                              id: data._id,
                              tenantId: data.isBookedByUser,
                              newPropertyId: data.newPropertyId,
                              monthlyRent: data.monthlyRent,
                              // tenantnewId: data.listedByUsers[0].tenantNewId,
                            },
                            
                          }}
                        >
                          <p id="housenamebtn">{data.houseName}</p>
                        </Link>
                      );
                    },
                  },
                  {
                    title: "Owner Name",
                    field: "ownerName",
                    cellStyle: {
                      width: 100,
                      wordWrap: "break-word",
                    },
                    headerStyle: {
                      width: 100,
                    },
                  },

                  {
                    title: "Owner's feedback",
                    field: "Feedback",
                    cellStyle: {
                      width: 20,
                      wordWrap: "break-word",
                    },
                    headerStyle: {
                      width: 20,
                    },
                    render: (data) => {
                      console.log(data);
                     //  {data.listedByUsers.map((info) => {
                      let listedByUserData= data.listedByUsers[0];
                      let newTennantId= listedByUserData?listedByUserData.tenantNewId:""
                  
                   
                      // console.log("hjwegrhjewgrjhewgjhr", data.transactionId);
                      // {allPropertyData.map((x)=>{console.log(x.transactionId)})}
                      // {allPropertyData&&allPropertyData.transactionId}
                      return (
                        <Link
                          to={
                            data && data.transactionId && !data.transactionId ||  data.transactionId 
                              ? {
                                  pathname: "/propertyFeedback",
                                  state: {
                                    tenantId: data.isBookedByUser,
                                    id: data._id,
                                    newPropertyId: data.newPropertyId,
                                    tenantnewId: newTennantId
                                  },
                                }
                              : "/owner"
                          }
                        >
                          <IconButton disabled={!data.transactionId}>
                            <FeedbackIcon />
                          </IconButton>
                        </Link>
                      );
                    //})}
                  }

                  },
                  {
                    title: "Tenant's Property Feedback",
                    field: "Feedback",
                    cellStyle: {
                      width: 20,
                      wordWrap: "break-word",
                    },
                    headerStyle: {
                      width: 20,
                    },
                    render: (data) => {
                      console.log(data.newPropertyId);
                      return (
                        <Link
                          to={{
                            pathname: "/customerFeedback",
                            state: {
                              id: data._id,
                              newPropertyId: data.newPropertyId,
                            },
                          }}
                        >
                          <FeedbackIcon />
                        </Link>
                      );
                    },
                  },
                  {
                    title: "Area",
                    field: "area",
                    cellStyle: {
                      width: 75,
                    },
                    headerStyle: {
                      width: 75,
                    },
                  },
                  {
                    title: "Disrict",
                    field: "district",
                    cellStyle: {
                      width: 75,
                    },
                    headerStyle: {
                      width: 75,
                    },
                  },
                  {
                    title: "State",
                    field: "state",
                    cellStyle: {
                      width: 75,
                    },
                    headerStyle: {
                      width: 75,
                    },
                  },
                  {
                    title: "Monthly Rent",
                    field: "monthlyRent",
                    cellStyle: {
                      width: 75,
                    },
                    headerStyle: {
                      width: 75,
                    },
                  },
                  {
                    title: "Edit",
                    field: "Edit",
                    cellStyle: {
                      width: 30,
                    },
                    headerStyle: {
                      width: 30,
                    },
                    render: (data) => {
                      return (
                        <Link to={`/add-property/${data._id}`}>
                          <EditIcon />
                        </Link>
                      );
                    },
                  },

                  {
                    title: "Delete Property",
                    field: "Delete",
                    cellStyle: {
                      width: 30,
                    },
                    headerStyle: {
                      width: 30,
                    },
                    render: (data) => {
                      return (
                        <div onClick={() => onRemoveProperty(data._id)}>
                          <DeleteIcon />
                        </div>
                      );
                    },
                  },
                ]}
                data={allPropertyData}
              />
            </div>
          </section>
        </div>
      </div>
  );
}

export default OwnerDashboard;
