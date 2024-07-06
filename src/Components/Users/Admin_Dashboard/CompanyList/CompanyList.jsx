import { Sidebar } from "../Admin/Admin_Dashboard";
import React, { useEffect, useState } from "react";

import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";

import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch companies from the endpoint
    fetch("https://localhost:7120/api/Company")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setCompanies(data.data);
        } else {
          console.error("Data received is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter advertisements based on search query and price range
  const filteredCompanies =
    companies && companies.length > 0
      ? companies.filter(
          (comp) =>
            comp.companyName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            comp.companyAddress
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : [];
  const currentItems = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteCompany = (companyID) => {
    Swal.fire({
      title: "Are you sure to Delete this Offer!?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7120/api/Company/${companyID}`, {
          method: "DELETE",
        })
          .then(() =>
            setCompanies(
              companies.filter((comp) => comp.companyID !== companyID)
            )
          )
          .catch((error) => console.error("Error deleting company:", error));
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
              Company List
            </h1>
            <Link
              to={"/CompanyList/CreateCompany"}
              className="btn btn-success me-4"
            >
              <FaPlus /> Create New Company
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
                  placeholder="Search a company"
                />
              </div>
            </div>
          </div>
          <div class="projects rad-10 m-20">
            <div class="responsive-table">
              <table class="fs-15 w-full">
                <thead>
                  <tr>
                    <td>company ID</td>
                    <td>Company Name</td>
                    <td>Company Address</td>
                    <td>Company Contact</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((company) => (
                    <tr key={company.companyID}>
                      <td>{company.companyID}</td>
                      <td>{company.companyName}</td>
                      <td>{company.companyAddress}</td>
                      <td>{company.contactInformation}</td>
                      <td className="button_list d-flex flex-row">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCompany(company.companyID)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/Company/${company.companyID}`}
                          className="btn btn-primary me-1 ms-1"
                        >
                          view
                        </Link>
                        <Link
                          to={`/Company/${company.companyID}/Update`}
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
                length: Math.ceil(companies.length / itemsPerPage),
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
                  currentPage === Math.ceil(companies.length / itemsPerPage)
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

export default CompanyList;
