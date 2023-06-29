import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../../config";
import storage from "../../apiServices.js/storage";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/icomoon/eye'
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked'
import Loader from "../commoncomponents/loader";



function TenantsigninForm() {

  const [role, setRole] = useState("tenant");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeBlocked);
  const [isLoading, setIsLoading ] = useState(false);
  const {
    register: signupRegister,
    handleSubmit: handleSignUpSubmit,
    formState:{errors}
  } = useForm({mode:"onBlur"});
  const { register: LoginRegiser, handleSubmit: hanldeLoginSubmit } = useForm();

  const history = useHistory();
  console.log("errors", errors);
  // signup Api Intefration
  const onSignUp = (data) => {
    setIsLoading(true);
    console.log("signup data", data);
    axios
      .post(`${GetBaseUrl()}/signup`, { ...data, role: role })
      .then((resdata) => {
        console.log(resdata.data);
        alert(resdata.data.message);
        setIsLoading(false)
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("Name and email is already used")
        setIsLoading(false);
      });
  };

  // signIn Api Integration
  const onSignIn = (data) => {
    setIsLoading(true);
    console.log("signin data", data);
    axios
      .post(`${GetBaseUrl()}/signin`, data)
      .then((resdata) => {
        console.log(resdata.data);
        storage.storeJsonData("homerentuser", resdata.data);
        alert("loged in Successfully");

        if (resdata.data.user.role === "owner") {
          history.push("/");
        } else if (resdata.data.user.role === "tenant") {
          if (resdata.data.user.listedProperty.length >= 0) {
            history.push("/");
          }
        } else if (resdata.data.user.role === "Admin") {
          // if(resdata.data.user.listedProperty.length>0){
          history.push("/admin");
          //  }
        } else {
          history.push("/");
        }

      }).catch((err) => {
        console.log(err)
        alert("Please provide Valid Email ID & Password")
        setIsLoading(false)
      });
  };
  const handleRoleChange = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };
  //show password
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    }
    else {
      setIcon(eyeBlocked);
      setType('password');
    }
  }
  if (isLoading) {
    return <Loader />
  }
  else{
  return (
    <div className="Tforms-container">
      <div className="Tsignin-signup">
        <form
          onSubmit={hanldeLoginSubmit(onSignIn)}
          className="Tsign-in-form Tform"
        >
          <h2 className="title">Sign in</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="email"
              placeholder="email"
              {...LoginRegiser("email", { required: true }
              )}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type={type}
              placeholder="Password"
              {...LoginRegiser("password", { required: true })}
            />

            <div id='eye-btn' onClick={handleToggle}>
              <Icon icon={icon} size={25} />
            </div>
          </div>

          <div className="row justfy-content-around mt-3">

            <div className="row justfy-content-around" style={{ paddingRight: "15px" }}>
              <input type="checkbox" value="lsRememberMe" id="rememberMe" />
              <label className="rememberMeNew" for="rememberMe">Remember me</label>
            </div>

            <div className="lost-your-password-wrap">
              <Link to="/forgotPassword" className="lost-your-password">Forgot Password?</Link>
            </div>
          </div>

          <input type="submit" value="Login" className="Tbtn solid" />

        </form>
        <form
          onSubmit={handleSignUpSubmit(onSignUp)}
          className="Tsign-up-form Tform"
        >
          <h2 className="title">Sign up</h2>
          <RadioGroup
            row = {true}
            style={{ display: "flex",width: 'auto',
            height: 'auto',
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row', }}
            className="d-flex"
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={role}
            onChange={handleRoleChange}
          >
            <FormControlLabel
              value="tenant"
              control={<Radio />}
              style={{ border: "none " , width: 'auto'}}
              label="Tenant"
            />
            <FormControlLabel
              style={{ border: "none ", width: 'auto' }}
              value="owner"
              control={<Radio />}
              label="Owner"
            />
            <FormControlLabel
              style={{ border: "none ", width: 'auto' }}
              value="Admin"
              control={<Radio />}
              label="Admin"
            />
          </RadioGroup>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="name"
              {...signupRegister("name", { required: true })}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              {...signupRegister("email", { required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/           
                 })}
            />
            {errors.email && (
              <span className="textRed" style={{ color: "red" }}>
                *email is required{" "}
              </span>
            )}
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              // type="password"
              type={type}
              placeholder="Password"
              {...signupRegister("password", { required: true })}
            />
            <div id='eye-btn' onClick={handleToggle}>
              <Icon icon={icon} size={25} />
            </div>
          </div>
          <input type="submit" className="Tbtn" value="Sign up" />
          <p className="social-text">Or Sign up with social platforms</p>
          <div className="social-media">
            <a href="#" className="social-icon Ticon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon Ticon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon Ticon">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="social-icon Ticon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
 }
}

export default TenantsigninForm;
