import React from "react";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import Overview from "./Overview/Overview";
import Voucher from "./Voucher/Voucher";
import TopEarners from "./TopEarners/TopEarners";
import QuickPlayTransaction from "../UserTransaction/QuickPlayTransaction/QuickPlayTransaction";

// Add redirect logic to Complete Registration when it isn't complete

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
          <div className="col-md-6 pl-0 d-sm-flex justify-content-sm-center">
            <MediaQuery minDeviceWidth={768}>
              <Voucher />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={768}>
              <Voucher center="true" />
            </MediaQuery>
          </div>
          <div className="col-md-6 mt-4 pr-0">
            <TopEarners />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <QuickPlayTransaction />
        </div>
      </div>
      <Footer />
    </>
  );
}
