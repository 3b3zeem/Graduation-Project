import { Link } from "react-router-dom";
import "./Contact.css";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";

import Aos from "aos";
import "aos/dist/aos.css";

const ContactUsPage = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <React.Fragment>
      <section className="image-all">
        <div className="secContainer">
          <div className="homeText">
            <h1 className="title">Contact Us</h1>
            <p className="subTitle">We are very happy contact us</p>
          </div>
        </div>
      </section>
      <div className="hello-there">
        <div className="hello">
          <h1 className="text-hello">Hello there...</h1>
        </div>
        <div className="dis">
          <p className="subTitle">
            <span>Momentum travel </span>is the builder and licenser of several
            custom travel booking management software products and services. <br />
            Whether you are a travel company, job seeker, potential client or an
            alliance member contact us for a technology partner that keeps you
            ahead of the curve.
          </p>
        </div>
      </div>

      <div className="Contact-block">
        <div className="Container-contact">
          <div className="image-of-contact">
            <h2>Get in Touch!</h2>
            <p>
              We will love to talk to you, get started by filling the details
              below and submit.
            </p>
          </div>
          <div className="contant-of-contact">
            <h3 className="text-contact">Contact US</h3>
            <form className="coll">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="input-feild5"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="input-feild5"
              />
              <input
                type="text"
                name="subject"
                required
                placeholder="Subject"
                className="input-feild5"
              />
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                required
                className="input-feild5"
              />
              <button
                className="btn-readyc3"
                type="submit"
                // onClick={sendMessage}
              >
                Send Message
              </button>
            </form>
            <div className="link2">
              <p>
                If you don't have an account, create one: <br />
                <Link to="/registration">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ContactUsPage;
