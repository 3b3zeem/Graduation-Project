import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Advertisements.css";
import Swal from "sweetalert2";
import Chome from "../../Chome/Chome";
import Footer from "../../Footer/Footer";
import img1 from "../../../im&ve/1.jpg";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import { Button, Modal } from "react-bootstrap";
import { VscSettings } from "react-icons/vsc";

import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import authService from "../../../Service/auth-service";

import Slider from "@mui/material/Slider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "font-awesome/css/font-awesome.min.css";
import { FaStar } from "react-icons/fa";
import { CiStar, CiWarning } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import img10 from "../../../im&ve/Offers/10-percent_13308617.png";
import img20 from "../../../im&ve/Offers/20-percent_13308644.png";
import img30 from "../../../im&ve/Offers/30-percent_13308662 (1).png";
import img40 from "../../../im&ve/Offers/discount_13308677.png";
import img50 from "../../../im&ve/Offers/50-percent_13308689.png";
import img60 from "../../../im&ve/Offers/60-percent_13308701.png";
import img70 from "../../../im&ve/Offers/70-percent_13308712.png";
import img80 from "../../../im&ve/Offers/80-percent_13308718.png";
import img90 from "../../../im&ve/Offers/90-percent_13308724.png";

import { Bounce, ToastContainer, toast } from "react-toastify";

const Advertisements = () => {
  const [advertisement, setAdvertisement] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchedAdvertisements, setSearchedAdvertisements] = useState([]);
  const [adImages, setAdImages] = useState({});
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  // Fetch all Advertisements
  const getAllAdvertisements = async () => {
    try {
      const response = await fetch("https://localhost:7120/api/advertisements");
      if (!response.ok) {
        throw new Error("Failed to fetch advertisements");
      }
      const data = await response.json();
      setAdvertisement(data);
      setSearchedAdvertisements(data);
      fetchBase64ImagesForAdvertisements(data);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };
  // Fetch base64 images for advertisements
  const fetchBase64ImagesForAdvertisements = (advertisements) => {
    advertisements.forEach((ad) => {
      const images = ad.base64Images.map((image) => {
        return {
          src: image,
        };
      });
      setAdImages((prevImages) => ({
        ...prevImages,
        [ad.adID]: images,
      }));
    });
  };

  useEffect(() => {
    getAllAdvertisements();
    fetchOffers();
  }, []);

  //Delete advertisement
  const deleteAdvertisement = (advertisementId) => {
    Swal.fire({
      title: "Are you sure to Delete this Advertisement!?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7120/api/advertisements/${advertisementId}`, {
          method: "DELETE",
        })
          .then(() => getAllAdvertisements())
          .catch((error) => console.error("Error deleting product:", error));
      }
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //This is for offers
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  //this is to get data of offers
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    getAllAdvertisements();
    fetchOffers();
  }, []);

  //Fetch Offers
  const fetchOffers = async () => {
    try {
      const response = await fetch("https://localhost:7120/api/offers");
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      setOffers(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  //delete offer
  const deleteOffer = (offerID) => {
    Swal.fire({
      title: "Are you sure to Delete this Offer!?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7120/api/offers/${offerID}`, {
          method: "DELETE",
        })
          .then(() => fetchOffers())
          .catch((error) => console.error("Error deleting product:", error));
      }
    });
  };

  //Search according to input search
  const filterAdvertisementsBySearch = (query) => {
    const filteredAds = advertisement.filter(
      (ad) =>
        ad.title.toLowerCase().includes(query.toLowerCase()) ||
        ad.companyName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedAdvertisements(filteredAds);
    setCurrentPage(1);
  };
  //handle search input
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 1) {
      filterAdvertisementsBySearch(query);
    } else {
      getAllAdvertisements();
    }
  };

  // Filter advertisements by price range
  const filterAdvertisementsByPriceRange = () => {
    const filteredAds = advertisement.filter(
      (ad) => ad.price >= priceRange[0] && ad.price <= priceRange[1]
    );
    setSearchedAdvertisements(filteredAds);
    setCurrentPage(1);
  };
  // Handle price range change
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    filterAdvertisementsByPriceRange();
  };

  // Handle sorting by price (ascending and descending)
  const handleSortByPrice = (sortByPrice) => {
    const sortedAds = [...searchedAdvertisements].sort((a, b) =>
      sortByPrice === "asc" ? a.price - b.price : b.price - a.price
    );
    setSortBy(sortByPrice);
    setSelectedSortOption("price");
    setSearchedAdvertisements(sortedAds);
  };
  // Handle sorting by destination (short to long and long to short)
  const handleSortByDuration = (sortByDeuration) => {
    const sortedAds = [...searchedAdvertisements].sort((a, b) => {
      const durationA = calculateDuration(a.validFrom, a.validTo);
      const durationB = calculateDuration(b.validFrom, b.validTo);

      return sortByDeuration === "asc"
        ? durationA - durationB
        : durationB - durationA;
    });

    setSortBy(sortByDeuration);
    setSelectedSortOption("destination");
    setSearchedAdvertisements(sortedAds);
  };
  // Function to calculate duration in days
  const calculateDuration = (validFrom, validTo) => {
    const startDate = new Date(validFrom);
    const endDate = new Date(validTo);
    const differenceMilliseconds = endDate - startDate;
    return Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24));
  };

  // Filter advertisements based on selected duration
  const handleDurationFilterChange = (duration) => {
    setSelectedDuration(duration);
    const filteredAds = advertisement.filter((ad) => {
      const durationInDays = calculateDuration(ad.validFrom, ad.validTo);
      switch (duration) {
        case "1-day":
          return durationInDays === 1;
        case "2-4-days":
          return durationInDays >= 2 && durationInDays <= 4;
        case "5-10-days":
          return durationInDays >= 5 && durationInDays <= 10;
        case "above-10-days":
          return durationInDays > 10;
        default:
          return true; // Return true for no filter
      }
    });
    setSearchedAdvertisements(filteredAds);
    setCurrentPage(1);
  };

  // // Filter advertisements based on selected rating
  // const handleRatingFilterChange = (rating) => {
  //   setSelectedRating(rating);
  //   const filteredAds = advertisement.filter((ad) => {
  //     switch (rating) {
  //       case "2-stars":
  //         return ad.rating >= 2;
  //       case "3-stars":
  //         return ad.rating >= 3;
  //       case "4-stars":
  //         return ad.rating >= 4;
  //       case "5-stars":
  //         return ad.rating >= 5;
  //       default:
  //         return true; // Return true for no filter
  //     }
  //   });
  //   setSearchedAdvertisements(filteredAds);
  //   setCurrentPage(1);
  // };

  // Function to reset sorting and display all advertisements without sorting
  const handleShowAllAdvertisements = () => {
    setSelectedDuration(""); // Reset duration filter
    setSelectedRating(null); // Reset rating filter
    setSearchQuery(""); // Reset search query
    setPriceRange([0, 1000]); // Reset price range filter
    setSortBy(""); // Reset sorting
    setSelectedSortOption(""); // Reset selected sorting option
    getAllAdvertisements(); // Fetch all advertisements
  };

  //pagination function
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

  const getDiscountImage = (discountAmount) => {
    if (discountAmount === 10) {
      return img10;
    } else if (discountAmount === 20) {
      return img20;
    } else if (discountAmount === 30) {
      return img30;
    } else if (discountAmount === 40) {
      return img40;
    } else if (discountAmount === 50) {
      return img50;
    } else if (discountAmount === 60) {
      return img60;
    } else if (discountAmount === 70) {
      return img70;
    } else if (discountAmount === 80) {
      return img80;
    } else if (discountAmount === 90) {
      return img90;
    } else {
      return img1;
    }
  };

  //Show More in ads description
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const truncateDescription = (description) => {
    const maxLength = 100;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "....";
    }
    return description;
  };
  const handleShowMore = (adID) => {
    setShowMore(true);
    navigate(`/advertisements/${adID}`);
  };

  //Wishlist
  const [clickedAds, setClickedAds] = useState([]);
  useEffect(() => {
    const storedClickedAds =
      JSON.parse(localStorage.getItem("clickedAds")) || [];
    setClickedAds(storedClickedAds);
  }, []);
  const handleClick = (adID) => {
    setClickedAds((prevClickedAds) => {
      const isClicked = prevClickedAds.includes(adID);
      if (isClicked) {
        return prevClickedAds;
      }

      const updatedClickedAds = [...prevClickedAds, adID];
      localStorage.setItem("clickedAds", JSON.stringify(updatedClickedAds));
      return updatedClickedAds;
    });
  };
  const handleWishlistClick = async (adId) => {
    try {
      const user = authService.getCurrentUser();
      if (!user.token) {
        console.error("No authorization token available.");
        return;
      }

      const isAlreadyAdded = clickedAds.includes(adId);
      if (isAlreadyAdded) {
        toast.warning("Already added to wishlist!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      const response = await fetch(
        `https://localhost:7120/api/Wishlist?AdId=${adId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        handleClick(adId);
        toast.success("Added Successfully to wishlist!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        console.error("Failed to add to wishlist:", response.status);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  //this is for overlay filters
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <ToastContainer />
      <Chome />
      <div className="container-product">
        <div className="slider-ofoffers">
          <div className="about-offres">
            <h3>Special Offers</h3>
            <p>Enjoy Amazing Offers</p>
          </div>
          <Carousel responsive={responsive}>
            {offers.map((offer) => (
              <div className="card-ad-company" key={offer.offerID}>
                <div className="card-ad-company-offres">
                  <img src={getDiscountImage(offer.discountAmount)} alt="" />

                  <div className="info-offers-slider">
                    <h3 className="Hh1">{offer.offerName}</h3>
                    <p>{offer.details}</p>
                    <p>{offer.discountAmount}%</p>
                    <div className="disflex-buttons">
                      <Link
                        className="btn-edit-view-delet"
                        to={`/advertisements/Offers/${offer.offerID}`}
                      >
                        View
                      </Link>
                      {currentUser &&
                        ((currentUser.roles.includes("CompanyOwner") ||
                          currentUser.roles.includes("Admin")) && (
                          <>
                            <div className="disflex-buttons">
                              <button
                                className="btn-edit-view-delet"
                                onClick={() => deleteOffer(offer.offerID)}
                              >
                                <span>Delete</span>
                              </button>
                              <Link
                                className="btn-edit-view-delet"
                                to={`/advertisements/${offer.offerID}/update`}
                              >
                                Edit
                              </Link>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        {/* filters */}
        <div className="container-product-cards">
          <div className="side-bar-ofads">
            <div className="first-section-filters">
              <div className="form-container">
                <div className="title-fitlers">
                  <button
                    className="btn btn-primary"
                    onClick={handleShowAllAdvertisements}
                  >
                    Clear Filters
                  </button>
                </div>
                {/* Search */}
                <div class="heading p-15 between-flex">
                  <div className="searching p-relative">
                    <input
                      className="p-10"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      type="search"
                      placeholder="Search an advertisement"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className=" all-max-min-block">
                  <div className="aboutfilter-price">
                    <h3 style={{ width: "30" }}>Price</h3>
                    <h3 style={{ textAlign: "right" }}>
                      $ {priceRange.toString().replace(",", " > ")}
                    </h3>
                  </div>
                  <div className="d-flex flex-column gap-2 max-min-block">
                    <Slider
                      className="max-min-range"
                      getAriaLabel={() => "Price range"}
                      value={priceRange}
                      onChange={handlePriceRangeChange}
                      min={0}
                      max={1000}
                      valueLabelDisplay="auto"
                      disableSwap
                    />
                  </div>
                </div>

                {/* Rating 
                <div className="companeys-filters">
                  <div className="aboutcompany-names-filter">
                    <h3>Rating</h3>
                  </div>
                  <div className="company-names-filter">
                    <div className="checkbox-wrapper-33">
                      <label className="checkbox">
                        <input
                          className="checkbox__trigger visuallyhidden"
                          type="radio"
                          name="rating"
                          value="2-stars"
                          onChange={() => handleRatingFilterChange("2-stars")}
                        />
                        <span className="checkbox__symbol">
                          <svg
                            aria-hidden="true"
                            className="icon-checkbox"
                            width="28px"
                            height="28px"
                            viewBox="0 0 28 28"
                            version="1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4 14l8 7L24 7" />
                          </svg>
                        </span>
                        <p
                          style={{ color: "#fed141" }}
                          className="checkbox__textwrapper ms-2"
                        >
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                        </p>
                      </label>
                    </div>
                    <div className="checkbox-wrapper-33">
                      <label className="checkbox">
                        <input
                          className="checkbox__trigger visuallyhidden"
                          type="radio"
                          name="rating"
                          value="3-stars"
                          onChange={() => handleRatingFilterChange("3-stars")}
                        />
                        <span className="checkbox__symbol">
                          <svg
                            aria-hidden="true"
                            className="icon-checkbox"
                            width="28px"
                            height="28px"
                            viewBox="0 0 28 28"
                            version="1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4 14l8 7L24 7" />
                          </svg>
                        </span>
                        <p
                          style={{ color: "#fed141" }}
                          className="checkbox__textwrapper ms-2"
                        >
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                        </p>
                      </label>
                    </div>
                    <div className="checkbox-wrapper-33">
                      <label className="checkbox">
                        <input
                          className="checkbox__trigger visuallyhidden"
                          type="radio"
                          name="rating"
                          value="4-stars"
                          onChange={() => handleRatingFilterChange("4-stars")}
                        />
                        <span className="checkbox__symbol">
                          <svg
                            aria-hidden="true"
                            className="icon-checkbox"
                            width="28px"
                            height="28px"
                            viewBox="0 0 28 28"
                            version="1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4 14l8 7L24 7" />
                          </svg>
                        </span>
                        <p
                          style={{ color: "#fed141" }}
                          className="checkbox__textwrapper ms-2"
                        >
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                        </p>
                      </label>
                    </div>
                    <div className="checkbox-wrapper-33">
                      <label className="checkbox">
                        <input
                          className="checkbox__trigger visuallyhidden"
                          type="radio"
                          name="rating"
                          value="5-stars"
                          onChange={() => handleRatingFilterChange("5-stars")}
                        />
                        <span className="checkbox__symbol">
                          <svg
                            aria-hidden="true"
                            className="icon-checkbox"
                            width="28px"
                            height="28px"
                            viewBox="0 0 28 28"
                            version="1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4 14l8 7L24 7" />
                          </svg>
                        </span>
                        <p
                          style={{ color: "#fed141" }}
                          className="checkbox__textwrapper ms-2"
                        >
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                          <CiStar style={{ fontSize: "25px" }} />
                        </p>
                      </label>
                    </div>
                  </div>
                </div> */}

                {/* Duration */}
                <div className="companeys-filters">
                  <div className="aboutcompany-names-filter">
                    <h3>Duration</h3>
                  </div>
                  <div className="company-names-filter">
                    <div className="company-name-filter">
                      <div class="checkbox-wrapper-33">
                        <label class="checkbox">
                          <input
                            class="checkbox__trigger visuallyhidden"
                            type="radio"
                            name="deliveryTime"
                            value="1-day"
                            onChange={() => handleDurationFilterChange("1-day")}
                          />
                          <span class="checkbox__symbol">
                            <svg
                              aria-hidden="true"
                              class="icon-checkbox"
                              width="28px"
                              height="28px"
                              viewBox="0 0 28 28"
                              version="1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 14l8 7L24 7" />
                            </svg>
                          </span>
                          <p class="checkbox__textwrapper">1 day</p>
                        </label>
                      </div>
                      <div class="checkbox-wrapper-33">
                        <label class="checkbox">
                          <input
                            class="checkbox__trigger visuallyhidden"
                            type="radio"
                            name="deliveryTime"
                            value="2-4-days"
                            onChange={() =>
                              handleDurationFilterChange("2-4-days")
                            }
                          />
                          <span class="checkbox__symbol">
                            <svg
                              aria-hidden="true"
                              class="icon-checkbox"
                              width="28px"
                              height="28px"
                              viewBox="0 0 28 28"
                              version="1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 14l8 7L24 7" />
                            </svg>
                          </span>
                          <p class="checkbox__textwrapper">2-4 days</p>
                        </label>
                      </div>
                      <div class="checkbox-wrapper-33">
                        <label class="checkbox">
                          <input
                            class="checkbox__trigger visuallyhidden"
                            type="radio"
                            name="deliveryTime"
                            value="5-10-days"
                            onChange={() =>
                              handleDurationFilterChange("5-10-days")
                            }
                          />
                          <span class="checkbox__symbol">
                            <svg
                              aria-hidden="true"
                              class="icon-checkbox"
                              width="28px"
                              height="28px"
                              viewBox="0 0 28 28"
                              version="1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 14l8 7L24 7" />
                            </svg>
                          </span>
                          <p class="checkbox__textwrapper">5-10 days</p>
                        </label>
                      </div>
                      <div class="checkbox-wrapper-33">
                        <label class="checkbox">
                          <input
                            class="checkbox__trigger visuallyhidden"
                            type="radio"
                            name="deliveryTime"
                            value="above-10-days"
                            onChange={() =>
                              handleDurationFilterChange("above-10-days")
                            }
                          />
                          <span class="checkbox__symbol">
                            <svg
                              aria-hidden="true"
                              class="icon-checkbox"
                              width="28px"
                              height="28px"
                              viewBox="0 0 28 28"
                              version="1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 14l8 7L24 7" />
                            </svg>
                          </span>
                          <p class="checkbox__textwrapper">above 10 days</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Advertisements */}
          <div className="all-ads-of-companys">
            <div className="products-all">
              <h3 className="mb-4">{searchedAdvertisements.length} results</h3>
              <React.Fragment>
                <Button
                  variant="primary"
                  className="overlayfilters"
                  onClick={handleShow}
                >
                  <VscSettings style={{ fontSize: "23px" }} />
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Filters</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="first-section-filters">
                      <div className="form-container">
                        <div className="title-fitlers">
                          <button
                            className="btn btn-primary"
                            onClick={handleShowAllAdvertisements}
                          >
                            Clear Filters
                          </button>
                        </div>
                        {/* Search */}
                        <div class="heading p-15 between-flex">
                          <div className="searching p-relative">
                            <input
                              className="p-10"
                              value={searchQuery}
                              onChange={handleSearchInputChange}
                              type="search"
                              placeholder="Search an advertisement"
                            />
                          </div>
                        </div>

                        {/* Price */}
                        <div className=" all-max-min-block">
                          <div className="aboutfilter-price">
                            <h3 style={{ width: "30" }}>Price</h3>
                            <h3 style={{ textAlign: "right" }}>
                              $ {priceRange.toString().replace(",", " > ")}
                            </h3>
                          </div>
                          <div className="d-flex flex-column gap-2 max-min-block">
                            <Slider
                              className="max-min-range"
                              getAriaLabel={() => "Price range"}
                              value={priceRange}
                              onChange={handlePriceRangeChange}
                              min={0}
                              max={1000}
                              valueLabelDisplay="auto"
                              disableSwap
                            />
                          </div>
                        </div>

                        {/* Rating 
                        <div className="companeys-filters">
                          <div className="aboutcompany-names-filter">
                            <h3>Rating</h3>
                          </div>
                          <div className="company-names-filter">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input
                                  className="checkbox__trigger visuallyhidden"
                                  type="radio"
                                  name="rating"
                                  value="2-stars"
                                  onChange={() =>
                                    handleRatingFilterChange("2-stars")
                                  }
                                />
                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>
                                <p
                                  style={{ color: "#fed141" }}
                                  className="checkbox__textwrapper ms-2"
                                >
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                </p>
                              </label>
                            </div>
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input
                                  className="checkbox__trigger visuallyhidden"
                                  type="radio"
                                  name="rating"
                                  value="3-stars"
                                  onChange={() =>
                                    handleRatingFilterChange("3-stars")
                                  }
                                />
                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>
                                <p
                                  style={{ color: "#fed141" }}
                                  className="checkbox__textwrapper ms-2"
                                >
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                </p>
                              </label>
                            </div>
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input
                                  className="checkbox__trigger visuallyhidden"
                                  type="radio"
                                  name="rating"
                                  value="4-stars"
                                  onChange={() =>
                                    handleRatingFilterChange("4-stars")
                                  }
                                />
                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>
                                <p
                                  style={{ color: "#fed141" }}
                                  className="checkbox__textwrapper ms-2"
                                >
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                </p>
                              </label>
                            </div>
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input
                                  className="checkbox__trigger visuallyhidden"
                                  type="radio"
                                  name="rating"
                                  value="5-stars"
                                  onChange={() =>
                                    handleRatingFilterChange("5-stars")
                                  }
                                />
                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>
                                <p
                                  style={{ color: "#fed141" }}
                                  className="checkbox__textwrapper ms-2"
                                >
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                  <CiStar style={{ fontSize: "25px" }} />
                                </p>
                              </label>
                            </div>
                          </div>
                        </div>*/}

                        {/* Duration */}
                        <div className="companeys-filters">
                          <div className="aboutcompany-names-filter">
                            <h3>Duration</h3>
                          </div>
                          <div className="company-names-filter">
                            <div className="company-name-filter">
                              <div class="checkbox-wrapper-33">
                                <label class="checkbox">
                                  <input
                                    class="checkbox__trigger visuallyhidden"
                                    type="radio"
                                    name="deliveryTime"
                                    value="1-day"
                                    onChange={() =>
                                      handleDurationFilterChange("1-day")
                                    }
                                  />
                                  <span class="checkbox__symbol">
                                    <svg
                                      aria-hidden="true"
                                      class="icon-checkbox"
                                      width="28px"
                                      height="28px"
                                      viewBox="0 0 28 28"
                                      version="1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M4 14l8 7L24 7" />
                                    </svg>
                                  </span>
                                  <p class="checkbox__textwrapper">1 day</p>
                                </label>
                              </div>
                              <div class="checkbox-wrapper-33">
                                <label class="checkbox">
                                  <input
                                    class="checkbox__trigger visuallyhidden"
                                    type="radio"
                                    name="deliveryTime"
                                    value="2-4-days"
                                    onChange={() =>
                                      handleDurationFilterChange("2-4-days")
                                    }
                                  />
                                  <span class="checkbox__symbol">
                                    <svg
                                      aria-hidden="true"
                                      class="icon-checkbox"
                                      width="28px"
                                      height="28px"
                                      viewBox="0 0 28 28"
                                      version="1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M4 14l8 7L24 7" />
                                    </svg>
                                  </span>
                                  <p class="checkbox__textwrapper">2-4 days</p>
                                </label>
                              </div>
                              <div class="checkbox-wrapper-33">
                                <label class="checkbox">
                                  <input
                                    class="checkbox__trigger visuallyhidden"
                                    type="radio"
                                    name="deliveryTime"
                                    value="5-10-days"
                                    onChange={() =>
                                      handleDurationFilterChange("5-10-days")
                                    }
                                  />
                                  <span class="checkbox__symbol">
                                    <svg
                                      aria-hidden="true"
                                      class="icon-checkbox"
                                      width="28px"
                                      height="28px"
                                      viewBox="0 0 28 28"
                                      version="1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M4 14l8 7L24 7" />
                                    </svg>
                                  </span>
                                  <p class="checkbox__textwrapper">5-10 days</p>
                                </label>
                              </div>
                              <div class="checkbox-wrapper-33">
                                <label class="checkbox">
                                  <input
                                    class="checkbox__trigger visuallyhidden"
                                    type="radio"
                                    name="deliveryTime"
                                    value="above-10-days"
                                    onChange={() =>
                                      handleDurationFilterChange(
                                        "above-10-days"
                                      )
                                    }
                                  />
                                  <span class="checkbox__symbol">
                                    <svg
                                      aria-hidden="true"
                                      class="icon-checkbox"
                                      width="28px"
                                      height="28px"
                                      viewBox="0 0 28 28"
                                      version="1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M4 14l8 7L24 7" />
                                    </svg>
                                  </span>
                                  <p class="checkbox__textwrapper">
                                    above 10 days
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
              {/* فلتر الترتيب برتب الاعلانات م الكبير للصغير او العكس ع حسب السعر او المدة */}
              <div className="dropdown">
                <h2>Revenue may affect this sort order</h2>
                <button
                  className="dropdown-btn"
                  aria-haspopup="menu"
                  onClick={toggleDropdown}
                >
                  <span>
                    Sort:{" "}
                    {selectedSortOption
                      ? (selectedSortOption === "price"
                          ? "Price"
                          : "Duration") +
                        " (" +
                        (sortBy === "asc"
                          ? "Lowest to Highest"
                          : "Highest to Lowest") +
                        ")"
                      : "Featured"}
                  </span>
                  <span className={`arrow ${isOpen ? "open" : ""}`} />
                </button>
                {isOpen && (
                  <ul className="dropdown-content" role="menu">
                    <li onClick={handleShowAllAdvertisements}>
                      <span>Featured</span>
                    </li>
                    <li onClick={() => handleSortByPrice("asc")}>
                      <span>Price (Low To High)</span>
                    </li>
                    <li onClick={() => handleSortByPrice("desc")}>
                      <span>Price (High To Low)</span>
                    </li>
                    <li onClick={() => handleSortByDuration("asc")}>
                      <span>Duration (Short To Long)</span>
                    </li>
                    <li onClick={() => handleSortByDuration("desc")}>
                      <span>Duration (Long To Short)</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {/* الاعلانات نفسها هنا */}
            {currentItems.length === 0 ? (
              <p className="text-center" style={{ fontSize: "30px" }}>
                <CiWarning
                  className="icon text-warning"
                  style={{ fontSize: "80px" }}
                />
                No Ads available
              </p>
            ) : (
              currentItems.map((ad) => {
                {/* عشان احسب عدد ايام الاعلان */}
                const validFromDate = new Date(ad.validFrom);
                const validToDate = new Date(ad.validTo);

                const differenceMilliseconds = validToDate - validFromDate;

                const differenceDays = Math.floor(
                  differenceMilliseconds / (1000 * 60 * 60 * 24)
                );

                return (
                  <div className="container-product-card" key={ad.adID}>
                    <div className="one_card">
                      <div className="card-body">
                        <div className="image-ss">
                          <Swiper
                            style={{
                              "--swiper-pagination-color": "#fff",
                              height: " 250px",
                            }}
                            slidesPerView={1}
                            spaceBetween={30}
                            effect={"fade"}
                            pagination={{
                              dynamicBullets: true,
                              clickable: true,
                            }}
                            autoplay={{
                              delay: 5000,
                              disableOnInteraction: false,
                            }}
                            loop={true}
                            modules={[EffectFade, Autoplay, Pagination]}
                            className="mySwiper"
                          >
                            {adImages[ad.adID] && adImages[ad.adID][0] && (
                              <SwiperSlide>
                                <img src={adImages[ad.adID][2].src} />
                              </SwiperSlide>
                            )}
                          </Swiper>

                          <button
                            className="wishlist"
                            onClick={() => handleWishlistClick(ad.adID)}
                          >
                            <MDBTooltip
                              wrapperProps={{ size: "xl", color: "primary" }}
                              wrapperClass="me-1 mb-2"
                              title="Move to the wish list"
                            >
                              <MDBIcon fas icon="heart" />
                            </MDBTooltip>
                          </button>
                        </div>
                        <div className="contant-of-onecard">
                          <div className="section1-textincard">
                            <li className="card-title3">
                              <h5>
                                {">>"} {ad.title}
                              </h5>
                            </li>
                            <li>
                              <p className="card-text2">
                                <u>
                                  {differenceDays} Days, to {ad.travelTo} from{" "}
                                  {ad.travelFrom}
                                </u>
                              </p>
                            </li>
                            <li>
                              <i
                                class="fa fa-star rating"
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                <div className="rating-quot">
                                  {Array.from({
                                    length: Math.floor(ad.averageRating),
                                  }).map((_, index) => (
                                    <FaStar
                                      key={index}
                                      style={{
                                        color: "#fed141",
                                      }}
                                    />
                                  ))}
                                  {Array.from({
                                    length: Math.floor(5 - ad.averageRating),
                                  }).map((_, index) => (
                                    <CiStar key={index} />
                                  ))}
                                </div>
                              </i>
                              <span>
                                {ad.reviewCount} <u>reviews</u>
                              </span>
                            </li>

                            <p
                              className="card-text"
                              style={{
                                marginBottom: "20px",
                              }}
                            >
                              <span className="description">
                              {/* لو عدد الكلمات اكتر م 100 بيختفي الباقي و يظهر زرار show more */}
                                {truncateDescription(ad.description)}
                              </span>
                              {!showMore && ad.description.length > 100 && (
                                <button onClick={() => handleShowMore(ad.adID)}>
                                  Show More
                                </button>
                              )}
                            </p>
                            <h5
                              style={{
                                fontSize: "15px",
                                display: "flex",
                              }}
                            >
                              <IoIosCheckmarkCircleOutline />
                              &nbsp; Risk-free booking
                            </h5>
                          </div>

                          <div className="section1-contantincard">
                            <div className="buttons">
                              <Link
                                className="btn-edit-view-delet"
                                to={`/advertisements/${ad.adID}`}
                              >
                                View
                              </Link>
                              {currentUser &&
                                (currentUser.roles.includes("Admin") && (
                                  <>
                                    <button
                                      onClick={() =>
                                        deleteAdvertisement(ad.adID)
                                      }
                                      className="btn-edit-view-delet"
                                    >
                                      <span>Delete</span>
                                    </button>
                                    <Link
                                      className="btn-edit-view-delet"
                                      to={`/advertisements/${ad.adID}/edit`}
                                    >
                                      Edit
                                    </Link>
                                  </>
                                ))}
                            </div>
                          </div>
                        </div>
                        <div className="price-of-one-card">
                          <span
                            style={{
                              fontSize: "12px",
                              textAlign: "center",
                              width: "100%",
                            }}
                          >
                            from
                          </span>
                          <h5>${ad.price}</h5>
                          <span style={{ textAlign: "center", width: "100%" }}>
                            Price varies by group size
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* pagination */}
        <div className="pagination">
          <ul className="pagination-list">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                onClick={() => paginate(currentPage - 1)}
                className="page-link"
              >
                Previous
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
              <button onClick={() => paginate(1)} className="page-link">
                1
              </button>
            </li>
            {currentPage > 2 && (
              <li className="page-item disabled">
                <button className="page-link">...</button>
              </li>
            )}
            {currentPage > 1 && currentPage < totalPages && (
              <li className={`page-item ${currentPage !== 1 ? "active" : ""}`}>
                <button className="page-link">{currentPage}</button>
              </li>
            )}
            {currentPage < totalPages - 1 && (
              <li className="page-item disabled">
                <button className="page-link">...</button>
              </li>
            )}
            {totalPages > 1 && (
              <li
                className={`page-item ${
                  currentPage === totalPages ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(totalPages)}
                  className="page-link"
                >
                  {totalPages}
                </button>
              </li>
            )}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                onClick={() => paginate(currentPage + 1)}
                className="page-link"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Advertisements;
