import React from "react";

import "./Trip.css"; // Import component styles

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import img1 from "../../im&ve/vert-1.jpg";
import img2 from "../../im&ve/vert-2.jpg";
import img3 from "../../im&ve/vert-3.jpg";
import img4 from "../../im&ve/vert-4.jpg";
import img5 from "../../im&ve/vert-5.jpg";
import img6 from "../../im&ve/vert-6.jpg";
import img7 from "../../im&ve/vert-7.jpg";

import { Link } from "react-router-dom";

function Trip() {
  return (
    <section className="section trip" id="trips">
      <div className="title">
        <h1 data-aos="zoom-in-up" >
          Plan Your <br />
          Trip With Us
        </h1>
        <p data-aos="fade-right">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          deserunt quaerat quasi earum veniam. Accusamus velit adipisci quidem
          obcaecati molestiae.
        </p>
        <Link data-aos="flip-left" to="/advertisements" className="btn">
          Explore All
        </Link>
      </div>

      <Swiper
        data-aos="fade-up"
        effect="coverflow"
        grabCursor="true"
        centeredSlides="true"
        spaceBetween={0}
        slidesPerView={4}
        loop="true"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 20,
          stretch: 25,
          depth: 250,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          700: {
            spaceBetween: 0,
            slidesPerView: 4,
          },
          500: {
            spaceBetween: 100,
            slidesPerView: 2,
          },
          411: {
            spaceBetween: 100,
            slidesPerView: 2,
          },
          300: {
            spaceBetween: 0,
            slidesPerView: 1,
          },
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper swiper-trip"
      >
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img7} alt="" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Trip;