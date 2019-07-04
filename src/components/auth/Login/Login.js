import React, { Component, memo } from "react";
import { Helmet } from "react-helmet";
import { withRouter, Link } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import {
  AuthWrapper,
  HeadingTwo,
  ImageContainer,
  Image,
  FormWrapper,
  FormItem,
  FormCheckBox,
  FormAction,
  SignUpSignal
} from "../../styles/LoginStyles";
import keys from "../../../config/keys";
import {
  authStart,
  authSuccess,
  authFail
} from "../../../store/actions/authActions";
import Logo from "../../UI/Logo/Logo";

class Login extends Component {
  state = {
    formErrorModal: false,
    accountErrorModal: false,
    userName: "",
    password: "",
    loading: false
  };

  componentDidMount = () => {
    console.log(this.props);
  };

  toggleformErrorModal = () => {
    this.setState({ formErrorModal: !this.state.formErrorModal });
  };

  toggleAccountErrorModal = () => {
    this.setState({ accountErrorModal: !this.state.accountErrorModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ userName, password }) => {
    if (
      userName.length !== 11 ||
      !isNaN(userName) !== true ||
      password.length !== 4
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ formErrorModal: true });
      return;
    }
    this.props.authStart();

    const newState = { ...this.state };
    const formState = {
      userName: newState.userName,
      password: newState.password
    };
    formState["@class"] = ".AuthenticationRequest";
    const formValue = JSON.stringify(formState);

    const context = this;

    fetch(
      `https://${keys.apiKeyPrefix}.gamesparks.net/rs/debug/${
        keys.apiKeySuffix
      }/AuthenticationRequest`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: formValue
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.authToken) {
          localStorage.setItem("chopbarh-token:live", data.authToken);
          localStorage.setItem("chopbarh-id:live", data.userId);
          context.props.authSuccess(data.authToken, data.userId);
          console.log("Auth Success");
          context.props.history.push("/user");
        } else {
          console.log("Catch else..");
          context.setState({ accountErrorModal: true });
          context.props.authFail();
        }
      })
      .catch(err => {
        context.props.authFail();
      });
  };

  render() {
    return (
      <AuthWrapper>
        <Helmet title={`Chopbarh \u{2192} Login`} />
        <ImageContainer />
        <Image />

        <Modal
          isOpen={this.state.formErrorModal}
          toggle={this.toggleformErrorModal}
          className="pt-5 mt-4"
        >
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>There was an error in the form!</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.accountErrorModal}
          toggle={this.toggleAccountErrorModal}
          className="pt-5 mt-4"
        >
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>Account not found. Please, Sign Up first</p>
          </ModalBody>
        </Modal>

        <FormWrapper>
          <Link to="/">
            <Logo width="110px" />
          </Link>
          <form onSubmit={this.handleSubmit} className="mt-5">
            <HeadingTwo className="mb-4">Login</HeadingTwo>
            <FormItem>
              <label>Phone Number</label>
              <input
                type="text"
                name="userName"
                onChange={this.handleInputChange}
                value={this.state.userName}
                required
                minLength="11"
                maxLength="11"
              />
            </FormItem>
            <FormItem>
              <label>Enter Pin</label>
              <input
                type="password"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
                required
                minLength="4"
                maxLength="4"
              />
            </FormItem>
            <FormAction>
              <FormCheckBox>
                <label>Remember Me</label>
                <input type="checkbox" />
              </FormCheckBox>
              <button
                type="submit"
                disabled={this.props.loading}
                className="mr-2"
              >
                <span>{this.props.loading ? "Please wait..." : "Login"}</span>
              </button>
            </FormAction>
            <SignUpSignal>
              <span>No Account?</span>
              <br />
              <Link to="signup">Sign Up</Link>
            </SignUpSignal>
          </form>
        </FormWrapper>
      </AuthWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = {
  authStart,
  authSuccess,
  authFail
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(Login))
);
