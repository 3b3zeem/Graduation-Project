import React, { useEffect, useState } from "react";
import { Sidebar } from "../Admin/Admin_Dashboard";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdvertisementList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch Advertisements from the endpoint
    fetch("https://localhost:7120/api/advertisements")
      .then((response) => response.json())
      .then((data) => {
        setAds(data);
      })
      .catch((error) => {
        console.error("Error fetching advertisements:", error);
      });
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter advertisements based on search query and price range
  const filteredAds =
    ads && ads.length > 0
      ? ads.filter(
          (ad) =>
            ad.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ad.price.toString().includes(searchQuery)
        )
      : [];

  const currentItems = filteredAds.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteProduct = (advertisementId) => {
    Swal.fire({
      title: "Are you sure to Delete this Advertisement!?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7120/api/advertisements/${advertisementId}`, {
          method: "DELETE",
        })
          .then(() => {
            // Remove the deleted advertisement from the state
            setAds(ads.filter((ad) => ad.adID !== advertisementId));
            Swal.fire(
              "Deleted!",
              "The advertisement has been deleted.",
              "success"
            );
          })
          .catch((error) =>
            console.error("Error deleting advertisement:", error)
          );
      }
    });
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="page d-flex">
        <Sidebar />
        <div className="content w-full">
          <h1
            className="p-relative"
            style={{ marginTop: "120px", color: "var(--TextColor2)" }}
          >
            Advertisements List
          </h1>
          <div className="heading p-15 between-flex">
            <div className="d-flex justify-content-between">
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
          </div>
          <div className="projects rad-10 m-20">
            <div className="responsive-table">
              <table className="fs-15 w-full">
                <thead>
                  <tr>
                    <td>Advertisement Id</td>
                    <td>Company Name</td>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Valid From</td>
                    <td>Valid To</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((ad) => (
                    <tr key={ad.adID}>
                      <td>{ad.adID}</td>
                      <td>{ad.companyName}</td>
                      <td>{ad.title}</td>
                      <td>{ad.price}</td>
                      <td>{ad.validFrom}</td>
                      <td>{ad.validTo}</td>
                      <td className="button_list d-flex flex-row">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(ad.adID)}
                        >
                          Delete
                        </button>

                        <Link
                          to={`/advertisements/${ad.adID}`}
                          className="btn btn-primary me-1 ms-1"
                        >
                          View
                        </Link>

                        <Link
                          to={`/advertisements/${ad.adID}/edit`}
                          className="btn btn-success me-1 ms-1"
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
                length: Math.ceil(filteredAds.length / itemsPerPage),
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
                  currentPage === Math.ceil(filteredAds.length / itemsPerPage)
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
    </div>
  );
};

export default AdvertisementList;
