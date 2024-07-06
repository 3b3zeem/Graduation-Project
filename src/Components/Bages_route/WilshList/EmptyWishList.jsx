import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import wishList from "../../../im&ve/wishList.svg";

const WishListEmptyScreenWrapper = styled.main`
  .wishlist-empty-content {
    max-width: 514px;
    margin-right: auto;
    margin-left: 200px;
    background-color: var(--input2);
    color: var(--TextColor);

    .heart-img {
      margin-right: auto;
      margin-left: auto;
      width: 180px;
      height: 180px;
      margin-bottom: 10px;
    }

    .btn-continue {
      margin-top: 20px;
      background: var(--PrimaryColor);
      border-color: var(--PrimaryColor);
      padding: 1rem 1rem;
      color: var(--inputfeild);
      text-decoration: none;
      border-radius: 3px;
      font-size: 15px;
      font-weight: 500;

      &:hover{
        opacity: .7;
      }
    }
  }
`;

const WishListEmptyScreen = () => {
  return (
    <WishListEmptyScreenWrapper className="content-main page-empty-wishlist page-py-spacing">
      <Container>
        <div className="wishlist-empty-content text-center">
          <div className="heart-img flex items-center justify-center">
            <img src={wishList} alt="" />
          </div>
          <h3 className="text-xxl font-semibold">Your wishlist is empty.</h3>
          <p className="text-gray text-base mb-5">
            You don&nbsp;t have any advertisements in the wishlist yet. You will
            find a lot of interesting advertisements on our Shop page.
          </p>
          <Link to={"/advertisements"} className="btn-continue">
            Continue Shopping
          </Link>
        </div>
      </Container>
    </WishListEmptyScreenWrapper>
  );
};

export default WishListEmptyScreen;
