import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import authService from "../../../../Service/auth-service";
import { Bounce, ToastContainer, toast } from "react-toastify";

const EditPermission = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState("");

  let { requestID } = useParams();

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7120/api/permission-requests/byId/${requestID}`
        );
        const company = response.data.data;
        setCompanyName(company.companyName);
        setDescription(company.description);
        setCompanyAddress(company.companyAddress);
        setContactInformation(company.contactInformation);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchPermission();
  }, [requestID]);

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = currentUser.token;
      const formData = new FormData();
      formData.append("CompanyName", companyName);
      formData.append("Description", description);
      formData.append("CompanyAddress", companyAddress);
      formData.append("ContactInformation", contactInformation);
      formData.append("File", pdfFile);
      if (!token) {
        setError("Token is missing. Please log in to continue.");
        return;
      }
      await fetch(
        `https://localhost:7120/api/permission-requests/update/${requestID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )
        .then((response) => {
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
          return response.json();
        })
        .then((res) => {
          toast.error(res?.title, {
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
        });
    } catch (error) {
      toast.error(`${error}`, {
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
          <h1 style={{ marginTop: "30px", fontSize: "30px" }}>
            <span>
              Hello {currentUser?.username || ""}, you can edit your Permission
              Request
            </span>
          </h1>
          <hr className="row" />
          <form className="formChange" onSubmit={formSubmit}>
            <div className="current">
              <h3>Company Name</h3>
              <input
                className="input mb-2"
                type="text"
                placeholder="Company Name"
                name="CompanyName"
                value={companyName}
                onChange={handleInputChange(setCompanyName)}
              />
            </div>
            <div className="current">
              <h3>Description</h3>
              <input
                className="input mb-2"
                type="text"
                placeholder="Description"
                name="Description"
                value={description}
                onChange={handleInputChange(setDescription)}
              />
            </div>
            <div className="current">
              <h3>Company Address</h3>
              <input
                className="input"
                type="text"
                placeholder="Company Address"
                name="CompanyAddress"
                value={companyAddress}
                onChange={handleInputChange(setCompanyAddress)}
              />
            </div>
            <div className="current">
              <h3>Contact Information</h3>
              <input
                className="input"
                type="text"
                placeholder="Contact Information"
                name="ContactInformation"
                value={contactInformation}
                onChange={handleInputChange(setContactInformation)}
              />
            </div>
            <div className="current">
              <h3>Update only pdf file</h3>
              <input
                className="input"
                type="file"
                placeholder="uploadPDF"
                name="uploadPDF"
                onChange={(e) => setPdfFile(e.target.files[0])}
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

export default EditPermission;
