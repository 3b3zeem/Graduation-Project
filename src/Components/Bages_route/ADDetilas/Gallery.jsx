import React, { useState, useEffect } from "react";
import BackdropGallery from "./BackdropGallery";
import "./ADDetails.css";
import { useParams } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentPassedImage, setCurrentPassedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let { advertisementId, companyID } = useParams();

  const handleClick = (image) => {
    setCurrentImage(image);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Fetch images for the specific advertisement using adID
    fetch(`https://localhost:7120/api/advertisements/${advertisementId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response data contains an array of base64Images
        setImages(data.base64Images);
        setCurrentImage(data.base64Images[0]); // Set the first image as the current image
        setCurrentPassedImage(data.base64Images[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching images. Please try again later.");
        setLoading(false);
        console.error("Error fetching images:", error);
      });
  }, [advertisementId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          {currentImage && <img src={currentImage} alt="product" onClick={handleToggle} />}
        </div>
        <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
        />
        <div className="thumbnails">
          {images.map((image, index) => (
            <div
              className="img-holder"
              key={index}
              onClick={() => {
                handleClick(image);
              }}
            >
              <img src={image} alt={`product-${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
