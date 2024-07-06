import React, { useState, useEffect } from "react";
import { Backdrop, IconButton } from "@mui/material";
import "./ADDetails.css";
import CloseIcon from "./Icons/CloseIcon";
import PreviousIcon from "./Icons/PreviousIcon";
import NextIcon from "./Icons/NextIcon";
import { useParams } from "react-router-dom";

const BackdropGallery = ({ open, handleClose, currentPassedImage}) => {
  const [images, setImages] = useState([]);
  const [backdropImage, setBackdropImage] = useState(currentPassedImage);
  const [currentPassedImageIndex, setCurrentPassedImageIndex] = useState(0);
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

  useEffect(() => {
    setBackdropImage(currentPassedImage);
    setCurrentPassedImageIndex(images.indexOf(currentPassedImage));
  }, [currentPassedImage, images]);

  const handleClick = (index) => {
    setBackdropImage(images[index]);
    setCurrentPassedImageIndex(index);
  };

  const handleIncrement = () => {
    const newIndex = (currentPassedImageIndex + 1) % images.length;
    setBackdropImage(images[newIndex]);
    setCurrentPassedImageIndex(newIndex);
  };

  const handleDecrement = () => {
    const newIndex =
      (currentPassedImageIndex - 1 + images.length) % images.length;
    setBackdropImage(images[newIndex]);
    setCurrentPassedImageIndex(newIndex);
  };

  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };

  return (
    <Backdrop
      className="backdrop"
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <section className="backdrop-content">
        <IconButton
          onClick={handleClose}
          sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
        >
          <CloseIcon fillColor={"#fff"} />
        </IconButton>
        <div className="image">
          <IconButton
            className="icon-button-prev"
            disableRipple
            onClick={() => {
              handleDecrement();
              removeActivatedClass(
                document.querySelector(".backdrop-content .thumbnails")
              );
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <PreviousIcon />
          </IconButton>
          <IconButton
            className="icon-button-next"
            disableRipple
            onClick={() => {
              handleIncrement();
              removeActivatedClass(
                document.querySelector(".backdrop-content .thumbnails")
              );
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <NextIcon />
          </IconButton>
          <img
            src={backdropImage}
            alt="selected-product"
            style={{ cursor: "auto" }}
          />
        </div>
        <div className="thumbnails">
          {images.map((th, index) => {
            return (
              <div
                className="img-holder-backd"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div
                  className={`outlay ${
                    index === currentPassedImageIndex && "activated"
                  }`}
                ></div>
                <img src={th} alt={`product-${index + 1}`} />
              </div>
            );
          })}
        </div>
      </section>
    </Backdrop>
  );
};

export default BackdropGallery;
