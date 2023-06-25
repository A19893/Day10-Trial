import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const submitOtp = () => {
    console.log(process.env.REACT_APP_OTP);
    if (otp === '1234') {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="ot">
      <div className="otContainer">
        <div className="otpImgContainer">
          <img
            className="otpimg"
            src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7887.jpg?w=740&t=st=1687674269~exp=1687674869~hmac=127a733aad5496ff716a9e30cea6a1f45da76351befcd7bac56dfff7486ccc76"
            alt="aews"
          />
        </div>
        <div className="otpContainer">
          <div className="ottContainer">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>&nbsp;&nbsp;</span>}
              renderInput={(props) => <input {...props} />}
            />
            <br />
            <br />
            </div>
            <div className="otpBtn">
              <Button
                type="primary"
                style={{ width: 200 }}
                onClick={(e) => submitOtp()}
              >
                Submit
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
