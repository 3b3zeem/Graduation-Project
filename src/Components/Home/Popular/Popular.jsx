import React, { useEffect, useState } from "react";
import "./Popular.css";
import { BsArrowRightShort } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Popular = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 2000 });

    // Fetch advertisement data from API endpoint
    fetch("https://localhost:7120/api/advertisements")
      .then((response) => response.json())
      .then((data) => {
        setAdvertisements(data)
        fetchBase64ImagesForAdvertisements(data)
      }
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [showMore, setShowMore] = useState(false);
  const truncateDescription = (description) => {
    const maxLength = 100; // Set your desired maximum length
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };
  const [adImages, setAdImages] = useState({});
  const fetchBase64ImagesForAdvertisements = (advertisements) => {
    advertisements.forEach((ad) => {
      const images = ad.base64Images.map((image) => {
        return {
          src: image,
        };
      });
      setAdImages((prevImages) => ({
        ...prevImages,
        [ad.adID]: images,
      }));
    });
  };



  return (
    <>
      <section className="popular section container">
        <div className="secContainer">
          <div className="secHeader flex">
            <div className="textDiv">
              <h2 data-aos="fade-right" className="textTitle">
                Popular Destinations
              </h2>
              <p data-aos="fade-right" data-aos-duration="3000">
                From historical cities to natural spectacles, come see the best
                of the world
              </p>
            </div>
          </div>

          <div className="mainContent grid">
            {advertisements
              .slice(0, 8)
              .map((advertisement) => (
                <div
                  key={advertisement.adID}
                  data-aos="zoom-in-right"
                  className="singleDestination"
                >
                  <div className="detImage">
                    {adImages[advertisement.adID] && adImages[advertisement.adID][0] && (
                      <img src={adImages[advertisement.adID][2].src} />
                    )}
                    <div className="overlayInfo">
                      <h3>{advertisement.title}</h3>
                      <p>
                        {truncateDescription(advertisement.description)}
                      </p>
                      {!showMore && advertisement.description.length > 100 && (
                        <Link to={`/advertisements/${advertisement.adID}`}>
                          <BsArrowRightShort className="icon" />
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="destFooter">
                    <div className="number">{advertisement.adID}</div>
                    <div className="destText flex">
                      <h6>
                        {advertisement.travelFrom} <FaArrowRightLong /> {advertisement.travelTo}
                      </h6>
                      <span className="flex">
                        <span className="dot">
                          <BsDot className="icon" />
                        </span>
                        Dot
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Popular;
