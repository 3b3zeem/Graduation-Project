import React, { useEffect, useState } from "react";
import "./AdDetails.css";
import { Link, useParams } from "react-router-dom";
import { FaQuoteRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { CiWarning } from "react-icons/ci";
import Footer from "../../../Footer/Footer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Swal from "sweetalert2";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ADDetails from "../../ADDetilas/ADDetails";
import authService from "../../../../Service/auth-service";

const AdDetails = () => {
  let { advertisementId, reviewId } = useParams();

  const [product, setProduct] = useState({});
  const [review, setShowReview] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Function to fetch the advertisement
  const fetchAdvertisements = () => {
    fetch(`https://localhost:7120/api/advertisements/${advertisementId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setProduct(data);
          setLoaded(true);
        } else {
          console.error("Empty response received");
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  };

  //Function to fetch the reviews of the advertisement
  const shoReview = () => {
    fetch(
      `https://localhost:7120/api/advertisements/${advertisementId}/reviews`
    )
      .then((response) => response.json())
      .then((data) => {
        setShowReview(data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setShowReview([]);
      });
  };

  //Delete Review
  const deleteReview = (reviewId) => {
    Swal.fire({
      title: "Are you sure to Delete this Review!?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7120/api/reviews/${reviewId}`, {
          method: "DELETE",
        })
          .then(() => shoReview())
          .catch((error) => console.error("Error deleting product:", error));
      }
    });
  };

  useEffect(() => {
    fetchAdvertisements();
    shoReview();
  }, [advertisementId, reviewId]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // To display in 12-hour format with AM/PM
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <React.Fragment>
      <div className="allll">
        <ADDetails />
        {/* {currentUser &&
          currentUser.roles.includes("CompanyOwner") &&
          currentUser.roles.length === 2 && (
            <div className="ready-add-offer-ads">
              <div className="disp-flex-add-offers">
                <h1 className="dispText">Add New Offer!</h1>
                <Link
                  to={`/advertisements/${advertisementId}/addOffer`}
                  className="btn-ready"
                >
                  Add Offers
                </Link>
              </div>
            </div>
          )} */}
        <div className="mb-5 mt-5 lalala">
          {review.length === 0 ? (
            <p className="text-center" style={{ fontSize: "30px" }}>
              <CiWarning
                className="icon text-warning"
                style={{ fontSize: "80px" }}
              />
              No reviews available
            </p>
          ) : (
            <React.Fragment>
              <p className="main">Advertisement's reviews</p>
              <Carousel responsive={responsive} className="scrollllll">
                {review.map((review) => (
                  <div key={review.reviewID}>
                    <div className="contant-of-rev">
                      <div className="rating-quot">
                        <FaQuoteRight className="quot-icon" />
                        <div className="stars-rating">
                          {Array.from({
                            length: Math.floor(review.rating),
                          }).map((_, index) => (
                            <FaStar
                              key={index}
                              style={{
                                color: "orange",
                              }}
                            />
                          ))}
                          {Array.from({
                            length: Math.floor(5 - review.rating),
                          }).map((_, index) => (
                            <CiStar key={index} />
                          ))}
                        </div>
                      </div>
                      <div className="information-of-rating">
                        <p>User name : {review.userName}</p>
                        <p>{review.comment}</p>
                        <p>{formatDateTime(review.datePosted)}</p>
                        {currentUser &&
                          ((currentUser.roles.includes("User") ||
                            currentUser.roles.includes("Admin")) &&
                            currentUser.roles.length >= 1 &&
                            !currentUser.roles.includes("CompanyOwner")) && (
                            <>
                              <div className="review_btn">
                                <button
                                  onClick={() => deleteReview(review.reviewID)}
                                  className="btn-readycrev"
                                >
                                  <span>Delete</span>
                                </button>

                                <Link
                                  to={`/advertisements/${advertisementId}/EditReview/${
                                    review.reviewID
                                  }`}
                                  className="btn-readycrev"
                                >
                                  Edit
                                </Link>
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </React.Fragment>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdDetails;
