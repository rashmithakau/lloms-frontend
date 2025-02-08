import React from "react";
import CardContainer from "../components/cardContainer/CardContainer";
import ItemCard from "../components/itemCard/ItemCard";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NotificationButton from "../components/buttons/NotificationButton";
import DisplayTotal from "../components/DisplayTotal/DisplayTotal";
import Table from "../components/PosTable/Table";
import { useState } from "react";

export default function OutletPage() {
  const categories = ["Cake", "Shorteas", "Biscuits", "Chocolates"];
  const [activeTab, setActiveTab] = useState("pos"); // Default tab

  const navItemList = [
    {
      nameBtn: "POS",
      fun: () => {
        setActiveTab("pos");
      },
      iconUrl: "src/assets/icons/posIcon.svg",
    },
    {
      nameBtn: "ORDER",
      fun: () => {
        setActiveTab("order");
      },
      iconUrl: "src/assets/icons/orderIcon.svg",
    },
    {
      nameBtn: "INVENTARY",
      fun: () => {
        console.log("Order clicked!");
      },
      iconUrl: "src/assets/icons/inventaryIcon.svg",
    },
    {
      nameBtn: "RETURN",
      fun: () => {
        console.log("Order clicked!");
      },
      iconUrl: "src/assets/icons/returnIcon.svg",
    },
  ];

  return (
    <div>
      <Layout navItemList={navItemList}>
        <div className="flex">
          <SearchBar categoryList={categories} />
          <NotificationButton />
        </div>

        {activeTab === "pos" && (
          <div>
            <div className="flex justify-center items-center my-2">
              <CardContainer>
                {Array.from({ length: 30 }).map((_, index) => (
                  <ItemCard key={index} />
                ))}
              </CardContainer>
            </div>
            <div className="flex">
              <Table />
              <DisplayTotal />
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
