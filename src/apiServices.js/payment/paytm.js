import axios from "axios";
import HTMLReactParser from "html-react-parser";
import PaytmChecksum from "paytmchecksum";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { GetBaseUrl } from "../configUrl";
import easyinvoice from "easyinvoice";
const https = require("https");
export const InitializePaytm = (props) => {
  console.log("data is", props);
  console.log("creditScroe934784 is", props.creditScore);
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [creditUpdate, setcreditUpdate] = useState(0)
  const location = useLocation();
  console.log("location", location);
  const history = useHistory();
  let id = location.state.homeId;

  console.log("ID is", id);
  let price = location.state.price;
  console.log("price is", price);
  let userObj = JSON.parse(localStorage.getItem("homerentuser"));
  let userDataObj = userObj ? userObj.user : undefined;
  useEffect(() => {
    initialize();
  }, []);
  const downloadInvoice = async (propertyData) => {
    console.log(propertyData);
    // console.log(propertyData.houseName);
    // console.log(propertyData.houseNo);
    // console.log(propertyData.area);
    // console.log(propertyData.localities);
    // console.log(propertyData.isBookedByUser.name);
    // console.log(propertyData.isBookedByUser.DOB);
    // console.log(propertyData.isBookedByUser.email);
    // console.log(propertyData.transactionId);
    const data = {
      documentTitle: "INVOICE", //Defaults to INVOICE
      currency: "RS",
      taxNotation: "gst", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "link to show on your invoice",
      sender: {
        company: `House Name: ${propertyData.houseName}`,
        address: `Address: ${propertyData.area}`,
        city: `Locality :${propertyData.localities}`,
        HouseNo: `HouseNo: ${propertyData.houseNo}`,
      },
      client: {
        name: `Name ${
          propertyData &&
          propertyData.isBookedByUser &&
          propertyData.isBookedByUser.name
        }`,

        email: `mail id is ${
          propertyData &&
          propertyData.isBookedByUser &&
          propertyData.isBookedByUser.email
        }`,
        address: propertyData.isBookedByUser.empAddress,
        city: `City: ${new Date(Date.now()).toLocaleString("en-US")}`,

        BookingDate: `Date Of Booking ${
          propertyData &&
          propertyData.isBookedByUser &&
          propertyData.isBookedByUser.DOB
        }`,
      },
      information: {
        number: propertyData.transactionId,
        date: `${new Date(Date.now()).toLocaleString("en-US")}`,
        "due-date": `${new Date(Date.now()).toLocaleString("en-US")}`,
        invoiceNumber: `TransactionId ${propertyData.transactionId}`,
        invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
      },
      invoiceNumber: `TransactionId ${propertyData.transactionId}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
      products: [
        {
          // quantity: 1,
          description: propertyData.description,
          "tax-rate": 0,
          price:props.amount,
        },
      ],
      bottomNotice: "add message",
    };

    console.log("data", data);

    const result = await easyinvoice.createInvoice(data);
    console.log(result.pdf);
    easyinvoice.download(`invoice_wqeqw213123.pdf`, result.pdf);
  };
  const initialize = () => {
    let orderId = "Order_" + new Date().getTime();
    // Sandbox Credentials
    let mid = "RbkQsu59139245094037"; // Merchant ID
    let mkey = "1qYlXTDgRK#Sodaz"; // Merchant Key
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: mid,
      websiteName: "WEBSTAGING",
      orderId: orderId,
      callbackUrl: "https://merchant.com/callback",
      txnAmount: {
        value: parseInt(props.amount),
        currency: "INR",
      },
      userInfo: {
        custId: "1001",
      },
    };

    PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    ).then(function (checksum) {
      console.log(checksum);
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);

      var options = {
        /* for Staging */
        // hostname: "securegw-stage.paytm.in" /* for Production */,
        hostname: "securegw-stage.paytm.in",
        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });
        post_res.on("end", function () {
          console.log("Response: ", response);
          // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
          setPaymentData({
            ...paymentData,
            token: JSON.parse(response).body.txnToken,
            order: orderId,
            mid: mid,
            amount: parseInt(props.amount),
          });
        });
      });

      post_req.write(post_data);
      post_req.end();
    });
  };
  const makePayment = () => {
    setLoading(true);
    // let creditData = props.creditscore
//   let x =((creditData)=>{
// setcreditUpdate(creditData>0?0:"")
//   })
//   x(props.creditscore);
    console.log("clicked");
    var config = {
      root: "",
      style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#0FB8C9",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
          padding: "",
          backgroundColor: "",
        },
      },
      data: {
        orderId: paymentData.order,
        token: paymentData.token,
        tokenType: "TXN_TOKEN",
        amount: props.leaseDuration * paymentData.amount /* update amount */,
      },
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
      },
      website: "WEBSTAGING",
      flow: "DEFAULT",
      merchant: {
        mid: paymentData.mid,
        redirect: false,
      },
      handler: {
        transactionStatus: function transactionStatus(paymentStatus) {
          console.log(paymentStatus);
          let transactionId = paymentStatus.BANKTXNID;
          console.log("transactionId", transactionId);
          if (paymentStatus.STATUS === "TXN_SUCCESS") {
            console.log("here");
            let token = localStorage.getItem("homerentuser")
              ? JSON.parse(localStorage.getItem("homerentuser")).token
              : undefined;
            let headers = {
              authorization: `Bearer ${token}`,
            };
            axios
              .put(
                `${GetBaseUrl()}/updateProperty`,
                { _id: id, transactionId: transactionId },
                { headers: headers }
              )
              .then(async (res) => {
                console.log("resonse data is", res.data);
                let prevObj = props.getValues()
                console.log('prevObject',prevObj)
                // downloadInvoice({name:JSON.parse(localStorage.getItem("homerentuser")).user.name})
                await downloadInvoice(res.data.propertyData);
                axios
                .post(`${GetBaseUrl()}/user/${userDataObj._id}`, {
                  creditScore:prevObj.remainingCreditscore
                })
                .then((res) => {
                  alert("Data updated successfuly");
                  // getProfileData();
                  // this.props.history.push("/owner");
                  // this.context.history.push('/owner')
                  
                })
                .catch((error) => {
                  console.log("error", error);
                  alert("Something went wrong.Please contact helpdesk");
                });
                history.push("/tenant-Dashboard");
              })
              .catch((errorData) => {
                console.log("error", errorData);
              });
          }
        },
        notifyMerchant: function notifyMerchant(eventName, data) {
          console.log("Closed");
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess(data) {
          window.Paytm.CheckoutJS.invoke();
          setLoading(false);

          console.log("after payment success", data);
        })
        .catch(function onError(error) {
          console.log("Error => ", error);
        });
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      {loading ? (
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      ) : (
        <button onClick={() => makePayment()} id="pay-button">
          Pay Now
        </button>
      )}
    </div>
  );
};
