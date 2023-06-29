import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import Sidebar from './sidebar'
import TenantNav from './tenantNav'
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function ChangePassword() {
  const [userData, setUserData] = useState();
const history = useHistory();
  
  const {
    register,
    handleSubmit,
    errors,
    reset
  } = useForm();

  // let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;

  const onPasswordChange = (data) => {

    if (data.confirmPassword != data.newPassword) {
      alert("Confirm Password does Not match");
      return;
    }else{
    console.log(data)
    axios.put(`${GetBaseUrl()}/change-password`, {
      email: userDataObj.email,
      password: data.oldPassword,
      newPassword: data.newPassword
    }).then((response) => {
      console.log("data",response.data);
      alert('Password changed sucessfully')
      localStorage.clear()
          history.push('/login')
    });
   }
  }

return (

    <div>
      <div className="container w-75">
        <Sidebar />
        <section className="Dmain">
          <div className="Dmain-top">
            <h2 className="Dtitle">HomeRent</h2>
            {/* <i className="fas fa-user-cog"></i> */}
          </div>
          <div>
            <Card className="text-center">
              <Card.Header className="bg-dark">
                <TenantNav style={{ backgroundImage: "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))" }} />
              </Card.Header>

              <div style={{
                background: " #0F2027", /* fallback for old browsers */
                background: " -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)", /* Chrome 10-25, Safari 5.1-6 */
                background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
              }} /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
              >


                <form onSubmit={handleSubmit(onPasswordChange)}>

                  <div className="mb-3 col-sm-4 mx-auto">
                    <label for="exampleInputPassword" className="form-label text-light">CURRENT PASSWORD</label>
                    <input type="password" name="password" className="form-control" id="password" aria-describedby="password" {...register('oldPassword', { required: true })} />
                    <div id="passwordHelpBlock" className="form-text  text-light">

                    </div>
                  </div>



                  <div className="mb-3 col-sm-4  mx-auto">
                    <label for="exampleInputPassword1" className="form-label  text-light">NEW PASSWORD</label>
                    <input type="password" id="newpassword" name="newpassword" className="form-control" aria-describedby="newpassword"  {...register('newPassword', { required: true })} />
                    <div className="input-group-btn">
                     {/* <button className="btn btn-outline-dark" onClick={togglePassword}>
                     { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                     </button> */}
                    </div>
                  </div>
                  <div className="mb-3 col-sm-4  mx-auto">
                    <label for="exampleInputPassword2" className="form-label  text-light">CONFIRM PASSWORD</label>
                    <input type="password" id="confirmpassword" name="confirmpassword" className="form-control"  aria-describedby="confirmpassword" {...register('confirmPassword', { required: true })} />
                  </div>

                  <div className='btn-group btn-sm'>
                    <button type="submit" className="btn btn-warning btn-sm float-start border border-warning" style={{ textAlign: "center" }}>Save Changes</button>
                  </div>
                  <div className='btn-group btn-md'>
                    <button type="submit" className="btn btn-dark btn-md  float-start mx-4 border" style={{ textAlign: "center" }}>Cancel</button>
                  </div>
                </form>
              </div>

            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ChangePassword