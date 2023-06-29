import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GetBaseUrl } from "../apiServices.js/configUrl";

function ForgotPassword() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  const onForgotPasswordSubmit = (data) => {
    axios
      .put(`${GetBaseUrl()}/forgot-password`, {
        email: data.email
      })
      .then((response) => {
        console.log("forget passwoed Data is", response.data);
        alert("Please Follow the mail Instructions to reset password");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured");
      });
  };
  return (
    <>
      <div>
        <div
          className="forgot-password-area ptb-100"
          style={{ marginTop: "10%" }}
        >
          <div className="container">
            <div className="forgot-password-form">
              {/* <Link to="/forgotpassword">
                <h2>Forgot Password</h2>
              </Link> */}
              <div className="">
                {" "}
                <h2 className="text-center">Forgot Password</h2>
              </div>
              <div className="">
                Enter your email here we'll send you a notification of reset the
                password to email
              </div>

              <form onSubmit={handleSubmit(onForgotPasswordSubmit)}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    //   {...register("email", { required: "Please enter your Email" })}
                    placeholder="Enter your email"
                    autoFocus
                    {...register("email", { required: true })}
                  />
                </div>
                <button className="btn btn-primary d-grid w-100">
                  Send Reset Link
                </button>
              </form>
              <div className="text-center">
                <Link
                  to={"/login"}
                  className="d-flex align-items-center justify-content-center"
                >
                  <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
