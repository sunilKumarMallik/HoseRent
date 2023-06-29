import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar.js";
import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import MaterialTable from "material-table";

const Maintainance = () => {
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  const [ownerMaintainanceList, setOwnerMaintainanceList] = useState([]);
  const lookup = {
    Pending: "Pending",
    InProgress: "InProgress",
    Completed: "Completed",
  };
  let status = {};
  // const [allPropertyData, setAllPropertyData] = useState([]);
  useEffect(() => {
    mainList();
  }, []);
  const mainList = () => {
    let token = localStorage.getItem("homerentuser")
      ? JSON.parse(localStorage.getItem("homerentuser")).token
      : undefined;
    let headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .get(`${GetBaseUrl()}/maintenanceByOwnerId/${userDataObj._id}`)
      .then((res) => {
        console.log("all Data", res.data.result);
        setOwnerMaintainanceList(res.data.result);
        // setAllPropertyData(res.data);
      });
  };
  const handleChangeStatus = (e, data, value) => {
    let status = e.target.value;
    axios
      .put(`${GetBaseUrl()}/maintenanceStatus`, {
        maintainanceId: data._id,
        status: e.target.value,
      })
      .then((res) => {
        console.log(res.data);
        alert(`status changed to ${status}`);
      });
    console.log(e.target.value);
    console.log(data);
    console.log(data._id);
    console.log(value);
  };
  console.log("required Data", userDataObj._id);
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  return (
    <div  className="d-flex align-items-center justify-content-center customer">
      <Sidebar />
      <section>
        <div className="adminlogodiv">
          <Link to="/">
            <img
              src={publicUrl + "/assets/img/icons/bg-logo2.png"}
              alt="logo"
              className="main-logo"
              style={{ width: "5em", position: "relative", bottom: "19px" }}
            />
          </Link>
        </div>
        <div className="ownerTable">
          <MaterialTable
            title={"Maintainance List"}
            columns={[
              {
                title: "Tenant Id",
                field: "maintenancebyuser.tenantNewId",
                cellStyle: {
                  width: 50,

                  wordWrap: "break-word"
                },
                headerStyle: {
                  width: 50,

                },
              },
              {
                title: "Property Id",
                field: "newPropertyId",
                cellStyle: {
                  width: 50,

                  wordWrap: "break-word"
                },
                headerStyle: {
                  width: 50,

                },
              },
              {
                title: "Tenant Name",
                field: "maintenancebyuser.name",
                cellStyle: {
                  width: 75,

                  wordWrap: "break-word"
                },
                headerStyle: {
                  width: 75,

                },
              },
              {
                title: "House Name",
                field: "houseName",
                cellStyle: {
                  width: 75,

                },
                headerStyle: {
                  width: 75,

                },
              },
              {
                title: "Request Date",
                field: "reqDate",
                cellStyle: {
                  width: 75,

                  wordWrap: "break-word"
                },
                headerStyle: {
                  width: 75,

                },
              },
              {
                title: "Request",
                field: "request",
                cellStyle: {
                  width: 100,
                  wordWrap: "break-word"
                },
                headerStyle: {
                  width: 100,
                },
              },
              {
                title: "Status",
                field: "status",
                cellStyle: {
                  width: 50,

                },
                headerStyle: {
                  width: 50,

                },
                render: (data, value) => {
                  return (
                    <select
                      onChange={(e) => handleChangeStatus(e, data, value)}
                    // style={
                    //   data.status == "pending"
                    //     ? { color: "grey" }
                    //     : data.status == "reject"
                    //     ? { color: "yellow" }
                    //     : { color: "red" }
                    // }
                    >
                      <option
                        selected={data.status == "pending"}
                        value={"pending"}
                      >
                        pending
                      </option>
                      <option
                        selected={data.status == "inprogress"}
                        value={"inprogress"}
                      >
                        In Progress
                      </option>
                      <option
                        selected={data.status == "complete"}
                        value={"complete"}
                      >
                        Completed
                      </option>
                      <option
                        selected={data.status == "reject"}
                        value={"reject"}
                      >
                        Reject
                      </option>
                    </select>
                  );
                },
              },
            ]}
            data={ownerMaintainanceList}
          />
        </div>
      </section>
    </div>
  );
};

export default Maintainance;
