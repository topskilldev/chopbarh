import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner } from "reactstrap";
import styled from "styled-components";
// import eyowo from "eyowo-js";
import {
  Form,
  FormItem,
  FormSubmitButton,
  Button
} from "../../../styles/CardCharge";
import { toast } from "react-toastify";

import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
// import { getReference } from "../../../../lib/getReference";

const appKey = "0edef5bd4b6a1628b860b7025dccca86";
// const appSecret = "e057257f40b19771ed00fdb819842389baee618f8de99f74a6216e6c189ee926";

// const client = new eyowo.Client({
//   appKey,
//   appSecret,
//   environment: "production"
// });

const FormWrapper = styled(Form)`
  min-height: 20rem;
  margin-bottom: 3.2rem;
`;

const AuthFormWrapper = styled(FormWrapper)`
  min-height: 6rem;
`;

class Eyowo extends Component {
  state = {
    phone_number: "",
    amount: "",
    loading: false,
    authModal: false,
    authorizing: false,
    confirmModal: false,
    passcode: "",
    authLoading: false
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, phone_number }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(phone_number) !== true ||
      phone_number.length !== 11
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    // Validate the form filled
    if (!this.formIsValid(this.state)) {
      toast.error("Form is not valid");
      return;
    }

    // Confirm they can withdraw that amount
    if (Number(this.state.amount) > this.props.playerData.RealCoins) {
      toast.error("You cannot withdraw more than you have won");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) < 1000) {
      toast.error(`You cannot withdraw less than \u20a6${1000}`);
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) > 50000) {
      toast.error(
        `You cannot withdraw more than \u20a6${new Intl.NumberFormat().format(
          50000
        )} at once`
      );
      this.setState({ loading: false });
      return;
    }

    if (
      this.props.withdrawalStatus + Number(this.state.amount) >
      this.props.withdrawalLimit
    ) {
      toast.error(
        "Withdrawal could not be completed. Your daily limit will be exceeded."
      );
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: false, confirmModal: true });
  };

  authorizeUser = async () => {
    this.setState({ authorizing: true });

    const mobile = `234${this.state.phone_number
      .split("")
      .slice(1)
      .join("")}`;

    try {
      //Get access Token
      const accessToken = await fetch(
        "https://api.console.eyowo.com/v1/users/accessToken",
        {
          method: "POST",
          headers: {
            "x-app-key": appKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            refreshToken: "5d89eea08c3f865d585fe6b750cde51482d8710a"
          })
        }
      );

      const accessTokenResponse = await accessToken.json();

      if (accessTokenResponse.success === true) {
        const token = accessTokenResponse.data.accessToken;
        // console.log(token);

        // Send the money to them
        const transferRequest = await fetch(
          "https://api.console.eyowo.com/v1/users/transfers/phone",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-app-key": appKey,
              "x-app-wallet-access-token": token
            },
            body: JSON.stringify({
              amount: (Number(this.state.amount) - 50) * 100,
              mobile
            })
          }
        );

        const transferResponse = await transferRequest.json();

        if (transferResponse.success === true) {
          toast.info("Transaction is processing");
          this.setState({ confirmModal: false });

          // Set the Withdrawal History
          const payload = {
            status: "SUCCESSFUL",
            amount: +this.state.amount,
            date: new Date().toISOString(),
            reference: `${this.props.playerData.PhoneNum}-${transferResponse.data.transaction.reference}`,
            fee: 0,
            channel: "Eyowo"
          };

          this.props.setWithdrawalHistory(payload);

          // Remove the cash
        } else {
          toast.error("Something went wrong");
          this.setState({ authModal: false, authLoading: false });
        }
      } else {
        this.setState({ authorizing: false });
        toast.error("Something went wrong!");
      }
    } catch (err) {}

    // Do User authorization
    // try {
    //   const initialAuthRequest = await fetch(
    //     "https://api.console.eyowo.com/v1/users/auth",
    //     {
    //       method: "POST",
    //       headers: {
    //         "x-app-key": appKey,
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         mobile,
    //         factor: "sms"
    //       })
    //     }
    //   );

    //   const initialAuthResponse = await initialAuthRequest.json();
    //   // console.log(initialAuthResponse);

    //   if (initialAuthResponse.success === true) {
    //     this.setState({
    //       authModal: true,
    //       confirmModal: false,
    //       authorizing: false
    //     });
    //   } else {
    //     this.setState({ authorizing: false });
    //     toast.error("We could not validate your phone number");
    //   }
    // } catch (err) {}
  };

  handleUserAuthorization = async event => {
    event.preventDefault();

    if (this.props.playerData.PlayerStatus === 0) {
      toast.error("Your account has been deactivated");
      return;
    }

    this.setState({ authLoading: true });
    // Authorize the user here
    const mobile = `234${this.state.phone_number
      .split("")
      .slice(1)
      .join("")}`;

    const followUpAuthRequest = await fetch(
      "https://api.console.eyowo.com/v1/users/auth",
      {
        method: "POST",
        headers: {
          "x-app-key": appKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mobile,
          factor: "sms",
          passcode: this.state.passcode
        })
      }
    );

    const followUpAuthResponse = await followUpAuthRequest.json();

    if (followUpAuthResponse.success === true) {
      const token = followUpAuthResponse.data.accessToken;
      // console.log(token);

      // Send the money to them
      const transferRequest = await fetch(
        "https://api.console.eyowo.com/v1/users/transfers/phone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-key": appKey,
            "x-app-wallet-access-token": token
          },
          body: JSON.stringify({
            amount: (Number(this.state.amount) - 50) * 100,
            mobile
          })
        }
      );

      const transferResponse = await transferRequest.json();

      if (transferResponse.success === true) {
        toast.info("Transaction is processing");
        this.setState({ authModal: false, authLoading: false });

        // Set the Withdrawal History
        const payload = {
          status: "SUCCESSFUL",
          amount: +this.state.amount,
          date: new Date().toISOString(),
          reference: `${this.props.playerData.PhoneNum}-${transferResponse.data.transaction.reference}`,
          fee: 0,
          channel: "Eyowo"
        };

        this.props.setWithdrawalHistory(payload);

        // Remove the cash
      } else {
        toast.error("Something went wrong");
        this.setState({ authModal: false, authLoading: false });
      }
    } else {
      toast.error("Please try again");
      this.setState({ authLoading: false });
    }
  };

  toggleAuthModal = () => {
    this.setState({
      authModal: !this.state.authModal,
      passcode: ""
    });
  };

  toggleConfirmModal = () => {
    this.setState({
      confirmModal: !this.state.confirmModal
    });
  };

  render() {
    return (
      <>
        {/* <Modal
     isOpen={this.state.confirmModal}
     toggle={this.toggleConfirmModal}
     style={{
      top: "50%",
      transform: "translateY(-50%)"
     }}
    >
     <ModalBody className="text-center p-4" style={{ minHeight: "12rem" }}>
      <p>
       <strong>
        Amount: &#8358;
        {new Intl.NumberFormat().format(+this.state.amount)}
       </strong>
      </p>
      <p>
       <strong>Transaction Fee: &#8358;{50}</strong>
      </p>
      <p>
       <strong>
        Total: &#8358;
        {new Intl.NumberFormat().format(+this.state.amount - 50)}
       </strong>
      </p>
      <p>Proceed with withdrawal?</p>
      <div className="d-flex justify-content-center">
       <Button className="mr-1" onClick={this.authorizeUser}>
        <span>{this.state.authorizing ? "Processing..." : "Yes"}</span>
       </Button>
       {!this.state.authorizing ? (
        <Button
         onClick={() => this.setState({ confirmModal: false })}
         className="ml-1"
        >
         <span>No</span>
        </Button>
       ) : (
        <>{null}</>
       )}
      </div>
     </ModalBody>
    </Modal>
    <Modal
     isOpen={this.state.authModal}
     toggle={this.toggleAuthModal}
     style={{
      top: "50%",
      transform: "translateY(-50%)"
     }}
    >
     <ModalBody className="text-center p-4" style={{ minHeight: "12rem" }}>
      <p className="mt-4">Enter the passcode that was sent to your phone</p>
      <AuthFormWrapper onSubmit={this.handleUserAuthorization}>
       <FormItem>
        <input
         type="text"
         value={this.state.passcode}
         onChange={this.handleInputChange}
         name="passcode"
         required
         placeholder="Passcode"
        />
       </FormItem>
       <FormSubmitButton
        type="submit"
        className="mr-2"
        disabled={this.state.authLoading}
       >
        <span>{this.state.authLoading ? "Processing..." : "Submit"}</span>
       </FormSubmitButton>
      </AuthFormWrapper>
     </ModalBody>
    </Modal>
    <FormWrapper onSubmit={this.handleSubmit}>
     <p
      className="text-center"
      style={{ color: "red", fontSize: "15px", fontWeight: "bold" }}
     >
      Dial *4255# to access your fund
     </p>
     <FormItem>
      <label>Phone Number</label>
      <input
       type="text"
       value={this.state.phone_number}
       onChange={this.handleInputChange}
       name="phone_number"
       required
       minLength={11}
       maxLength={11}
       placeholder="Phone Number"
      />
     </FormItem>
     <FormItem>
      <label>Amount</label>
      <input
       type="text"
       value={this.state.amount}
       onChange={this.handleInputChange}
       name="amount"
       required
       placeholder="Amount(NGN)"
      />
     </FormItem>
     <FormSubmitButton
      type="submit"
      className="mr-2"
      disabled={this.state.loading}
     >
      <span>{this.state.loading ? "Processing..." : "Withdraw"}</span>
     </FormSubmitButton>
    </FormWrapper> */}
        <p className="text-center">Service currently unavailable</p>
      </>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
  withdrawalStatus: state.withdrawal.withdrawalStatus,
  withdrawalAccount: state.withdrawalAccount.withdrawalAccount
});

const mapDispatchToProps = {
  setWithdrawalHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(Eyowo);
