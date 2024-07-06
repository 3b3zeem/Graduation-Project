import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Path = ({ title }) => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    // Extract the last part of the pathname as the current page
    const currentPath = location.pathname.split("/").filter(Boolean);
    const currentPage = currentPath[currentPath.length - 1];

    // Set the previous location based on the current page
    if (currentPage !== title.toLowerCase()) {
      setPrevLocation(currentPage);
    } else {
      setPrevLocation("");
    }
  }, [location.pathname, title]);

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <span>{prevLocation === "" ? "Home" : prevLocation}</span>
        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor">{title}</span>
      </p>
    </div>
  );
};

export default Path;
