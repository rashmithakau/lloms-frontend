import React, { useState } from "react";
import BillDataRow from "./BillDataRow";

function BillTable() {
  const [products, setProducts] = useState([
    {
      id: "PD/1001",
      name: "Butter Cake",
      price: 100.0,
      discount: 10.0,
      quantity: 25,
    },
    {
      id: "PD/1081",
      name: "Fish Bun",
      price: 100.0,
      discount: 5.0,
      quantity: 5,
    },
    {
      id: "PD/1052",
      name: "Chocolate Cake",
      price: 100.0,
      discount: 15.0,
      quantity: 20,
    },
    {
      id: "PD/1029",
      name: "Marble Cake",
      price: 100.0,
      discount: 12.5,
      quantity: 18,
    },
    {
      id: "PD/1033",
      name: "Croissant",
      price: 120.0,
      discount: 7.5,
      quantity: 15,
    },
    {
      id: "PD/1045",
      name: "Apple Pie",
      price: 150.0,
      discount: 20.0,
      quantity: 10,
    },
    {
      id: "PD/1060",
      name: "Banana Bread",
      price: 130.0,
      discount: 15.0,
      quantity: 12,
    },
    {
      id: "PD/1072",
      name: "Blueberry Muffin",
      price: 140.0,
      discount: 10.0,
      quantity: 8,
    },
    {
      id: "PD/1088",
      name: "Cheese Cake",
      price: 180.0,
      discount: 25.0,
      quantity: 5,
    },
    {
      id: "PD/1095",
      name: "Strawberry Tart",
      price: 160.0,
      discount: 18.0,
      quantity: 9,
    },
  ]);

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
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Product ID</th>
              <th className="p-3 border-b">Product Name</th>
              <th className="p-3 border-b">Current Unit Price</th>
              <th className="p-3 border-b">Quantity</th>
              <th className="p-3 border-b">Discount per Unit</th>
              <th className="p-3 border-b">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <BillDataRow key={index} product={product} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Added more space between the table and the totals */}
      <div className="mt-6 flex justify-end px-16 ">
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
