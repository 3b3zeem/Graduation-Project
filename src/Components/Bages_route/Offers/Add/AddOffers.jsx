import React, { useState } from "react";
import "./Addoffers.css";
import { useNavigate, useParams } from "react-router-dom";

const Addoffers = () => {
  const [offerName, setOfferName] = useState("");
  const [details, setDetails] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [postDate, setPostDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [adID, setAdID] = useState(0);
  
  const navigate = useNavigate();
  let { advertisementId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://localhost:7120/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offerName,
          details,
          discountAmount,
          postDate,
          expiryDate,
          adID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add offer");
      }

      setOfferName("");
      setDetails("");
      setDiscountAmount(0);
      setPostDate("");
      setExpiryDate("");
      setAdID(0);

      // console.log("Offer added successfully");
      navigate("/advertisements");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="con-add-offer">
        <div className="container-contant-add-offers">
          <h1 className="title-add-offers">Add offer for AdvertisementID: {advertisementId}</h1>
          <div className="form-add-offers">
            <div className="image-of-contact-add-offers">
              <h2>Get in Touch!</h2>
              <p>
                We will love to talk to you, get started by filling the details
                below and submit.
              </p>
            </div>
            <div className="contant-of-offers-ad">
              <form className="coll-add-offers" onSubmit={handleSubmit}>
                <div className="only-input-offers">
                  <label htmlFor="inputTitle" className="form-label-add-offers">
                    Ad ID
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    // id="adID"
                    value={adID}
                    onChange={(e) => setAdID(parseInt(e.target.value))}
                  />
                </div>

                <div className="only-input-offers">
                  <label htmlFor="inputTitle" className="form-label-add-offers">
                    Offer Name:
                  </label>
                  <input
                    className="input-feild6"
                    type="text"
                    id="offerName"
                    value={offerName}
                    onChange={(e) => setOfferName(e.target.value)}
                  />
                </div>

                <div className="only-input-offers">
                  <label htmlFor="inputTitle" className="form-label-add-offers">
                    Details
                  </label>
                  <input
                    type="text"
                    className="input-feild6"
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                <div className="only-input-offers">
                  <label
                    htmlFor="inputPostDate"
                    className="form-label-add-offers"
                  >
                    Discount Amount:
                  </label>
                  <input
                    type="number"
                    className="input-feild6"
                    id="discountAmount"
                    value={discountAmount}
                    onChange={(e) =>
                      setDiscountAmount(parseInt(e.target.value))
                    }
                  />
                </div>

                <div className="only-input-offers">
                  <label
                    htmlFor="inputExpiryDate"
                    className="form-label-add-offers"
                  >
                    Post Date
                  </label>
                  <input
                    type="datetime-local"
                    className="input-feild6"
                    id="postDate"
                    value={postDate}
                    onChange={(e) => setPostDate(e.target.value)}
                  />
                </div>

                <div className="only-input-offers">
                  <label
                    htmlFor="inputDescription"
                    className="form-label-add-offers"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="datetime-local"
                    className="input-feild6"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>

                <div className="all-btn--add-offers">
                  <button type="submit" className="btn-readyc41">
                    Add Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="con-add-ad">
                <div className="container-contant-add">
                    <h1 className="ad-title">Add New offer</h1>
                    <div className="form-add-ad">
                        <div className="image-of-contact-ad" />
                        <div className="contant-of-add-ad">
                            <form className="coll-add" onSubmit={handleSubmit}>
                                <div className="only-input">
                                    <label
                                        htmlFor="inputTitle"
                                        className="form-label-add"
                                    >
                                        Ad ID
                                    </label>
                                    <input
                                        type="text"
                                        className="input-feild6"
                                        readOnly
                                        id="adID"
                                        value={adID}
                                        onChange={(e) =>
                                            setAdID(parseInt(e.target.value))
                                        }
                                    />
                                </div>

                                <div className="only-input">
                                    <label
                                        htmlFor="inputTitle"
                                        className="form-label-add"
                                    >
                                        Offer Name:
                                    </label>
                                    <input
                                        className="input-feild6"
                                        type="text"
                                        id="offerName"
                                        value={offerName}
                                        onChange={(e) =>
                                            setOfferName(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="only-input">
                                    <label
                                        htmlFor="inputTitle"
                                        className="form-label-add"
                                    >
                                        Details
                                    </label>
                                    <input
                                        type="text"
                                        className="input-feild6"
                                        id="details"
                                        value={details}
                                        onChange={(e) =>
                                            setDetails(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="only-input">
                                    <label
                                        htmlFor="inputPostDate"
                                        className="form-label-add"
                                    >
                                        Discount Amount:
                                    </label>
                                    <input
                                        type="text"
                                        className="input-feild6"
                                        id="discountAmount"
                                        value={discountAmount}
                                        onChange={(e) =>
                                            setDiscountAmount(
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                </div>

                                <div className="only-input">
                                    <label
                                        htmlFor="inputExpiryDate"
                                        className="form-label-add"
                                    >
                                        Post Date
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="input-feild6"
                                        id="postDate"
                                        value={postDate}
                                        onChange={(e) =>
                                            setPostDate(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="only-input">
                                    <label
                                        htmlFor="inputDescription"
                                        className="form-label-add"
                                    >
                                        Details
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="input-feild6"
                                        id="expiryDate"
                                        value={expiryDate}
                                        onChange={(e) =>
                                            setExpiryDate(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="all-btn">
                                    <button
                                        type="submit"
                                        className="btn-readyc4"
                                    >
                                        Add Offer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
    </React.Fragment>
  );
};

export default Addoffers;
