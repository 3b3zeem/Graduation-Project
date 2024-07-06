import { Sidebar } from "../Admin/Admin_Dashboard";
import React, { useEffect, useState } from "react";

import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";

import { Link } from "react-router-dom";

import "./master.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch users from the endpoint
    fetch("https://localhost:7120/api/User")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter users based on search query and roles
  const filteredUsers =
  users && users.length > 0
    ? users.filter(
        (user) =>
          !user.roles.includes("Admin") &&
          (user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];


  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure to Delete this Advertisement!?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7120/api/User/deleteuser/${id}`, {
          method: "DELETE",
        })
          .then(() => setUsers(users.filter((user) => user.id !== id)))
          .catch((error) => console.error("Error deleting product:", error));
      }
    });
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <React.Fragment>
      <div className="page d-flex">
        <Sidebar />
        <div className="content">
          <div
            className="d-flex align-center justify-content-between"
            style={{ marginTop: "80px" }}
          >
            <h1 className="p-relative" style={{ color: "var(--TextColor2)" }}>
              User List
            </h1>
            <Link to={"/"} className="btn btn-success me-4">
              <FaPlus /> Create New User
            </Link>
          </div>
          <div className="heading between-flex" style={{paddingLeft:"10px"}}>
            <div className="searching p-relative">
              <input
                className="p-10"
                value={searchQuery}
                onChange={handleSearchInputChange}
                type="search"
                placeholder="Search a user"
              />
            </div>
          </div>
          <div className="projects m-20">
            <div className="responsive-table">
              <table className="fs-14 w-full">
                <thead>
                  <tr>
                    <td>User Id</td>
                    <td>User Name</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Email</td>
                    <td>Status</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.userName}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="label btn-shape bg-orange c-white">
                          {user.roles.length === 1 && user.roles[0]}
                          {user.roles.length === 2 &&
                            `${user.roles[0]} - ${user.roles[1]}`}
                        </span>
                      </td>
                      <td className="button_list d-flex flex-row">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                        <button className="btn btn-primary me-1 ms-1">
                          View
                        </button>
                        <Link
                          to={`/account/${user.id}/EditProfile`}
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
                length: Math.ceil(filteredUsers.length / itemsPerPage),
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
                  currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
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

export default UserList;
