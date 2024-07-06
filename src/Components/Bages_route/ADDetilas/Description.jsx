import React, { useEffect, useState } from "react";
import plus from "./Pictures/icon-plus.svg";
import minus from "./Pictures/icon-minus.svg";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
// import Heart from "../../../im&ve/heart.svg";
// import NoHeart from "../../../im&ve/noHeart.svg";

import "./ADDetails.css";
import { Link, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import authService from "../../../Service/auth-service";

const Description = () => {
  let { advertisementId, companyID } = useParams();

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

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
          setTotalPrice(data.price * qty);
          setLoaded(true);
        } else {
          console.error("Empty response received");
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  };

  useEffect(() => {
    fetchAdvertisements();
  }, [advertisementId]);

  // const [qty, setQty] = useState(1);
  // const [totalPrice, setTotalPrice] = useState(product.price);

  const increaseProductQty = () => {
    const newQty = qty + 1;
    setQty(newQty);
    setTotalPrice(newQty * product.price); // Update totalPrice when qty increases
  };

  const decreaseProductQty = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      setTotalPrice(newQty * product.price); // Update totalPrice when qty decreases
    }
  };

  const [clickedAds, setClickedAds] = useState([]);

  useEffect(() => {
    const storedClickedAds =
      JSON.parse(localStorage.getItem("clickedAds")) || [];
    setClickedAds(storedClickedAds);
  }, []);

  const handleClick = (adID) => {
    setClickedAds((prevClickedAds) => {
      const isClicked = prevClickedAds.includes(adID);
      if (isClicked) {
        return prevClickedAds;
      }

      const updatedClickedAds = [...prevClickedAds, adID];
      localStorage.setItem("clickedAds", JSON.stringify(updatedClickedAds));
      return updatedClickedAds;
    });
  };

  const handleWishlistClick = async (adId) => {
    try {
      const user = authService.getCurrentUser();
      if (!user.token) {
        console.error("No authorization token available.");
        return;
      }

      const isAlreadyAdded = clickedAds.includes(adId);
      if (isAlreadyAdded) {
        toast.warning("Already added to wishlist!", {
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
        return;
      }

      const response = await fetch(
        `https://localhost:7120/api/Wishlist?AdId=${adId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        handleClick(adId);
        toast.success("Added Successfully to wishlist!", {
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
      } else {
        console.error("Failed to add to wishlist:", response.status);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
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
    <section className="description">
      <ToastContainer />
      {loaded && (
        <>
          <div
            className="rev d-flex align-center justify-content-between"
            style={{ width: "100%" }}
          >
            <p className="pre">{product.companyName}</p>
            <div className="d-flex flex-column gap-2">
              <Link
                to={`/advertisements/${advertisementId}/addReview`}
                className="btn btn-primary"
              >
                Add Review
              </Link>
              {currentUser &&
                currentUser.roles.includes("CompanyOwner") &&
                currentUser.roles.length === 2 && (
                  <Link
                    to={`/advertisements/${advertisementId}/addOffer`}
                    className="btn btn-info"
                  >
                    Add Offer
                  </Link>
                )}
            </div>
          </div>
          <h1>{product.title}</h1>
          <p className="desc">{product.description}</p>
          <div className="price">
            <p className="p1">Destination From : {product.travelFrom}</p>
            <p
              className="p1"
              style={{
                borderBottom: "2px solid hsl(199, 100%, 33%)",
                marginBottom: "10px",
              }}
            >
              Destination To : {product.travelTo}
            </p>
            <p className="p1">Post Date : {product.validFrom}</p>
            <p className="p1">Expiry Date : {product.validTo}</p>
          </div>
          <div className="price">
            <div className="main-tag">
              <p>Price : $ {totalPrice}</p>
            </div>
          </div>

          <div className="buttons">
            <div className="amount">
              <button className="but-minus-plus" onClick={decreaseProductQty}>
                <FaMinus className="icon-plus-minus" />
              </button>
              <span className="span" data-qty>
                {qty}
              </span>
              <button className="but-minus-plus" onClick={increaseProductQty}>
                <FaPlus className="icon-plus-minus" />
              </button>
            </div>
            <button className="add-to-cart">
              <Link
                style={{ textDecoration: "none", color: "var(--inputfeild)" }}
                to={`/advertisements/${advertisementId}/booking`}
              >
                GO TO Booking
              </Link>
            </button>
            <button
              className="add-to-cart"
              onClick={() => handleWishlistClick(product.adID)}
            >
              Add to WishList
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Description;
