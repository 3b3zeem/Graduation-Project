import React, { useEffect } from "react";
import "./About.css";

import Footer from "../Footer/Footer";

import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoGoal } from "react-icons/go";

import image1 from "../../im&ve/about1.jpg";
import image2 from "../../im&ve/travel2.jpg";

import Aos from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div className="About-us-all">
        <div className="about-us-title">
          <h1>About Us</h1>
          <p>
            At <span>MomentTravel</span> ,we are dedicated to providing
            unforgettable travel experiences to our customers. We strive to make
            travel accessible, enjoyable, and hassle-free for all our clients.
            Our team is committed to delivering exceptional service and ensuring
            that every journey with us is filled with adventure, discovery, and
            memories that last a lifetime..
          </p>
          <ul className="list-social">
            <li>
              <a href="#/">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="#/">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#/">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="#/">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="#/">
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <section className="aboutus-home">
        <div data-aos="fade-right" className="aboutus-home-left">
          <img src={image1} alt="" />
        </div>
        <div className="aboutus-home-right">
          <h2 data-aos="fade-left" className="aboutus-home-heading">
            A Technology Company you can Trust!
          </h2>
          <p
            data-aos="fade-left"
            data-aos-duration="3000"
            className="aboutus-home-para"
          >
            "Our advanced travel system seamlessly integrates booking, itinerary
            management, and real-time updates for a hassle-free travel
            experience."
          </p>

          <div data-aos="fade-up" className="bot-user">
            <Link  to="/advertisements">Our Work</Link>
          </div>
        </div>
      </section>

      <section id="workFlow">
        <h2 data-aos="zoom-in" className="heading">
          The Crucial Moment in Establishing a Travel Company.
        </h2>
        <p data-aos="zoom-in" className="para">
          "During the establishment of a travel company, time becomes a critical
          moment where every minute serves as a station for building a vision
          that achieves service excellence and customer satisfaction."
        </p>
        <div className="num-container">
          <div data-aos="fade-right" className="num-item">
            <span>
              27,882 <br />
              Customers
            </span>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="3000"
            className="num-item"
          >
            <span>
              90% <br />
              Action Plans
            </span>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="4000"
            className="num-item"
          >
            <span>
              70,592 <br />
              Downloads
            </span>
          </div>
        </div>
      </section>

      <section id="goal">
        <div className="goal-left">
          <h2 data-aos="fade-right">
            <GoGoal className="iconGoal" />
            Our Goal
          </h2>
          <p data-aos="fade-right" data-aos-duration="4000">
            Our goal is to provide unparalleled service and satisfaction to our
            customers, ensuring their needs are met with precision and care.
          </p>
          <ul data-aos="fade-down-right">
            <li>
              Drive our actions, guiding us towards success and fulfillment in
              every endeavor
            </li>
            <li>
              numerous and diverse, serve as beacons illuminating the path to
              our collective vision of achievement and growth
            </li>
            <li>
              manifold and ambitious, propel us forward, shaping our journey
              towards excellence and innovation in all aspects of our endeavors
            </li>
          </ul>
          <div data-aos="fade-up" className="bot-user">
            <Link   to={"/contact"}>Contact Us</Link>
          </div>
        </div>
        <div data-aos="fade-left" className="goal-right">
          <img src={image2} alt="" />
        </div>
      </section>

      <section id="our-Team">
        <h2>Our Member</h2>
        <div className="teamContainer">
          <div data-aos="fade-up" className="team-item">
            <img src={image1} alt="" />
            <h5 className="member-name">Ebrahim Salah</h5>
            <span className="role">Front End</span>
            <div className="social-media-links">
              <a href="#/" target="_blank">
                <FaTwitter />
              </a>
              <a href="#/" target="_blank">
                <FaFacebook />
              </a>
              <a href="#/" target="_blank">
                <FaInstagram />
              </a>
              <a href="#/" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
          <div
            data-aos="fade-down"
            data-aos-duration="3000"
            className="team-item"
          >
            <img src={image1} alt="" />
            <h5 className="member-name">Ahmed Mostafa</h5>
            <span className="role">Front End</span>
            <div className="social-media-links">
              <a href="#/" target="_blank">
                <FaTwitter />
              </a>
              <a href="#/" target="_blank">
                <FaFacebook />
              </a>
              <a href="#/" target="_blank">
                <FaInstagram />
              </a>
              <a href="#/" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="4000"
            className="team-item"
          >
            <img src={image1} alt="" />
            <h5 className="member-name">Mostafa Hossam</h5>
            <span className="role">Front End</span>
            <div className="social-media-links">
              <a href="#/" target="_blank">
                <FaTwitter />
              </a>
              <a href="#/" target="_blank">
                <FaFacebook />
              </a>
              <a href="#/" target="_blank">
                <FaInstagram />
              </a>
              <a href="#/" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
          <div
            data-aos="fade-down"
            data-aos-duration="5000"
            className="team-item"
          >
            <img src={image1} alt="" />
            <h5 className="member-name">Mohamed Ayman</h5>
            <span className="role">Back End</span>
            <div className="social-media-links">
              <a href="#/" target="_blank">
                <FaTwitter />
              </a>
              <a href="#/" target="_blank">
                <FaFacebook />
              </a>
              <a href="#/" target="_blank">
                <FaInstagram />
              </a>
              <a href="#/" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="6000"
            className="team-item"
          >
            <img src={image1} alt="" />
            <h5 className="member-name">Amr Talat</h5>
            <span className="role">Back End</span>
            <div className="social-media-links">
              <a href="#/" target="_blank">
                <FaTwitter />
              </a>
              <a href="#/" target="_blank">
                <FaFacebook />
              </a>
              <a href="#/" target="_blank">
                <FaInstagram />
              </a>
              <a href="#/" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
          <div
            data-aos="fade-down"
            data-aos-duration="7000"
            className="team-item"
          >
            <img src={image1} alt="" />
            <h5 className="member-name">Gerges Malak</h5>
            <span className="role">Back End</span>
            <div className="social-media-links">
              <a href="#/" target="_blank">
                <FaTwitter />
              </a>
              <a href="#/" target="_blank">
                <FaFacebook />
              </a>
              <a href="#/" target="_blank">
                <FaInstagram />
              </a>
              <a href="#/" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
