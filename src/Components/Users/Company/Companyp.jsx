import React, { useEffect, useState } from "react";
import "./Companyp.css";

import { FaUser } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import {
  MdOutlineDashboardCustomize,
  MdOutlineVisibility,
} from "react-icons/md";
import { LuDollarSign } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

import { Table } from "flowbite-react";
import Swal from "sweetalert2";
import { RiAdvertisementFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaBuildingUser } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";

import img1 from "../../../im&ve/company/download (1).png"

function Companyp() {
  let { companyID } = useParams();

  const [onecompany, setOneCompany] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [adCompany, setAdCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Function to fetch advertisements for the company
  const getAllCompanyAds = () => {
    fetch(`https://localhost:7120/api/Company/${companyID}/AllAdvertisements`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setAdCompany(data.data);
        } else {
          setAdCompany([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching advertisements:", error);
        setAdCompany([]);
      });
  };

  // Fetch company data
  useEffect(() => {
    fetch(`https://localhost:7120/api/Company/${companyID}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          if (data.data.length > 0) {
            setOneCompany(data.data);
            setCompanyName(data.data[0].companyName);
          } else {
            setOneCompany([]);
            setCompanyName("");
          }
        } else if (data.data) {
          setOneCompany([data.data]);
          setCompanyName(data.data.companyName);
        } else {
          setOneCompany([]);
          setCompanyName("");
        }
      });

    // Fetch advertisements for the company
    getAllCompanyAds();
  }, [companyID]);

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
            // After successful deletion, fetch advertisements again
            getAllCompanyAds();
            Swal.fire("Deleted!", "Advertisement has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting advertisement:", error);
            Swal.fire("Error!", "Failed to delete advertisement.", "error");
          });
      }
    });
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(
      `https://localhost:7120/api/Company/GetUserBookedWithCompany/${companyID}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          setUsers(data.data);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);



  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adCompany.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <div className="all-c">
        <div className="App-company">
          <div className="sidebar-company">
            <ul className="side-menu">
              <div className="images">
                <img src={img1} alt="/" />
                <p>{companyName}</p>
                <input type="file" />
                <button className="btn btn-success" style={{color:"var(--inputfeild)"}}>Edit Logo</button>
              </div>
              <li>
                <Link to={`/Company/${companyID}/Update`}>
                  <FaBuildingUser className="Icons" />
                  Edit Information
                </Link>
              </li>
              <li className="hoverbtn">
                <Link to={`/advertisements/${companyID}/${companyName}/add`}>
                  <IoIosAddCircleOutline className="Icons" />
                  Add Advertisement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="content">
          <main>
            <div className="header">
              <h1 className="header-text">Dashboard</h1>
            </div>

            <ul className="cards">
              <li className="card-list">
                <FaUser className="bx bx-group" />

                <span className="info">
                  <h3>7,373</h3>
                  <p>New Users</p>
                </span>
              </li>
              <li className="card-list">
                <TbBrandBooking className="bx bx-cart-add" />

                <span className="info">
                  <h3>9,373</h3>
                  <p>Total Orders</p>
                </span>
              </li>
              <li className="card-list">
                <MdOutlineVisibility className="bx bx-line-chart" />

                <span className="info">
                  <h3>5,373</h3>
                  <p>Site Visits</p>
                </span>
              </li>
              <li className="card-list">
                <LuDollarSign className="bx bx-dollar-circle" />

                <span className="info">
                  <h3>$6,373</h3>
                  <p>This Month</p>
                </span>
              </li>
            </ul>

            <div className="bottom_data">
              {onecompany.length === 0 ? (
                <p
                  style={{
                    width: "30%",
                    textAlign: "center",
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CiWarning
                    className="icon text-warning"
                    style={{ fontSize: "50px" }}
                  />
                  No data available
                </p>
              ) : (
                onecompany.map((comp) => (
                  <div className="reminders" key={comp.companyID}>
                    <div className="header">
                      <h3 className="header-text">
                        Company Name: {comp.companyName}
                      </h3>
                    </div>
                    <ul className="task_list">
                      <li className="completed">
                        <div className="task_title">
                          <p>Company Address: {comp.companyAddress}</p>
                        </div>
                      </li>
                      <li className="completed">
                        <div className="task_title">
                          <p>Contact Information: {comp.contactInformation}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))
              )}

              <div className="orders">
                <div className="header">
                  <h3 className="header-text">Recent Orders</h3>
                </div>
                <div className=" table-ads">
                  <Table hoverable>
                    <Table.Head className="table-head">
                      <Table.HeadCell>AD ID</Table.HeadCell>
                      <Table.HeadCell>User ID</Table.HeadCell>
                      <Table.HeadCell>User Name</Table.HeadCell>
                      <Table.HeadCell>Email</Table.HeadCell>
                      <Table.HeadCell>country</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y table-body">
                      {users.map((user) => (
                        <Table.Row key={user.userID} className="table-row">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white table-cell">
                            {user.adId}
                          </Table.Cell>
                          <Table.Cell className="table-cell">
                            {user.userID}
                          </Table.Cell>
                          <Table.Cell className="table-cell">
                            {user.userName}
                          </Table.Cell>
                          <Table.Cell className="table-cell">
                            {user.email}
                          </Table.Cell>
                          <Table.Cell className="table-cell">
                            {user.country}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              </div>

              <div className="orders">
                <div className="header">
                  <h3 className="header-text">Total ADs</h3>
                </div>
                <div className="overflow-x-auto table-ads">
                  <Table hoverable>
                    <Table.Head className="table-head">
                      <Table.HeadCell>Advertisement name</Table.HeadCell>
                      <Table.HeadCell>Description</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                      <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y table-body">
                      {currentItems.map((company) => (
                        <Table.Row key={company.adID} className="table-row">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white table-cell">
                            {company.title}
                          </Table.Cell>
                          <Table.Cell className="table-cell">
                            {company.description}
                          </Table.Cell>
                          <Table.Cell className="table-cell">
                            ${company.price}
                          </Table.Cell>
                          <Table.Cell className="table-cell">
                            <Link
                              to={`/advertisements/${company.adID}`}
                              className="btn btn-primary"
                            >
                              View
                            </Link>
                            <Link
                              to={`/advertisements/${company.adID}/edit`}
                              className="btn btn-success"
                            >
                              Edit
                            </Link>
                            <Link
                              onClick={() => deleteProduct(company.adID)}
                              className="btn btn-danger"
                            >
                              Delete
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  {/* Pagination */}
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          className="page-link"
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({
                        length: Math.ceil(adCompany.length / itemsPerPage),
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
                          currentPage ===
                          Math.ceil(adCompany.length / itemsPerPage)
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
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Companyp;
