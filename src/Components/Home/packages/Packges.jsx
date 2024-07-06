import React, { useEffect, useState } from "react";
import "./Packges.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";

function Packges() {
    const [showMore, setShowMore] = useState(false);
    const [offers, setOffers] = useState([]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const handleShowMore = () => {
        setShowMore(true);
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await fetch("https://localhost:7120/api/offers");
            const data = await response.json();
            setOffers(data);
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    };

    return (
        <div className="container-Packges-home">
            <div className="orders-packges">
                <div className="">
                    <h3 className="main-title">Offers For You</h3>
                </div>
                <div className="cards-of-offersh">
                    <Carousel responsive={responsive}>
                        {offers.map((offer, offerID) => (
                            <div
                                className="card-ad-company"
                                key={offer.offerID}
                            >
                                <div className="CardOffersHome">
                                    <div className="image-contentOffer">
                                        <span className="overlayOffers" />
                                        <div className="card-imageOffers">
                                            <BiSolidOffer className="card-img" />
                                        </div>
                                    </div>
                                    <div className="card-content-offers">
                                        <h2 className="name-offers">
                                            {offer.offerName}
                                        </h2>
                                        <p className="description-offers">
                                            {offer.details}
                                        </p>
                                        <Link to={`/advertisements/Offers/${offer.offerID}`} className="button-offers">
                                            show more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Packges;
