import React, { useEffect, useState } from "react";
import "./Userprofile.css";
import "./master.css";
import { MdContentPaste } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";

import Overlay from "../../Overlay/Overlay";
import authService from "../../../Service/auth-service";

import img from "../../../im&ve/user.jpg";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

function Userprofile() {
  const [isOverlayOpne, setisOverlayOpne] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [searchedAdvertisements, setSearchedAdvertisements] = useState([]);
  const { userID } = useParams();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedAdvertisements.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(searchedAdvertisements.length / itemsPerPage);

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // useEffect(() => {
  // const fetchUser = async ( username ) => {
  //   try {
  //     const response = await axios.get(
  //       `https://localhost:7120/api/User/ByUserName/${username}`
  //     );
  //     const user = response.data;
  //     console.log("User data:", user);
  //     setUserName(user.userName);
  //     setFirstName(user.firstName);
  //     setLastName(user.lastName);
  //     setEmail(user.email);
  //     setCountry(user.country);
  //     setCity(user.city);
  //     setAddress(user.address);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  //   fetchUser();
  // }, []);

  const handleInputChange = (setter, value) => {
    setter(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7120/api/User/UpdateDetails`, {
        userName,
        firstName,
        lastName,
        email,
        country,
        city,
        address,
      });
      console.log("Data updated successfully!");
      // Navigate("/advertisements");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="all-user">
        <div className="App-user">
          <div className="sidebar-user">
            <ul className="side-menu-user">
              {currentUser &&
                currentUser.roles.includes("Admin") &&
                currentUser.roles.length === 2 && (
                  <li className="hoverbtn">
                    <Link to={"/Log_In"}>
                      <MdOutlineDashboardCustomize className="bx-side" />
                      Dashboard
                    </Link>
                  </li>
                )}
              <li>
                <Link to={"/PermissionList/AddRequest"}>
                  <MdContentPaste className="bx-side" />
                  Become a partner
                </Link>
              </li>
              <li>
                <Link to={`/account/MyPermissions/${userID}`}>
                  <MdVerifiedUser className="bx-side" />
                  My Permissions
                </Link>
              </li>
              {currentUser &&
                currentUser.roles.includes("User") &&
                currentUser.roles.length === 1 && (
                  <>
                    <li>
                      <Link to={"/account/verifyEmail"}>
                        <MdVerifiedUser className="bx-side" />
                        Verify Your Email
                      </Link>
                    </li>
                  </>
                )}
              {currentUser &&
                currentUser.roles.includes("CompanyOwner") &&
                currentUser.roles.length === 2 && (
                  <>
                    <li>
                      <Link to={`/account/MyCompanies/userID/${userID}`}>
                        <MdContentPaste className="bx-side" />
                        My Companies
                      </Link>
                    </li>
                  </>
                )}
            </ul>
          </div>
        </div>

        <div className="content-user">
          <main>
            <div className="bottom_data">
              <div className="orders">
                <div className="form-and-pro">
                  <div className="form-user-pro">
                    <h1 className="p-relative header-text">Profile</h1>
                    <div className="profile-page m-20">
                      <div className="overview profile d-flex align-center">
                        <div className="avatar-box txt-c p-20">
                          <img className="rad-half mb-3" src={img} alt="" />
                          <h3 className="m-0 header-text">
                            {currentUser?.username || ""}
                          </h3>
                          <div className="d-flex align-items-center justify-content-center mt-3">
                            <Link
                              to={`/account/:${userID}/EditProfile`}
                              class="btn btn-primary"
                            >
                              Edit Profile
                            </Link>

                            <Link
                              to={"/account/changePassword"}
                              className="btn btn-success ms-2"
                            >
                              Change Password
                            </Link>
                          </div>
                        </div>
                        <div className="info-box w-full txt-c-mobile">
                          <div className="box p-20 d-flex align-center ">
                            <h4 className="m-0 w-full header-text">
                              General Information
                            </h4>
                            <div className="fs-14">
                              <span className="header-text">user Name: </span>
                              <span className="lower-text">
                                {currentUser?.username || ""}
                              </span>
                            </div>
                            <div className="fs-14">
                              <span className="header-text">First Name: </span>
                              <span className="lower-text">
                                {currentUser?.firstName || ""}
                              </span>
                            </div>
                            <div className="fs-14">
                              <span className="header-text">Last Name: </span>
                              <span className="lower-text">
                                {currentUser?.lastName || ""}
                              </span>
                            </div>
                            <div className="fs-14">
                              <span className="header-text">Email: </span>
                              <span className="lower-text">
                                {currentUser?.email || ""}
                              </span>
                            </div>
                            <div className="fs-14">
                              <span className="header-text">User ID: </span>
                              <span className="lower-text">
                                {currentUser?.userID || ""}
                              </span>
                            </div>
                          </div>

                          <div className="box p-20 d-flex align-center">
                            <h4 className="w-full m-0 header-text">
                              Geographical Information
                            </h4>
                            <div className="fs-14">
                              <span className="header-text">Country: </span>
                              <span className="lower-text">
                                {currentUser?.country || ""}
                              </span>
                            </div>
                            <div className="fs-14">
                              <span className="header-text">City: </span>
                              <span className="lower-text">
                                {currentUser?.city || ""}
                              </span>
                            </div>
                            <div className="fs-14">
                              <span className="header-text">Address: </span>
                              <span className="lower-text">
                                {currentUser?.address || ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {currentUser &&
                      currentUser.roles.includes("User") &&
                      currentUser.roles.length === 1 && (
                        <>
                          <div className="verification">
                            <h1>Hello {currentUser?.firstName || ""},</h1>
                            <h3>
                              Are you ready to gain access to all of the assets
                              we prepared for clients of MomentTravel?
                            </h3>
                            <hr className="row" />
                            <h4>
                              You must complete your Email by clicking on the
                              button in the sideBar (verify your email), This
                              link will verify your email address, and then
                              you’ll officially be a part of the community.
                            </h4>
                          </div>
                        </>
                      )}
                  </div>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-xl">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Edit Profile
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <label
                                  for="recipient-name"
                                  className="col-form-label"
                                >
                                  User Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="recipient-name"
                                  value={userName}
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label
                                  for="message-text"
                                  className="col-form-label"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="message-text"
                                  value={firstName}
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label
                                  for="message-text"
                                  className="col-form-label"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="message-text"
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label
                                  for="message-text"
                                  className="col-form-label"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="message-text"
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label
                                  for="message-text"
                                  className="col-form-label"
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="message-text"
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label
                                  for="message-text"
                                  className="col-form-label"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="message-text"
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label
                                  for="message-text"
                                  className="col-form-label"
                                >
                                  Address
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="message-text"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Send message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Userprofile;
