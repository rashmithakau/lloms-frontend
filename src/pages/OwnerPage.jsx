import React from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NotificationButton from "../components/buttons/NotificationButton";
import { useState } from "react";
import Order from "../window/Outlet/Order";
import Report from "../window/Owner/Report";
import Approval from "../window/Owner/Approval";
import Outlet from "../window/Owner/Outlet";
import User from "../window/Owner/User.jsx";
import Billing from "../window/Owner/Billing.jsx";
import Inventary from "../window/Owner/Inventary.jsx";
import Product from "../window/Owner/Product.jsx";

export default function OwnerPage() {
  const categories = ["Cake", "Shorteas", "Biscuits", "Chocolates"];
  const [activeTab, setActiveTab] = useState("report"); // Default tab
  const [searchText, setSearchText] = useState("");

  const navItemList = [
    {
      nameBtn: "BILLING",
      fun: () => {
        setActiveTab("billing");
      },
      iconUrl: "src/assets/icons/billing.svg",
      isActive : activeTab === "billing"
    },
    {
      nameBtn: "INVENTARY",
      fun: () => {
        setActiveTab("inventary");
      },
      iconUrl: "src/assets/icons/inventaryIcon.svg",
      isActive : activeTab === "inventary"
    },
    {
      nameBtn: "REPORT",
      fun: () => {
        setActiveTab("report");
      },
      iconUrl: "src/assets/icons/report.svg",
      isActive : activeTab === "report"
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
      isActive : activeTab === "outlet"
    },
    {
      nameBtn: "APPROVAL",
      fun: () => {
        setActiveTab("approval");
      },
      iconUrl: "src/assets/icons/approval.svg",
      isActive : activeTab === "approval"
    },
    {
      nameBtn: "  USER ACCOUNTS",
      fun: () => {
        setActiveTab("accounts");
      },
      iconUrl: "src/assets/icons/accounts.svg",
      isActive : activeTab === "accounts"
    },
  ];

  return (
    <div>
      <Layout navItemList={navItemList} user="Owner">
        <div className="flex">
          <SearchBar categoryList={categories} dropdown={false} onSearchChange={setSearchText}/>
          <NotificationButton />
        </div>

        {activeTab === "order" && <Order />}
        {activeTab === "report" && <Report />}
        {activeTab === "approval" && <Approval />}
        {activeTab === "outlet" && <Outlet />}
        {activeTab === "accounts" && <User />}
        {activeTab === "billing" && <Billing />}
        {activeTab === "inventary" && <Inventary />}
        {activeTab === "product" && <Product />}
      </Layout>
    </div>
  );
}

//OwnerPage
