import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Logo from "../Logo/Logo";

const HeaderWrapper = styled.div`
  background: ${props =>
    props.transparent ? "transparent" : `${colors.colorGrayDarkOne}`};
  min-height: 6rem;
  padding: 0.4rem 2rem;
  position: relative;
  z-index: 300;
  text-align: left !important;

  a {
    font-size: 1.3rem;
  }

  button {
    all: unset;
    border: 3px solid ${colors.colorWhite};
    padding: 0.5rem 1.3rem;
    transform: skew(-20deg);
    display: inline-block;
    transition: all 0.2s;
    color: ${colors.colorWhite};
    font-size: 1.3rem;
    z-index: 200;

    @media only screen and (max-width: ${breakPoints.mediumLite}) {
      align-self: flex-start;
      padding: 0.5rem 1.7rem;
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
    }

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
      background: ${colors.colorPrimary};
      color: ${colors.colorWhite};
      border: 3px solid ${colors.colorPrimary};
    }
  }
`;

export default function Header({ transparent }) {
  return (
    <HeaderWrapper transparent={transparent}>
      <nav
        className="navbar navbar-expand-lg navbar-dark mt-2"
        role="navigation"
      >
        <Link className="navbar-brand navbar-logo mt-n4" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" />
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                href="https://chopbarh.zendesk.com/hc"
                className="nav-link text-uppercase mr-5"
              >
                How to
              </a>
            </li>
            <li className="nav-item">
              <Link to="games" className="nav-link text-uppercase mr-5">
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link to="partner" className="nav-link text-uppercase mr-5">
                Become a Partner
              </Link>
            </li>
            <li className="nav-item">
              <Link to="faqs" className="nav-link text-uppercase mr-5">
                FAQs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="about" className="nav-link text-uppercase mr-5">
                About Us
              </Link>
            </li>
            {localStorage.getItem("chopbarh-token:live") && (
              <li className="nav-item">
                <Link to="user" className="nav-link text-uppercase mr-5">
                  Dashboard
                </Link>
              </li>
            )}
            {!localStorage.getItem("chopbarh-token:live") && (
              <div>
                <button className="mr-2">
                  <Link to="login">
                    <span>Login</span>
                  </Link>
                </button>
                <button>
                  <Link to="signup">
                    <span>Sign Up</span>
                  </Link>
                </button>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </HeaderWrapper>
  );
}
