import { useState } from "react";
import DataRow from "./DataRow"; // Import the DataRow component

const OrderTable = ({ tType = "pos", products, setProducts }) => {
  const handleQuantityChange = (index, newQuantity) => {
    console,console.log(products);
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleDiscountChange = (index, newDiscount) => {
    const updatedProducts = [...products];
    updatedProducts[index].discount = newDiscount;
    setProducts(updatedProducts);
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
              {tType !== "return" && <th className="p-2">Quantity</th>}
              {tType === "return" && <th className="p-2">Stock</th>}
              
              {tType === "return" && <th className="p-2"><pre>        Return</pre></th>}
              {tType === "pos" && <th className="p-2">Discount</th>}
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
                handleDiscountChange={handleDiscountChange}
                type={tType}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
