import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import breakpoint from "../components/styles/breakpoints";
import color from "../components/styles/colors";

const ErrorBoundaryWrapper = styled.div`
  height: 100vh;
  text-align: center;
  padding: 50vh 0;
  position: relative;

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 6rem;

    @media screen and (max-width: ${breakpoint.medium}) {
      font-size: 5.5rem;
    }
  }

  span {
    background: #fff;
    padding: 0.5rem;
    font-size: 1.8rem;
  }

  a {
    margin: 3rem auto;
    display: block;
    background: ${color.colorPrimary};
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    width: 13rem;
    padding: 0.5rem;
    transition: all 0.3s;

    &:hover {
      background: ${color.colorPrimaryHover};
      transform: translateY(-3px);
    }
  }
`;

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorModal: false,
  };

  componentDidCatch = error => {
    this.setState({ error, errorModal: true });
  };

  goBack = () => {
    this.props.history.push("/");
    window.location.reload();
  };

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <ErrorBoundaryWrapper>
          <div>
            <h3>
              Ooops! <br />
              <span>An Error Occured!</span>
            </h3>
            <Link to="/" onClick={this.goBack}>
              Home
            </Link>
          </div>
        </ErrorBoundaryWrapper>
      );
    }

    return <div>{this.props.children}</div>;
  }
}

export default withRouter(ErrorBoundary);
