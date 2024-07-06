import React, { useEffect, useState } from "react";
import "./WishList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import authService from "../../../Service/auth-service";
import Swal from "sweetalert2";
import WishListEmptyScreen from "./EmptyWishList";
import Footer from "../../Footer/Footer";
import { GrView } from "react-icons/gr";

function WishList() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const user = authService.getCurrentUser();
        if (user && user.token) {
          const response = await axios.get(
            `https://localhost:7120/api/Wishlist`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = response.data;
          if (data.success) {
            setWishlistItems(data.data);
          } else {
            console.error(data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }

    fetchWishlist();
  }, []);

  const [clickedAds, setClickedAds] = useState([]);
  useEffect(() => {
    const storedClickedAds = localStorage.getItem("clickedAds");
    if (storedClickedAds) {
      setClickedAds(JSON.parse(storedClickedAds));
    }
  }, []);
  const handleClick = (adID) => {
    setClickedAds((prevClickedAds) => {
      const isClicked = prevClickedAds.includes(adID);
      const updatedClickedAds = isClicked
        ? prevClickedAds.filter((id) => id !== adID)
        : [...prevClickedAds, adID];
      localStorage.remove("clickedAds", JSON.stringify(updatedClickedAds));
      return updatedClickedAds;
    });
  };

  const deleteWishList = (adId) => {
    Swal.fire({
      title: "Are you sure to Delete!?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const user = authService.getCurrentUser();
        if (user && user.token) {
          fetch(`https://localhost:7120/api/Wishlist?AdId=${adId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
            .then((response) => {
              if (response.ok) {
                // Remove the deleted item from the wishlistItems state
                setWishlistItems((prevItems) =>
                  prevItems.filter((item) => item.adId !== adId)
                );
                // Remove the deleted item from the clickedAds state
                setClickedAds((prevClickedAds) =>
                  prevClickedAds.filter((id) => id !== adId)
                );
                // Update localStorage with the updated clickedAds
                const updatedClickedAds = clickedAds.filter(
                  (id) => id !== adId
                );
                localStorage.setItem(
                  "clickedAds",
                  JSON.stringify(updatedClickedAds)
                );
              } else {
                console.error("Error deleting product:", response.statusText);
              }
            })
            .catch((error) => console.error("Error deleting product:", error));
        }
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <div className="container-wishlist" style={{ height: "100vh" }}>
        <div className="back-ground-wish">
          <h1>WishList</h1>
        </div>
        <div className="wrapper" style={{marginTop:"60px"}}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <div className="h3 p-1">My lists</div>
            </div>
          </div>
          <div id="table" className="bg-white rounded">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-uppercase header">
                      Wishlist ID
                    </th>
                    <th scope="col" className="text-uppercase">
                      Ad ID
                    </th>
                    <th scope="col" className="text-uppercase">
                      User ID
                    </th>
                    <th scope="col" className="text-uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                {wishlistItems && wishlistItems.length > 0 ? (
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.wishlistId}>
                        <td className="item">
                          <div className="d-flex">
                            <div className="pl-2">{item.wishlistId}</div>
                          </div>
                        </td>
                        <td
                          style={{
                            backgroundColor: "var(--input2)",
                            color: "var(--TextColor)",
                          }}
                        >
                          {item.adId}
                        </td>
                        <td
                          className="d-flex flex-column"
                          style={{
                            backgroundColor: "var(--input2)",
                            color: "var(--TextColor)",
                          }}
                        >
                          <span className="red">{item.userId}</span>
                        </td>
                        <td
                          className="font-weight-bold"
                          style={{
                            backgroundColor: "var(--input2)",
                            color: "var(--TextColor)",
                          }}
                        >
                          <div className="close">
                            <span onClick={() => deleteWishList(item.adId)}>
                              &times;
                            </span>
                            <Link
                              to={`/advertisements/${item.adId}`}
                              className="btn btn-outline-primary"
                            >
                              <GrView />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <WishListEmptyScreen />
                )}
              </table>
              {/* Pagination */}
              <nav className="mt-5">
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
                    length: Math.ceil(wishlistItems.length / itemsPerPage),
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
                      Math.ceil(wishlistItems.length / itemsPerPage)
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
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default WishList;
