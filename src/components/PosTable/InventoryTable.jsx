import React from "react";
import InventoryDataRow from "./InventoryDataRow";
import productImage from "../../assets/2254.jpg_wh860.jpg";

function InventoryTable() {
  const products = [
    {
      id: "PD/1001",
      image: productImage,
      name: "Butter Cake",
      price: 100.0,
      quantity: 25.5,
      category: "cake",
    },
    {
      id: "PD/1081",
      image: productImage,
      name: "Fish Bun",
      price: 100.0,
      quantity: 5,
      category: "bakery",
    },
    {
      id: "PD/1052",
      image: productImage,
      name: "Chocolate Cake",
      price: 100.0,
      quantity: 25.5,
      category: "cake",
    },
    {
      id: "PD/1029",
      image: productImage,
      name: "Marble Cake",
      price: 100.0,
      quantity: 25.5,
      category: "cake",
    },
    {
      id: "PD/1033",
      image: productImage,
      name: "Croissant",
      price: 120.0,
      quantity: 15,
      category: "pastry",
    },
    {
      id: "PD/1045",
      image: productImage,
      name: "Apple Pie",
      price: 150.0,
      quantity: 10,
      category: "pastry",
    },
    {
      id: "PD/1060",
      image: productImage,
      name: "Banana Bread",
      price: 130.0,
      quantity: 20,
      category: "bread",
    },
    {
      id: "PD/1072",
      image: productImage,
      name: "Blueberry Muffin",
      price: 140.0,
      quantity: 12,
      category: "muffin",
    },
    {
      id: "PD/1088",
      image: productImage,
      name: "Cheese Cake",
      price: 180.0,
      quantity: 8,
      category: "cake",
    },
    {
      id: "PD/1095",
      image: productImage,
      name: "Strawberry Tart",
      price: 160.0,
      quantity: 9,
      category: "tart",
    },
  ];

  return (
    <div className="mx-13">
      <div
        className="m-5 w-full mx-auto overflow-auto border border-gray-300 rounded-lg shadow-lg"
        style={{ maxHeight: "500px" }}
      >
        <table className="w-full border-collapse text-center">
          <thead className="bg-gray-200 sticky top-0">
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
            {products.map((product, index) => (
              <InventoryDataRow key={index} product={product} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryTable;
