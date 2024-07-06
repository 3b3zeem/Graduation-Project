import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddAdvertisement.css";
import authService from "../../../../Service/auth-service";
import Swal from "sweetalert2";
import { Bounce, ToastContainer, toast } from "react-toastify";

const AddAdvertisement = () => {
  let navigate = useNavigate();
  let { companyID, companyName } = useParams();

  const [title, setTitle] = useState("");
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTo, setTravelTo] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

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

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = currentUser.token;
  
      if (!token) {
        setError("Token is missing. Please log in to continue.");
        return;
      }
  
      const formData = new FormData();
      formData.append("companyID", companyID);
      formData.append("companyName", companyName);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("travelFrom", travelFrom);
      formData.append("travelTo", travelTo);
      formData.append("validFrom", validFrom);
      formData.append("validTo", validTo);
      formData.append("price", price);
  
      images.forEach((image) => {
        formData.append(`images`, image);
      });
  
      const response = await fetch(
        "https://localhost:7120/api/advertisements",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
  
      const responseData = await response.json();
  
      if (response.ok && responseData.success) {
        console.log("Advertisement created successfully:", responseData.data);
        navigate("/advertisements");
      } else {
        // Handle validation errors from the backend
        if (responseData.errors) {
          const errorMessages = Object.values(responseData.errors).flatMap(
            (errors) => errors
          );
          setError(errorMessages.join("\n"));
        } else {
          setError("Error creating advertisement. Please try again.");
        }
      }
  
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error.message);
      alert("Error: " + error.message);
    }
  };
  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <React.Fragment>
      <div className="con-add-ad">
        <div className="container-contant-add">
          <h1 className="ad-title">Add New Advertisement</h1>
          <div className="form-add-ad">
            <div className="image-of-contact-ad">
              <label for="images" onChange={handleImageChange} class="drop-container" id="dropcontainer">
                <span class="drop-title">Drop files here</span>
                or
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  required
                  multiple
                />
              </label>
            </div>
            <div className="contant-of-add-ad">
              <form className="coll-add" onSubmit={formSubmit}>
                <div className="only-input">
                  <label htmlFor="inputTitle" className="form-label-add">
                    Company ID
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    id="inputTitle"
                    readOnly
                    value={companyID}
                  />
                </div>

                <div className="only-input">
                  <label htmlFor="inputTitle" className="form-label-add">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    id="inputTitle"
                    value={companyName}
                  />
                </div>

                <div className="only-input">
                  <label htmlFor="inputTitle" className="form-label-add">
                    Advert name
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    id="inputTitle"
                    onChange={(e) =>
                      handleInputChange(setTitle, e.target.value)
                    }
                    value={title}
                  />
                </div>

                <div className="only-input">
                  <label htmlFor="inputDescription" className="form-label-add">
                    Details
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    id="inputDescription"
                    onChange={(e) =>
                      handleInputChange(setDescription, e.target.value)
                    }
                    value={description}
                  />
                </div>

                <div className="only-input">
                  <label htmlFor="inputDescription" className="form-label-add">
                    From
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    id="inputDescription"
                    onChange={(e) =>
                      handleInputChange(setTravelFrom, e.target.value)
                    }
                    value={travelFrom}
                  />
                </div>

                <div className="only-input">
                  <label htmlFor="inputDescription" className="form-label-add">
                    To
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    id="inputDescription"
                    onChange={(e) =>
                      handleInputChange(setTravelTo, e.target.value)
                    }
                    value={travelTo}
                  />
                </div>

                <div className="only-input">
                  <label htmlFor="inputDescription" className="form-label-add">
                    Price
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    id="inputDescription"
                    onChange={(e) =>
                      handleInputChange(setPrice, e.target.value)
                    }
                    value={price}
                  />
                </div>

                <div className="only-input">
                  <label htmlFor="inputPostDate" className="form-label-add">
                    Post Date
                  </label>
                  <input
                    type="datetime-local"
                    className="input-feild6"
                    id="inputPostDate"
                    onChange={(e) =>
                      handleInputChange(setValidFrom, e.target.value)
                    }
                    value={validFrom}
                  />
                </div>

                <div className="only-input">
                  <label htmlFor="inputExpiryDate" className="form-label-add">
                    Expiry Date
                  </label>
                  <input
                    type="datetime-local"
                    className="input-feild6"
                    id="inputExpiryDate"
                    onChange={(e) =>
                      handleInputChange(setValidTo, e.target.value)
                    }
                    value={validTo}
                  />
                </div>

                <div className="all-btn">
                  <button type="submit" className="btn-readyc4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default AddAdvertisement;
