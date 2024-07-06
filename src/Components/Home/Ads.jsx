import React from "react";
import img1 from "../../im&ve/1.jpg";
import "./Ads.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Ads() {
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

  return (
    <Carousel
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1500}
      showDots={true}
      responsive={responsive}
      className="carousel"
    >
      <div className="card">
        <img src={img1} alt="" />
        <h2>title</h2>
        <p>price</p>
        <p>description</p>
        <p>
          <button>Show Details</button>
        </p>
      </div>
      <div className="card">
        <img src={img1} alt="" />
        <h2>title2</h2>
        <p>price</p>
        <p>description</p>
        <p>
          <button>Show Details</button>
        </p>
      </div>

      <div className="card">
        <img src={img1} alt="" />
        <h2>title3</h2>
        <p>price</p>
        <p>description</p>
        <p>
          <button>Show Details</button>
        </p>
      </div>

      <div className="card">
        <img src={img1} alt="" />
        <h2>title4</h2>
        <p>price</p>
        <p>description</p>
        <p>
          <button>Show Details</button>
        </p>
      </div>

      <div className="card">
        <img src={img1} alt="" />
        <h2>title5</h2>
        <p>price</p>
        <p>description</p>
        <p>
          <button>Show Details</button>
        </p>
      </div>

      <div className="card">
        <img src={img1} alt="" />
        <h2>title6</h2>
        <p>price</p>
        <p>description</p>
        <p>
          <button>Show Details</button>
        </p>
      </div>
    </Carousel>
  );
}

export default Ads;
