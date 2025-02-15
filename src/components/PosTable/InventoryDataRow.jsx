import React from "react";

function InventoryDataRow({ product, index }) {
  return (
    <tr className="hover:bg-gray-100 shadow-md">
      <td className="p-2 text-center">{index + 1}</td>
      <td className="p-2 flex justify-center">
        <img src={product.image} alt={product.name} className="w-15 h-12 object-cover rounded" />
      </td>
      <td className="p-2 text-center">{product.id}</td>
      <td className="p-2 text-center">{product.name}</td>
      <td className="p-2 text-center">{product.category}</td>
      <td className="p-2 text-center">{product.price.toFixed(2)}</td>
      <td className="p-2 text-center">{product.quantity}</td>
    </tr>
  );
}

export default InventoryDataRow;
