import React, { useEffect, useState } from "react";
import "./Navbar.scoped.css";
import useLocalStorage from "use-local-storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import authService from "../../Service/auth-service";

import { BiLogoMediumOld } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";
import { IoMdSunny } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { FaDashcube } from "react-icons/fa6";
import { Avatar } from "flowbite-react";

import img from "../../im&ve/user.jpg";
// import LogoAn from "./LogoAn";

const Navbar = () => {
  //Dark Mode
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  //Navbar Active
  const [active, setActive] = useState("navBar");
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  const removeNav = () => {
    setActive("navBar");
    setIsMenuOpen(false);
  };

  //Navbar Sticky
  const [transparent, settransparent] = useState("header");
  const adding = () => {
    if (window.scrollY >= 10) {
      settransparent("header activeNavHeader");
    } else {
      settransparent("header");
    }
  };
  window.addEventListener("scroll", adding);

  //Current User
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const navigate = useNavigate();

  //Logout
  const logout = () => {
    authService.Logout();
    navigate("/");
    window.location.reload();
  };

  //Open && Close User Overlay
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenuOnOutsideClick = (event) => {
    if (
      isMenuOpen &&
      !event.target.closest(".User_Info") &&
      !event.target.closest(".sub-menu")
    ) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [isMenuOpen]);
  const closeMenuOnClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <section className="app">
      <div className={transparent}>
        <div className="logoDiv">
          <Link to="/" className="logo">
            <BiLogoMediumOld className="icon menuIcon" />
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/" className="navLink">
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to="about" className="navLink">
                About
              </Link>
            </li>
            <li className="navItem">
              <Link to="/advertisements" className="navLink">
                Advertisements
              </Link>
            </li>
            {currentUser &&
              (currentUser.roles.includes("CompanyOwner") ||
                currentUser.roles.includes("Admin")) && (
                <li className="navItem">
                  <Link to="/Company" className="navLink">
                    Company
                  </Link>
                </li>
              )}
            <li className="navItem">
              <Link to="/contact" className="navLink">
                contact
              </Link>
            </li>
          </ul>
          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon menuIcon" />
          </div>
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto d-flex flex-row">
            <div onClick={toggleMenu} className="User_Info">
              <img src={img} className="user-pic" alt="User Profile" />
              <Avatar className="avatar" rounded>
                <div className="space-y-1 font-medium dark:text-white">
                  <div>User: {currentUser.username}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currentUser.email}
                  </div>
                </div>
              </Avatar>
            </div>
            <div
              className={`sub-menu-wrapper ${isMenuOpen ? "open-menu" : ""}`}
              id="subMenu"
            >
              <div className="sub-menu">
                <div className="user-info">
                  <FaRegUser className="icon img" />
                  <h2>{currentUser.username}</h2>
                </div>
                <hr />
                <Link
                  to={`/account/${currentUser?.userID || ""}`}
                  onClick={closeMenuOnClick}
                  className="sub-menu-link"
                >
                  <FaUserEdit className="icon img" />
                  <p>Account</p>
                  <span>{">"}</span>
                </Link>
                {currentUser &&
                  currentUser.roles.includes("CompanyOwner") &&
                  currentUser.roles.length === 2 && (
                    <Link
                      to={`/account/MyCompanies/userID/${currentUser.userID}`}
                      onClick={closeMenuOnClick}
                      className="sub-menu-link"
                    >
                      <FaDashcube className="icon img" />
                      <p>My Companies</p>
                      <span>{">"}</span>
                    </Link>
                  )}

                {currentUser &&
                  currentUser.roles.includes("Admin") &&
                  currentUser.roles.length === 2 && (
                    <Link
                      to={"/Log_In"}
                      onClick={closeMenuOnClick}
                      className="sub-menu-link"
                    >
                      <FaUserEdit className="icon img" />
                      <p>Admin Dashboard</p>
                      <span>{">"}</span>
                    </Link>
                  )}
                <Link
                  to={`/Wishlist`}
                  onClick={closeMenuOnClick}
                  className="sub-menu-link"
                >
                  <FiHeart className="icon img" />
                  <p>WishList</p>
                  <span>{">"}</span>
                </Link>

                {/* <a
                  href="#/"
                  onClick={closeMenuOnClick}
                  className="sub-menu-link"
                >
                  <GrUserSettings className="icon img" />
                  <p>Setting and Privacy</p>
                  <span>{">"}</span>
                </a>
                <a
                  href="#/"
                  onClick={closeMenuOnClick}
                  className="sub-menu-link"
                >
                  <MdContactSupport className="icon img" />
                  <p>Help and Support</p>
                  <span>{">"}</span>
                </a> */}
                <hr
                  style={{
                    height: "2px",
                    backgroundColor: "hsl(201, 33%, 16%)",
                  }}
                />
                <Link to={"/"} onClick={logout} className="sub-menu-link">
                  <SlLogout className="icon img" />
                  <p>Logout</p>
                  <span>{">"}</span>
                </Link>
              </div>
            </div>
            <button className="darkMode" onClick={switchTheme}>
              {theme === "light" ? <BsFillMoonStarsFill /> : <IoMdSunny />}
            </button>
          </div>
        ) : (
          <div className="headerBtns d-flex flex-row navbar-nav ms-auto">
            <button className="btn loginBtn">
              <Link to={"/login"}>Login</Link>
            </button>
            <button className="darkMode" onClick={switchTheme}>
              {theme === "light" ? <BsFillMoonStarsFill /> : <IoMdSunny />}
            </button>
          </div>
        )}

        <div onClick={showNav} className="togglrNavbar">
          <PiDotsNineBold className="icon" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
