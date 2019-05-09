import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Card from "../Card/Card";
import Quickteller from "../Quickteller/Quickteller";
//import PayWithAccountNumber from "../PayWithAccountNumber/PayWithAccountNumber";
import BankCharge from "../BankCharge/BankCharge";
import Voucher from "../../UserHome/Voucher/Voucher";

const DepositTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.7rem;
`;

export default function DepositTabs() {
  return (
    <DepositTabsWrapper className="container">
      <div className="col-md-6">
        <Tabs>
          <TabList>
            <Tab>
              <HeadingTwo>Card</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Quickteller</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Banks</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Voucher</HeadingTwo>
            </Tab>
            {/* <Tab>
            <HeadingTwo>Pay with Account Number</HeadingTwo>
          </Tab> */}
          </TabList>
          <TabPanel>
            <Card />
          </TabPanel>
          <TabPanel>
            <Quickteller />
          </TabPanel>
          <TabPanel>
            <BankCharge />
          </TabPanel>
          <TabPanel>
            <div style={{ minHeight: "36rem" }}>
              <Voucher />
            </div>
          </TabPanel>
          {/* <TabPanel>
          <PayWithAccountNumber />
        </TabPanel> */}
        </Tabs>
      </div>
    </DepositTabsWrapper>
  );
}
