import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./ADDetails.css";

import NextIcon from "./Icons/NextIcon";
import PreviousIcon from "./Icons/PreviousIcon";
import { useParams } from "react-router-dom";

const MobileGallery = () => {
  const [images, setImages] = useState([]);
  const [currentMobileImageIndex, setCurrentMobileImageIndex] = useState(0);
  let { advertisementId, companyID } = useParams();
  useEffect(() => {
    // Fetch images for the specific advertisement using advertisementId
    fetch(`https://localhost:7120/api/advertisements/${advertisementId}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the images fetched from the API response
        setImages(data.base64Images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, [advertisementId]);

  const handleIncrement = () => {
    setCurrentMobileImageIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  const handleDecrement = () => {
    setCurrentMobileImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <section className="mobile-gallery hide-in-desktop">
      <IconButton
        className="icon-button-prev"
        disableRipple
        onClick={handleDecrement}
        sx={{
          height: "42px",
          width: "42px",
          bgcolor: "#fff",
        }}
      >
        <PreviousIcon />
      </IconButton>
      <img
        src={images[currentMobileImageIndex]}
        alt="featured-product"
        style={{ width: "100%", height: "auto" }}
      />
      <IconButton
        className="icon-button-next"
        disableRipple
        onClick={handleIncrement}
        sx={{
          height: "42px",
          width: "42px",
          bgcolor: "#fff",
        }}
      >
        <NextIcon />
      </IconButton>
    </section>
  );
};

export default MobileGallery;
