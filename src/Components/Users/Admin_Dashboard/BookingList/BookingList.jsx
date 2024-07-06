import { Sidebar } from "../Admin/Admin_Dashboard";
import React, { useEffect, useState } from "react";

import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";

import { Link, useParams } from "react-router-dom";

const BookingList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://localhost:7120/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter bookings based on search query and price range
  const filteredBooks =
    books && books.length > 0
      ? books.filter(
          (book) =>
            book.bookingDate
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            book.totalAmount.toString().includes(searchQuery)
        )
      : [];

  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //delete booking
  const deleteBooking = (bookingID) => {
    Swal.fire({
      title: "Are you sure to delete this booking?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7120/api/bookings/${bookingID}`, {
          method: "DELETE",
        })
          .then(() => {
            setBooks(books.filter((book) => book.bookingID !== bookingID));
            // Assuming you want to reset to page 1 after deleting
            setCurrentPage(1);
          })
          .catch((error) => {
            console.error("Error deleting booking:", error);
          });
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
            style={{ marginTop: "80px" }}
          >
            <h1 className="p-relative" style={{ color: "var(--TextColor2)" }}>
              Booking List
            </h1>
          </div>
          <div className="heading p-15 between-flex">
            <div className="d-flex justify-content-between">
              <div className="searching p-relative">
                <input
                  className="p-10"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  type="search"
                  placeholder="Search a Book"
                />
              </div>
            </div>
          </div>
          <div class="projects rad-10 m-20">
            <div class="responsive-table">
              <table class="fs-15 w-full">
                <thead>
                  <tr>
                    <td> Ad id</td>
                    <td>Booking Id</td>
                    <td>userID</td>
                    <td>bookingDate</td>
                    <td>totalAmount</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((book) => (
                    <tr key={book.bookingID}>
                      <td>{book.adID}</td>
                      <td>{book.bookingID}</td>
                      <td>{book.userID}</td>
                      <td>{book.bookingDate}</td>
                      <td>{book.totalAmount}</td>
                      <td className="button_list d-flex flex-row">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteBooking(book.bookingID)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/bookinglist/${book.bookingID}`}
                          className="btn btn-primary me-1 ms-1"
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
                length: Math.ceil(books.length / itemsPerPage),
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
                  currentPage === Math.ceil(books.length / itemsPerPage)
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

export default BookingList;
// import { Sidebar } from "../Admin/Admin_Dashboard";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import "react-multi-carousel/lib/styles.css";

// const BookingList = () => {
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3);
//   let { bookingID } = useParams();

//   useEffect(() => {
//     fetch("https://localhost:7120/api/bookings")
//       .then((response) => response.json())
//       .then((data) => {
//         setBooks(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//       });
//   }, []);

//   // Logic for pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Delete booking
//   const deleteBooking = (bookingID) => {
//     Swal.fire({
//       title: "Are you sure to delete this booking?",
//       showCancelButton: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`https://localhost:7120/api/bookings/${bookingID}`, {
//           method: "DELETE",
//         })
//           .then(() => {
//             setBooks(books.filter((book) => book.bookingID !== bookingID));
//             // Assuming you want to reset to page 1 after deleting
//             setCurrentPage(1);
//           })
//           .catch((error) => {
//             console.error("Error deleting booking:", error);
//           });
//       }
//     });
//   };

//   return (
//     <React.Fragment>
//       <div className="page d-flex">
//         <Sidebar />
//         <div className="content w-full">
//           <div
//             className="d-flex align-center justify-content-between"
//             style={{ marginTop: "80px" }}
//           >
//             <h1 className="p-relative fromtop">Booking List</h1>
//           </div>
//           <div class="projects p-20  rad-10 m-20">
//             <div class="responsive-table">
//              <table class="fs-15 w-full">
//                 <thead>
//                   <tr>
//                     <th>Ad ID</th>
//                     <th>Booking ID</th>
//                     <th>User ID</th>
//                     <th>Booking Date</th>
//                     <th>Total Amount</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.map((book) => (
//                     <tr key={book.bookingID}>
//                       <td>{book.adID}</td>
//                       <td>{book.bookingID}</td>
//                       <td>{book.userID}</td>
//                       <td>{book.bookingDate}</td>
//                       <td>{book.totalAmount}</td>
//                       <td className="button_list d-flex flex-row">
//                         <button
//                           className="btn btn-danger"
//                           onClick={() => deleteBooking(book.bookingID)}
//                         >
//                           Delete
//                         </button>
//                         <Link
//                           to={`/bookinglist/${book.bookingID}`}
//                           className="btn btn-primary me-1 ms-1"
//                         >
//                           View
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           {/* Pagination */}
//           <nav>
//             <ul className="pagination">
//               <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   className="page-link"
//                 >
//                   Previous
//                 </button>
//               </li>
//               {Array.from({
//                 length: Math.ceil(books.length / itemsPerPage),
//               }).map((_, index) => (
//                 <li key={index} className="page-item">
//                   <button
//                     onClick={() => paginate(index + 1)}
//                     className={`page-link ${
//                       currentPage === index + 1 ? "active" : ""
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//               <li
//                 className={`page-item ${
//                   currentPage ===
//                   Math.ceil(books.length / itemsPerPage)
//                     ? "disabled"
//                     : ""
//                 }`}
//               >
//                 <button
//                   onClick={() => paginate(currentPage + 1)}
//                   className="page-link"
//                 >
//                   Next
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default BookingList;
