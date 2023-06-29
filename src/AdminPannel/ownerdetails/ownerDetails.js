import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { Button } from "react-bootstrap";
function OwnerDetails() {
  const [allPropertyData, setAllPropertyData] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("homerentuser") ? JSON.parse(localStorage.getItem("homerentuser")).token : undefined;
    let headers = {
      authorization: `Bearer ${token}`
    };
    axios
      .get(`${GetBaseUrl()}/getAllProperties`, { headers: headers })
      .then((res) => {
        console.log("all Data", res);

        setAllPropertyData(res.data);
      });
  }, []);
  console.log("required Data", allPropertyData);
  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  return (
    <div>

      <Sidebar />
      <section style={{ position: "relative", left: "-1%" }}>
        <div className="adminlogodiv">
          <Link to="/">
            <img
              src={publicUrl + "/assets/img/icons/bg-logo2.png"}
              alt="logo"
              className="main-logo" style={{ width: "5em", position: "relative", bottom: "19px" }}
            />
          </Link>
        </div>
        <div className="ml-4">
          <MaterialTable

            title={"House Details"}
            columns={[

              {
                title: "Avatar",
                field: " ",
                render: (rowData) => (
                  <img
                    src={rowData.image[0]}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                )
              },
              {
                title: "House Name", field: "houseName", render: (data) => {
                  console.log(data)
                  return (
                    <Link id="housenameAdminbtn" to={{ pathname: '/House-details', state: { id: data._id } }}>{data.houseName}</Link>
                  )
                }
              },
              { title: "Owner Name", field: "ownerName" },
              { title: "Area", field: "area" },
              {
                title: "District",
                field: "district"
              },
              {
                title: "Monthly Reant",
                field: "monthlyRent"
              },


            ]}
            data={allPropertyData}
          />
        </div>
      </section>
    </div>

  );
}

export default OwnerDetails;
