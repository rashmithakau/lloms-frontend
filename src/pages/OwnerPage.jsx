import React from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NotificationButton from "../components/buttons/NotificationButton";
import { useState } from "react";
import Order from "../window/Outlet/Order";
import Report from "../window/Owner/Report";
import User from "../window/Owner/User.jsx";

export default function OwnerPage() {
  const categories = ["Cake", "Shorteas", "Biscuits", "Chocolates"];
  const [activeTab, setActiveTab] = useState("report"); // Default tab

  const navItemList = [
    {
        nameBtn: "BILLING",
        fun: () => {
          setActiveTab("billing");
        },
        iconUrl: "src/assets/icons/billing.svg",
      },
      {
        nameBtn: "INVENTARY",
        fun: () => {
          setActiveTab("inventary");
        },
        iconUrl: "src/assets/icons/inventaryIcon.svg",
      },
      {
        nameBtn: "REPORT",
        fun: () => {
          setActiveTab("report");
        },
        iconUrl: "src/assets/icons/report.svg",
      },
      {
        nameBtn: "PRODUCT",
        fun: () => {
          setActiveTab("product");
        },
        iconUrl: "src/assets/icons/product.svg",
      },
      {
        nameBtn: "OUTLET",
        fun: () => {
          setActiveTab("outlet");
        },
        iconUrl: "src/assets/icons/outlet.svg",
      },
      {
        nameBtn: "APPROVAL",
        fun: () => {
          setActiveTab("approval");
        },
        iconUrl: "src/assets/icons/approval.svg",
      },
      {
        nameBtn: "  USER ACCOUNTS",
        fun: () => {
          setActiveTab("accounts");
        },
        iconUrl: "src/assets/icons/accounts.svg",
      }
  ];

  return (
    <div>
      <Layout navItemList={navItemList} user="Owner">
        <div className="flex">
          <SearchBar categoryList={categories} />
          <NotificationButton />
        </div>

        {activeTab === "order" && <Order/>}
        {activeTab === "report" && <Report/>}
        {activeTab === "accounts" && <User/>}
      </Layout>
    </div>
  );
}





//OwnerPage