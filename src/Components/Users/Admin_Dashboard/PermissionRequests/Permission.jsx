import React, { useEffect, useState } from "react";
import { Sidebar } from "../Admin/Admin_Dashboard";
import { Link } from "react-router-dom";

const Permission = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [permission, setPermission] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://localhost:7120/api/permission-requests")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setPermission(data.data); // Assuming 'data' is the response object
        } else {
          console.error("Data received is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching permission requests:", error);
      });
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter advertisements based on search query and price range
  const filteredPermissions =
    permission && permission.length > 0
      ? permission.filter(
          (perm) =>
            perm.companyName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            perm.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const currentItems = filteredPermissions.slice(
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

  return (
    <div>
      <div className="page d-flex">
        <Sidebar />
        <div className="content w-full">
          <h1
            className="p-relative"
            style={{ marginTop: "120px", color: "var(--TextColor2)" }}
          >
            Permission Requests List
          </h1>
          <div className="heading p-15 between-flex">
            <div className="d-flex justify-content-between">
              <div className="searching p-relative">
                <input
                  className="p-10"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  type="search"
                  placeholder="Search a request"
                />
              </div>
            </div>
          </div>
          <div class="projects rad-10 m-20">
            <div class="responsive-table">
              <table class="fs-15 w-full">
                <thead>
                  <tr>
                    <td>Request ID</td>
                    <td>User ID</td>
                    <td>Company Name</td>
                    <td>Description</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((permission) => (
                    <tr key={permission.requestID}>
                      <td>{permission.requestID}</td>
                      <td>{permission.userID}</td>
                      <td>{permission.companyName}</td>
                      <td>{permission.description}</td>
                      <td className="button_list d-flex flex-row">
                        <Link
                          to={`/PermissionList/${permission.requestID}`}
                          className="btn btn-success"
                        >
                          view
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
                length: Math.ceil(permission.length / itemsPerPage),
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
                  currentPage === Math.ceil(permission.length / itemsPerPage)
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

export default Permission;
