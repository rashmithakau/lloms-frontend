import React from "react";
import BillDataRow from "./BillDataRow";

function BillTable({ products }) {
  // Calculate subtotal
  const subTotal = products.reduce(
    (sum, product) =>
      sum +
      product.price * product.quantity -
      product.discount * product.quantity,
    0
  );

  // Calculate total discount
  const totalDiscount = products.reduce(
    (sum, product) => sum + product.discount * product.quantity,
    0
  );

  return (
    <div className="mx-13">
      <div className="m-5 w-full mx-auto overflow-auto border border-gray-50 rounded-lg max-h-[450px]">
        <table className="w-full border-collapse text-center">
          <thead className="bg-gray-50 sticky top-0 text-gray-700">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Product ID</th>
              <th className="p-3 border-b">Product Name</th>
              <th className="p-3 border-b">Unit Price</th>
              <th className="p-3 border-b">Quantity</th>
              <th className="p-3 border-b">Discount per Unit</th>
              <th className="p-3 border-b">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <BillDataRow key={index} product={product} index={index} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-gray-500">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end px-16">
        <div className="text-right">
          <p className="text-lg">
            Total Discount:{" "}
            <span className="text-red-600">- {totalDiscount.toFixed(2)}</span>
          </p>
          <p className="text-lg mt-2 border-b-4 border-double border-gray-900 pb-2">
            Sub Total:{" "}
            <span className="text-green-600">{subTotal.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BillTable;
