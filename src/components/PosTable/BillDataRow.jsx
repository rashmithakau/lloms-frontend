import React from "react";

function BillDataRow({ product, index }) {
  // Calculate total price
  const totalPrice = (product.price * product.quantity) - (product.discount * product.quantity);

  return (
    <tr className="hover:bg-gray-100 transition-all duration-200 shadow-sm">
      <td className="p-3 text-center">{index + 1}</td>
      <td className="p-3 text-center">{product.id}</td>
      <td className="p-3 text-center">{product.name}</td>
      <td className="p-3 text-center">{product.price.toFixed(2)}</td>
      <td className="p-3 text-center">{product.quantity}</td>
      <td className="p-3 text-center">{product.discount.toFixed(2)}</td>
      <td className="p-3 text-center font-semibold">{totalPrice.toFixed(2)}</td>
    </tr>
  );
}

export default BillDataRow;
