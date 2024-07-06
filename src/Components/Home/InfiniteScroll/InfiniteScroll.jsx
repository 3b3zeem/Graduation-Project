import React, { useEffect, useState } from "react";
import "./InfiniteScroll.css";
import { Link } from "react-router-dom";

function InfiniteScroll() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllCompanies = () => {
    fetch("https://localhost:7120/api/Company")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCompanies(data.data);
        } else {
          console.error("Data received is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching companies:", error));
  };

  return (
    <React.Fragment>
      <div className="scroll">
        <h2 class="main-title">Our Partners</h2>
        <div className="scrolling-text-container">
          <div
            className="scrolling-text-inner"
            style={{ "--marquee-speed": "30s", "--direction": "scroll-left" }}
            role="marquee"
          >
            <div className="scrolling-text">
              {companies.length > 0 &&
                companies.map((company) => (
                  <div
                    className="scrolling-text-item"
                    key={company.companyID}
                  >
                    <Link to={`/Company/${company.companyID}`}>
                      {company.companyName}
                    </Link>
                    &nbsp;
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default InfiniteScroll;
