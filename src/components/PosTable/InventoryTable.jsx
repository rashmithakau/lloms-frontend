import React, { useState, useEffect } from "react";
import InventoryDataRow from "./InventoryDataRow";
import { getAllProductsByOutletId } from "../../api/product-service/productController";
import LoadingWheel from "../loadingWheel/LoadingWheel";

function InventoryTable({ outletId: initialOutletId, type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [outletId, setOutletId] = useState(initialOutletId); // Handle outlet ID change

  // Handle outlet ID change
  const handleOutletChange = (event) => {
    setOutletId(parseInt(event.target.value)); // Set outletId based on selected value
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const data = await getAllProductsByOutletId(outletId);
        setItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Ensure loading is false after data is fetched
      }
    };
    fetchItems();
  }, [outletId]);

  return (
    <div className="mx-13">
      {/* Filter & Total Products Section */}
      <div className="flex justify-between items-center my-6">
        {type !== "outlet" && (
          <select
            value={outletId}
            onChange={handleOutletChange}
            className="py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-100 cursor-pointer"
          >
            <option value={101}>Matara</option>
            <option value={102}>Galle</option>
            <option value={103}>Hikkaduwa</option>
            <option value={104}>Hakmana</option>
            <option value={105}>Hambanthota</option>
            <option value={106}>Mirissa</option>
          </select>
        )}
        <div className="text-lg font-semibold">
          {loading ? "Total Products: Calculating..." : `Total Products: ${items.length}`}
        </div>
      </div>

      {/* Table Container */}
      <div
        className="m-5 w-full mx-auto overflow-auto border border-gray-300 rounded-lg shadow-lg h-full"
        style={{ maxHeight: "600px" }}
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
            <tbody className="h-full">
              {items.map((item, index) => (
                <InventoryDataRow key={item.id} item={item} index={index} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default InventoryTable;
