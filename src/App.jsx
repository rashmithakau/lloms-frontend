
import CardContainer from "./components/cardContainer/CardContainer";
import ItemCard from "./components/itemCard/ItemCard";
import Layout from "./components/Layout";
import DisplayTotal from "./components/displayTotal/DisplayTotal";

import "./styles/App.css";
function App() {
  return (
    <>
      <Layout>

        <div className="flex justify-center items-center bg-gray-50">
          <CardContainer>
            {Array.from({ length: 30 }).map((_, index) => (
              <ItemCard key={index} />
            ))}
          </CardContainer>
        </div>
        <div>
          <DisplayTotal />
        </div>
      </Layout>
    

    </>
  );
}

export default App;
