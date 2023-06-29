import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GetBaseUrl } from "../apiServices.js/configUrl";
import OwnerNav from "./ownerNav";
import Sidebar from "./sidebar";

function OwnerProfile() {
  const [state, setState] = useState("");
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState("");
  const [panImage, setPanImage] = useState("");
  const [accountImage, setAccountImage] = useState("");
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [profileIsLoading, setProfileIsLoading] = useState(false);
  const [isAdharLoading, setIsAdharLoading] = useState(false);
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  let publicUrl = process.env.REACT_APP_PUBLIC_URL;
  let imagealt = "image";
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  console.log(errors);
  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = () => {
    axios.get(`${GetBaseUrl()}/user/${userDataObj._id}`).then((response) => {
      console.log(response.data);
      let resetData = {
        ownerId: response.data.ownerNewId,
        name: response.data.name,
        email: response.data.email,
        mobile: response.data.mobile,
        Aadhar: response.data.Aadhar,
        pan: response.data.pan,
        accNo: response.data.accNo,
        ifsc: response.data.ifsc,
      }
      setImage({ image: response.data.profileImageUrl });
      setPicture({
        image:
          response.data.AadharCard &&
          response.data.AadharCard.adharFrontUrl &&
          response.data.AadharCard.adharFrontUrl,
      });
      setPanImage({
        image:
          response.data.PanCard &&
          response.data.PanCard.panCardUrl &&
          response.data.PanCard.panCardUrl,
      });
      setAccountImage({
        image:
          response.data.Account &&
          response.data.Account.accountUrl &&
          response.data.Account.accountUrl,
      });
      setUserData(response.data);
      reset(resetData);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setState({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const onPictureChange = (event) => {
    setIsAdharLoading(true);
    console.log("file path", event.target.files[0]);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
        console.log(res.data);
        setPicture({
          image: res.data.urls[0].url,
        });
        setIsAdharLoading(false);
      });
    }
  };

  const onAccountChange = (event) => {
    setIsAccountLoading(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
        setAccountImage({
          image: res.data.urls[0].url,
        });
        setIsAccountLoading(false);
      });
    }
  };
  const onPanChange = (event) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
        setPanImage({
          image: res.data.urls[0].url,
        });
        setIsLoading(false);
      });
    }
  };
  const onImageChangeprofile = (event) => {
    setProfileIsLoading(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
        setImage({
          image: res.data.urls[0].url,
        });
        setProfileIsLoading(false);
      });
    }
  };

  const ImageWithLoader = ({
    onLoad,
    src,
    height = 150,
    loading,
    width = 250,
  }) =>
    loading ? (
      <img
        style={{ width: "100%" }}
        height={150}
        width={250}
        src={"https://i.stack.imgur.com/ATB3o.gif"}
      />
    ) : (
      <img
        height={150}
        width={250}
        src={src}
        onLoad={onLoad}
        style={{ width: "100%" }}
      />
    );

  const onSaveChanges = (data) => {
    console.log(data);

    axios
      .post(`${GetBaseUrl()}/user/${userDataObj._id}`, {
        ...data,
        profileImageUrl: image.image,
        AadharCard: {
          number: data.Aadhar,
          adharFrontUrl: picture.image,
          adharBackUrl: "",
        },
        PanCard: {
          number: data.pan,
          panCardUrl: panImage.image,
        },
        Account: {
          number: data.accNo,
          ifscNumber: data.ifsc,
          accountUrl: accountImage.image,
        },
      })
      .then((res) => {
        alert("Profile updated successfuly");
        getProfileData();
        // this.props.history.push("/owner");
        // this.context.history.push('/owner')
      })
      .catch((error) => {
        console.log("error", error);
        alert("Something went wrong.Please contact helpdesk");
      });
  };
    let currentTime =new Date().getHours();
    let Greeting = "";
    if (currentTime >=12 &&  currentTime <=18){
      Greeting ='good afternoon';
    }else if( currentTime >=18 && currentTime <=21){
      Greeting = "Good Evening";
    }else if ( currentTime >=18 && currentTime<=24){
      Greeting = "Good Night";
    }
    else{
      Greeting = "Good Morning"
    }
  return (
    <div>
      <div className="container mt-4">
        <Sidebar />
        <section>
          <div className="ml-4">
            <div>
              <Card className="text-center">
                <Card.Header className="bg-dark">
                  <OwnerNav />
                </Card.Header>
                <div
                  className="d-grid justify-content-between align-items-center mb-5"
                  style={{}}
                >
                  <Card.Body
                    className="d-flex justify-content-center align-items-center col-sm-12 card text-center w-75"
                    style={{
                      background: "#5A3F37 ",
                      background:
                        "-webkit-linear-gradient(to right, #2C7744, #5A3F37)",
                      background: "linear-gradient(to right, #2C7744, #5A3F37)",
                    }}
                  >
                    <div
                      className="bg-white xyz"
                      style={{ width: "185px", height: "200px" }}
                    >
                      <ImageWithLoader
                        height={200}
                        width={180}
                        src={image && image.image}
                        loading={profileIsLoading}
                      />

                      <input
                        className="col-sm-12 mt-2 mr-1  "
                        type="file"
                        onChange={onImageChangeprofile}
                      />
                    </div>

                    <Form
                      onSubmit={handleSubmit(onSaveChanges)}
                      className="mt-5"
                    >
                      <div className="col-sm-12">
                      <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label
                            className="text-light"
                            defaultValue={userData && userData.name}
                            {...register("name")}
                          >
                            <h5>
                              "{Greeting} {userData && userData.name}"
                            </h5>
                          </Form.Label>
                        </Form.Group>
                        </div>
                        <div className="col-sm-12">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label className="text-light">
                            Owner Id
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="ownerId"
                            className="ownerProfileResponsive"
                            defaultValue={userData && userData.ownerNewId}
                            disabled={isDisabled}s
                            {...register("ownerId")}
                          />
                        </Form.Group>
                      </div>

                      <div className="col-sm-12">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label className="text-light">Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            className="ownerProfileResponsive"
                            defaultValue={userData && userData.name}
                            {...register("name", { required: true })}
                            placeholder="Enter your Name"
                          />
                        </Form.Group>
                      </div>

                      <div className="col-sm-12">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label className="text-light">
                            Email ID
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            className="ownerProfileResponsive"
                            defaultValue={userData && userData.email}
                            disabled={isDisabled}
                            placeholder="Enter your Email Id."
                            {...register("email", { required: true })}
                          />
                        </Form.Group>
                      </div>

                      <div className="">
                        <div className="col-sm-12">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="text-light">
                              Mobile Number
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="mobile"
                              className={
                                'form-control ${errors.mobile ? "errorBorder" : ""} ownerProfileResponsive'
                              }
                              defaultValue={userData && userData.mobile}
                              placeholder="**********"
                              {...register("mobile", {
                                required: true,
                                maxLength: 10,
                                minLength: 10,
                              })}
                            />
                            {errors.mobile && errors.mobile.type == "required" && (
                              <span
                                className="textRed"
                                style={{ color: "red" }}
                              >
                                *mobile Number is required{" "}
                              </span>
                            )}
                            {errors.mobile &&
                              errors.mobile.type === "maxLength" && (
                                <span className="text-danger">
                                  Mobile Number should not exceed more than 10
                                  digits
                                </span>
                              )}
                            {errors.mobile &&
                              errors.mobile.type === "minLength" && (
                                <span className="text-danger">
                                  Mobile Number should be minimum of 10 digits
                                </span>
                              )}
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row d-flex justify-content-between mt-4">
                        <div className="col-sm-6">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="text-light">
                              Aadhar Card
                            </Form.Label>
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="number"
                                name="Aadhar"
                                className={
                                  'text-center form-control ${errors.Aadhar ? "errorBorder" : ""} ownerProfileResponsive'
                                }
                                placeholder="**** **** ****"
                                defaultValue={
                                  userData &&
                                  userData.AadharCard &&
                                  userData.AadharCard.number
                                }
                                {...register("Aadhar", {
                                  required: true,
                                  maxLength: 12,
                                  minLength: 12,
                                })}
                              />
                              {errors.Aadhar &&
                                errors.Aadhar.type == "required" && (
                                  <span
                                    className="textRed"
                                    style={{ color: "red" }}
                                  >
                                    * Aadhar Number is required{" "}
                                  </span>
                                )}
                              {errors.Aadhar &&
                                errors.Aadhar.type === "maxLength" && (
                                  <span className="text-danger">
                                    Adhaar Number should not exceed more than 12
                                    digits
                                  </span>
                                )}
                              {errors.Aadhar &&
                                errors.Aadhar.type === "minLength" && (
                                  <span className="text-danger">
                                    Adhaar Number should be minimum of 12 digits
                                  </span>
                                )}
                            </Form.Group>
                          </Form.Group>
                        </div>

                        <div className="col-sm-6 mt-4">
                          <div>
                            <ImageWithLoader
                              src={picture && picture.image}
                              loading={isAdharLoading}
                            />
                          </div>

                          <div className="mt-2 mb-4 choosefile_b">
                            <input
                              type="file"
                              onChange={onPictureChange}
                              title="Choose a image please"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row d-flex justify-content-between mt-4">
                        <div className="col-sm-6">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="text-light">
                              Pan Card
                            </Form.Label>
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="text"
                                name="pan"
                                // className="mb-2"
                                className={
                                  'text-center form-control ${errors.pan ? "errorBorder" : ""} ownerProfileResponsive'
                                }
                                placeholder="Enter your PAN No."
                                style={{ textTransform: "uppercase" }}
                                defaultValue={
                                  userData &&
                                  userData.PanCard &&
                                  userData.PanCard.number
                                }
                                {...register("pan", {
                                  required: true,
                                  maxLength: 10,
                                  minLength: 10,
                                })}
                              />
                              {errors.pan && errors.pan.type == "required" && (
                                <span
                                  className="text-danger"
                                  style={{ color: "red" }}
                                >
                                  * PAN Number is required{" "}
                                </span>
                              )}
                              {errors.pan &&
                                errors.pan.type === "maxLength" && (
                                  <span className="text-danger">
                                    PAN Number should not exceed more than 10
                                    digits
                                  </span>
                                )}
                              {errors.pan &&
                                errors.pan.type === "minLength" && (
                                  <span className="text-danger">
                                    PAN Number should be minimum of 10 digits
                                  </span>
                                )}
                            </Form.Group>
                          </Form.Group>
                        </div>
                        <div className="col-sm-6 mt-4">
                          <div>
                            {/* <img
                              height={150}
                              width={250}

                              src={
                                image.image
                                  ? image.image
                                  : publicUrl + "/assets/img/news/pan.jpg"
                              }
                              alt={imagealt}
                            /> */}
                            <ImageWithLoader
                              src={panImage && panImage.image}
                              loading={isLoading}
                            />
                          </div>

                          <div className="mt-2 choosefile_b">
                            <input type="file" onChange={onPanChange} />
                          </div>
                        </div>
                      </div>

                      <div className="row d-flex justify-content-between mt-4">
                        <div className="col-sm-6">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="text-light">
                              Account No
                            </Form.Label>
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="number"
                                name="accNo"
                                // className="mb-2"
                                className={
                                  'text-center form-control ${errors.accNo ? "errorBorder" : ""} ownerProfileResponsive'
                                }
                                placeholder="Enter your Account No."
                                defaultValue={
                                  userData &&
                                  userData.Account &&
                                  userData.Account.number
                                }
                                {...register("accNo", {
                                  required: true,
                                  maxLength: 18,
                                  minLength: 9,
                                })}
                              />
                              {errors.accNo && errors.accNo.type == "required" && (
                                <span
                                  className="textRed"
                                  style={{ color: "red" }}
                                >
                                  * Account Number is required{" "}
                                </span>
                              )}
                              {errors.accNo &&
                                errors.accNo.type === "maxLength" && (
                                  <span className="text-danger">
                                    Account Number should not exceed more than
                                    18 digits
                                  </span>
                                )}
                              {errors.accNo &&
                                errors.accNo.type === "minLength" && (
                                  <span className="text-danger">
                                    Account Number should be minimum of 9 digits
                                  </span>
                                )}
                            </Form.Group>

                            <Form.Label className="text-light mt-3">
                              IFSC Code
                            </Form.Label>
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="text"
                                name="ifsc"
                                className={
                                  'text-center form-control ${errors.ifsc ? "errorBorder" : ""} ownerProfileResponsive'
                                }
                                placeholder="Enter your IFSC code"
                                style={{ textTransform: "uppercase" }}
                                defaultValue={
                                  userData &&
                                  userData.Account &&
                                  userData.Account.ifscNumber
                                }
                                {...register("ifsc", {
                                  required: true,
                                  maxLength: 11,
                                  minLength: 11,
                                })}
                              />
                              {errors.ifsc && errors.ifsc.type == "required" && (
                                <span
                                  className="textRed"
                                  style={{ color: "red" }}
                                >
                                  * IFSC Number is required{" "}
                                </span>
                              )}
                              {errors.ifsc &&
                                errors.ifsc.type === "maxLength" && (
                                  <span className="text-danger">
                                    IFSC Number should not exceed more than 11
                                    digits
                                  </span>
                                )}
                              {errors.ifsc &&
                                errors.ifsc.type === "minLength" && (
                                  <span className="text-danger">
                                    IFSC Number should be minimum of 11 digits
                                  </span>
                                )}
                            </Form.Group>
                          </Form.Group>
                        </div>
                        <div className="col-sm-6 mt-4">
                          <div>
                            <ImageWithLoader
                              src={accountImage && accountImage.image}
                              loading={isAccountLoading}
                            />
                          </div>

                          <div className="mt-2 choosefile_b">
                            <input type="file" onChange={onAccountChange} />
                          </div>
                        </div>
                        ``
                      </div>
                      <button
                        type="submit"
                        className="btn btn-warning tenant_bt"
                      >
                        Save Changes
                      </button>
                    </Form>
                  </Card.Body>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OwnerProfile;
