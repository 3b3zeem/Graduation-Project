import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../../../Service/auth-service";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function RemoveRole() {
  const [userID, setUserID] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://localhost:7120/api/User/removerole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add offer");
      }

      setUserID("");
      setRole("");

      toast.success("Role Successfully Removed!", {
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
      navigate("/UserList");
    } catch (error) {
      //   alert(error);
      toast.error(`${error}`, {
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
    <div>
      <div className="page d-flex">
        <div className="containChange" style={{ height: "60%" }}>
          <div className="verify">
            <h1>Remove Role From User</h1>
          </div>
          <hr className="row" />
          <form className="formChange" onSubmit={handleSubmit}>
            <ToastContainer />
            <div className="current">
              <h3 style={{ width: "30%" }}>User ID</h3>
              <input
                type="text"
                className="input"
                style={{ width: "50%" }}
                required
                placeholder="Enter User ID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              />
            </div>
            <div className="current">
              <h3 style={{ width: "30%" }}>Role to Remove</h3>
              <input
                type="text"
                className="input"
                style={{ width: "50%" }}
                required
                placeholder="Enter Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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

export default RemoveRole;
