import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import Overview from "./Overview/Overview";
import Voucher from "./Voucher/Voucher";
import QuickPlayTransaction from "../UserTransaction/QuickPlayTransaction/QuickPlayTransaction";

export default function UserHome() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Dashboard`} />
      <UserHeader />
      <UserNavigation />
      <div className="m-2">
        <Overview />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 p-0 mt-4 d-flex justify-content-center">
            <Voucher center="true" />
          </div>
          {/* <div className="col-lg-6 mt-4 p-0">
            <VoucherTransaction />
          </div> */}
          {/* <div className="col-lg-4 mt-4 p-0">
            <TopEarners />
          </div> */}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <QuickPlayTransaction />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
