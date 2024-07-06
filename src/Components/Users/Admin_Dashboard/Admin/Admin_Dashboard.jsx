import React, { useEffect, useState } from "react";
import "./framework.css";
import "./master.css";

import img1 from "../../../../im&ve/user.jpg";
import img2 from "./imgs/welcome.png";
import { Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { MdBookmarkAdded } from "react-icons/md";

import authService from "../../../../Service/auth-service";
import { FaBuildingUser } from "react-icons/fa6";

export function Sidebar() {
  return (
    <div className="sidebar p-20 p-relative">
      <ul style={{ marginTop: "80px" }} className="nav navbar-nav">
        <li>
          <Link
            to={"/Log_In"}
            className="d-flex align-center LinkOfAdminDashbord"
            href="index.html"
          >
            <MdOutlineDashboardCustomize />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/UserList"}
            className="d-flex align-center LinkOfAdminDashbord"
          >
            <FaUser />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/BookingList"}
            className="d-flex align-center LinkOfAdminDashbord"
          >
            <MdBookmarkAdded />
            <span>Books</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/AdvertisementList"}
            className="d-flex align-center LinkOfAdminDashbord"
          >
            <RiAdvertisementFill />
            <span>Advertisements</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/OfferList"}
            className="d-flex align-center LinkOfAdminDashbord"
          >
            <BiSolidOffer />
            <span>Offers</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/PermissionList"}
            className="d-flex align-center LinkOfAdminDashbord"
          >
            <FaCodePullRequest />
            <span>Permission Requests</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/CompanyList"}
            className="d-flex align-center LinkOfAdminDashbord"
          >
            <FaBuildingUser />
            <span>Companies</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/Role"}
            className="d-flex align-center LinkOfAdminDashbord"
          >
            <IoIosAddCircleOutline />
            <span>Give Role</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/RemoveRole"}
            className="d-flex align-center LinkOfAdminDashbord"
          >
            <CiCircleRemove />
            <span>Remove Role</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

// Define other components in a similar manner

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="page d-flex ">
      <Sidebar />
      <div className="content w-full">
        <h1 className="p-relative">Dashboard</h1>
        <div className="wrapper d-grid gap-20">
        <div className="welcome  rad-10 txt-c-mobile block-mobile">
      <div className="intro p-20 d-flex space-between ">
        <div>
          <h2 className="m-0">Welcome</h2>
        </div>
        <img className="hide-mobile" src={img2} alt="" />
      </div>
      <img src={img1} alt="" class="avatar" />
      <div className="body txt-c d-flex p-20 mt-20 mb-20 block-mobile">
        <div>
          {`${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`}
        </div>
      </div>
      <Link
        to={`/account/${currentUser?.userID || ""}`}
        className="visit d-block fs-14 bg-blue c-white w-fit btn btn-primary"
      >
        Profile
      </Link>
    </div>
        </div>
      </div>
    </div>
  );
}

export default App;
