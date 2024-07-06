import React from "react";
import "./CompanyHome.css";
import img1 from "../../../im&ve/Company-amico.png";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function CompanyHome(props) {
  return (
    <div className="PerantPage">
      <div className="ContantOfParent">
        <div className="RightSide">
          <div className="TitleOFCompany" data-aos="fade-right">
            <h1>Ready to be our partner?</h1>
          </div>
          <div
            className="DiscOFCompany"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <p>Get ready to meet our collaborators in the tourism sector.</p>
          </div>
          <div>
            <button data-aos="fade-up" className="btn-ready">
              <Link
                to={"./PermissionList/AddRequest"}
                className="btn-ready-Link"
              >
                GO NOW <HiArrowNarrowRight className="iIcon" />
              </Link>
            </button>
          </div>
        </div>
        <div className="LeftSideImg">
          <img
            data-aos="fade-down"
            src={img1}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyHome;
