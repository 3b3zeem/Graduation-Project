import React from "react";
import "./EmailVerify.css";
import verify from "../../../../im&ve/verify-email.png";
import { ToastContainer } from "react-toastify";

function EmailVerify() {
  return (
    <div>
      <div className="page d-flex">
        <div className="containChange" style={{height:"70%"}}>
          <div className="verify">
            <img src={verify} alt="" />
            <h1>We already sent an OTP to your email, please verify the otp</h1>
          </div>
          <hr className="row" />
          <form className="formChange">
            <ToastContainer />
            <div className="current">
              <h3 style={{ width: "30%" }}>Verify Email</h3>
              <input
                type="number"
                className="input"
                style={{ width: "50%" }}
                required
                placeholder="Verify your email"
                name="verifyEmail"
                // value={currentPassword}
                // onChange={handleChange}
              />
            </div>

            <div className="btnChange">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
