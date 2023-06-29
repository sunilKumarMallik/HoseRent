import React, { Component } from 'react';
import OtpInput from 'react-otp-input';

 class OtpVerification extends Component {
  state = { otp: '' };

  handleChange = (otp) => this.setState({ otp });

  render() {
    return (

        <div>
        <div className="verifyStyle">
	<div className="verifyOtpContainer">
		<h3 className="otpHeader">Enter Verification code</h3>
		<div className="OTPuserInput">
            <OtpInput 
        value={this.state.otp}
        onChange={this.handleChange}
        numInputs={4}
        separator={<span>-</span>}
      />
		</div>
		<button className="otpconfirmbtn">CANCEL</button>
		<button className="otpconfirmbtn">GET OTP</button>
	</div>
    </div>
    </div> 
    );

  }
}

export default OtpVerification;