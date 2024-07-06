import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Editoffers.css";
const Editoffres = () => {
    let navigate = useNavigate();
    let { offerID } = useParams();

    const [offerName, setOfferName] = useState("");
    const [details, setDetails] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [postDate, setPostDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    useEffect(() => {
        const fetchoffer = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7120/api/offers/${offerID}`
                );
                const offer = response.data;
                setOfferName(offer.offerName);
                setDetails(offer.details);
                setDiscountAmount(offer.discountAmount);
                setPostDate(offer.postDate);
                setExpiryDate(offer.expiryDate);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchoffer();
    }, [offerID]);

    const handleInputChange = (setter, value) => {
        setter(value);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7120/api/offers/${offerID}`, {
                offerName,
                details,
                discountAmount,
                postDate,
                expiryDate,
            });
            // console.log("Data updated successfully!");
            navigate("/advertisements");
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <div className="con-Edit-offers">
            <div className="container-contant-Edit-offers">
                <h1 className="offers-title-edit-off">Edit Offer {offerID}</h1>
                <div className="form-Edit-offers-off">
                    <div className="image-of-contact-offers-edit-off">
                    <h2>Welcome Back !</h2>
            <p>
                You can Edit your Offer Now
            </p>
                    </div>
                    <div className="contant-of-Edit-offers">
                        <form className="coll-Edit-offers" onSubmit={formSubmit}>
                            <div className="only-input-edit">
                                <label
                                    htmlFor="inputTitle"
                                    className="form-label-edit"
                                >
                                    offer name
                                </label>
                                <input
                                    type="text"
                                    className="input-feild7"
                                    id="inputTitle"
                                    value={offerName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            setOfferName,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="only-input-edit">
                                <label
                                    htmlFor="inputDescription"
                                    className="form-label-edit"
                                >
                                    Details
                                </label>
                                <input
                                    type="text"
                                    className="input-feild7"
                                    id="inputDescription"
                                    value={details}
                                    onChange={(e) =>
                                        handleInputChange(
                                            setDetails,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="only-input-edit">
                                <label
                                    htmlFor="inputDescription"
                                    className="form-label-edit"
                                >
                                    Discount amount
                                </label>
                                <input
                                    type="text"
                                    className="input-feild7"
                                    id="inputDescription"
                                    value={discountAmount}
                                    onChange={(e) =>
                                        handleInputChange(
                                            setDiscountAmount,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="only-input-edit">
                                <label
                                    htmlFor="inputDescription"
                                    className="form-label-edit"
                                >
                                    Post Date
                                </label>
                                <input
                                    type="datetime-local"
                                    className="input-feild7"
                                    id="inputPostDate"
                                    value={postDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            setPostDate,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="only-input-edit">
                                <label
                                    htmlFor="inputDescription"
                                    className="form-label-edit"
                                >
                                    Expiry Date
                                </label>
                                <input
                                    type="datetime-local"
                                    className="input-feild7"
                                    id="inputExpiryDate"
                                    value={expiryDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            setExpiryDate,
                                            e.target.value
                                        )
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

export default Editoffres;
