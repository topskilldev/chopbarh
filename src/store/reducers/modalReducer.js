import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  submitOTPModal: false,
  submitPinModal: false,
  transactionSuccessModal: false,
  transactionFailModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.OPEN_SUBMIT_PIN_MODAL:
      return {
        ...state,
        submitPinModal: true
      };
    case actionType.CLOSE_SUBMIT_PIN_MODAL:
      return {
        ...state,
        submitPinModal: false
      };
    case actionType.OPEN_SUBMIT_OTP_MODAL:
      return {
        ...state,
        submitOTPModal: true
      };
    case actionType.CLOSE_SUBMIT_OTP_MODAL:
      return {
        ...state,
        submitOTPModal: false
      };
    case actionType.OPEN_TRANSACTION_SUCCESS_MODAL:
      return {
        ...state,
        transactionSuccessModal: true
      };
    case actionType.CLOSE_TRANSACTION_SUCCESS_MODAL:
      return {
        ...state,
        transactionSuccessModal: false
      };
    case actionType.OPEN_TRANSACTION_FAIL_MODAL:
      return {
        ...state,
        transactionFailModal: true
      };
    case actionType.CLOSE_TRANSACTION_FAIL_MODAL:
      return {
        ...state,
        transactionFailModal: false
      };
    default:
      return state;
  }
};