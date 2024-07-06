import React, { useEffect, useState } from "react";
import "./framework.css";
import "./master.css";

import img1 from "../../../../im&ve/user.jpg";
import img2 from "./imgs/welcome.png";
import { Link } from "react-router-dom";

import { FaDollarSign } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";

import authService from "../../../../Service/auth-service";

export function Sidebar() {
  return (
    <div className="sidebar mt bg-white p-20 p-relative">
      <ul style={{ marginTop: "80px" }} className="nav navbar-nav">
        <li>
          <Link
            to={"/Log_In"}
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            href="index.html"
          >
            <MdOutlineDashboardCustomize />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/UserList"}
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            href="settings.html"
          >
            <FaUser />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to={"/AdvertisementList"}
            className="d-flex align-center fs-14 c-black rad-6 p-10"
          >
            <RiAdvertisementFill />
            <span>Advertisements</span>
          </Link>
        </li>
        <li>
          <Link to={"/PermissionList"}
            className="d-flex align-center fs-14 c-black rad-6 p-10"
          >
            <FaCodePullRequest />
            <span>Permission Requests</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

// export function Head() {
//   return (
//     <div className="head bg-white p-15 between-flex">
//       <div class="search p-relative">
//         <input class="p-10" type="search" placeholder="Type A Keyword" />
//       </div>
//       <div class="icons d-flex align-center">
//         <span class="notification p-relative">
//           <i class="fa-regular fa-bell fa-lg" />
//         </span>
//         <img src="imgs/avatar.png" alt="" />
//       </div>
//     </div>
//   );
// }

function WelcomeWidget() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="welcome bg-white rad-10 txt-c-mobile block-mobile">
      <div className="intro p-20 d-flex space-between bg-eee">
        <div>
          <h2 className="m-0">Welcome</h2>
        </div>
        <img className="hide-mobile" src={img2} alt="" />
      </div>
      <img src={img1} alt="" class="avatar" />
      <div className="body txt-c d-flex p-20 mt-20 mb-20 block-mobile">
        <div>
          {`${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`}
          <span className="d-block c-grey fs-14 mt-10">Developer</span>
        </div>
      </div>
      <Link
        to={"/account"}
        className="visit d-block fs-14 bg-blue c-white w-fit btn btn-primary"
      >
        Profile
      </Link>
    </div>
  );
}

// Define other components in a similar manner

function App() {
  return (
    <div className="page d-flex ">
      <Sidebar />
      <div className="content w-full">
        {/* <Head /> */}
        <h1 className="p-relative">Dashboard</h1>
        <div className="wrapper d-grid gap-20">
          <WelcomeWidget />

          <div className="targets p-20 bg-white rad-10">
            <h2 className="mt-0 mb-10">Yearly Targets</h2>
            <p className="mt-0 mb-20 c-grey fs-15">Targets Of The Year</p>
            <div className="target-row mb-20 blue center-flex">
              <div className="icon center-flex">
                <FaDollarSign />
              </div>
              <div className="details">
                <span className="fs-14 c-grey">Money</span>
                <span className="d-block mt-5 mb-10 fw-bold">$20.000</span>
                <div className="progress p-relative">
                  <span className="bg-blue blue" style={{ width: "80%" }}>
                    <span className="bg-blue">80%</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="target-row mb-20 center-flex orange">
              <div className="icon center-flex">
                <FaCode />
              </div>
              <div className="details">
                <span className="fs-14 c-grey">Projects</span>
                <span className="d-block mt-5 mb-10 fw-bold">24</span>
                <div className="progress p-relative">
                  <span className="bg-orange orange" style={{ width: "55%" }}>
                    <span className="bg-orange">55%</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="target-row mb-20 center-flex green">
              <div className="icon center-flex">
                <FaUser />
              </div>
              <div className="details">
                <span className="fs-14 c-grey">Team</span>
                <span className="d-block mt-5 mb-10 fw-bold">12</span>
                <div className="progress p-relative">
                  <span className="bg-green green" style={{ width: "75%" }}>
                    <span className="bg-green">75%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Include other sections of the dashboard */}
      </div>
    </div>
  );
}

export default App;
