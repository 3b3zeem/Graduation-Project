import React, { useEffect, useState } from "react";

import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";

import { Link, useParams } from "react-router-dom";

const MyCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  let { userID , companyID } = useParams();
  // Fetch companies from the endpoint
  const UserCompanies = () => {
      fetch(`https://localhost:7120/api/Company/ByUser/${userID}`)
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
  }
  useEffect(() => {
    UserCompanies();
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companies.slice(indexOfFirstItem, indexOfLastItem);

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
            setCompanies(companies.filter((comp) => comp.companyID !== companyID))
          )
          .catch((error) => console.error("Error deleting company:", error));
      }
    });
  };

  return (
    <React.Fragment>
      <div className="page d-flex">
        <div className="content w-full">
          <div
            className="d-flex align-center justify-content-between"
            style={{ marginTop: "100px" }}
          >
            <h1 className="p-relative" style={{color:"var(--TextColor2)"}}>Company List</h1>
            <Link to={"/"} className="btn btn-outline-success me-4">
              Create New User
            </Link>
          </div>
          <div class="projects p-20  rad-10 m-20">
            <div class="responsive-table">
              <table class="fs-15 w-full">
                <thead>
                  <tr>
                    <td>company ID</td>
                    <td>User ID</td>
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
                      <td>{company.userID}</td>
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
                        <Link to={`/Company/${company.companyID}`} className="btn btn-primary me-1 ms-1">
                          view
                        </Link>
                        <Link to={`/Company/${company.companyID}/Update`} className="btn btn-success">Edit</Link>
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

export default MyCompanies;
