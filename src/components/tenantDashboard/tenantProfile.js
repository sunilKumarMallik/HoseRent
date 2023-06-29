import { House } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import Sidebar from "./sidebar";
import TenantNav from "./tenantNav";

function TenantProfile() {
  const [state, setState] = useState("");
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState("");
  const [panImage, setPanImage] = useState("");
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [profileIsLoading, setProfileIsLoading] = useState(false);
  const [isAdharLoading, setIsAdharLoading] = useState(false);
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
      setUserData(response.data);
      reset({
        tenantid: response.data.tenantNewId,
        name: response.data.name,
        email: response.data.email,
        mobile: response.data.mobile,
        Aadhar: response.data.Aadhar,
        pan: response.data.pan,
        empAddress: response.data.empAddress,
        monthlyIncome: response.data.monthlyIncome,
        incomeSource: response.data.incomeSource,
      });
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
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
        setPicture({
          image: res.data.urls[0].url,
        });
        setIsAdharLoading(false);
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
        height={height}
        width={width}
        src={"https://i.stack.imgur.com/ATB3o.gif"}
      />
    ) : (
      <img height={height} width={width} src={src} onLoad={onLoad} />
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
        empAddress: data.empAddress,
        monthlyIncome: data.monthlyIncome,
        incomeSource: data.incomeSource,
      })
      .then((res) => {
        alert("Data updated successfuly");
        getProfileData();
        // this.props.history.push("/owner");
        // this.context.history.push('/owner')
      })
      .catch((error) => {
        console.log("error", error);
        alert("Something went wrong.Please contact helpdesk");
      });
  };
  let hours = new Date().getHours();
  let greeting = "";

  if (hours >= 12 && hours <= 18) {
    greeting = "Good Afternoon";
  } else if (hours >= 21 && hours <= 24) {
    greeting = "Good Night";
  } else if (hours >= 18 && hours <= 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Morning";
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
                  <TenantNav />
                </Card.Header>
                <div className="d-grid justify-content-between align-items-center mb-5">
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
                      className="bg-white"
                      style={{ width: "185px", height: "200px" }}
                    >
                      <ImageWithLoader
                        height={200}
                        width={180}
                        src={image && image.image}
                        loading={profileIsLoading}
                      />

                      <input
                        className="col-sm-12 mt-2 mr-1"
                        style={{ color: "honeydew" }}
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
                              "{greeting} {userData && userData.name}"
                            </h5>
                          </Form.Label>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label className="text-light">
                            Tenant Id
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="tenantid"
                            className="ownerProfileResponsive"
                            disabled={isDisabled}
                            defaultValue={userData && userData.tenantNewId}
                            placeholder="Enter your Tenant Id."
                            {...register("tenantid")}
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
                            disabled={isDisabled}
                            defaultValue={userData && userData.email}
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
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="text-light">
                              Monthly Income
                            </Form.Label>
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="number"
                                name="monthlyIncome"
                                className="text-center ownerProfileResponsive"
                                // className={
                                //   'form-control ${errors.monthlyIncome ? "errorBorder" : ""} ownerProfileResponsive'
                                // }
                                placeholder="monthly Income"
                                defaultValue={
                                  userData && userData.monthlyIncome
                                }
                                {...register("monthlyIncome")}
                              />
                            </Form.Group>
                          </Form.Group>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="text-light">
                              Income Source
                            </Form.Label>

                            <select
                              aria-label="Default select example"
                              className="text-center ownerProfileResponsive"
                              {...register("incomeSource")}
                            >
                              <option value="">please Select</option>
                              <option value="selfEmployed">
                                Self Employed{" "}
                              </option>
                              <option value="service">Service </option>
                            </select>
                          </Form.Group>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="text-light text-nowrap">
                              Employer’s Name and Address
                            </Form.Label>
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                as="textarea"
                                rows={2}
                                name="emp Address"
                                className="ownerProfileResponsive"
                                // className={
                                //   'form-control ${errors.empAddress ? "errorBorder" : ""} ownerProfileResponsive'
                                // }
                                placeholder="empAddress"
                                defaultValue={userData && userData.empAddress}
                                {...register("empAddress")}
                              />
                            </Form.Group>
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
                            <input type="file" onChange={onPictureChange} />
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
                                  className="textRed"
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

export default TenantProfile;
