import React, { useEffect, useState } from "react";
import "./ChangePassword.css";
import { Link } from "react-router-dom";
import authService from "../../../Service/auth-service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

function ChangePassword() {
  const [currentUser, setCurrentUser] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "verifyPassword") setVerifyPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== verifyPassword) {
      setError("Passwords do not match.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        saveChanges();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(
        "https://localhost:7120/api/User/ChangePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: currentUser.userID,
            currentPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to change password.");
      }

      Swal.fire({
        icon: "success",
        title: "Password Changed Successfully!",
        text: "Your password has been changed.",
      });

      // Clear input fields and error
      setCurrentPassword("");
      setNewPassword("");
      setVerifyPassword("");
      setError("");

      navigate("/account");
    } catch (error) {
      console.error("Error changing password:", error.message);
      setError("An error occurred. Please try again later.");
      toast.error("Be Sure about Ur Password. Please try again!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
      <div className="page d-flex">
        <div className="containChange">
          <h1>
            <span>Change Password</span>
            <p>Change Your account password</p>
            <Link to={"/forgetPassword"}>Forgot Password ?</Link>
          </h1>
          <hr className="row" />
          <form className="formChange" onSubmit={handleSubmit}>
            <ToastContainer />
            <div className="current">
              <h3>ID</h3>
              <input
                className="input"
                type="text"
                disabled
                value={currentUser ? currentUser.userID : ""}
              />
            </div>
            <div className="current">
              <h3>Current Password</h3>
              <input
                className="input mb-2"
                required
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                name="currentPassword"
                value={currentPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
            <div className="current">
              <h3>New Password</h3>
              <input
                className="input"
                required
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="current">
              <h3>Verify Password</h3>
              <input
                className="input"
                required
                type={showVerifyPassword ? "text" : "password"}
                placeholder="Verify Password"
                name="verifyPassword"
                value={verifyPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowVerifyPassword(!showVerifyPassword)}
              >
                <FontAwesomeIcon
                  icon={showVerifyPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>

            <div className="btnChange">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default ChangePassword;
