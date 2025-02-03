import React from "react";
import CardContainer from "../components/cardContainer/CardContainer";
import ItemCard from "../components/itemCard/ItemCard";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NotificationButton from "../components/buttons/NotificationButton";


export default function OutletPage() {

    const categories=["Cake","Shorteas","Biscuits","Chocolates"];

  return (
    <div>
       <Layout>

        <div className="flex">
          <SearchBar categoryList={categories}/>
          <NotificationButton />
        </div>

        <div className="flex justify-center items-center my-5">
          <CardContainer>
            {Array.from({ length: 30 }).map((_, index) => (
              <ItemCard key={index} />
            ))}
          </CardContainer>
        </div>

      </Layout> 
    </div>
  );
}
