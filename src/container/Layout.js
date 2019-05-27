import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authSuccess } from "../store/actions/authActions";
import { fetchPlayerData } from "../store/actions/playerDataActions";

const LandingPage = lazy(() => import("../Pages/LandingPage"));
const GamesPage = lazy(() => import("../Pages/GamesPage"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const SignUpPage = lazy(() => import("../Pages/SignUpPage"));
const CompleteProfilePage = lazy(() => import("../Pages/CompleteProfilePage"));
const EditProfilePage = lazy(() => import("../Pages/EditProfilePage"));
const ProfilePage = lazy(() => import("../Pages/ProfilePage"));
const ForgotPassword = lazy(() =>
  import("../components/auth/ForgotPassword/ForgotPassword")
);
const Logout = lazy(() => import("../components/auth/Logout/Logout"));
const SetNickname = lazy(() =>
  import("../components/auth/SetNickname/SetNickname")
);
const UserHomePage = lazy(() => import("../Pages/UserHomePage"));
const UserDepositPage = lazy(() => import("../Pages/UserDepositPage"));
const UserWithdrawPage = lazy(() => import("../Pages/UserWithdrawPage"));
const UserTransactionPage = lazy(() => import("../Pages/UserTransactionPage"));

/*

This component implements routing. We should add React Suspense here.
Add auth logic here to change routes dynamically. Consider approach between 
initialising in constructor and using componentWillMount

*/

class Layout extends Component {
  UNSAFE_componentWillMount = () => {
    if (this.props.isAuthenticated) {
      this.props.authSuccess(
        localStorage.getItem("chopbarh-token:live"),
        localStorage.getItem("chopbarh-id:live")
      );
      //this.props.fetchPlayerData();
      if (localStorage.getItem("chopbarh-token")) {
        localStorage.removeItem("chopbarh-token");
        localStorage.removeItem("chopbarh-id");
      }
    }
  };

  render() {
    return (
      <>
        {this.props.isAuthenticated ? (
          <Suspense>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/games" component={GamesPage} />
              <Route path="/reset" component={ForgotPassword} />
              <Route path="/logout" component={Logout} />
              <Route path="/user" component={UserHomePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/edit-profile" component={EditProfilePage} />
              <Route path="/deposit" component={UserDepositPage} />
              <Route path="/withdraw" component={UserWithdrawPage} />
              <Route path="/transaction" component={UserTransactionPage} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        ) : (
          <Suspense>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/games" component={GamesPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/set-nickname" component={SetNickname} />
              <Route path="/complete_profile" component={CompleteProfilePage} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: localStorage.getItem("chopbarh-token:live") !== null
});

const mapDispatchToProps = {
  authSuccess,
  fetchPlayerData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
