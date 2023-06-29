import React, { Component } from "react";
import { useParams, withRouter } from "react-router-dom";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import AddProperty from "../add-property";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { GetBaseUrl } from "../../apiServices.js/configUrl";
import Loader from "../commoncomponents/loader";

const amenities = [
  { name: "Parking", selected: false },
  { name: "Lift", selected: false },
  { name: "Power Backup", selected: false },
  { name: "Park", selected: false },
  { name: "Pet Friendly", selected: false },
  { name: "Gymnasium", selected: false },
  { name: "Gas Pipeline", selected: false },
  { name: "AC Room", selected: false },
  { name: "Security Personnel", selected: false },
  { name: "Balcony", selected: false },
  { name: "Food Service", selected: false },
  { name: "Wifi", selected: false },
  { name: "Laundry Available", selected: false },
  { name: "Wheelchair Friendly", selected: false },
  { name: "Swimming Pool", selected: false },
];
const furnishingAmenities = [
  { name: "Wardboard", selected: false },
  { name: "Fan", selected: false },
  { name: "Light", selected: false },
  { name: "AC", selected: false },
  { name: "Bed", selected: false },
  { name: "Chimney", selected: false },
  { name: "Curtains", selected: false },
  { name: "Dinning Table", selected: false },
  { name: "Exhaust Fan", selected: false },
  { name: "Geyser", selected: false },
  { name: "Modular Kitchen", selected: false },
  { name: "Microwave", selected: false },
  { name: "Fridge", selected: false },
  { name: "Sofa", selected: false },
  { name: "Washing Machine", selected: false },
  { name: "Water Purifier", selected: false },
  { name: "Study Table", selected: false },
];
class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // subject: "",
      paramId: "",
      houseName: "",
      isLoading: false,
      ownerName: "",
      description: "",
      image: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
      pdfUrl: "",
      rentalUrl: "",
      rentalUrlName: "",
      waterUrl: "",
      waterUrlName: "",
      saleDeedUrl: "",
      saleDeedUrlName: "",
      electricUrl: "",
      electricUrlName: "",
      propertyUrl: "",
      propertyUrlName: "",
      mutationUrl: "",
      mutationUrlName: "",
      noOfBedRooms: "",
      noOfBathRoom: "",
      interiorSize: "",
      interiorLength: "",
      noOfParking: "",
      propertyType: "",
      furnishingStatus: "",
      amenities: [
        { name: "Parking", selected: false },
        { name: "Lift", selected: false },
        { name: "Power Backup", selected: false },
        { name: "Park", selected: false },
        { name: "Pet Friendly", selected: false },
        { name: "Gymnasium", selected: false },
        { name: "Gas Pipeline", selected: false },
        { name: "AC Room", selected: false },
        { name: "Security Personnel", selected: false },
        { name: "Balcony", selected: false },
        { name: "Food Service", selected: false },
        { name: "Wifi", selected: false },
        { name: "Laundry Available", selected: false },
        { name: "Wheelchair Friendly", selected: false },
        { name: "Swimming Pool", selected: false },
      ],
      furnishingAmenities: [
        { name: "Wardboard", selected: false },
        { name: "Fan", selected: false },
        { name: "Light", selected: false },
        { name: "AC", selected: false },
        { name: "Bed", selected: false },
        { name: "Chimney", selected: false },
        { name: "Curtains", selected: false },
        { name: "Dinning Table", selected: false },
        { name: "Exhaust Fan", selected: false },
        { name: "Geyser", selected: false },
        { name: "Modular Kitchen", selected: false },
        { name: "Microwave", selected: false },
        { name: "Fridge", selected: false },
        { name: "Sofa", selected: false },
        { name: "Washing Machine", selected: false },
        { name: "Water Purifier", selected: false },
        { name: "Study Table", selected: false },
      ],
      availableFor: "",
      availableFrom: "",
      zone: "",
      area: "",
      imageData: "",
      pinCode: "",
      district: "",
      postOffice: "",
      localities: "",
      landMark: "",
      PoliceStation: "",
      state: "",
      lane: "",
      houseNo: "",
      monthlyRent: "",
      securityDeposit: "",
      leaseDuration: "",
      leaseDurationTime: "",
      updatedData: "",
      formError: { state: "" },
      rental: "",
      rentalData: "",
      saleDeed: "",
      saleDeedUrl: "",
      water: "",
      waterUrl: "",
      electric: "",
      electricUrl: "",
      mutation: "",
      mutationUrl: "",
      propertyData: "",
      propertyUrl: "",
      document: [],
      selectedAmeneties: [],
      selectedFurnshingAmeneties: [],
      requiredPropertyData: {},
      updatedFields: {},
      //  setUpdatedData:{}
    };
    console.log("parameter", this.props.props.location);
  }

  componentDidMount() {
    this.loadData();
  }
  // handelInputData = (event) =>{
  //   this.setState({
  //     subject: event.target.value, 
  //   })
  // }
  loadData = () => {
    let allParts = this.props.props.location
      ? this.props.props.location.pathname.split("/")
      : [];
    let id = allParts[allParts.length - 1];
    console.log("id", id);
    this.setState({ paramId: id });

    console.log("get api url", GetBaseUrl());

    // getPropertyById API
    if (id != "add-property") {
      let token = JSON.parse(localStorage.getItem("homerentuser")).token;
      let headers = {
        authorization: `Bearer ${token}`,
      };
      axios
        .get(`${GetBaseUrl()}/getPropertyById/${id}`, { headers: headers })
        .then((res) => {
          console.log("res data", res.data);

          let listedAmenities = this.state.amenities.map((x, i) =>
            x.name == res.data.amenities[i] ? { ...x, selected: true } : x
          );
          console.log("listedAmenities", listedAmenities);
          this.setState({
            requiredPropertyData: res.data,
            amenities: listedAmenities,
          });
          let listFurnishingAmenities = this.state.furnishingAmenities.map(
            (x, i) =>
              x.name == res.data.furnishingAmenities[i]
                ? { ...x, selected: true }
                : x
          );
          console.log("listedFurnishingAmenities", listFurnishingAmenities);
          this.setState({
            requiredPropertyData: res.data,
            furnishingAmenities: listFurnishingAmenities,
          });
          let img = res.data.image;
          this.setState({
            image: img[0],
            image1: img[1],
            image2: img[2],
            image3: img[3],
            image4: img[4],
            image5: img[5],
          });
          let pdfview = res.data.pdfUrl;

          console.log("pdfview", pdfview);
          this.setState({
            rentalUrl: pdfview[0].url,
            rentalUrlName: pdfview[0].name,
            saleDeedUrl: pdfview[1].url,
            saleDeedUrlName: pdfview[1].name,
            waterUrl: pdfview[2].url,
            waterUrlName: pdfview[2].name,
            electricUrl: pdfview[3].url,
            electricUrlName: pdfview[3].name,
            mutationUrl: pdfview[4].url,
            mutationUrlName: pdfview[4].name,
            propertyUrl: pdfview[5].url,
            propertyUrlName: pdfview[5].name,
          });
          console.log("reqdata", this.state.requiredPropertyData);
        })
        .catch((error) => {
          console.log("error", error);
          alert("Something went wrong.Please contact helpdesk");
        });
    } else {
      console.log("hello");
    }
  };

  renderInnerElement = () => {
    // return( <div>hi</div>)

    amenities.map((item, index) => {
      return (
        <li>
          <Checkbox
            value={item.name}
            className="fa fa-check"
            onClick={this.onCheckBoxSelected}
          />{" "}
          {item.name}
        </li>
      );
    });
  };

  //Render furnishing amineties
  renderFurnishingElement = () => {
    furnishingAmenities.map((item, index) => {
      return (
        <li>
          <Checkbox
            value={item.name}
            className="fa fa-check"
            onClick={this.onFurnishCheckBoxSelected}
          />{" "}
          {item.name}
        </li>
      );
    });
  };
  onCheckBoxSelected = (event) => {
    const { value, checked } = event.target;
    console.log(value, checked);
    let listedAmenities = this.state.amenities.map((x, i) =>
      x.name == value ? { ...x, selected: checked } : x
    );
    let seleteAmanetiesData = listedAmenities
      .filter((x) => x.selected == true)
      .map((y) => y.name);
    console.log("seleteAmanetiesData", seleteAmanetiesData);
    this.setState({
      amenities: listedAmenities,
      selectedAmeneties: seleteAmanetiesData,
    });
  };
  onFurnishCheckBoxSelected = (event) => {
    const { value, checked } = event.target;
    console.log(value, checked);
    let listFurnishingAmenities = this.state.furnishingAmenities.map((x, i) =>
      x.name == value ? { ...x, selected: checked } : x
    );
    let seleteFurnishingAmanetiesData = listFurnishingAmenities
      .filter((x) => x.selected == true)
      .map((y) => y.name);
    console.log("seleteFurnishingAmanetiesData", seleteFurnishingAmanetiesData);
    this.setState({
      furnishingAmenities: listFurnishingAmenities,
      selectedFurnshingAmeneties: seleteFurnishingAmanetiesData,
    });
  };
  render() {
    console.log(this.state);
    let publicUrl = process.env.REACT_APP_PUBLIC_URL;
    let imagealt = "image";
    // let rentalImage = "rental";
    let data = sectiondata.aboutus;
    let userObj = JSON.parse(localStorage.getItem("homerentuser"));
    let userDataObj = userObj ? userObj.user : undefined;
    const validateForm = () => {
      let requestBody = {
        amenities: this.state.selectedAmeneties,
        furnishingAmenities: this.state.selectedFurnshingAmeneties,
        houseName: this.state.houseName,
        ownerName: this.state.ownerName,
        // description:this.state.description,
        noOfBedRooms: this.state.noOfBedRooms,
        noOfBathRoom: this.state.noOfBathRoom,
        interiorSize: this.state.interiorSize,
        interiorLength: this.state.interiorLength,
        noOfParking: this.state.noOfParking,
        propertyType: this.state.propertyType,
        furnishingStatus: this.state.furnishingStatus,
        availableFor: this.state.availableFor,
        availableFrom: this.state.availableFrom,
        zone: this.state.zone,
        area: this.state.area,
        pinCode: this.state.pinCode,
        district: this.state.district,
        postOffice: this.state.postOffice,
        localities: this.state.localities,
        landMark: this.state.landMark,
        PoliceStation: this.state.PoliceStation,
        state: this.state.state,
        lane: this.state.lane,
        houseNo: this.state.houseNo,
        rentalUrlName: this.state.rentalUrlName,
        // saleDeedUrlName:this.state.saleDeedUrlName,
        monthlyRent: this.state.monthlyRent,
        securityDeposit: this.state.securityDeposit,
        leaseDuration: this.state.leaseDuration,
        leaseDurationTime: this.state.leaseDurationTime,
        createdBy: userDataObj._id,
      };
      if (!requestBody.state) {
        alert("You are not select any field");
        this.setState({
          formError: { state: "state is required" },
        });
        return false;
      }

      if (!requestBody.houseName) {
        const house_name = document.querySelector("#houseName");
        alert("House Name is required");
        house_name.focus();

        // return;
        return false;
      }

      if (!requestBody.noOfBedRooms) {
        const bedRooms = document.querySelector("#noOfBedRooms");
        alert("Bed Room is required");
        bedRooms.focus();
        return false;
      }

      if (!requestBody.ownerName) {
        const owner_name = document.querySelector("#ownerName");
        alert("Owner Name is required");
        owner_name.focus();
        return false;
      }

      // if (!requestBody.description) {
      //   const description = document.querySelector("#description");
      //   alert("Please Says somthing about your Property Like Near OverBridge");
      //   description.focus();
      //   return false;
      // }
      if (!requestBody.rentalUrlName) {
        const rentalUrlName = document.querySelector("#agmfile");
        alert("please add rental Agreement form");
        rentalUrlName.focus();
        return false;
      }
      // if (!requestBody.saleDeedUrlName) {
      //   const saleDeedUrlName = document.querySelector("otheragmfile1");
      //   alert("please add document");
      //   saleDeedUrlName.focus();
      //   return false;
      // }

      if (!requestBody.noOfBathRoom) {
        const bathRoom = document.querySelector("#noOfBathRoom");
        alert("noOfBathRoom is required");
        bathRoom.focus();
        return false;
      }
      if (!requestBody.interiorSize) {
        const interior_size = document.querySelector("#interiorSize");
        alert("interiorSize required");
        interior_size.focus();
        return false;
      }
      if (!requestBody.interiorLength) {
        const interior_length = document.querySelector("#interiorLength");
        alert("interiorLength required");
        interior_length.focus();
        return false;
      }
      if (!requestBody.noOfParking) {
        const parking = document.querySelector("#noOfParking");
        alert("Number OfParking is required");
        parking.focus();
        return false;
      }
      if (!requestBody.propertyType) {
        const property_type = document.querySelector("#propertyType");
        alert("propertyType is required");
        property_type.focus();
        return false;
      }
      if (!requestBody.furnishingStatus) {
        const furnishing_status = document.querySelector("#furnishingStatus");
        alert("furnishingStatus is required");
        furnishing_status.focus();
        return false;
      }
      if (!requestBody.availableFor) {
        const available_for = document.querySelector("#availableFor");
        alert("availableFor is required");
        available_for.focus();
        return false;
      }
      if (!requestBody.availableFrom) {
        const available_from = document.querySelector("#availableFrom");
        alert("availableFrom is required");
        available_from.focus();
        return false;
      }
      if (!requestBody.zone) {
        const zone = document.querySelector("#zone");
        alert("zone is required");
        zone.focus();
        return false;
      }
      if (!requestBody.area) {
        const area = document.querySelector("#area");
        alert("area is required");
        area.focus();
        return false;
      }
      if (!requestBody.pinCode) {
        const pinCode = document.querySelector("#pinCode");
        alert("pinCode is required");
        pinCode.focus();
        return false;
      }
      if (!requestBody.district) {
        const district = document.querySelector("#district");
        alert("district is required");
        district.focus();
        return false;
      }
      if (!requestBody.postOffice) {
        const postOffice = document.querySelector("#postOffice");
        alert("postOffice is required");
        postOffice.focus();
        return false;
      }
      if (!requestBody.localities) {
        const localities = document.querySelector("#localities");
        alert("localities is required");
        localities.focus();
        return false;
      }
      if (!requestBody.landMark) {
        const landMark = document.querySelector("#landMark");
        alert("landMark is required");
        landMark.focus();
        return false;
      }
      if (!requestBody.PoliceStation) {
        const PoliceStation = document.querySelector("#PoliceStation");
        alert("PoliceStation is required");
        PoliceStation.focus();
        return false;
      }
      if (!requestBody.state) {
        const state = document.querySelector("#state");
        alert("state is required");
        state.focus();
        return false;
      }
      if (!requestBody.lane) {
        const lane = document.querySelector("#lane");
        alert("lane is required");
        lane.focus();
        return false;
      }
      if (!requestBody.houseNo) {
        const houseNo = document.querySelector("#houseNo");
        alert("houseNo is required");
        houseNo.focus();
        return false;
      }
      if (!requestBody.monthlyRent) {
        const monthlyRent = document.querySelector("#monthlyRent");
        alert("monthlyRent is required");
        monthlyRent.focus();
        return false;
      }
      if (!requestBody.securityDeposit) {
        const securityDeposit = document.querySelector("#securityDeposit");
        alert("securityDeposit is required");
        securityDeposit.focus();
        return false;
      }
      if (!requestBody.leaseDuration) {
        const leaseDuration = document.querySelector("#leaseDuration");
        alert("leaseduratioon required");
        leaseDuration.focus();
        return false;
      }
      if (!requestBody.leaseDurationTime) {
        const leaseDurationTime = document.querySelector("#leaseDurationTime");
        alert("leaseDurationTime  required");
        leaseDurationTime.focus();
        return false;
      } else {
        return true;
      }
    };

    const onPropertyAdd = () => {
      this.setState({ isLoading: true });
      console.log(
        "this.state.amenities.map(x=>x.name)",
        this.state.amenities.map((x) => x.name)
      );
      let requestBody = {
        amenities: this.state.selectedAmeneties,
        furnishingAmenities: this.state.selectedFurnshingAmeneties,
        houseName: this.state.houseName,
        ownerName: this.state.ownerName,
        description: this.state.description,
        noOfBedRooms: this.state.noOfBedRooms,
        noOfBathRoom: this.state.noOfBathRoom,
        interiorSize: this.state.interiorSize,
        interiorLength: this.state.interiorLength,
        noOfParking: this.state.noOfParking,
        propertyType: this.state.propertyType,
        furnishingStatus: this.state.furnishingStatus,
        availableFor: this.state.availableFor,
        availableFrom: this.state.availableFrom,
        zone: this.state.zone,
        area: this.state.area,
        pinCode: this.state.pinCode,
        district: this.state.district,
        postOffice: this.state.postOffice,
        localities: this.state.localities,
        landMark: this.state.landMark,
        PoliceStation: this.state.PoliceStation,
        state: this.state.state,
        lane: this.state.lane,
        houseNo: this.state.houseNo,
        image: [
          this.state.image,
          this.state.image1,
          this.state.image2,
          this.state.image3,
          this.state.image4,
          this.state.image5,
        ],
        pdfUrl: [
          { id: 0, url: this.state.rentalUrl, name: this.state.rentalUrlName },
          {
            id: 1,
            url: this.state.saleDeedUrl,
            name: this.state.saleDeedUrlName,
          },
          { id: 2, url: this.state.waterUrl, name: this.state.waterUrlName },
          {
            id: 3,
            url: this.state.electricUrl,
            name: this.state.electricUrlName,
          },
          {
            id: 4,
            url: this.state.mutationUrl,
            name: this.state.mutationUrlName,
          },
          {
            id: 5,
            url: this.state.propertyUrl,
            name: this.state.propertyUrlName,
          },
        ],
        monthlyRent: this.state.monthlyRent,
        securityDeposit: this.state.securityDeposit,
        leaseDuration: this.state.leaseDuration,
        leaseDurationTime: this.state.leaseDurationTime,
        createdBy: userDataObj._id,
      };
      if (validateForm()) {
        // addProperty POST API
        let token = JSON.parse(localStorage.getItem("homerentuser")).token;
        let headers = {
          authorization: `Bearer ${token}`,
        };
        if (this.state.imageData && this.state.rentalData) {
          axios
            .post(
              `${GetBaseUrl()}/addProperty`,
              {
                ...requestBody,
              },
              {
                headers: headers,
              }
            )
            .then((res) => {
              //  console.log("Res",res.data,"res status",res.data.status)
              this.setState({ isLoading: false });
              alert("Property added successfuly");
              this.props.history.push("/owner");
              // this.context.history.push('/owner')
            })
            .catch((error) => {
              this.setState({ isLoading: false });
              console.log("error", error);
              // alert("Something went wrong.Please contact helpdesk");
            });
        } else {
          axios
            .post(`${GetBaseUrl()}/addProperty`, requestBody, {
              headers: headers,
            })
            .then((res) => {
              console.log("Rental123", res.data);
              this.setState({ isLoading: false });
              alert("Property added successfuly");
              this.props.history.push("/owner");
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      } else {
        this.setState({ isLoading: false });
      }
    };

    // updateProperty API
    const onPropertyEdit = () => {
      this.setState({ isLoading: true });
      let token = JSON.parse(localStorage.getItem("homerentuser")).token;
      let headers = {
        authorization: `Bearer ${token}`,
      };
      console.log("updated Data", this.state.updatedFields);

      if (this.state.imageData) {
        const formData = new FormData();
        formData.append("file", this.state.imageData);
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("res.data", res.data.urls[0].url);
          const formData_1 = new FormData();
          formData_1.append("file", this.state.rentalData);
          axios.post(`${GetBaseUrl()}/filestos3`, formData_1).then((res_1) => {
            axios
              .put(
                `${GetBaseUrl()}/updateProperty`,
                {
                  ...this.state.updatedFields,
                  _id: this.state.paramId,
                  amenities: this.state.selectedAmeneties,
                  furnishingAmenities: this.state.selectedFurnshingAmeneties,
                  image: [
                    this.state.image,
                    this.state.image1,
                    this.state.image2,
                    this.state.image3,
                    this.state.image4,
                    this.state.image5,
                  ],
                  pdfUrl: [
                    {
                      id: 0,
                      url: this.state.rentalUrl,
                      name: this.state.rentalUrlName,
                    },
                    {
                      id: 1,
                      url: this.state.saleDeedUrl,
                      name: this.state.saleDeedUrlName,
                    },
                    {
                      id: 2,
                      url: this.state.waterUrl,
                      name: this.state.waterUrlName,
                    },
                    {
                      id: 3,
                      url: this.state.electricUrl,
                      name: this.state.electricUrlName,
                    },
                    {
                      id: 4,
                      url: this.state.mutationUrl,
                      name: this.state.mutationUrlName,
                    },
                    {
                      id: 5,
                      url: this.state.propertyUrl,
                      name: this.state.propertyUrlName,
                    },
                  ],
                },
                {
                  headers: headers,
                }
              )
              .then((res) => {
                this.setState({ isLoading: false });
                console.log("id update", this.state.paramId);

                alert("data updated successfully");
                this.loadData();
              })
              .catch((error) => {
                this.setState({ isLoading: false });
                console.log("error", error);
                alert("Something went wrong.Please contact helpdesk");
              });
          });
        });
      } else {
        this.setState({ isLoading: true });
        axios
          .put(
            `${GetBaseUrl()}/updateProperty`,
            {
              ...this.state.updatedFields,
              _id: this.state.paramId,
              amenities: this.state.selectedAmeneties,
              furnishingAmenities: this.state.selectedFurnshingAmeneties,
              image: [
                this.state.image,
                this.state.image1,
                this.state.image2,
                this.state.image3,
                this.state.image4,
                this.state.image5,
              ],
              pdfUrl: [
                {
                  id: 0,
                  url: this.state.rentalUrl,
                  name: this.state.rentalUrlName,
                },
                {
                  id: 1,
                  url: this.state.saleDeedUrl,
                  name: this.state.saleDeedUrlName,
                },
                {
                  id: 2,
                  url: this.state.waterUrl,
                  name: this.state.waterUrlName,
                },
                {
                  id: 3,
                  url: this.state.electricUrl,
                  name: this.state.electricUrlName,
                },
                {
                  id: 4,
                  url: this.state.mutationUrl,
                  name: this.state.mutationUrlName,
                },
                {
                  id: 5,
                  url: this.state.propertyUrl,
                  name: this.state.propertyUrlName,
                },
              ],
            },
            {
              headers: headers,
            }
          )
          .then((res) => {
            console.log("update field", res.data);
            this.setState({ isLoading: false });
            console.log("id update", this.state.paramId);

            alert("data updated successfully");
            this.loadData();
            this.props.history.push("/owner");
            // alert("Property updated successfully")
            // this.setState({setUpdatedData:res.data })
          })
          .catch((error) => {
            this.setState({ isLoading: false });
            console.log("error", error);
            alert("Something went wrong.Please contact helpdesk");
          });
      }
    };

    const onImageChange = (event) => {
      let img = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", img);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);
          // this.setState({
          //   imageData: res.data.urls[0].url
          // });
          this.setState({
            // image: URL.createObjectURL(img)
            image: res.data.urls[0].url,
          });
        });
      }
    };
    console.log("data", this.state.imageData);
    const onImageChange1 = (event) => {
      let img = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", img);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);
          // this.setState({
          //   imageData1: res.data.urls[0].url
          // });
          this.setState({
            // image: URL.createObjectURL(img)
            image1: res.data.urls[0].url,
          });
        });
      }
    };
    console.log("data", this.state.image1);
    const onImageChange2 = (event) => {
      let img = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", img);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);
          // this.setState({
          //   imageData2: res.data.urls[0].url
          // });
          this.setState({
            // image: URL.createObjectURL(img)
            image2: res.data.urls[0].url,
          });
        });
      }
    };
    const onImageChange3 = (event) => {
      let img = event.target.files[0];
      console.log("file path", event.target.files[0]);
      const formData = new FormData();
      formData.append("file", img);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);
          // this.setState({
          //   imageData3: res.data.urls[0].url
          // });
          this.setState({
            // image: URL.createObjectURL(img)
            image3: res.data.urls[0].url,
          });
        });
      }
    };
    const onImageChange4 = (event) => {
      let img = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", img);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);
          // this.setState({
          //   imageData4: res.data.urls[0].url
          // });
          this.setState({
            // image: URL.createObjectURL(img)
            image4: res.data.urls[0].url,
          });
        });
      }
    };
    const onImageChange5 = (event) => {
      let img = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", img);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);
          // this.setState({
          //   imageData5: res.data.urls[0].url
          // });
          this.setState({
            // image: URL.createObjectURL(img)
            image5: res.data.urls[0].url,
          });
        });
      }
    };
    const onRentalChange = (event) => {
      let pdf = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", pdf);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);

          this.setState({
            rentalUrl: res.data.urls[0].url,
            rentalUrlName: pdf.name,
          });
        });
      }
    };
    const onsaleDeedChange = (event, name) => {
      let pdf = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", pdf);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);

          this.setState({
            saleDeedUrl: res.data.urls[0].url,
            saleDeedUrlName: pdf.name,
          });
        });
      }
    };
    const onWaterChange = (event) => {
      let pdf = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", pdf);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);

          this.setState({
            waterUrl: res.data.urls[0].url,
            waterUrlName: pdf.name,
          });
        });
      }
    };
    const onElectricChange = (event) => {
      let pdf = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", pdf);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);

          this.setState({
            electricUrl: res.data.urls[0].url,
            electricUrlName: pdf.name,
          });
        });
      }
    };
    const onMutationChange = (event) => {
      let pdf = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", pdf);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);

          this.setState({
            mutationUrl: res.data.urls[0].url,
            mutationUrlName: pdf.name,
          });
        });
      }
    };
    const onPropertyChange = (event) => {
      let pdf = event.target.files[0];
      console.log("file path", event.target.files[0].name);
      const formData = new FormData();
      formData.append("file", pdf);
      if (event.target.files && event.target.files[0]) {
        axios.post(`${GetBaseUrl()}/filestos3`, formData).then((res) => {
          console.log("response", res.data);

          this.setState({
            propertyUrl: res.data.urls[0].url,
            propertyUrlName: pdf.name,
          });
        });
      }
    };

    const onTextChanged = (event, fieldName) => {
      this.setState({ [fieldName]: event.target.value });
      let updatedFields = {
        ...this.state.updatedFields,
        [fieldName]: event.target.value,
      };
      this.setState({ updatedFields: updatedFields });
      console.log(this.state);
    };
    const onSelectChange = (event, fieldName) => {
      this.setState({ [fieldName]: event.target.value });
      let updatedFields = {
        ...this.state.updatedFields,
        [fieldName]: event.target.value,
      };
      this.setState({ updatedFields: updatedFields });
    };

  
    if (this.state.isLoading) {
      return <Loader />;
    } else {
      return (
        <div className="add-new-property-area pd-top-90 mg-bottom-100">
          <div className="container">
            <div className="row justify-content-center">
              <div>
                <div className="border-bottom mb-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="single-intro style-two text-center">
                        <div className="thumb">1</div>
                        <div className="details">
                          {/* <input type={'text'} placeholder="enter something" onChange={this.handelInputData}></input> */}
                          <h4 className="title" id="add-property-title">
                           Choose Listing 
                           {this.state.subject}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="single-intro style-two text-center">
                        <div className="thumb">2</div>
                        <div className="details">
                          <h4 className="title" id="add-property-title">
                            Add Information
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="single-intro style-two text-center">
                        <div className="thumb">3</div>
                        <div className="details">
                          <h4 className="title" id="add-property-title">
                            Publish
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-title text-center">
                  <h3>UPLOAD UPTO 6 PHOTOS</h3>
                </div>
                <div className="uploadphotos">
                  <div
                    className="row d-flex justify-content-center"
                    id="photoscontainer"
                  >
                    <div className="thumb col-4 col-sm-4 col-md-4 col-lg-4">
                      <label for="uploadimg" className="imgslabel">
                        <img
                          src={
                            this.state.image
                              ? this.state.image
                              : publicUrl + "/assets/img/bg/home.png"
                          }
                          alt={imagealt}
                          id="imagealtthumb"
                        />
                        <input
                          onChange={onImageChange}
                          multiple
                          type="file"
                          id="uploadimg"
                        />
                        &nbsp;
                      </label>
                    </div>
                    <div className="thumb col-4 col-sm-4 col-md-4 col-lg-4">
                      <label for="uploadimg1" className="imgslabel">
                        <img
                          src={
                            this.state.image1
                              ? this.state.image1
                              : publicUrl + "/assets/img/bg/home.png"
                          }
                          alt={imagealt}
                          id="imagealtthumb"
                        />
                        <input
                          onChange={onImageChange1}
                          multiple
                          type="file"
                          id="uploadimg1"
                        />
                        &nbsp;
                      </label>
                    </div>

                    <div className="thumb col-4 col-sm-4 col-md-4 col-lg-4">
                      <label for="uploadimg2" className="imgslabel">
                        <img
                          src={
                            this.state.image2
                              ? this.state.image2
                              : publicUrl + "/assets/img/bg/home.png"
                          }
                          alt={imagealt}
                          id="imagealtthumb"
                        />
                        <input
                          onChange={onImageChange2}
                          multiple
                          type="file"
                          id="uploadimg2"
                        />
                        &nbsp;
                      </label>
                    </div>
                  </div>

                  <div
                    className="row d-flex justify-content-center"
                    id="photoscontainer2"
                  >
                    <div className="thumb col-4 col-sm-4 col-md-4 col-lg-4">
                      <label for="uploadimg3" className="imgslabel">
                        <img
                          src={
                            this.state.image3
                              ? this.state.image3
                              : publicUrl + "/assets/img/bg/home.png"
                          }
                          alt={imagealt}
                          id="imagealtthumb"
                        />
                        <input
                          onChange={onImageChange3}
                          multiple
                          type="file"
                          id="uploadimg3"
                        />
                        &nbsp;
                      </label>
                    </div>

                    <div className="thumb col-4 col-sm-4 col-md-4 col-lg-4">
                      <label for="uploadimg4" className="imgslabel">
                        <img
                          src={
                            this.state.image4
                              ? this.state.image4
                              : publicUrl + "/assets/img/bg/home.png"
                          }
                          alt={imagealt}
                          id="imagealtthumb"
                        />
                        <input
                          onChange={onImageChange4}
                          multiple
                          type="file"
                          id="uploadimg4"
                        />
                        &nbsp;
                      </label>
                    </div>

                    <div className="thumb col-4 col-sm-4 col-md-4 col-lg-4">
                      <label for="uploadimg5" className="imgslabel">
                        <img
                          src={
                            this.state.image5
                              ? this.state.image5
                              : publicUrl + "/assets/img/bg/home.png"
                          }
                          alt={imagealt}
                          id="imagealtthumb"
                        />
                        <input
                          onChange={onImageChange5}
                          multiple
                          type="file"
                          id="uploadimg5"
                        />
                        &nbsp;
                      </label>
                    </div>
                  </div>
                </div>
                {/* jkgfiusgfivsrughfiugfiurwg */}
                <div className="row pd-top-120">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/28.png"}
                          alt="img"
                        />
                        House Name
                      </h4>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="section-title">
                      <div className="houseinputbox">
                        <input
                          id="houseName"
                          type={"text"}
                          className="housename"
                          placeholder="Enter your house name"
                          required="required"
                          defaultValue={
                            this.state.requiredPropertyData.houseName
                          }
                          onChange={(event) =>
                            onTextChanged(event, "houseName")
                          }
                        ></input>
                        <span></span>
                        <i></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="rld-single-select">
                          <h6>Bedrooms</h6>
                          <select
                            id="noOfBedRooms"
                            className="select single-select"
                            onChange={(event) =>
                              onSelectChange(event, "noOfBedRooms")
                            }
                            value={
                              this.state.noOfBedRooms
                                ? this.state.noOfBedRooms
                                : this.state.requiredPropertyData.noOfBedRooms
                            }
                          >
                            <option value={""}></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">5+</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <div className="rld-single-select">
                          <h6>Bathrooms</h6>
                          <select
                            id="noOfBathRoom"
                            className="select single-select"
                            onChange={(event) =>
                              onSelectChange(event, "noOfBathRoom")
                            }
                            value={
                              this.state.noOfBathRoom
                                ? this.state.noOfBathRoom
                                : this.state.requiredPropertyData.noOfBathRoom
                            }
                          >
                            <option value={""}></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="rld-single-select">
                          <h6>Parking</h6>
                          <select
                            id="noOfParking"
                            className="select single-select"
                            onChange={(event) =>
                              onSelectChange(event, "noOfParking")
                            }
                            value={
                              this.state.noOfParking
                                ? this.state.noOfParking
                                : this.state.requiredPropertyData.noOfParking
                            }
                          >
                            <option value={""}></option>
                            <option value="1"> 1</option>
                            <option value="2"> 2</option>
                            <option value="3"> 3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">5+</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-6 col-sm-3">
                        <h6>Interior Size</h6>
                        <div className="col-md-8">
                          <div className="section-title">
                            <input
                              id="interiorSize"
                              type={"number"}
                              className="interiorSize"
                              style={{
                                width: "97px",
                                textAlign: "center",
                                top: "18px",
                                left: "-13px",
                                position: "relative",
                              }}
                              defaultValue={
                                this.state.requiredPropertyData.interiorSize
                              }
                              onChange={(event) =>
                                onTextChanged(event, "interiorSize")
                              }
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 col-sm-3 mt-2">
                        <select
                          id="interiorLength"
                          style={{
                            border: "none",
                            top: "24px",
                            width: "114px",
                            position: "relative",
                            right: "18px",
                          }}
                          onChange={(event) =>
                            onSelectChange(event, "interiorLength")
                          }
                          value={
                            this.state.interiorLength
                              ? this.state.interiorLength
                              : this.state.requiredPropertyData.interiorLength
                          }
                        >
                          <option value={""}>Size</option>
                          <option value={"Sq Feet"}>Sq Feet </option>
                          <option value={"Sq Meter"}>Sq Meter</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pd-top-70">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/5.png"}
                          alt="img"
                        />
                        Owner Name
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="houseinputbox">
                      <input
                        id="ownerName"
                        type={"text"}
                        className="ownerName"
                        placeholder="Name Here"
                        required="required"
                        defaultValue={this.state.requiredPropertyData.ownerName}
                        onChange={(event) => onTextChanged(event, "ownerName")}
                      ></input>
                      <i></i>
                    </div>
                  </div>
                </div>

                <div className="row pd-top-100">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/24.png"}
                          alt="img"
                        />
                        Property Type
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="section-title">
                      <h4 style={{ paddingRight: "20%" }}>Type of property </h4>
                      <p>
                        Please Select Which Type Of Property You Are Publishing
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="rld-single-select">
                          <select
                            id="propertyType"
                            className="select single-select"
                            onChange={(event) =>
                              onSelectChange(event, "propertyType")
                            }
                            value={
                              this.state.propertyType
                                ? this.state.propertyType
                                : this.state.requiredPropertyData.propertyType
                            }
                          >
                            <option value={""}>All Properties</option>
                            <option value={"Residential Apartment"}>
                              Residential Apartment
                            </option>
                            <option value={"Independent House"}>
                              Independent House
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pd-top-100">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/31.png"}
                          alt="img"
                        />
                        Interior
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="section-title">
                      <h4 style={{ paddingRight: "20%" }}>
                        Furnishing status{" "}
                      </h4>
                      <p>
                        Please Select Which Type of Furnishing You are
                        Publishing
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="rld-single-select">
                          <select
                            id="furnishingStatus"
                            className="select single-select"
                            onChange={(event) =>
                              onSelectChange(event, "furnishingStatus")
                            }
                            value={
                              this.state.furnishingStatus
                                ? this.state.furnishingStatus
                                : this.state.requiredPropertyData
                                    .furnishingStatus
                            }
                          >
                            <option value={""}>Furnishing Status</option>
                            <option value={"Semifurnished"}>
                              Semifurnished
                            </option>
                            <option value={"Unfurnished"}>Unfurnished </option>
                            <option value={"Furnished"}>Furnished</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="property-news-single-card border-bottom-yellow">
                  <h4>Furnishing Amenities</h4>
                  <hr></hr>
                  <div className="col-12">
                    <ul className="rld-list-style mb-3 mb-sm-3 row">
                      {this.state.furnishingAmenities.map((item, i) => {
                        return (
                          <li className={"col-4"} key={i}>
                            <input
                              type="checkbox"
                              name="furnishingAmenities"
                              checked={item.selected}
                              value={item.name}
                              onChange={this.onFurnishCheckBoxSelected}
                            />{" "}
                            {item.name}
                          </li>
                        );
                      })}{" "}
                    </ul>
                  </div>
                </div>
                <div className="row pd-top-50">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/27.png"}
                          alt="img"
                        />
                        Availability
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="section-title">
                      <h4 style={{ paddingRight: "20%" }}>Available For</h4>
                      <p>Please Select Whom this properties is for</p>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="rld-single-select">
                          <select
                            id="availableFor"
                            className="select single-select"
                            onChange={(event) =>
                              onSelectChange(event, "availableFor")
                            }
                            value={
                              this.state.availableFor
                                ? this.state.availableFor
                                : this.state.requiredPropertyData.availableFor
                            }
                          >
                            <option value={""}>Choose Availability For</option>
                            <option value={"All"}>All</option>
                            <option value={"Family"}>Family</option>
                            <option value={"Single Women"}>
                              Single Women{" "}
                            </option>
                            <option value={"Single Men"}>Single Men</option>
                            <option value={"Tenants with Company Lease"}>
                              Tenants with Company Lease
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pd-top-100">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/23.png"}
                          alt="img"
                        />
                        Available
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="section-title">
                      <h4 style={{ paddingRight: "20%" }}>Available from</h4>
                      <p>
                        Please Select When your Property is Ready for Renting
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="rld-single-select">
                          <select
                            id="availableFrom"
                            className="select single-select"
                            onChange={(event) =>
                              onSelectChange(event, "availableFrom")
                            }
                            value={
                              this.state.availableFrom
                                ? this.state.availableFrom
                                : this.state.requiredPropertyData.availableFrom
                            }
                          >
                            <option value={""}>Choose Availability From</option>
                            <option value={"Immediately"}>Immediately</option>
                            <option value={"Within 1 Month"}>
                              Within 1 Month
                            </option>
                            <option value={"Within 2 Month"}>
                              Within 2 Month
                            </option>
                            <option value={"Within 3 Month"}>
                              Within 3 Month
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pd-top-60">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/29.png"}
                          alt="img"
                        />
                        Address
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="section-title">
                      <h4 style={{ paddingRight: "20%" }}>Address Here</h4>
                      <p>Please Provied your proper house Adress Here</p>
                    </div>
                    <div className="row">
                      <div className="row" id="adressrow">
                        <div className="col-lg-4  col-md-4  col-sm-4 col-xs-6  mb-3">
                          <div className="inputbox">
                            <input
                              id="houseNo"
                              type={"text"}
                              className="houseNo"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.houseNo
                              }
                              onChange={(event) =>
                                onTextChanged(event, "houseNo")
                              }
                            ></input>
                            <span>House/Flat No</span>
                            <i></i>
                          </div>
                        </div>

                        <div className="col-lg-4  col-md-4  col-sm-4 col-xs-6  mb-3">
                          <div className="inputbox">
                            <input
                              id="lane"
                              type={"text"}
                              className="lane"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.lane
                              }
                              onChange={(event) => onTextChanged(event, "lane")}
                            ></input>
                            <span>Lane</span>
                            <i></i>
                          </div>
                        </div>

                        <div className="col-lg-4  col-md-4  col-sm-4 col-xs-6  mb-3">
                          <div className="inputbox">
                            <input
                              id="zone"
                              type={"text"}
                              className="zone"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.zone
                              }
                              onChange={(event) => onTextChanged(event, "zone")}
                            ></input>
                            <span>zone</span>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="row" id="adressrow">
                        <div className="col-lg-4  col-md-4  col-sm-4 col-xs-6 mb-3">
                          <div className="inputbox">
                            <input
                              id="area"
                              type={"text"}
                              className="area"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.area
                              }
                              onChange={(event) => onTextChanged(event, "area")}
                            ></input>
                            <span>area</span>
                            <i></i>
                          </div>
                        </div>
                        <div className="col-lg-4  col-md-4  col-sm-4 col-xs-6 mb-3">
                          <div className="inputbox">
                            <input
                              id="localities"
                              type={"text"}
                              className="localities"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.localities
                              }
                              onChange={(event) =>
                                onTextChanged(event, "localities")
                              }
                            ></input>
                            <span>Localities</span>
                            <i></i>
                          </div>
                        </div>
                        <div className="col-lg-4  col-md-4  col-sm-4 col-xs-6 mb-3">
                          <div className="inputbox">
                            <input
                              id="postOffice"
                              type={"text"}
                              className="postOffice"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.postOffice
                              }
                              onChange={(event) =>
                                onTextChanged(event, "postOffice")
                              }
                            ></input>
                            <span>Post Office</span>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="row" id="adressrow">
                        <div className="col-lg-4  col-md-4  col-sm-4 col-xs-6 mb-3">
                          <div className="inputbox">
                            <input
                              id="state"
                              type={"text"}
                              className="state"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.state
                              }
                              onChange={(event) =>
                                onTextChanged(event, "state")
                              }
                            ></input>
                            <span>State</span>
                            <i></i>
                          </div>
                        </div>
                        <div className="col-lg-4  col-md-4  col-sm-4 col-xs-6 mb-3">
                          <div className="inputbox">
                            <input
                              id="landMark"
                              type={"text"}
                              className="landMark"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.landMark
                              }
                              onChange={(event) =>
                                onTextChanged(event, "landMark")
                              }
                            ></input>
                            <span>Landmark</span>
                            <i></i>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4  col-sm-4 col-xs-6 mb-3">
                          <div className="inputbox">
                            <input
                              id="PoliceStation"
                              type={"text"}
                              className="PoliceStation"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.PoliceStation
                              }
                              onChange={(event) =>
                                onTextChanged(event, "PoliceStation")
                              }
                            ></input>
                            <span>Police Station</span>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="row" id="adressrow">
                        <div className="col-lg-6  col-md-6  col-sm-6 col-xs-6 mb-3">
                          <div className="inputbox">
                            <input
                              id="district"
                              type={"text"}
                              className="district"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.district
                              }
                              onChange={(event) =>
                                onTextChanged(event, "district")
                              }
                            ></input>
                            <span>District</span>
                            <i></i>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6  col-sm-6 col-xs-6 mb-3">
                          <div className="inputbox">
                            <input
                              id="pinCode"
                              type={"number"}
                              className="pinCode"
                              required="required"
                              defaultValue={
                                this.state.requiredPropertyData.pinCode
                              }
                              onChange={(event) =>
                                onTextChanged(event, "pinCode")
                              }
                            ></input>
                            <span>Pin Code</span>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12" id="mapcontainer">
                      <iframe
                        width="100%"
                        height="600"
                        frameborder="0"
                        scrolling="yes"
                        marginwidth="0"
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=bhubaneswar+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                      >
                        <a
                          href="https://www.maps.ie/distance-area-calculator.html"
                          width={350}
                          style={{ border: 0 }}
                          allowFullScreen
                        >
                          area maps
                        </a>
                      </iframe>
                    </div>
                  </div>
                </div>
                <div className="row pd-top-80">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/30.png"}
                          alt="img"
                        />
                        Lease
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <div className="rld-single-select">
                          <label>Monthly Rent</label>
                          <input
                            id="monthlyRent"
                            type={"number"}
                            className="monthlyRent"
                            defaultValue={
                              this.state.requiredPropertyData.monthlyRent
                            }
                            onChange={(event) =>
                              onTextChanged(event, "monthlyRent")
                            }
                            style={{ marginLeft: "38px" }}
                            placeholder={"Monthly Rent"}
                          ></input>
                        </div>
                      </div>

                      <div className="col-12 mb-3">
                        <div className="rld-single-select">
                          <label> Security Deposit </label>
                          <input
                            id="securityDeposit"
                            type={"number"}
                            className="securityDeposit"
                            defaultValue={
                              this.state.requiredPropertyData.securityDeposit
                            }
                            onChange={(event) =>
                              onTextChanged(event, "securityDeposit")
                            }
                            style={{ marginLeft: "17.6px" }}
                            placeholder={"Security Deposit"}
                          ></input>
                        </div>
                      </div>
                      <div
                        style={{ position: "relative", whiteSpace: "nowrap" }}
                      >
                        Lease/Contract Duration
                      </div>
                      <div className="row">
                        <div class="col-sm-6">
                          <input
                            id="leaseDuration"
                            type={"number"}
                            className="leaseDuration"
                            style={{
                              width: "97px",
                              textAlign: "center",
                              top: "-3px",
                              left: "2px",
                              position: "relative",
                            }}
                            defaultValue={
                              this.state.requiredPropertyData.leaseDuration
                            }
                            onChange={(event) =>
                              onTextChanged(event, "leaseDuration")
                            }
                          ></input>
                        </div>
                        <div class="col-sm-6">
                          <select
                            id="leaseDurationTime"
                            style={{
                              border: "none",
                              top: "-24px",
                              width: "114px",
                              position: "relative",
                              right: "25px",
                            }}
                            onChange={(event) =>
                              onSelectChange(event, "leaseDurationTime")
                            }
                            value={
                              this.state.leaseDurationTime
                                ? this.state.leaseDurationTime
                                : this.state.requiredPropertyData
                                    .leaseDurationTime
                            }
                          >
                            <option value={""}>Duration </option>
                            <option value={"Months"}>Months </option>
                            <option value={"Year"}>Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pd-top-80">
                  <div className="col-md-4">
                    <div className="section-title">
                      <h4>
                        <img
                          src={publicUrl + "/assets/img/icons/31.png"}
                          alt="img"
                        />
                        Amenities
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row ">
                      <div className="col-12">
                        <ul className="rld-list-style mb-3 mb-sm-3 row">
                          {this.state.amenities.map((item, i) => {
                            {
                              /* i >= index && i <= index + 5 ?  */
                            }
                            return (
                              <li className={"col-4"} key={i}>
                                <input
                                  type="checkbox"
                                  name="amenities"
                                  checked={item.selected}
                                  value={item.name}
                                  onChange={this.onCheckBoxSelected}
                                />{" "}
                                {item.name}
                              </li>
                            );
                          })}{" "}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row pd-top-100">
                    <div className="col-md-4">
                      <div className="section-title">
                        <h4>
                          <img
                            src={publicUrl + "/assets/img/news/pages.png"}
                            alt="img"
                            width="100"
                            height="100"
                          />
                          Description
                        </h4>
                      </div>
                    </div>
                    <div className="description-title">
                      <div className="section-title">
                        <h4 style={{ fontSize: "18px" }}>
                          Please Add Description About Your House
                        </h4>
                        <textarea
                          cols="50"
                          id="description"
                          type={"textarea"}
                          className="description"
                          defaultValue={
                            this.state.requiredPropertyData.description
                          }
                          onChange={(event) =>
                            onTextChanged(event, "description")
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row pd-top-100">
                    <div className="col-md-4">
                      <div className="section-title">
                        <h4>
                          <img
                            src={
                              publicUrl + "/assets/img/icons/pngwing.com.png"
                            }
                            alt="img"
                            width="100"
                            height="100"
                          />
                          Agreement
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="section-title">
                        <h4 style={{ paddingRight: "20%" }}>
                          Please Upload RentalAgreement
                        </h4>
                        <p style={{ fontSize: "20px", fontWeight: "700" }}>
                          This is a draft/pdf file which shows the information
                          about rentalAgreement for your home
                        </p>
                      </div>
                      <div className="row">
                        <div className="col-md-10 mb-2 choosepdf">
                          <input
                            onChange={(e) => onRentalChange(e)}
                            multiple
                            type="file"
                            id="agmfile"
                            accept="application/pdf,application/vnd.ms-excel"
                          />
                          <label id="agmlabel" for="agmfile">
                            <i className="fas fa-file-pdf-o" id="agm-icons"></i>{" "}
                            &nbsp; Choose file
                          </label>
                          <p
                            style={{
                              position: "relative",
                              top: "30px",
                              left: "150px",
                            }}
                          >
                            {this.state.rentalUrlName
                              ? this.state.rentalUrlName
                              : "No file uploaded"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ paddingTop: "5%" }}>
                    {/* <div className="" >
                    <div className="section-title">
                      <h3>Other Documents</h3>
                    </div>
                  </div> */}
                    <div
                      className="documents-section"
                      style={{ position: "relative", left: "8%" }}
                    >
                      <div className="section-title">
                        <h4 className="necessaryheading">
                          Please Upload House Documents
                        </h4>
                        <p
                          style={{
                            paddingLeft: "30%",
                            fontSize: "20px",
                            fontWeight: "700",
                          }}
                        >
                          Please Provied any of the following documents like
                          Sale deed copy/ Water Bill/ Electric Bill/Mutation
                          certificate/Property Tax paid challan which indicating
                          Owner’s Name & House Address During Registraion
                        </p>
                      </div>
                      <div
                        className="row pd-top-100"
                        style={{ display: "none" }}
                      >
                        <div className="col-md-4 mb-2 choosepdf">
                          <h3 id="sectionheading">Sale deed copy</h3>
                          <input
                            onChange={(e) => onsaleDeedChange(e)}
                            multiple
                            type="file"
                            id="otheragmfile1"
                            accept="application/pdf,application/vnd.ms-excel"
                          />
                          <label id="agmlabel" for="otheragmfile1">
                            <i className="fas fa-file-pdf-o" id="agm-icons"></i>{" "}
                            &nbsp; Choose file
                          </label>
                          <p className="nofileuploaded">
                            {this.state.saleDeedUrlName
                              ? this.state.saleDeedUrlName
                              : "No file uploaded"}
                          </p>
                        </div>

                        <div className="col-md-4 mb-2 choosepdf">
                          <h3 id="sectionheading">Water Bill</h3>
                          <input
                            onChange={(e) => onWaterChange(e)}
                            multiple
                            type="file"
                            id="otheragmfile2"
                            accept="application/pdf,application/vnd.ms-excel"
                          />

                          <label id="agmlabel" for="otheragmfile2">
                            <i className="fas fa-file-pdf-o" id="agm-icons"></i>{" "}
                            &nbsp; Choose file
                          </label>
                          <p className="nofileuploaded">
                            {this.state.waterUrlName
                              ? this.state.waterUrlName
                              : "No file uploaded"}
                          </p>
                        </div>

                        <div className="col-md-4 mb-2 choosepdf">
                          <h3 id="sectionheading">Electric Bill</h3>
                          <input
                            onChange={(e) => onElectricChange(e)}
                            multiple
                            type="file"
                            id="otheragmfile3"
                            accept="application/pdf,application/vnd.ms-excel"
                          />
                          <label id="agmlabel" for="otheragmfile3">
                            <i className="fas fa-file-pdf-o" id="agm-icons"></i>{" "}
                            &nbsp; Choose file
                          </label>
                          <p className="nofileuploaded">
                            {this.state.electricUrlName
                              ? this.state.electricUrlName
                              : "No file uploaded"}
                          </p>
                        </div>
                      </div>
                      <div className="row pd-top-100">
                        <div
                          className="col-md-2 choosepdf"
                          style={{ display: "none" }}
                        >
                          <h3 id="sectionheading">Mutation certificate</h3>
                          <input
                            onChange={(e) => onMutationChange(e)}
                            multiple
                            type="file"
                            id="otheragmfile4"
                            accept="application/pdf,application/vnd.ms-excel"
                          />
                          <label id="agmlabel" for="otheragmfile4">
                            <i className="fas fa-file-pdf-o" id="agm-icons"></i>{" "}
                            &nbsp; Choose file
                          </label>
                          <p className="nofileuploaded">
                            {this.state.mutationUrlName
                              ? this.state.mutationUrlName
                              : "No file uploaded"}
                          </p>
                        </div>
                        <div className="col-md-12 choosepdf ">
                          <h3 id="sectionheading">House Documnet</h3>
                          <input
                            onChange={(e) => onPropertyChange(e)}
                            multiple
                            type="file"
                            id="otheragmfile5"
                            accept="application/pdf,application/vnd.ms-excel"
                          />
                          <label id="agmlabel" for="otheragmfile5">
                            <i className="fas fa-file-pdf-o" id="agm-icons"></i>{" "}
                            &nbsp; Choose file
                          </label>
                          <p className="nofileuploaded">
                            {this.state.propertyUrlName
                              ? this.state.propertyUrlName
                              : "No file uploaded"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="col-8 mt-5">
                <button
                  className="btn-yellow publishbtn"
                  onClick={
                    this.state.paramId != "add-property"
                      ? onPropertyEdit
                      : onPropertyAdd
                  }
                >
                  Publish property
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(AddNew);
