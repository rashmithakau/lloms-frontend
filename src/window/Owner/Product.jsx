import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/product-service/productController";
import CardContainer from "../../components/cardContainer/CardContainer";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import ItemDisplayCard from "../../components/itemDisplayCard/ItemDisplayCard";

function Product() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllProducts();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "Active") {
      setFilteredItems(items.filter((item) => item.productStatus === true));
    } else if (selectedFilter === "Inactive") {
      setFilteredItems(items.filter((item) => item.productStatus === false));
    } else {
      setFilteredItems(items);
    }
  };

  return (
    <div className="flex flex-col items-center my-2 w-full">
      <div className="flex justify-between w-full px-10 my-4">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-100 cursor-pointer"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="text-3xl font-semibold text-pink-600">
          Total Products: {filteredItems.length}
        </div>
      </div>

      <CardContainer h="77vh">
        {loading ? (
          <div className="text-center text-gray-600 py-5 text-lg">
            <LoadingWheel />
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-500 text-lg text-center py-5">
            No items available
          </p>
        ) : (
          filteredItems.map((item, index) => (
            <ItemDisplayCard
              key={index}
              item={item}
              onClick={() => console.log("Owner Item clicked", item)}
              type="owner"
            />
          ))
        )}
      </CardContainer>
    </div>
  );
}

export default Product;
