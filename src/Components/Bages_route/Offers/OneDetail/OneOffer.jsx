import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./OneOffer.css";

function OneOffer() {
    const { offerID } = useParams(); // Get the offer ID from the URL params
    const [offer, setOffer] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`https://localhost:7120/api/offers/${offerID}`)
            .then((response) => response.json())
            .then((data) => {
                setOffer(data);
                setLoaded(true);
            })
            .catch((error) => console.error("Error fetching offer:", error));
    }, [offerID]);

    return (
        <div className="ViewOffers">
            {loaded && offer && (
                <React.Fragment>
                    <h1>Offer ID: {offer.offerID}</h1>
                    <section className="description-offers">
                        <p className="pre">{offer.offerName}</p>
                        <p className="desc">{offer.details}</p>
                        <div className="price">
                            <p className="p1">Post Date : {offer.postDate}</p>
                            <p className="p1">
                                Expiry Date : {offer.expiryDate}
                            </p>
                        </div>
                        <div className="price">
                            <div className="main-tag">
                                <p> Discount Amount: {offer.discountAmount}</p>
                            </div>
                        </div>

                        <div className="buttons">
                            <button className="add-to-cart">
                                <Link
                                    className="text-of-bott-go"
                                    to={`/advertisements/${offer.adID}`}
                                >
                                    GO TO SHOW AD
                                </Link>
                            </button>
                        </div>
                    </section>
                </React.Fragment>
            )}
        </div>
    );
}

export default OneOffer;
