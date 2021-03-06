import React from "react";
import styled from "styled-components";
import Slider from "react-animated-slider";
import MediaQuery from "react-responsive";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Background from "../../assets/svg/WavyHeader.svg";
import AppStoreButton from "../../assets/img/AppStore.png";
import PlayStoreButton from "../../assets/img/PlayStore@2x.png";

import "react-animated-slider/build/horizontal.css";

const HeroWrapper = styled.div`
  height: 87vh;
  /* width: 98.7vw; */
  position: relative;
  background: url(${Background}) ${color.colorPrimary};
  overflow: hidden;
  color: ${color.colorWhite};

  @media only screen and (max-width: ${breakPoints.smallest}) {
    height: 94vh;
  }
`;

// const HeroContentWrapper = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 10%;
//   transform: translateY(-50%);

//   @media only screen and (max-width: ${breakPoints.medium}) {
//     top: 30%;
//     left: 50%;
//     transform: translateX(-50%);
//     text-align: center;
//   }
// `;

export const HeadingTwo = styled.h2`
  font-size: 6.5rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 6rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    font-size: 4.5rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    font-size: 3.5rem;
  }

  @media only screen and (max-width: ${breakPoints.smallest}) {
    font-size: 3rem;
  }

  @media only screen and (max-width: 350px) {
    font-size: 2.5rem;
  }
`;

const HeadingTwoFirst = styled(HeadingTwo)`
  @media only screen and (max-width: 350px) {
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
  }

  @media only screen and (max-width: ${breakPoints.smallest}) {
    font-size: 2rem;
  }
`;

const ParagraphOne = styled.p`
  font-size: 1.7rem;
  font-weight: 400;

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    margin-top: 1rem;
    font-size: 1.4rem;
  }

  @media only screen and (max-width: ${breakPoints.smallest}) {
    margin-top: 0.5rem;
  }
`;

const Image = styled.img`
  width: 23rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  @media only screen and (max-width: ${breakPoints.medium}) {
    width: 21rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    width: 35rem;
  }
`;

const AppleStoreImage = styled(Image)`
  width: 20rem;

  @media only screen and (max-width: ${breakPoints.medium}) {
    width: 18rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    width: 30rem;
  }
`;

// const AndroidInstructionImage = styled(Image)`
//   @media only screen and (max-width: ${breakPoints.small}) {
//     margin-top: 5rem;
//     width: 30rem;
//   }

//   @media only screen and (max-width: ${breakPoints.smaller}) {
//     margin-top: 1rem;
//   }

//   @media only screen and (max-width: ${breakPoints.smallest}) {
//     margin-top: 0.8rem;
//   }
// `;

const SliderImage = styled.img`
  position: absolute;
  top: 15vh;
  left: 50vw;

  width: 50%;

  @media only screen and (max-width: 1199px) {
    top: 20vh !important;
  }

  @media only screen and (max-width: 1140px) {
    top: 26vh !important;
  }

  @media only screen and (max-width: ${breakPoints.large}) {
    display: none !important;
  }
`;

const SliderContent = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => (props.first ? "35%" : "50%")};
  z-index: 2000;
  transform: translate(-50%, -50%);

  margin-left: ${props => (props.first ? "2rem" : "0")};

  @media only screen and (max-width: ${breakPoints.large}) {
    left: 50%;
    text-align: center;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    margin-left: 0;
  }
`;

const SliderContentSmallScreens = styled(SliderContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  position: relative;
`;

const VendorButtonImage = styled.img`
  width: 48%;
  transition: all 0.2s;
  margin-top: 3rem;

  @media only screen and (max-width: ${breakPoints.large}) {
    width: 60%;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

export const VendorButtonImageFirstSlide = styled(VendorButtonImage)`
  padding-left: 1rem;
  margin-top: 3rem;
  width: 50%;
`;

export const VendorButtonImageSmall = styled.img`
  width: 100%;
  transition: all 0.2s;
  margin-top: 4rem;

  @media only screen and (max-width: ${breakPoints.small}) {
    margin-top: 1rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    width: 25rem;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

export default function Hero() {
  return (
    <Container>
      <MediaQuery minDeviceWidth={767}>
        <Slider disabled={true}>
          <div
            style={{
              background: `url('${Background}') ${color.colorPrimary} no-repeat center center`,
              backgroundSize: "cover",
              color: "#fff",
            }}
          >
            <SliderContent>
              <HeadingTwoFirst className="hero__title">
                Play and Chop
              </HeadingTwoFirst>
              <ParagraphOne>
                Play and win from collection of childhood games that live up to
                the moment
              </ParagraphOne>
              <div className="hero__buttons mt-4">
                <span style={{ cursor: "pointer" }}>
                  <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                    <AppleStoreImage
                      src={AppStoreButton}
                      className="mr-lg-2 mr-md-3 mr-sm-2 mb-md-2"
                      alt="App Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://play.google.com/store/apps/details?id=com.chopbarh.common">
                    <Image
                      src={PlayStoreButton}
                      className="mr-lg-3 mt-lg-2 mt-md-2 mr-md-3 mr-sm-2 mb-lg-3 mb-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
                {/* <span style={{ cursor: "pointer" }}>
                  <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                    <Image
                      src={AndroidInstructions}
                      className="mb-lg-3 mt-lg-3 mt-md-3 mb-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span> */}
              </div>
            </SliderContent>
            <SliderImage
              className="d-block"
              src="https://res.cloudinary.com/chopbarh/image/upload/v1564748049/Landing%20Page%20Assets/slider_1_vfw3gc.png"
              alt="User"
            />
          </div>
        </Slider>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={767}>
        <HeroWrapper>
          <div>
            <SliderContentSmallScreens>
              <div>
                {/* <MediaQuery maxDeviceWidth={425}>
                  <iframe
                    title="Chopbarh Video"
                    width="300"
                    height="250"
                    src="https://www.youtube.com/embed/gBeXOvNpR3c"
                  ></iframe>
                  <HeadingTwoFirst
                    className="hero__title"
                    style={{ color: "#ebc709" }}
                  >
                    UP TO
                    <br />
                    &#8358;10 Billion Registration Funds Available
                  </HeadingTwoFirst>
                </MediaQuery> */}
                {/* <HeadingTwoFirst
                  className="hero__title mt-4"
                  style={{ color: "#ebc709" }}
                >
                  DOWNLOAD NOW AND GET FREE COINS
                </HeadingTwoFirst> */}
                {/* <img
                  src={MegaMillions}
                  alt="Mega Millions"
                  width="250"
                  className="mb-2"
                /> */}
                <ParagraphOne>
                  Play and win from collection of childhood games that live up
                  to the moment
                </ParagraphOne>
                <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
                  <span style={{ cursor: "pointer" }}>
                    <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                      <AppleStoreImage
                        src={AppStoreButton}
                        className="mr-lg-3 mr-md-3 mr-sm-2 mb-2"
                        alt="App Store"
                      />
                    </a>
                  </span>
                  <span style={{ cursor: "pointer" }}>
                    <a href="https://play.google.com/store/apps/details?id=com.chopbarh.common">
                      <Image
                        src={PlayStoreButton}
                        className="mr-lg-4 mr-md-4 mr-sm-2 mb-lg-3 mb-md-3 mb-2"
                        alt="Play Store"
                      />
                    </a>
                  </span>
                  {/* <span>
                    <ParagraphOne
                      style={{ textTransform: "uppercase", fontWeight: "bold" }}
                    >
                      Download now and get &#8358;100 free
                    </ParagraphOne>
                  </span> */}
                  {/* <span style={{ cursor: "pointer" }}>
                    <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                      <AndroidInstructionImage
                        src={AndroidInstructions}
                        className="mr-lg-4 mr-md-4 mr-sm-2"
                        alt="Play Store"
                      />
                    </a>
                  </span> */}
                </div>
              </div>
            </SliderContentSmallScreens>
            <SliderImage
              className="d-block"
              src="https://res.cloudinary.com/chopbarh/image/upload/v1564748049/Landing%20Page%20Assets/slider_1_vfw3gc.png"
              alt="User"
            />
          </div>
        </HeroWrapper>
      </MediaQuery>
    </Container>
  );
}
