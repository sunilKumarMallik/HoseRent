import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GetBaseUrl } from "../apiServices.js/configUrl";
import Icon from "react-icons-kit";
import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";
import { eye } from "react-icons-kit/icomoon/eye";

function ResetPassword() {
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  const params=useParams()
  const id = params.id
  console.log(id)
  const [type, setType] = useState("password");
  const [newPassword, setnewPassword] = useState("password");
  const [icon, setIcon] = useState(eyeBlocked);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  const onResetPasswordSubmit = (data) => {
    axios
      .put( `${GetBaseUrl()}/reset-password`, {
        resetPasswordLink:id,
        newPassword:data.newPassword
      })
      .then((response) => {
        console.log("forget passwoed Data is", response.data);
        alert("Submitted successfully");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured");
      });
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeBlocked);
      setType("password");
    }
  };
  const handleToggleNewPassword = () => {
    if (newPassword === "password") {
      setIcon(eye);
      setnewPassword("text");
    } else {
      setIcon(eyeBlocked);
      setnewPassword("password");
    }
  };
  return (
    <>
      <div>
        <div
          className="forgot-password-area ptb-100"
          style={{ marginTop: "10%" }}
        >
          <div className="container">
            <div className="forgot-password-form" style={{ maxWidth: "461px" }}>
              <div className="">
                {" "}
                <h2 className="text-left">Password Reset</h2>
              </div>
              <form onSubmit={handleSubmit(onResetPasswordSubmit)}>
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type={type}
                    name="password"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    {...register("oldPassword", { required: true })}
                  />

                  <div id="eye-btn" onClick={handleToggle}>
                    <Icon icon={icon} size={25} />
                  </div>
                </div>

                <label htmlFor="password" className="form-label">
                  Create New Password
                </label>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type={type}
                    id="newpassword"
                    name="newpassword"
                    className="form-control"
                    aria-describedby="newpassword"
                    {...register("newPassword", { required: true })}
                  />

                  <div id="eye-btn" onClick={handleToggleNewPassword}>
                    <Icon icon={icon} size={25} />
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: "65%", borderRadius: "3%" }}
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
