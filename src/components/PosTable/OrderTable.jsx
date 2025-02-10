import { useState } from "react";
import DataRow from "./DataRow"; // Import the DataRow component

const OrderTable = () => {
  const [products, setProducts] = useState([
    { id: "PD/1001", name: "Butter Cake", price: 100.0, quantity: 25.5, discount: 0.0 },
    { id: "PD/1081", name: "Fish Bun", price: 100.0, quantity: 5, discount: 0.0 },
    { id: "PD/1052", name: "Chocolate Cake", price: 100.0, quantity: 25.5, discount: 0.0 },
    { id: "PD/1029", name: "Marble Cake", price: 100.0, quantity: 25.5, discount: 0.0 },
    { id: "PD/1033", name: "Croissant", price: 120.0, quantity: 15, discount: 5.0 },
    { id: "PD/1045", name: "Apple Pie", price: 150.0, quantity: 10, discount: 10.0 },
    { id: "PD/1060", name: "Banana Bread", price: 130.0, quantity: 20, discount: 2.0 },
    { id: "PD/1072", name: "Blueberry Muffin", price: 140.0, quantity: 12, discount: 3.0 },
    { id: "PD/1088", name: "Cheese Cake", price: 180.0, quantity: 8, discount: 7.0 },
    { id: "PD/1095", name: "Strawberry Tart", price: 160.0, quantity: 9, discount: 4.0 },
  ]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="overflow-hidden px-4 w-full h-[250px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div className="overflow-x-auto max-h-[300px] relative">
        <table className="w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="sticky top-0 bg-gray-200 text-left z-20">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Product ID</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Discount</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <DataRow
                key={product.id}
                product={product}
                index={index}
                handleQuantityChange={handleQuantityChange}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;