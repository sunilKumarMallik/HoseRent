import React ,{ useState }  from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../config";
import { Navbar } from "react-bootstrap";
import { GetBaseUrl } from "../apiServices.js/configUrl";
import Loader from "./commoncomponents/loader";

const ConfirmEmail = () => {
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading ] = useState(false);
  console.log(location);
  const urlParams = new URLSearchParams(location.search);
  console.log(urlParams);
  const id = urlParams.get("id");
  const email = urlParams.get("email");
  console.log(id);
  console.log(email);

  const onConfirmEmail = () => {
    setIsLoading(true);
    axios
      .post(`${GetBaseUrl()}/confirmmail`, {
        email: email,
        confirmEmailCode: id
      })
      .then((result) => {
        history.push("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return <Loader />
  }
  else{
  return (
    <div className="body_container">

<div className="container_newOne">
      <h2>Verify Your Account</h2>
      <p>
        We emailed you the six digit code to cool_guy@email.com <br />
        Enter the code below to confirm your email address.
      </p>
      <div className="code-container-New">
        <img src="/assets/img/others/emailImage.png" className="Code_new"/>
      </div>
          <button onClick={onConfirmEmail} class="info_email_Varification" >
            Confirm Email
          </button>
  </div>
      {/* <div className="blockImageNew">
      <div className="Confirmdiv">
        <h3 className="texthead">Confirm Your Email</h3>
        <p>
  
        </p>
        <Link to={"/owner-Details"}>
          <button onClick={onConfirmEmail} className="conbtn">
            Confirm Email
          </button>
        </Link>
      </div>
      </div> */}
    
    </div>
  );
  }
};

export default ConfirmEmail;
