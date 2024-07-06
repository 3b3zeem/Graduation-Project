import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import authService from "../../../Service/auth-service";
import lock from "../../../im&ve/forgot_password.svg";
import "./forgotpass.css"

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const forgotPass = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        toast.error("Please enter your email.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-message",
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      const response = await fetch(
        `https://localhost:7120/api/User/Forgotpassword/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reset password.");
      }

      toast.success("Password reset email sent successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-message",
        theme: "dark",
        transition: Bounce,
      });

      console.log("Password reset email sent successfully!");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      toast.error("Failed to reset password. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-message",
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div>
      <div className="page d-flex">
        <div className="containChange" style={{ height: "65%" }}>
          <div className="forgot">
            <img src={lock} style={{width:"120px" , height:"100px", marginTop:"10px"}} alt="" />
            <h1>
              Forgot Password?
              <p>No problem, Put Your Email here and wait for email from us!</p>
            </h1>
          </div>
          <hr className="row" />
          <form className="formChange" onSubmit={forgotPass}>
            <ToastContainer />
            <div className="current" style={{ marginTop: "60px" }}>
              <h3 style={{ width: "30%" }}>Email</h3>
              <input
                className="input"
                style={{ width: "50%" }}
                required
                type={"email"}
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
};

export default ForgetPassword;
