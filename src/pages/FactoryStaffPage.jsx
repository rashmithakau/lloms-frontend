import React from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NotificationButton from "../components/buttons/NotificationButton";
import { useState } from "react";
import Order from "../window/Factory/Order";

import AddNewItemButton from "../components/AddNewItemButton";

import Billing from "../window/Factory/Billing";
import Inventary from "../window/Factory/Inventary";
import Outlet from "../window/Factory/Outlet";
import Return from "../window/Factory/Return";
import Product from "../window/Factory/Product";
import CustomerHistory from "../window/Factory/CustomerHistory";

export default function FactoryStaffPage() {
  const categories = ["Cake", "Shorteas", "Biscuits", "Chocolates"];
  const [activeTab, setActiveTab] = useState("pos"); // Default tab

  const navItemList = [
    {
      nameBtn: "ORDER",
      fun: () => {
        setActiveTab("order");
      },
      iconUrl: "src/assets/icons/orderIcon.svg",
      isActive: activeTab === "order",
    },
    {
      nameBtn: "BILLING",
      fun: () => {
        setActiveTab("billing");
      },
      iconUrl: "src/assets/icons/billing.svg",
      isActive: activeTab === "billing",
    },
    {
      nameBtn: "INVENTARY",
      fun: () => {
        setActiveTab("inventary");
      },
      iconUrl: "src/assets/icons/inventaryIcon.svg",
      isActive: activeTab === "inventary",
    },
    {
      nameBtn: "RETURN",
      fun: () => {
        setActiveTab("return");
      },
      iconUrl: "src/assets/icons/returnIcon.svg",
      isActive: activeTab === "return",
    },
    {
      nameBtn: "PRODUCT",
      fun: () => {
        setActiveTab("product");
      },
      iconUrl: "src/assets/icons/product.svg",
      isActive: activeTab === "product",
    },
    {
      nameBtn: "OUTLET",
      fun: () => {
        setActiveTab("outlet");
      },
      iconUrl: "src/assets/icons/outlet.svg",
      isActive: activeTab === "outlet",
    },
    {
      nameBtn: "CUS ORDER HISTORY",
      fun: () => {
        setActiveTab("history");
      },
      iconUrl: "src/assets/icons/historyIcon.svg",
      isActive: activeTab === "history",
    },
  ];

  return (
    <div>
      <Layout navItemList={navItemList} user="Factory Staff">
        <div className="flex">
          <SearchBar categoryList={categories} />
          <NotificationButton />
        </div>
        {activeTab === "order" && <Order />}
        {activeTab === "billing" && <Billing />}
        {activeTab === "inventary" && <Inventary />}
        {activeTab === "outlet" && <Outlet />}
        {activeTab === "return" && <Return />}
        {activeTab === "product" && <Product />}
        {activeTab === "history" && <CustomerHistory />}
      </Layout>
    </div>
  );
}
