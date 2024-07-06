import { Sidebar } from "../Admin/Admin_Dashboard";
import React, { useEffect, useState } from "react";

import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch users from the endpoint
    fetch("https://localhost:7120/api/offers")
      .then((response) => response.json())
      .then((data) => {
        setOffers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Filter advertisements based on search query and price range
  const filteredOffers =
  offers && offers.length > 0
  ? offers.filter(
    (offer) =>
      offer.offerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.discountAmount.toString().includes(searchQuery)
  )
  : [];
  
  const currentItems = filteredOffers.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
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
          .then(() =>
            setOffers(offers.filter((offer) => offer.offerID !== offerID))
          )
          .catch((error) => console.error("Error deleting product:", error));
      }
    });
  };

  return (
    <React.Fragment>
      <div className="page d-flex">
        <Sidebar />
        <div className="content w-full">
          <div
            className="d-flex align-center justify-content-between"
            style={{ marginTop: "100px" }}
          >
            <h1 className="p-relative" style={{ color: "var(--TextColor2)" }}>
              Offer List
            </h1>
            <Link to={"/"} className="btn btn-outline-success me-4">
              Create New User
            </Link>
          </div>
          <div className="heading p-15 between-flex">
            <div className="d-flex justify-content-between">
              <div className="searching p-relative">
                <input
                  className="p-10"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  type="search"
                  placeholder="Search an offer"
                />
              </div>
            </div>
          </div>
          <div class="projects rad-10 m-20">
            <div class="responsive-table">
              <table class="fs-15 w-full">
                <thead>
                  <tr>
                    <td>Offer Id</td>
                    <td>Offer Name</td>
                    <td>Description</td>
                    <td>Discount Amount</td>
                    <td>Post Date</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((offer) => (
                    <tr key={offer.offerID}>
                      <td>{offer.offerID}</td>
                      <td>{offer.offerName}</td>
                      <td>{offer.details}</td>
                      <td>{offer.discountAmount}</td>
                      <td>{offer.postDate}</td>
                      <td className="button_list d-flex flex-row">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteOffer(offer.offerID)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/advertisements/Offers/${offer.offerID}`}
                          className="btn btn-primary me-1 ms-1"
                        >
                          view
                        </Link>
                        <Link
                          to={`/advertisements/${offer.offerID}/update`}
                          className="btn btn-success"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="page-link"
                >
                  Previous
                </button>
              </li>
              {Array.from({
                length: Math.ceil(currentItems.length / itemsPerPage),
              }).map((_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`page-link ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(currentItems.length / itemsPerPage)
                    ? "disabled"
                    : ""
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
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OfferList;
