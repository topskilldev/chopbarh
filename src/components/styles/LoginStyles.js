import styled from "styled-components";
import color from "./colors";
import breakPoints from "./breakpoints";

export const AuthWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100vh;
  position: relative;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    grid-template-columns: 1fr;
  }
`;

export const ImageContainer = styled.div`
  background: rgb(109, 10, 35);
  background-size: cover;
  position: relative;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    display: none;
  }

  /* &::before {
    background: rgb(109, 10, 35);
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
  } */
`;

export const Image = styled.div`
  position: absolute;
  background-image: url(${`https://res.cloudinary.com/chopbarh/image/upload/v1564747890/Landing%20Page%20Assets/user_juzpcq.png`});
  background-size: cover;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50vw;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    display: none;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const FormItem = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #737773;
    margin-bottom: 1rem;
  }

  input {
    color: #8d8e8d;
    width: 30rem;
    height: 3.4rem;
    margin-bottom: 2rem;
    border: 0;
    background: #f6f6f6;
    outline: none;
    padding: 3px 7px;
  }

  & > * {
    display: block;
    font-family: inherit;
  }
`;

export const FormCheckBox = styled.div`
  display: flex;
  align-items: center;

  label {
    order: 2;
    margin-top: 5px;
    margin-left: 5px;
    font-size: 1.3rem;
  }
`;

export const FormAction = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    transform: skew(-20deg);
    display: inline-block;
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;
      -webkit-text-fill-color: #ffffff;

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
        -webkit-text-fill-color: #ffffff;

      @media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio:0) {
        color: #ffffff;
      }
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
`;

export const Button = styled.a`
  all: unset;
  padding: 0.5rem 1.3rem;
  transform: skew(-20deg);
  display: inline-block;
  transition: all 0.2s;
  color: ${color.colorWhite};
  background: ${color.colorPrimary};
  font-size: 1.3rem;
  z-index: 200;
    -webkit-text-fill-color: #ffffff;

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
      -webkit-text-fill-color: #ffffff;
  }

  &:hover {
    transform: translateY(-3px) skew(-20deg);
    background: ${color.colorPrimaryHover};
    color: ${color.colorWhite};
  }
`;

export const SignUpSignal = styled.div`
  margin-top: 7rem;
  text-align: center;

  a {
    all: unset;
    padding: 0.5rem 1.3rem;
    transform: skew(-20deg);
    display: inline-block;
    transition: all 0.2s;
    color: ${color.colorWhite};
      -webkit-text-fill-color: #ffffff;
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;
    cursor: pointer;

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
        -webkit-text-fill-color: #ffffff;
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
`;

export const HeadingTwo = styled.h2`
  font-size: 3.5rem;
  color: #4c4c4c;
  font-weight: bold;
`;

export const ErrorText = styled.span`
  color: #c50000;
`;
