import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NotificationButton from "../components/buttons/NotificationButton";
import Order from "../window/Factory/Order";
import Billing from "../window/Factory/Billing";
import Inventary from "../window/Factory/Inventary";
import Outlet from "../window/Factory/Outlet";
import Return from "../window/Factory/Return";
import Product from "../window/Factory/Product";
import CustomerHistory from "../window/Factory/CustomerHistory";

export default function FactoryStaffPage() {
  const [categories, setCategories] = useState(["Pending", "Confirmed", "Delivered", "Rejected"]);
  const [activeTab, setActiveTab] = useState("order"); // Default tab
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("Pending");
  const [dropdown, setDropdown] = useState(true);

  console.log(searchText, category);

  const navItemList = [
    { nameBtn: "ORDER", fun: () => setActiveTab("order"), iconUrl: "src/assets/icons/orderIcon.svg", isActive: activeTab === "order" },
    { nameBtn: "BILLING", fun: () => setActiveTab("billing"), iconUrl: "src/assets/icons/billing.svg", isActive: activeTab === "billing" },
    { nameBtn: "INVENTARY", fun: () => setActiveTab("inventary"), iconUrl: "src/assets/icons/inventaryIcon.svg", isActive: activeTab === "inventary" },
    { nameBtn: "RETURN", fun: () => setActiveTab("return"), iconUrl: "src/assets/icons/returnIcon.svg", isActive: activeTab === "return" },
    { nameBtn: "PRODUCT", fun: () => setActiveTab("product"), iconUrl: "src/assets/icons/product.svg", isActive: activeTab === "product" },
    { nameBtn: "OUTLET", fun: () => setActiveTab("outlet"), iconUrl: "src/assets/icons/outlet.svg", isActive: activeTab === "outlet" },
  ];

  // 🛠️ Use Effect to set categories when activeTab changes
  useEffect(() => {
    if (activeTab === "order") {
      setCategories(["Pending", "Confirmed", "Delivered", "Rejected","Received"]); // Set categories for order tab
      setDropdown(true);
      console.log(searchText)
    } else if (activeTab === "billing") {
      setCategories([]); // Reset categories for other tabs
      setDropdown(false);
      console.log(searchText)
    }else if( activeTab === "inventary") {
      setCategories([]); // Reset categories for other tabs
      setDropdown(false);
      console.log(searchText)
    }else if( activeTab === "return") {
      setCategories([]); // Reset categories for other tabs
      setDropdown(false);
      console.log(searchText)
    }else if( activeTab === "product") {
      setCategories([]); // Reset categories for other tabs
      setDropdown(false);
      console.log(searchText)
    }else if( activeTab === "outlet") {
      setCategories([]); // Reset categories for other tabs
      setDropdown(false);
      console.log(searchText)
    }

  }, [activeTab]);

  return (
    <div>
      <Layout navItemList={navItemList} user="Factory Staff">
        <div className="flex">
          <SearchBar categoryList={categories} txt="By ID" dropdown={dropdown} onCategoryChange={setCategory} onSearchChange={setSearchText}/>
          <NotificationButton />
        </div>

        {/* Render Components Based on Active Tab */}
        {activeTab === "order" && <Order category={category} selCategory={category} searchText={searchText}/>}
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
