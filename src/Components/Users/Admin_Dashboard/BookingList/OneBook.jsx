import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

function OneBook() {
    const { bookingID } = useParams(); // Get the offer ID from the URL params
    const [book, setBook] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`https://localhost:7120/api/bookings/${bookingID}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
                setLoaded(true);
            })
            .catch((error) => console.error("Error fetching offer:", error));
    }, [bookingID]);

    return (
        <div className="ViewOffers" style={{paddingTop:'0px'}}>
            {loaded && book && (
                <React.Fragment>
                    <h1 style={{marginTop:"50px"}}>Book ID: {book.bookingID}</h1>
                    <section className="description-offers">
                        <p className="pre">Advatisement ID: {book.adID}</p>
                        <p className="desc"> User ID: {book.userID}</p>
                        <div className="price">
                            <p className="p1">
                                bookingDate: {book.bookingDate}
                            </p>
                            <p className="p1">
                                numberOfSeats: {book.numberOfSeats}
                            </p>
                        </div>
                        <p className="desc">Status: {book.status}</p>
                        <p className="desc">
                            Payment Method: {book.paymentMethod}
                        </p>
                        <p className="desc">
                            Payment Details: {book.paymentDetails}
                        </p>
                        <div className="price">
                            <div className="main-tag">
                                <p> Total Amount: {book.totalAmount}</p>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            )}
        </div>
    );
}

export default OneBook;
