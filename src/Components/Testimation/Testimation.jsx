import React, { useState, useEffect } from "react";
import "./Testimation.scoped.css";
import data from "./data.js";

import { FaQuoteRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const Testimation = () => {
    const [people] = useState(data);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = people.length - 1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, people]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1);
        }, 5000);
        return () => {
            clearInterval(slider);
        }
    }, [index])

    return (
        <section className="section">
            <div className="title-2">
                <h2>Customer opinions</h2>
            </div>
            <div className="section-center">
                {people.map((item, indexPeople) => {
                    const { id, image, name, job, description } = item;
                    let position = "nextSlide";
                    if (indexPeople === index) {
                        position = "activeSlide";
                    }
                    if (indexPeople === index - 1 || (index === 0 && indexPeople === people.length - 1)) {
                        position = "lastSlide";
                    }
                    return(
                        <article className={position} key={id}>
                            <div className="rating">
                                <FaQuoteRight className="quot-icon"/>
                                <div>
                                    <CiStar className="star"/>
                                    <FaStarHalfAlt className="star"/>
                                    <FaStarHalfAlt className="star"/>
                                    <FaStar className="star"/>
                                    <FaStar className="star"/>
                                </div>
                            </div>
                            <img src={image} alt={name} className="person-img" />
                            <h4>{name}</h4>
                            <p className="title-2">{job}</p>
                            <p className="text">{description}</p>
                        </article>
                    );
                })}
                <button className="prev" onClick={() => setIndex(index - 1)}>
                    <IoIosArrowBack />
                </button>
                <button className="next" onClick={() => setIndex(index + 1)}>
                    <IoIosArrowForward />
                </button>
            </div>
        </section>
    );
};

export default Testimation;
