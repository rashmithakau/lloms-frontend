import React, { useState, useEffect } from "react";
import InventoryDataRow from "./InventoryDataRow";
import { getAllProducts } from "../../api/product-service/productController";
import LoadingWheel from "../loadingWheel/LoadingWheel";

function InventoryTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllProducts();
        setItems(data.slice(0, 7));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="mx-13">
      <div
        className="m-5 w-full mx-auto overflow-auto border border-gray-300 rounded-lg shadow-lg"
        style={{ maxHeight: "500px" }}
      >
        {loading ? (
          <div className="text-center text-gray-600 py-5 text-lg">
            <LoadingWheel />
          </div>
        ) : (
          <table className="w-full border-collapse text-center">
            <thead className="bg-gray-200 sticky top-0 text-gray-700">
              <tr>
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b"></th>
                <th className="p-3 border-b">Product ID</th>
                <th className="p-3 border-b">Product Name</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Unit Price</th>
                <th className="p-3 border-b">Stock</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <InventoryDataRow key={index} item={item} index={index} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default InventoryTable;
