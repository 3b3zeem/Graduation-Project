import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import authService from "./Service/auth-service";
import useLocalStorage from "use-local-storage";

//Home page
import Home from "./Components/Home/Home";
import Navbar from "./Components/NavBar/Navbar";
import Ready from "./Components/Home/Ready";
import Popular from "./Components/Home/Popular/Popular";
import Testimation from "./Components/Testimation/Testimation";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";
// import Trip from "./Components/Trip/Trip";
// import Ads from "./Components/Home/Ads";
import Earth from "./Components/Home/Earth/Earth.jsx";
import HPackges from "./Components/Home/packages/Packges";
import Timeline from "./Components/Home/Timeline";
// import Middle from "./Components/Home/Middle";
import InfinitiyScroll from "./Components/Home/InfiniteScroll/InfiniteScroll";
import CompanyHome from "./Components/Home/CompanyHome/CompanyHome";

//Auth page
import Registration from "./Components/Registration/Registration";
import Login from "./Components/Login/Login";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";

//Ads page
import Advertisements from "./Components/Bages_route/Advertisements/Advertisements";
import AdDetails from "./Components/Bages_route/Advertisements/OneDetail/AdDetails";
import AddAdvertisement from "./Components/Bages_route/Advertisements/Add/AddAdvertisement";
import EditAdvertisement from "./Components/Bages_route/Advertisements/Update/EditAdvertisement";
import AddReviews from "./Components/Bages_route/Reviews/Add/AddReviews";
import EditReviews from "./Components/Bages_route/Reviews/Update/EditReviews";
import AddOffers from "./Components/Bages_route/Offers/Add/AddOffers";
import EditOffers from "./Components/Bages_route/Offers/Update/EditOffres";
import OneOffer from "./Components/Bages_route/Offers/OneDetail/OneOffer";

//Booking Page
import BookingUser from "./Components/Bages_route/Booking/BookingUser";
import BookingList from "./Components/Users/Admin_Dashboard/BookingList/BookingList";
import OneBook from "./Components/Users/Admin_Dashboard/BookingList/OneBook";

//company page
import Companies from "./Components/Users/Company/Companies";
import Companyp from "./Components/Users/Company/Companyp";

//Admin & User % company pages
import UserProfile from "./Components/Users/UserProfileNew/Userprofile";
import LogedUser from "./Components/Users/Loged_User/LogedUser";
import UserList from "./Components/Users/Admin_Dashboard/UserList/UserList";
import AdvertisementList from "./Components/Users/Admin_Dashboard/Advertisement_List/AdvertisementList";
import Permission from "./Components/Users/Admin_Dashboard/PermissionRequests/Permission";
import EditPermission from "./Components/Users/Admin_Dashboard/PermissionRequests/EditPermission";
import OfferList from "./Components/Users/Admin_Dashboard/Offer_List/OfferList";
import EmailVerify from "./Components/Users/UserProfileNew/VerifyEmail/EmailVerify";
import ChangePassword from "./Components/Users/ChangePassword/ChangePassword";
// import Packges from "./Components/Home/packages/Packges";
import ForgetPassword from "./Components/Users/ForgetPassword/ForgetPassword";
import OneRequest from "./Components/Users/Admin_Dashboard/PermissionRequests/OneRequest/OneRequest";
import AddRequest from "./Components/Users/Admin_Dashboard/PermissionRequests/AddRequest/AddRequest";
import CompanyList from "./Components/Users/Admin_Dashboard/CompanyList/CompanyList";
import Role from "./Components/Users/Admin_Dashboard/Role/Role";
import RemoveRole from "./Components/Users/Admin_Dashboard/Role/RemoveRole";
import MyCompanies from "./Components/Users/UserProfileNew/MyCompanies";
import MyPermissions from "./Components/Users/UserProfileNew/MyPermissions";
import EditProfile from "./Components/Users/UserProfileNew/EditProfile";
import EditCompany from "./Components/Users/Company/EditCompany";
import WishList from "./Components/Bages_route/WilshList/WishList";
import CreateNewCompany from "./Components/Users/Admin_Dashboard/CompanyList/CreateNewCompany";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/registration";

  //navbar small screen
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  //scroll top
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="App" data-theme={theme}>
        <div className="top-to-btm">
          {showTopBtn && (
            <MdOutlineKeyboardDoubleArrowUp
              className="icon-position icon-style"
              onClick={goToTop}
            />
          )}
        </div>
        {!isLoading && !hideNavbar && <Navbar />}
        {!isLoading && (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <InfinitiyScroll />
                {/* <Ads /> */}
                {/* <Trip /> */}
                <Popular />
                {currentUser &&
                  currentUser.roles.includes("User") &&
                  currentUser.roles.length === 1 && <CompanyHome />}
                <HPackges />
                <Timeline />
                {/* <Middle /> */}
                {/* <Ready /> */}
                <Earth />
                <Testimation />
                <Footer />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />

          {/* Advertisement Route */}
          <Route path="/advertisements" element={<Advertisements />} />
          <Route
            path="/advertisements/:advertisementId"
            element={<AdDetails />}
          />
          <Route
            path="/advertisements/:companyID/:companyName/add"
            element={<AddAdvertisement />}
          />
          <Route
            path="/advertisements/:advertisementId/edit"
            element={<EditAdvertisement />}
          />
          <Route
            path="/advertisements/:advertisementId/addReview"
            element={<AddReviews />}
          />
          <Route
            path="/advertisements/:advertisementId/EditReview/:reviewId"
            element={<EditReviews />}
          />
          <Route
            path="/advertisements/:advertisementId/addOffer"
            element={<AddOffers />}
          />
          <Route
            path="/advertisements/Offers/:offerID"
            element={<OneOffer />}
          />
          <Route
            path="/advertisements/:offerID/update"
            element={<EditOffers />}
          />

          {/* Company Route */}
          <Route path="/Company" element={<Companies />} />
          <Route path="/Company/:companyID" element={<Companyp />} />
          <Route path="/Company/:companyID/Update" element={<EditCompany />} />

          {/* Admin & Company & User Profile */}
          <Route path="/Log_In" element={<LogedUser />} />
          <Route path="/account/:userID" element={<UserProfile />} />
          <Route
            path="/account/:userID/EditProfile"
            element={<EditProfile />}
          />
          <Route path="/account/verifyEmail" element={<EmailVerify />} />
          <Route path="/account/MyPermissions/:userID" element={<MyPermissions />} />
          <Route
            path="/account/MyCompanies/userID/:userID"
            element={<MyCompanies />}
          />
          <Route path="/account/changePassword" element={<ChangePassword />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/CompanyList" element={<CompanyList />} />
          <Route path="/CompanyList/CreateCompany" element={<CreateNewCompany />} />
          <Route path="/AdvertisementList" element={<AdvertisementList />} />
          <Route path="/PermissionList" element={<Permission />} />
          <Route path="/PermissionList/AddRequest" element={<AddRequest />} />
          <Route path="/PermissionList/:requestID" element={<OneRequest />} />
          <Route path="/OfferList" element={<OfferList />} />
          <Route
            path="/PermissionList/:requestID/Update"
            element={<EditPermission />}
          />
          <Route path="/Role" element={<Role />} />
          <Route path="/RemoveRole" element={<RemoveRole />} />

          <Route
            path="/advertisements/:advertisementId/booking"
            element={<BookingUser />}
          />
          <Route path="/Wishlist" element={<WishList />} />
          <Route path="/bookinglist" element={<BookingList />} />
          <Route path="/bookinglist/:bookingID" element={<OneBook />} />
        </Routes>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
