// // import React, { useEffect, useState } from "react";
// // import "./BookingUser.css";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FaArrowLeftLong } from "react-icons/fa6";
// // import { FaCreditCard } from "react-icons/fa";
// // import { BsBank } from "react-icons/bs";
// // import { MdSimCard } from "react-icons/md";
// // import authService from "../../../Service/auth-service";
// // import Swal from "sweetalert2";

// // function BookingUser() {
// //   const { advertisementId } = useParams();
// //   const [adID, setAdID] = useState(advertisementId);
// //   const [userID, setUserID] = useState();
// //   const [bookingDate, setBookingDate] = useState( new Date().toISOString().slice(0, 16));
// //   const [numberOfSeats, setNumberOfSeats] = useState(0);
// //   const [status, setStatus] = useState("");
// //   const [paymentMethod, setPaymentMethod] = useState("");
// //   const [paymentDetails, setPaymentDetails] = useState("");
// //   const [error, setError] = useState("");
// //   const handleInputChange = (setter, value) => {
// //     setter(value);
// //   };

// //   const [currentUser, setCurrentUser] = useState();
// //   useEffect(() => {
// //     const user = authService.getCurrentUser();

// //     if (user) {
// //       setCurrentUser(user);
// //     }
// //   }, []);

// //   const formSubmitBooking = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await fetch("https://localhost:7120/api/bookings", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "text/plain",
// //         },
// //         body: JSON.stringify({
// //           adID: adID,
// //           userID: currentUser?.userID || "",
// //           bookingDate: currentUser?.bookingDate || "",
// //           numberOfSeats: numberOfSeats,
// //           status: status,
// //           paymentMethod: paymentMethod,
// //           paymentDetails: paymentDetails,
// //         }),
// //       }).then((response) => response.json())
// //         .then((data) => {
// //           Swal.fire({
// //             title: "Good job!",
// //             text: `Your booking is done!`,
// //             icon: "success",
// //           });
// //           // navigate(`/advertisements/${advertisementId}`);
// //         });
// //       console.log("Data sent successfully!");
// //     } catch (error) {
// //       console.error("Error sending data:", error);
// //     }
// //   };

// //   return (
// // <div className="booking-user-container">
// //   <div className="side-image">
// //     <div className="contant-over-image">
// //       <div className="btn-booking">
// //         <button className="goback-booking">
// //           <FaArrowLeftLong className="arrow-book" />
// //           <Link className="linkbtn" to="/login">
// //             Back to
// //           </Link>
// //         </button>
// //       </div>
// //       <div className="total-booking">
// //         <p>Total</p>
// //         <h1>$134.98</h1>
// //       </div>
// //       <div className="display-flex-booking">
// //         <div className="text-booking">
// //           <p>Professional plan</p>
// //           <span>Monthly subscription</span>
// //         </div>
// //         <div className="price-booking">
// //           <p>150$</p>
// //         </div>
// //       </div>

// //       <div className="display-flex-booking">
// //         <div className="text-booking">
// //           <p>cachback </p>
// //           <span>Included in the Professional plan</span>
// //         </div>
// //         <div className="price-booking">
// //           <p>20.56$</p>
// //         </div>
// //       </div>

// //       <div className="display-flex-booking">
// //         <div className="text-booking">
// //           <p>Offers </p>
// //           <span>Offer for you</span>
// //         </div>
// //         <div className="price-booking">
// //           <p>299.99$</p>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   <div className="side-contant-booking">
// //       <div className="forms-contant">
// //         <div className="conofbot-booking">
// //           <form
// //             className="form1-booking"
// //             id="Formv"
// //             onSubmit={formSubmitBooking}
// //           >
// //             <div className="dispflex">
// //               <div className="section1">
// //                 <div className="bbbbb">
// //                   <label
// //                     htmlFor="adID"
// //                     className="lable-booking"
// //                   >
// //                     adID*
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="form__field"
// //                     placeholder="$000.."
// //                     name="adID"
// //                     id="adID"
// //                     value={adID}
// //                     onChange={(e) =>
// //                       handleInputChange(setAdID, e.target.value)
// //                     }
// //                   />
// //                 </div>
// //                 <div className="bbbbb">
// //                   <label
// //                     htmlFor="userID"
// //                     className="lable-booking"
// //                   >
// //                     userID*
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="form__field"
// //                     placeholder="NY"
// //                     name="userID"
// //                     id="userID"
// //                     value={
// //                       currentUser
// //                         ? currentUser.userID
// //                         : ""
// //                     }
// //                     onChange={(e) =>
// //                       handleInputChange(setUserID, e.target.value)
// //                     }
// //                   />
// //                 </div>
// //               </div>
// //               <div className="section1">
// //                 <div className="bbbbb">
// //                   <label
// //                     htmlFor="bookingDate"
// //                     className="lable-booking"
// //                   >
// //                     bookingDate*
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="form__field"
// //                     placeholder="$000.."
// //                     name="bookingDate"
// //                     id="bookingDate"
// //                     onChange={(e) =>
// //                       handleInputChange(setBookingDate, e.target.value)
// //                     }
// //                     value={bookingDate}
// //                   />
// //                 </div>

// //                 <div className="bbbbb">
// //                   <label
// //                     htmlFor="numberOfSeats"
// //                     className="lable-booking"
// //                   >
// //                     numberOfSeats*
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="form__field"
// //                     placeholder="NY"
// //                     name="numberOfSeats"
// //                     id="numberOfSeats"
// //                     onChange={(e) =>
// //                       handleInputChange(setNumberOfSeats, e.target.value)
// //                     }
// //                     value={numberOfSeats}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="section1">

// //                 <div className="bbbbb">
// //                   <label
// //                     htmlFor="status"
// //                     className="lable-booking"
// //                   >
// //                     Status*
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="form__field"
// //                     placeholder="NY"
// //                     name="status"
// //                     id="status"
// //                     onChange={(e) =>
// //                       handleInputChange(setStatus, e.target.value)
// //                     }
// //                     value={status}

// //                   />
// //                 </div>
// //                 <div className="bbbbb">
// //                   <label
// //                     htmlFor="Totalamount"
// //                     className="lable-booking"
// //                   >
// //                     paymentMethod*
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="form__field"
// //                     placeholder="...!"
// //                     name="paymentMethod"
// //                     id="paymentMethod"
// //                     onChange={(e) =>
// //                       handleInputChange(setPaymentMethod, e.target.value)
// //                     }
// //                     value={paymentMethod}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="section1">
// //                 <div className="bbbbb2">
// //                   <label
// //                     htmlFor="paymentDetails"
// //                     className="lable-booking"
// //                   >
// //                     paymentDetails*
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="form__field"
// //                     name="paymentDetails"
// //                     id="paymentDetails"
// //                     onChange={(e) =>
// //                       handleInputChange(setPaymentDetails, e.target.value)
// //                     }
// //                     value={paymentDetails}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //             <div ><button type="submit">Submit</button></div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// // </div>
// //   );
// // }

// // export default BookingUser;
// import React, { useEffect, useState } from "react";
// import "./BookingUser.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import authService from "../../../Service/auth-service";
// import Swal from "sweetalert2";
// import axios from "axios";

// function BookingUser() {
//   const { advertisementId } = useParams();
//   const [adID, setAdID] = useState(advertisementId);
//   const [userID, setUserID] = useState("");
//   const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0, 16));
//   const [numberOfSeats, setNumberOfSeats] = useState(0);
//   const [status, setStatus] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [paymentDetails, setPaymentDetails] = useState("");
//   const [error, setError] = useState("");

//   const handleInputChange = (setter) => (event) => {
//     setter(event.target.value);
//   };

//   const [currentUser, setCurrentUser] = useState();
//   useEffect(() => {
//     const user = authService.getCurrentUser();
//     if (user) {
//       setCurrentUser(user);
//     }
//   }, []);

//   const formSubmitBooking = async (e) => {
//     e.preventDefault();
//     try {
//       const token = authService.getCurrentUser()?.token;
//       if (!token) {
//         setError("Token is missing. Please log in to continue.");
//         return;
//       }

//       const requestBody = {
//         adID: adID,
//         userID: currentUser?.userID || "",
//         bookingDate: bookingDate,
//         numberOfSeats: numberOfSeats,
//         status: status,
//         paymentMethod: paymentMethod,
//         paymentDetails: paymentDetails,
//       };

//       const response = await axios.post("https://localhost:7120/api/bookings", requestBody, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "text/plain",
//         },
//       });

//       Swal.fire({
//         title: "Good job!",
//         text: `Your booking is done!`,
//         icon: "success",
//       });

//       console.log("Data sent successfully!");
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   return (
//     <div className="booking-user-container">
//       <div className="side-image">
//         <div className="contant-over-image">
//           <div className="btn-booking">
//             <button className="goback-booking">
//               <FaArrowLeftLong className="arrow-book" />
//               <Link className="linkbtn" to="/login">
//                 Back to
//               </Link>
//             </button>
//           </div>
//           <div className="total-booking">
//             <p>Total</p>
//             <h1>$134.98</h1>
//           </div>
//           <div className="display-flex-booking">
//             <div className="text-booking">
//               <p>Professional plan</p>
//               <span>Monthly subscription</span>
//             </div>
//             <div className="price-booking">
//               <p>150$</p>
//             </div>
//           </div>

//           <div className="display-flex-booking">
//             <div className="text-booking">
//               <p>cachback </p>
//               <span>Included in the Professional plan</span>
//             </div>
//             <div className="price-booking">
//               <p>20.56$</p>
//             </div>
//           </div>

//           <div className="display-flex-booking">
//             <div className="text-booking">
//               <p>Offers </p>
//               <span>Offer for you</span>
//             </div>
//             <div className="price-booking">
//               <p>299.99$</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="side-contant-booking">
//         <div className="forms-contant">
//           <div className="conofbot-booking">
//             <form className="form1-booking" id="Formv" onSubmit={formSubmitBooking}>
//               <div className="dispflex">
//                 <div className="section1">
//                   <div className="bbbbb">
//                     <label htmlFor="adID" className="lable-booking">
//                       adID*
//                     </label>
//                     <input
//                       type="text"
//                       className="form__field"
//                       placeholder="$000.."
//                       name="adID"
//                       id="adID"
//                       value={adID}
//                       onChange={handleInputChange(setAdID)}
//                     />
//                   </div>
//                   <div className="bbbbb">
//                     <label htmlFor="userID" className="lable-booking">
//                       userID*
//                     </label>
//                     <input
//                       type="text"
//                       className="form__field"
//                       placeholder="NY"
//                       name="userID"
//                       id="userID"
//                       value={userID}
//                       onChange={handleInputChange(setUserID)}
//                     />
//                   </div>
//                 </div>
//                 <div className="section1">

//                   <div className="bbbbb">
//                     <label htmlFor="bookingDate" className="lable-booking">
//                       bookingDate*
//                     </label>
//                     <input
//                       type="text"
//                       className="form__field"
//                       placeholder="$000.."
//                       name="bookingDate"
//                       id="bookingDate"
//                       value={bookingDate}
//                       onChange={handleInputChange(setBookingDate)}
//                     />
//                   </div>
//                   <div className="bbbbb">
//                     <label htmlFor="numberOfSeats" className="lable-booking">
//                       numberOfSeats*
//                     </label>
//                     <input
//                       type="text"
//                       className="form__field"
//                       placeholder="NY"
//                       name="numberOfSeats"
//                       id="numberOfSeats"
//                       value={numberOfSeats}
//                       onChange={handleInputChange(setNumberOfSeats)}
//                     />
//                   </div>
//                 </div>
//                 <div className="section1">
//                   <div className="bbbbb">
//                     <label htmlFor="status" className="lable-booking">
//                       Status*
//                     </label>
//                     <input
//                       type="text"
//                       className="form__field"
//                       placeholder="NY"
//                       name="status"
//                       id="status"
//                       value={status}
//                       onChange={handleInputChange(setStatus)}
//                     />
//                   </div>
//                   <div className="bbbbb">
//                     <label htmlFor="paymentMethod" className="lable-booking">
//                       paymentMethod*
//                     </label>
//                     <input
//                       type="text"
//                       className="form__field"
//                       placeholder="...!"
//                       name="paymentMethod"
//                       id="paymentMethod"
//                       value={paymentMethod}
//                       onChange={handleInputChange(setPaymentMethod)}
//                     />
//                   </div>
//                 </div>
//                 <div className="section1">
//                   <div className="bbbbb2">
//                     <label htmlFor="paymentDetails" className="lable-booking">
//                       paymentDetails*
//                     </label>
//                     <input
//                       type="text"
//                       className="form__field"
//                       name="paymentDetails"
//                       id="paymentDetails"
//                       value={paymentDetails}
//                       onChange={handleInputChange(setPaymentDetails)}
//                     />
//                   </div>
//                 </div>
//               </div>
//           <div>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </div>
//     </div>
//       </div >
//     </div >
//   );
// }

// export default BookingUser;
import React, { useEffect, useState } from "react";
import "./BookingUser.css";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { MdSimCard } from "react-icons/md";
import axios from "axios";
import authService from "../../../Service/auth-service";
import Swal from "sweetalert2";

function BookingUser() {
  const { advertisementId } = useParams();
  const [adID, setAdID] = useState(advertisementId);
  const [userID, setUserID] = useState("");
  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const formSubmitBooking = async (e) => {
    e.preventDefault();
    try {
      const token = authService.getCurrentUser()?.token;
      if (!token) {
        setError("Token is missing. Please log in to continue.");
        return;
      }

      const requestBody = {
        adID: adID,
        userID: currentUser?.userID || "",
        bookingDate: bookingDate,
        numberOfSeats: numberOfSeats,
        status: status,
        paymentMethod: paymentMethod,
        paymentDetails: paymentDetails,
      };

      const response = await axios.post(
        "https://localhost:7120/api/bookings",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
        }
      );

      Swal.fire({
        title: "Good job!",
        text: `Your booking is done!`,
        icon: "success",
      });

      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  //handle ccv
  const [formInputs, setFormInputs] = useState({
    cardNumber: "",
    cvv: "",
    fullName: "",
    expirationDate: "",
  });
  const handleSubmitForm = (e) => {
    e.preventDefault();

    localStorage.setItem("formInputs", JSON.stringify(formInputs));

    setFormInputs({
      cardNumber: "",
      cvv: "",
      fullName: "",
      expirationDate: "",
    });
  };
  const handleChangeInput = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };
  const user = JSON.parse(localStorage.getItem("User"));

  return (
    <div className="booking-user-container">
      <div className="side-image">
        <div className="contant-over-image">
          <div className="btn-booking">
            <button className="goback-booking">
              <FaArrowLeftLong className="arrow-book" />
              <Link className="linkbtn" to={`/advertisements/${advertisementId}`}>
                Back to
              </Link>
            </button>
          </div>
          <div className="total-booking">
            <p>Total</p>
            <h1>$134.98</h1>
          </div>
          <div className="display-flex-booking">
            <div className="text-booking">
              <p>Professional plan</p>
              <span>Monthly subscription</span>
            </div>
            <div className="price-booking">
              <p>150$</p>
            </div>
          </div>

          <div className="display-flex-booking">
            <div className="text-booking">
              <p>cachback </p>
              <span>Included in the Professional plan</span>
            </div>
            <div className="price-booking">
              <p>20.56$</p>
            </div>
          </div>

          <div className="display-flex-booking">
            <div className="text-booking">
              <p>Offers </p>
              <span>Offer for you</span>
            </div>
            <div className="price-booking">
              <p>299.99$</p>
            </div>
          </div>
        </div>
      </div>
      <div className="side-contant-booking">
        <div className="forms-contant">
          <div className="conofbot-booking">
            <form
              className="form1-booking"
              id="Formv"
              onSubmit={formSubmitBooking}
            >
              {currentPage === 1 && (
                <div className="dispflex">
                  <div className="section1">
                    <div className="bbbbb">
                      <label
                        htmlFor="adID"
                        className="lable-booking"
                      >
                        Advertisement ID
                      </label>
                      <input
                        type="text"
                        className="form__field"
                        placeholder="$000.."
                        name="adID"
                        id="adID"
                        value={adID}
                        onChange={handleInputChange(
                          setAdID
                        )}
                        disabled
                        required
                      />
                    </div>
                    <div className="bbbbb">
                      <label
                        htmlFor="userID"
                        className="lable-booking"
                      >
                        user ID
                      </label>
                      <input
                        type="text"
                        className="form__field"
                        placeholder="NY"
                        name="userID"
                        id="userID"
                        value={userID}
                        onChange={handleInputChange(
                          setUserID
                        )}
                        required
                      />
                    </div>
                  </div>
                  <div className="section1">
                    <div className="bbbbb">
                      <label
                        htmlFor="bookingDate"
                        className="lable-booking"
                      >
                        booking Date
                      </label>
                      <input
                        type="text"
                        className="form__field"
                        placeholder="$000.."
                        name="bookingDate"
                        id="bookingDate"
                        value={bookingDate}
                        onChange={handleInputChange(
                          setBookingDate
                        )}
                        disabled
                        required
                      />
                    </div>
                    <div className="bbbbb">
                      <label
                        htmlFor="numberOfSeats"
                        className="lable-booking"
                      >
                        number OfSeats
                      </label>
                      <input
                        type="text"
                        className="form__field"
                        placeholder="NY"
                        name="numberOfSeats"
                        id="numberOfSeats"
                        value={numberOfSeats}
                        onChange={handleInputChange(
                          setNumberOfSeats
                        )}
                        required
                      />
                    </div>
                  </div>
                  <div className="section1">
                    <div className="bbbbb">
                      <label
                        htmlFor="status"
                        className="lable-booking"
                      >
                        Status
                      </label>
                      <input
                        type="text"
                        className="form__field"
                        placeholder="NY"
                        name="status"
                        id="status"
                        value={status}
                        onChange={handleInputChange(
                          setStatus
                        )}
                        required
                      />
                    </div>
                    <div className="bbbbb">
                      <label
                        htmlFor="paymentMethod"
                        className="lable-booking"
                      >
                        payment Method
                      </label>
                      <input
                        type="text"
                        className="form__field"
                        placeholder="...!"
                        name="paymentMethod"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={handleInputChange(
                          setPaymentMethod
                        )}
                        required
                      />
                    </div>
                  </div>
                  <div className="section1">
                    <div className="bbbbb2">
                      <label
                        htmlFor="paymentDetails"
                        className="lable-booking"
                      >
                        payment Details
                      </label>
                      <input
                        type="text"
                        className="form__field"
                        name="paymentDetails"
                        id="paymentDetails"
                        value={paymentDetails}
                        onChange={handleInputChange(
                          setPaymentDetails
                        )}
                        required
                      />
                    </div>
                  </div>
                  <div className="disflex-booking">
                    <div className="botall">
                      <button
                        onClick={nextPage}
                        id="bott"
                      >
                        next
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {currentPage === 2 && (
                <div className="from-criditcard">
                  <div className="bank-credit">
                    <div className="card-crid-bank">
                      <button>
                        <FaCreditCard className="icon-book" />
                        card
                      </button>
                    </div>
                    <div className="card-crid-bank">
                      <button>
                        <BsBank className="icon-book" />
                        Bank
                      </button>
                    </div>
                  </div>
                  <div className="credit-card">
                    <div className="logo-credit">
                      <h className="name-cridit">
                        Credit card
                      </h>
                      <div>
                        <FaCreditCard className="icon-book" />
                      </div>
                    </div>
                    <div className="sim">
                      <MdSimCard className="sim-book" />
                    </div>
                    <div className="form-cridit">
                      <form
                        name="form"
                        id="Formv"
                        onSubmit={handleSubmitForm}
                        method="post"
                      >
                        <div className="section-cridit">
                          <div className="dispflex-cridit-feild">
                            <label
                              htmlFor="cardnumber"
                              className="lable-booking"
                            >
                              Card number*
                            </label>
                            <input
                              type="text"
                              className="form__field"
                              placeholder="0000 0000 0000 0000"
                              name="cardnumber"
                              id="cardnumber"
                              // value={formInputs.cardNumber}
                              onChange={
                                handleChangeInput
                              }
                            />
                          </div>
                          <div className="dispflex-cridit-feild2">
                            <label
                              htmlFor="CVV"
                              className="lable-booking"
                            >
                              CVV*
                            </label>
                            <input
                              type="text"
                              className="form__field"
                              placeholder="123"
                              name="CVV"
                              id="CVV"
                              // value={formInputs.cvv}
                              onChange={
                                handleChangeInput
                              }
                            />
                          </div>
                        </div>
                        <div className="dispflex-cridit-feild3">
                          <div className="dispflex-cridit-feild3-1">
                            <label
                              htmlFor="Name"
                              className="lable-booking"
                            >
                              Name*
                            </label>
                            <input
                              type="text"
                              className="form__field"
                              placeholder="Jone Smith"
                              name="Name"
                              id="Name"
                              // value={formInputs.fullName}
                              onChange={
                                handleChangeInput
                              }
                            />
                          </div>
                          <div className="dispflex-cridit-feild3-1">
                            <label
                              htmlFor="Expiration date"
                              className="lable-booking"
                            >
                              Expiration date*
                            </label>
                            <input
                              type="date"
                              className="form__field"
                              placeholder="MM/YY"
                              name="Expiration date"
                              id="Expiration date"
                              // value={formInputs.expirationDate}
                              onChange={
                                handleChangeInput
                              }
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="btn-prev-next">
                    <button
                      onClick={prevPage}
                      className="goback-form"
                    >
                      <FaArrowLeftLong className="arrow-book" />
                      Previous
                    </button>
                    <button
                      onClick={nextPage}
                      className="goback-booking"
                      id="bott"
                      type="submit"
                    >
                      next
                    </button>
                  </div>
                </div>
              )}
              {currentPage === 3 && (
                <div className="finalpage">
                  <div className="finalpage-contant">
                    <div className="box-icon">
                      <h1>📦</h1>
                    </div>
                    <div className="text-box">
                      <h3>Thank you for your order!</h3>
                    </div>
                    <div className="disc-box">
                      <p>
                        Your order number is
                        <span>#140396.</span> We have
                        emailed your order confirmation
                        and will update you once its
                        shipped.
                      </p>
                    </div>
                    <div className="btn-box">
                      <button type="submit" >
                        Go To My Order
                      </button>

                      <div />
                    </div>
                  </div>
                  <div className="btn-prev-next">
                    <button
                      onClick={prevPage}
                      className="goback-form"
                    >
                      <FaArrowLeftLong className="arrow-book" />
                      Previous
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingUser;
function validation(event) {
  event.preventDefault();
  return true;
}
