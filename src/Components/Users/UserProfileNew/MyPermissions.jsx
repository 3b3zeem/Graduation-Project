import React, { useEffect, useState } from "react";

import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";

import { Link, useParams } from "react-router-dom";
import authService from "../../../Service/auth-service";

const MyPermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  let { userID } = useParams();

  const UserPermissions = (token) => {
    fetch(`https://localhost:7120/api/permission-requests/byUserId/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setPermissions(data.data);
        } else {
          console.error("Data received is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  };

  useEffect(() => {
    if (currentUser && currentUser.token) {
      UserPermissions(currentUser.token);
    }
  }, [currentUser]);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = permissions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <div className="page d-flex">
        <div className="content w-full">
          <div
            className="d-flex align-center justify-content-between"
            style={{ marginTop: "100px" }}
          >
            <h1 className="p-relative" style={{ color: "var(--TextColor2)" }}>
              Permission List
            </h1>
            <Link
              to={"/PermissionList/AddRequest"}
              className="btn btn-outline-success me-4"
            >
              Create New Permission
            </Link>
          </div>
          <div class="projects p-20  rad-10 m-20">
            <div class="responsive-table">
              <table class="fs-15 w-full">
                <thead>
                  <tr>
                    <td>Request ID</td>
                    <td>User ID</td>
                    <td>User Name</td>
                    <td>email</td>
                    <td>Company Name</td>
                    <td>description</td>
                    <td>Status</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((perm) => (
                    <tr key={perm.requestID}>
                      <td>{perm.requestID}</td>
                      <td>{perm.userID}</td>
                      <td>{perm.username}</td>
                      <td>{perm.email}</td>
                      <td>{perm.companyName}</td>
                      <td>{perm.description}</td>
                      <td>{perm.status}</td>
                      <td className="d-flex flex-row gap-2">
                        <Link
                          to={`/PermissionList/${perm.requestID}`}
                          className="btn btn-primary"
                        >
                          View
                        </Link>
                        {perm.status !== "approved" && (
                          <Link
                            to={`/PermissionList/${perm.requestID}/Update`}
                            className="btn btn-success"
                          >
                            Edit
                          </Link>
                        )}
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
                length: Math.ceil(permissions.length / itemsPerPage),
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
                  currentPage === Math.ceil(permissions.length / itemsPerPage)
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

export default MyPermissions;
