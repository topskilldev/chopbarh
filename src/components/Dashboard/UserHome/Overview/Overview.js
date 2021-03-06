import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
// import { Redirect } from "react-router-dom";
import color from "../../../styles/colors";
import {
  fetchPlayerData,
  resetPlayerData,
} from "../../../../store/actions/playerDataActions";

const OverviewWrapper = styled.div`
  background: #6d0a23;
  color: #ddd;
  padding: 3rem 2rem;
  border-radius: 5px;
  margin: 4rem auto;
`;

const OverviewContainer = styled.div``;

const OverviewContent = styled.div`
  cursor: pointer;
`;

const OverviewContentHeader = styled.h3`
  font-weight: 600;
  font-size: 3.5rem;
  color: #fff;

  /* ${OverviewContent}:hover & {
    color: ${color.colorPrimary};
  } */
`;

const HeadingFour = styled.h4``;

const OverviewContentDescription = styled.p`
  font-size: 1.5rem;

  ${OverviewContent}:hover & {
    color: ${color.colorWhite};
  }
`;

class Overview extends Component {
  render() {
    // if (this.props.error) {
    //   return <Redirect to="/" />
    // }

    return (
      <OverviewWrapper className="container">
        {this.props.loading && (
          <OverviewContainer className="row text-center">
            <div className="text-center mx-auto">
              <Spinner />
            </div>
          </OverviewContainer>
        )}
        {this.props.error && (
          <OverviewContainer className="row text-center">
            <div className="text-center mx-auto">
              <p>DATA NOT AVAILABLE</p>
            </div>
          </OverviewContainer>
        )}
        {!this.props.loading && this.props.playerData && (
          <>
            <HeadingFour className="mb-5 text-center">Overview</HeadingFour>
            <OverviewContainer className="row text-center">
              <OverviewContent className="col-lg-4">
                <OverviewContentHeader>
                  {new Intl.NumberFormat().format(
                    this.props.playerData.CBCoins
                  )}
                </OverviewContentHeader>
                <OverviewContentDescription>
                  Coin Balance
                </OverviewContentDescription>
              </OverviewContent>
              <OverviewContent className="col-lg-4">
                <OverviewContentHeader>
                  &#8358;
                  {new Intl.NumberFormat().format(
                    this.props.playerData.RealCoins
                  )}
                </OverviewContentHeader>
                <OverviewContentDescription>
                  Cash Balance
                </OverviewContentDescription>
              </OverviewContent>
              <OverviewContent className="col-lg-4">
                <OverviewContentHeader>
                  &#8358;
                  {new Intl.NumberFormat().format(
                    this.props.playerData.TotalWinning
                  )}
                </OverviewContentHeader>
                <OverviewContentDescription>
                  Earnings
                </OverviewContentDescription>
              </OverviewContent>
            </OverviewContainer>
          </>
        )}
      </OverviewWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.player.loading,
  playerData: state.player.playerData,
  error: state.player.error === true,
});

const mapDispatchToProps = { fetchPlayerData, resetPlayerData };

export default connect(mapStateToProps, mapDispatchToProps)(memo(Overview));
