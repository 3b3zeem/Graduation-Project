import React, { useEffect } from "react";
import "./Timeline.scoped.css";

import { GiPlainCircle } from "react-icons/gi";

import Aos from "aos";
import "aos/dist/aos.css";

const Timeline = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="tt">
      <div data-aos="fade-down">
        <h2 className="main-title">Steps for Upgrade Your Account to a Company Profile!</h2>
      </div>
      <div className="Timeline">
        <div
          data-aos="zoom-in-right"
          className="container-timeline left-container"
        >
          <GiPlainCircle className="icon-timeline" />
          <div className="text-box">
            <h2 className="number">
              0 <span>1</span>
            </h2>
            <h6>---</h6>
            <p>
              are you ready to elevate your status from an individual user to a
              company with us? Unlock exclusive features and benefits tailored
              for businesses.{" "}
            </p>
            <span className="left-container-arrow" />
          </div>
        </div>
        <div
          data-aos="zoom-in-left"
          className="container-timeline right-container"
        >
          <GiPlainCircle className="icon-timeline" />

          <div className="text-box">
            <h2 className="number">
              0 <span>2</span>
            </h2>
            <h6>---</h6>
            <p>
              Upgrade now to experience seamless transactions, advanced
              analytics, and dedicated support. Join the league of successful
              enterprises today!
            </p>
            <span className="right-container-arrow" />
          </div>
        </div>
        <div
          data-aos="zoom-in-right"
          className="container-timeline left-container"
        >
          <GiPlainCircle className="icon-timeline" />

          <div className="text-box">
            <h2 className="number">
              0 <span>3</span>
            </h2>
            <h6>---</h6>

            <p>
              Harness the Power of Enhanced Analytics: Dive deep into the heart
              of your business with comprehensive analytics and reporting tools.
              Gain valuable insights into customer behavior, market trends, and
              more, empowering you to make data-driven decisions that drive
              success.
            </p>
            <span className="left-container-arrow" />
          </div>
        </div>
        <div
          data-aos="zoom-in-left"
          className="container-timeline right-container"
        >
          <GiPlainCircle className="icon-timeline" />

          <div className="text-box">
            <h2 className="number">
              0 <span>4</span>
            </h2>
            <h6>---</h6>
            <p>
              Fill out the form below with your company details, and our team
              will reach out to you promptly.
            </p>
            <span className="right-container-arrow" />
          </div>
        </div>
        <div
          data-aos="zoom-in-right"
          className="container-timeline left-container"
        >
          <GiPlainCircle className="icon-timeline" />

          <div className="text-box">
            <h2 className="number">
              0 <span>5</span>
            </h2>
            <h6>---</h6>
            <p>
              Note: Your information is secure with us and will only be used for
              the purpose of upgrading your account.
            </p>
            <span className="left-container-arrow" />
          </div>
        </div>
        <div
          data-aos="zoom-in-left"
          className="container-timeline right-container"
        >
          <GiPlainCircle className="icon-timeline" />
          <div className="text-box">
            <h2 className="number">
              0 <span>6</span>
            </h2>
            <h6>---</h6>
            <p>
              embark on a journey of endless possibilities for your business
              success.
            </p>
            <span className="right-container-arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
