const initialize = (amount,) => {
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
      value: parseInt(amount),
      currency: "INR",
    },
    userInfo: {
      custId: "1001",
    },
  };

  PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey).then(
    function (checksum) {
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
    }
  );
};

export { initialize };
