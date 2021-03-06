import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import TransactionTabs from "./TransactionTabs/TransactionTabs";

export default function UserTransaction() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Transactions`} />
      <UserHeader />
      <UserNavigation />
      <div className="container">
        <div className="row">
          <div className="col-lg-12" style={{ minHeight: "75vh" }}>
            <TransactionTabs />
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <VoucherTransaction />
          </div>
        </div>
      </div> */}
      {/* <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <MediaQuery minDeviceWidth={992}>
              <Voucher />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={992}>
              <Voucher center="true" />
            </MediaQuery>
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
}
