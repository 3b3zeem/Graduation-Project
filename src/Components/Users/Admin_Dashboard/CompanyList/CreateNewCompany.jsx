import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import authService from "../../../../Service/auth-service";

function CreateNewCompany() {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [userID, setUserID] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleInputChange = (setter, value) => {
    setter(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = currentUser.token;
      if (!token) {
        setError("Token is missing. Please log in to continue.");
        return;
      }

      const formData = new FormData();
      formData.append("CompanyName", companyName);
      formData.append("CompanyAddress", companyAddress);
      formData.append("ContactInformation", contactInformation);
      formData.append("UserId", userID);

      const response = await fetch(
        "https://localhost:7120/api/Company/createCompany",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create company.");
      }

      toast.success("Company created successfully!", {
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

      setCompanyName("");
      setCompanyAddress("");
      setContactInformation("");
      setUserID("");
    } 
    catch (error) {
      setError(`${error}`);
      toast.error(error.message || "Failed to create company.", {
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
    <div className="page d-flex">
      <div className="containChange" style={{ height: "85%" }}>
        <h1 style={{ textAlign: "center" }}>
          <span>Create a company for a user</span>
        </h1>
        <hr className="row" />
        <form className="formChange" onSubmit={formSubmit}>
          <ToastContainer />
          <div className="current">
            <h3>User ID</h3>
            <input
              className="input mb-2"
              required
              type="text"
              placeholder="User ID"
              name="userID"
              value={userID}
              onChange={(e) => handleInputChange(setUserID, e.target.value)}
            />
          </div>
          <div className="current">
            <h3>Company Name</h3>
            <input
              className="input mb-2"
              type="text"
              placeholder="Company Name"
              name="CompanyName"
              value={companyName}
              onChange={(e) =>
                handleInputChange(setCompanyName, e.target.value)
              }
            />
          </div>
          <div className="current">
            <h3>Company Address</h3>
            <input
              className="input"
              required
              type="text"
              placeholder="Company Address"
              name="CompanyAddress"
              value={companyAddress}
              onChange={(e) =>
                handleInputChange(setCompanyAddress, e.target.value)
              }
            />
          </div>
          <div className="current">
            <h3>Contact Information</h3>
            <input
              className="input"
              required
              type="text"
              placeholder="Contact Information"
              name="ContactInformation"
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
  );
}

export default CreateNewCompany;
