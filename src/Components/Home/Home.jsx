import React, { useEffect } from "react";
import "./Home.scoped.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Icons
import { HiArrowNarrowRight } from "react-icons/hi";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Images
import img1 from "../../im&ve/h1-rev-slide1-bckg.jpg";
import img2 from "../../im&ve/h1-rev-slide2-bckg.jpg";
import img3 from "../../im&ve/h1-rev-slide3-bckg.jpg";
import img4 from "../../im&ve/h1-rev-bottom.png";

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";

import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="home App">
      <Swiper
        style={{
          "--swiper-pagination-color": "#fff",
          "--swiper-pagination-color": "#59815b",
          "--swiper-pagination-bullet-width": "10px",
          "--swiper-pagination-bullet-height": "10px",
          "--swiper-pagination-bullet-border-radius": "0px",
          height: "700px",
        }}
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
          bulletClass: `swiper-pagination-bullet swiper-pagination-testClass`,
        }}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} alt="" className="zoomofimage" />
          <div className="text-content">
            <h2 data-aos="fade-up" className="title">
              Everyday urban concrete jungle{" "}
            </h2>
            <p data-aos="fade-up" data-aos-duration="1000">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              ipsam, molestiae quin odit impedit ipsa laborum expedita.
            </p>
            <button
              className="btn-readyc4"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              Read More <HiArrowNarrowRight className="iIcon" />
            </button>
            <img src={img4} alt="" className="imagesaved" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
          <div className="text-content">
            <h2 data-aos="fade-up" className="title">
              Amazon rainforest experiengee
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              ipsam, molestiae quin odit impedit ipsa laborum expedita.
            </p>
            <button className="btn-readyc4">
              Read More <HiArrowNarrowRight className="iIcon" />
            </button>
            <img src={img4} alt="" className="imagesaved" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <img src={img3} alt="" />
          <div className="text-content">
            <h2 data-aos="fade-up" className="title">
              Climbing in the swiss alps
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              ipsam, molestiae quin odit impedit ipsa laborum expedita.
            </p>
            <button className="btn-readyc4">
              Read More <HiArrowNarrowRight className="iIcon" />
            </button>
            <img src={img4} alt="" className="imagesaved" />
          </div>
        </SwiperSlide>
        <div className=" swiper-button-prev" />
        <div className=" swiper-button-next" />
      </Swiper>
    </div>
  );
};
export default Home;
