import NotificationButton from "./components/buttons/NotificationButton";
import CardContainer from "./components/cardContainer/CardContainer";
import ItemCard from "./components/itemCard/ItemCard";
import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";
import Table from "./components/PosTable/Table";

import "./styles/App.css";
function App() {
  const categories=["Cake","Shorteas","Biscuits","Chocolates"];

  return (
    <>
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

       <div className="flex items-center my-5">
        <Table/>
       </div>
  

      </Layout>

 

    </>
  );
}

export default App;
