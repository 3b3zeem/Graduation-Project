import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditAdvertisement.css";
const EditAdvertisement = () => {
  let navigate = useNavigate();
  let { advertisementId } = useParams();

  const [title, setTitle] = useState("");
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTo, setTravelTo] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7120/api/advertisements/${advertisementId}`
        );
        const product = response.data;
        setTitle(product.title);
        setDescription(product.description);
        setTravelFrom(product.travelFrom);
        setTravelTo(product.travelTo);
        setValidFrom(product.validFrom);
        setValidTo(product.validTo);
        setPrice(product.price);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [advertisementId]);

  const handleInputChange = (setter, value) => {
    setter(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7120/api/advertisements/${advertisementId}`,
        {
          title,
          description,
          travelFrom,
          travelTo,
          validFrom,
          validTo,
          price,
        }
      );
      console.log("Data updated successfully!");
      navigate("/advertisements");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="con-Edit-ad">
      <div className="container-contant-Edit">
        <h1 className="ad-title-edit">Edit AD {advertisementId}</h1>
        <div className="form-Edit-ad">
          <div className="image-of-contact-ad-edit">
            <h2>Welcome Back !</h2>
            <p>
                You can Edit your Advertisement Now
            </p>
          </div>
          <div className="contant-of-Edit-ad">
            <form className="coll-Edit" onSubmit={formSubmit}>

              <div className="only-input-edit">
                <label htmlFor="inputTitle" className="form-label-edit">
                  Title
                </label>
                <input
                  type="text"
                  className="input-feild7"
                  id="inputTitle"
                  value={title}
                  onChange={(e) => handleInputChange(setTitle, e.target.value)}
                />
              </div>
              <div className="only-input-edit">
                <label htmlFor="inputDescription" className="form-label-edit">
                  Description
                </label>
                <input
                  type="text"
                  className="input-feild7"
                  id="inputDescription"
                  value={description}
                  onChange={(e) =>
                    handleInputChange(setDescription, e.target.value)
                  }
                />
              </div>
              <div className="only-input-edit">
                <label htmlFor="inputDescription" className="form-label-edit">
                  From
                </label>
                <input
                  type="text"
                  className="input-feild7"
                  id="inputTravelFrom"
                  value={travelFrom}
                  onChange={(e) =>
                    handleInputChange(setTravelFrom, e.target.value)
                  }
                />
              </div>
              <div className="only-input-edit">
                <label htmlFor="inputDescription" className="form-label-edit">
                  To
                </label>
                <input
                  type="text"
                  className="input-feild7"
                  id="inputTravelTo"
                  value={travelTo}
                  onChange={(e) =>
                    handleInputChange(setTravelTo, e.target.value)
                  }
                />
              </div>
              <div className="only-input-edit">
                <label htmlFor="inputDescription" className="form-label-edit">
                  Price
                </label>
                <input
                  type="text"
                  className="input-feild7"
                  id="inputPrice"
                  value={price}
                  onChange={(e) => handleInputChange(setPrice, e.target.value)}
                />
              </div>
              <div className="only-input-edit">
                <label htmlFor="inputDescription" className="form-label-edit">
                  Post Date
                </label>
                <input
                  type="datetime-local"
                  className="input-feild7"
                  id="inputPostDate"
                  value={validFrom}
                  onChange={(e) =>
                    handleInputChange(setValidFrom, e.target.value)
                  }
                />
              </div>
              <div className="only-input-edit">
                <label htmlFor="inputDescription" className="form-label-edit">
                  Expiry Date
                </label>
                <input
                  type="datetime-local"
                  className="input-feild7"
                  id="inputExpiryDate"
                  value={validTo}
                  onChange={(e) =>
                    handleInputChange(setValidTo, e.target.value)
                  }
                />
              </div>

              <div className="all-btn-edit">
                <button type="submit" className="btn-readyc5">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdvertisement;
