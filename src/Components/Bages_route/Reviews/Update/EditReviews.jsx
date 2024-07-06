import React, { useEffect, useState } from "react";
import "./EditReviews.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditReviews = () => {
  let navigate = useNavigate();
  let { reviewId, advertisementId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7120/api/reviews/${reviewId}`
        );
        const review = response.data;
        setRating(review.rating);
        setComment(review.comment);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleInputChange = (setter, value) => {
    setter(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7120/api/reviews/${reviewId}`, {
        rating,
        comment,
      });
      Swal.fire({
        title: "Good job!",
        text: "Your Review is done!",
        icon: "success",
      });
      navigate(`/advertisements/${advertisementId}`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="con-Edit-ad">
        <div className="container-contant-Edit">
          <h1 className="ad-title-edit">Edit Review No.{reviewId}</h1>
          <div className="form-Edit-ad" style={{height:"40%"}}>
            <div className="image-of-contact-ad-edit" />
            <div className="contant-of-Edit-ad">
              <form className="coll-Edit" onSubmit={formSubmit}>
                <div className="only-input-edit">
                  <label htmlFor="inputTitle" className="form-label-edit">
                    Rating : {rating}
                  </label>
                  <input
                    type="range"
                    className="input-feild7"
                    id="inputTitle"
                    value={rating}
                    min={1}
                    max={5}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                </div>

                <div className="only-input-edit">
                  <label htmlFor="inputDescription" className="form-label-edit">
                    Comment
                  </label>
                  <input
                    type="text"
                    className="input-feild7"
                    id="inputDescription"
                    value={comment}
                    onChange={(e) =>
                      handleInputChange(setComment, e.target.value)
                    }
                  />
                </div>
                <div className="all-btn-edit">
                  <button type="submit" className="btn-readyc5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditReviews;
