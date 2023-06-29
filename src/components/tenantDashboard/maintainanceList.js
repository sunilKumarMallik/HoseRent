import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import MaterialTable from "material-table";
import Sidebar from "./sidebar";
import FeedbackIcon from "@mui/icons-material/Feedback";

const MaintainanceList = () => {
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  const [tenantMaintainanceList, setTenantMaintainanceList] = useState([]);
  const [maintainanceList, setMaintainanceList] = useState([]);
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
      .get(`${GetBaseUrl()}/maintenanceByUserId/${userDataObj._id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log("all Data", res.data.result);

        setTenantMaintainanceList(res.data.result);
        setMaintainanceList(
          res.data.result.map((info) => {
            console.log(info);
          })
        );
        // setTenantMaintainanceUserId(res.data.result._id);
        // setTenantMaintainanceList(res.data.result);
      });
  };
  console.log("required Data", userDataObj._id);
  console.log("jhr Data", tenantMaintainanceList);
  console.log(maintainanceList);
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  return (
    <div className="d-flex align-items-center justify-content-center customer">
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
                title: "Property Id",
                field: "propertyId.newPropertyId",
                cellStyle: {
                  width: 150,
                  maxWidth: 150,
                  wordWrap: "break-word",
                },
                headerStyle: {
                  width: 150,
                  maxWidth: 150,
                },
              },
              {
                title: "House Name",
                field: "houseName",
              },
              {
                title: "Feedback by Owner",
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
                  return (
                    <Link
                      to={{
                        pathname: "/feedBackByOwner",
                        state: {
                          id: data._id,
                          newPropertyId: data.newPropertyId,
                          propertyId:
                            data && data.propertyId && data.propertyId._id,
                        },
                      }}
                    >
                      <FeedbackIcon />
                    </Link>
                  );
                },
              },
              {
                title: "Request",
                field: "request",
                cellStyle: {
                  width: 200,
                  maxWidth: 200,
                  wordWrap: "break-word",
                },
                headerStyle: {
                  width: 200,
                  maxWidth: 200,
                },
              },
              {
                title: "Request Date",
                field: "reqDate",
              },
              {
                title: "Status",
                field: "status",
              },
            ]}
            data={tenantMaintainanceList}
          />
        </div>
      </section>
    </div>
  );
};

export default MaintainanceList;
