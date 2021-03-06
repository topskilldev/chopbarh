import React from "react";
import ReactDOM from "react-dom";
import { LastLocationProvider } from "react-router-last-location";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import playerDataReducer from "./store/reducers/playerDataReducer";
import chargeReducer from "./store/reducers/chargeReducer";
import modalReducer from "./store/reducers/modalReducer";
import voucherReducer from "./store/reducers/voucherReducer";
import bankAccountReducer from "./store/reducers/bankAccountReducer";
import creditCardReducer from "./store/reducers/creditCardReducer";
import depositReducer from "./store/reducers/depositReducer";
import withdrawalReducer from "./store/reducers/withdrawalReducer";
import withdrawalAccountReducer from "./store/reducers/withdrawalAccountReducer";
import refundReducer from "./store/reducers/refundReducer";
import raveCardReducer from "./store/reducers/raveCardReducer";
import instantPaymentReducer from "./store/reducers/instantPaymentReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerDataReducer,
  charge: chargeReducer,
  modal: modalReducer,
  voucher: voucherReducer,
  bankAccount: bankAccountReducer,
  creditCard: creditCardReducer,
  deposit: depositReducer,
  withdrawal: withdrawalReducer,
  withdrawalAccount: withdrawalAccountReducer,
  refunds: refundReducer,
  raveCard: raveCardReducer,
  instantPayment: instantPaymentReducer
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <Router>
      <LastLocationProvider>
        <App />
      </LastLocationProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
