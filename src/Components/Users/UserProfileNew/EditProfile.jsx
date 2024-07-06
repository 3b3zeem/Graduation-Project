import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import authService from "../../../Service/auth-service";
import { Bounce, ToastContainer, toast } from "react-toastify";

const EditProfile = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { userID } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7120/api/User/ByUserId/${userID}`
        );
        const user = response.data.data;
        setUserId(user.id);
        setUserName(user.userName);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [userID]);

  const handleInputChange = (setter, value) => {
    setter(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7120/api/User/UpdateDetails`, {
        userId: userId,
        newUsername: userName,
        newEmail: email,
        newFirstName: firstName,
        newLastName: lastName,
      });
      console.log("Data updated successfully!");
      toast.success("Successfully Updated! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate('/login');
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div>
      <div className="page d-flex">
        <ToastContainer />
        <div className="containChange addition">
          <h1 style={{ marginTop: "30px" }}>
            <span>Hello {currentUser?.username || ""}, you can edit your Information</span>
          </h1>
          <hr className="row" />
          <form className="formChange" onSubmit={formSubmit}>
            <div className="current">
              <h3>User ID</h3>
              <input
                className="input"
                type="text"
                placeholder="User ID"
                name="User ID"
                value={userID}
                readOnly
              />
            </div>
            <div className="current">
              <h3>User Name</h3>
              <input
                className="input"
                
                type="text"
                placeholder="New User Name"
                name="New User Name"
                value={userName}
                onChange={(e) => handleInputChange(setUserName, e.target.value)}
              />
            </div>
            <div className="current">
              <h3>Email</h3>
              <input
                className="input"
                
                type="email"
                placeholder="New Email"
                name="New Email"
                value={email}
                onChange={(e) => handleInputChange(setEmail, e.target.value)}
              />
            </div>
            <div className="current">
              <h3>First Name</h3>
              <input
                className="input"
                
                type="text"
                placeholder="New First Name"
                name="New First Name"
                value={firstName}
                onChange={(e) =>
                  handleInputChange(setFirstName, e.target.value)
                }
              />
            </div>
            <div className="current">
              <h3>Last Name</h3>
              <input
                className="input"
                
                type="text"
                placeholder="New Last Name"
                name="New Last Name"
                value={lastName}
                onChange={(e) => handleInputChange(setLastName, e.target.value)}
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

export default EditProfile;
