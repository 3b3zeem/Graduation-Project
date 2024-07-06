import React, { useEffect, useState } from "react";
import "./AddRequest.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import authService from "../../../../../Service/auth-service";

function AddRequest() {
  let navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleInputChange = (setter, value) => {
    setter(value);
  };

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const [error, setError] = useState("");

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
      await fetch("https://localhost:7120/api/permission-requests", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => {
          toast.success("Successful Request, Please wait until we approve your request! ", {
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

  return (
    <div className="page d-flex">
      <div className="containChange addition">
        <h1>
          <span>Become A partner</span>
          {/* <p>Become A partner</p> */}
        </h1>
        <hr className="row" />
        <form className="formChange" onSubmit={formSubmit}>
          <ToastContainer />
          <div className="current">
            <h3>Company Name</h3>
            <input
              className="input mb-2"
              type={"text"}
              placeholder="Company Name"
              name="Company Name"
              value={companyName}
              onChange={(e) =>
                handleInputChange(setCompanyName, e.target.value)
              }
            />
          </div>
          <div className="current">
            <h3>Description</h3>
            <input
              className="input mb-2"
              required
              type={"text"}
              placeholder="Description"
              name="Description"
              value={description}
              onChange={(e) =>
                handleInputChange(setDescription, e.target.value)
              }
            />
          </div>
          <div className="current">
            <h3>Company Address</h3>
            <input
              className="input"
              required
              type={"text"}
              placeholder="companyAddress"
              name="companyAddress"
              value={companyAddress}
              onChange={(e) =>
                handleInputChange(setCompanyAddress, e.target.value)
              }
            />
          </div>
          <div className="current">
            <h3>Contact Information </h3>
            <input
              className="input"
              required
              type={"text"}
              placeholder="ContactInformation"
              name="ContactInformation "
              value={contactInformation}
              onChange={(e) =>
                handleInputChange(setContactInformation, e.target.value)
              }
            />
          </div>
          <div className="current">
            <h3>Update only pdf file</h3>
            <input
              className="input"
              required
              type={"file"}
              placeholder="Upload PDF"
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
  );
}

export default AddRequest;
