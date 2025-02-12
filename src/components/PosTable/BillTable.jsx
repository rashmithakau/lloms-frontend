import React, { useState } from 'react';
import BillDataRow from './BillDataRow';

function BillTable() {
    const [products, setProducts] = useState([
        { id: "PD/1001", name: "Butter Cake", price: 100.0, discount: 10.0, quantity: 25 },
        { id: "PD/1081", name: "Fish Bun", price: 100.0, discount: 5.0, quantity: 5 },
        { id: "PD/1052", name: "Chocolate Cake", price: 100.0, discount: 15.0, quantity: 20 },
        { id: "PD/1029", name: "Marble Cake", price: 100.0, discount: 12.5, quantity: 18 },
        { id: "PD/1033", name: "Croissant", price: 120.0, discount: 7.5, quantity: 15 },
        { id: "PD/1045", name: "Apple Pie", price: 150.0, discount: 20.0, quantity: 10 },
        { id: "PD/1060", name: "Banana Bread", price: 130.0, discount: 15.0, quantity: 12 },
        { id: "PD/1072", name: "Blueberry Muffin", price: 140.0, discount: 10.0, quantity: 8 },
        { id: "PD/1088", name: "Cheese Cake", price: 180.0, discount: 25.0, quantity: 5 },
        { id: "PD/1095", name: "Strawberry Tart", price: 160.0, discount: 18.0, quantity: 9 }
    ]);

    // Calculate subtotal
    const subTotal = products.reduce((sum, product) => sum + (product.price * product.quantity) - (product.discount * product.quantity), 0);

    // Calculate total discount
    const totalDiscount = products.reduce((sum, product) => sum + (product.discount * product.quantity), 0);

    return (
        <div className="overflow-hidden px-4 w-full my-5">
            <div className="overflow-x-auto max-h-[400px] relative shadow-lg rounded-lg">
                <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="sticky top-0 bg-gray-200 text-center">
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
            <div className="mt-15 flex justify-end px-6">
                <div className="text-right">
                    <p className="text-xl font-semibold text-gray-700">
                        Total Discount: <span className="text-red-600">- {totalDiscount.toFixed(2)}</span>
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        Sub Total: <span className="text-green-600">{subTotal.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BillTable;
