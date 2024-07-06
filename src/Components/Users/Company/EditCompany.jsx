import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import authService from "../../../Service/auth-service";
import { Bounce, ToastContainer, toast } from "react-toastify";

const EditCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  let { companyID } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7120/api/Company/${companyID}`
        );
        const company = response.data.data;
        setCompanyName(company.companyName);
        setCompanyAddress(company.companyAddress);
        setContactInformation(company.contactInformation);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [companyID]);

  const handleInputChange = (setter, value) => {
    setter(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7120/api/Company/${companyID}`, {
        companyName: companyName,
        companyAddress: companyAddress,
        contactInformation: contactInformation,
      });
      // console.log("Data updated successfully!");
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
      // navigate(`/account/${userId}`);
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
        <div className="containChange">
          <h1 style={{ marginTop: "30px",fontSize:"30px" }}>
            <span>Hello {currentUser?.username || ""}, you can edit your Company Information</span>
          </h1>
          <hr className="row" />
          <form className="formChange" onSubmit={formSubmit}>
            <div className="current">
              <h3>Company Name</h3>
              <input
                className="input mb-2"
                required
                type="text"
                placeholder="New User Name"
                name="New User Name"
                value={companyName}
                onChange={(e) => handleInputChange(setCompanyName, e.target.value)}
              />
            </div>
            <div className="current">
              <h3>Company Address</h3>
              <input
                className="input"
                required
                type="text"
                placeholder="New Email"
                name="New Email"
                value={companyAddress}
                onChange={(e) => handleInputChange(setCompanyAddress, e.target.value)}
              />
            </div>
            <div className="current">
              <h3>Contact Information</h3>
              <input
                className="input"
                required
                type="text"
                placeholder="New First Name"
                name="New First Name"
                value={contactInformation}
                onChange={(e) =>
                  handleInputChange(setContactInformation, e.target.value)
                }
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

export default EditCompany;
