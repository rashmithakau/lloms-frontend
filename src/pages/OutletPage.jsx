import React from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NotificationButton from "../components/buttons/NotificationButton";
import { useState } from "react";
import Pos from "../window/Outlet/Pos";
import Order from "../window/Outlet/Order";
import Inventary from "../window/Outlet/Inventary";
import Return from "../window/Outlet/Return";

export default function OutletPage() {
  const categories = ["All","Cake", "Shorteas", "Biscuits", "Chocolates"];
  const [activeTab, setActiveTab] = useState("pos"); // Default tab

  const navItemList = [
    {
      nameBtn: "POS",
      fun: () => {
        setActiveTab("pos");
      },
      iconUrl: "src/assets/icons/posIcon.svg",
      isActive : activeTab === "pos"
    },
    {
      nameBtn: "ORDER",
      fun: () => {
        setActiveTab("order");
      },
      iconUrl: "src/assets/icons/orderIcon.svg",
      isActive : activeTab === "order"
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
      nameBtn: "RETURN",
      fun: () => {
        setActiveTab("return");
      },
      iconUrl: "src/assets/icons/returnIcon.svg",
      isActive : activeTab === "return"
    },
  ];

  return (
    <div>
      <Layout navItemList={navItemList}>
        <div className="flex">
          <SearchBar categoryList={categories} />
          <NotificationButton />
        </div>

        {activeTab === "pos" && <Pos/>}
        {activeTab === "order" && <Order/>}
        {activeTab === "inventary" && <Inventary/>}
        {activeTab === "return" && <Return/>}
      </Layout>
    </div>
  );
}


