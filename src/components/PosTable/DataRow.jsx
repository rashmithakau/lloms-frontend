import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

const DataRow = ({
  product,
  index,
  handleQuantityChange,
  handleDelete,
  handleDiscountChange,
  type = "pos",
}) => {
  const [error, setError] = useState("");

  const handleDiscountValidation = (index, value) => {
    const validDiscount = Math.max(0, Math.min(value, product.price));
    handleDiscountChange(index, validDiscount);
  };

  const handleQtyInputChange = (e) => {
    let value = parseFloat(e.target.value) || 0;

    if (type === "return") {
      if (value > product.stock) {
        setError("Cannot return more than available stock.");
        value = product.stock;
      } else {
        setError("");
      }
    }

    handleQuantityChange(index, value);
  };

  const handleIncrement = () => {
    let newQty = product.quantity + 1;

    if (type === "return") {
      if (newQty > product.stock) {
        setError("Cannot return more than available stock.");
        return;
      } else {
        setError("");
      }
    }

    handleQuantityChange(index, newQty);
  };

  const handleDecrement = () => {
    const newQty = Math.max(0, product.quantity - 1);
    setError("");
    handleQuantityChange(index, newQty);
  };

  const isStockZero = type === "return" && product.stock === 0;

  return (
    <tr key={product.id} className="border-b border-gray-300">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{product.id}</td>
      <td className="p-2">{product.name}</td>
      <td className="p-2">{product.price.toFixed(2)}</td>
      {type === "return" && <td className="p-2">{product.stock}</td>}

      {/* Quantity Input */}
      <td className="p-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <button
              className="bg-pink-500 text-white px-2 py-1 rounded disabled:opacity-50"
              onClick={handleDecrement}
              disabled={isStockZero}
            >
              -
            </button>
            <input
              type="number"
              value={product.quantity}
              onChange={handleQtyInputChange}
              className="w-16 text-center border border-gray-300 rounded"
              min="0"
              max={type === "return" ? product.stock : undefined}
              disabled={isStockZero}
            />
            <button
              className="bg-pink-500 text-white px-2 py-1 rounded disabled:opacity-50"
              onClick={handleIncrement}
              disabled={isStockZero}
            >
              +
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}
        </div>
      </td>

      {/* Discount Input for 'pos' type */}
      {type === "pos" && (
        <td className="p-2">
          <input
            type="number"
            value={product.discount}
            onChange={(e) =>
              handleDiscountValidation(index, parseFloat(e.target.value) || 0)
            }
            className="w-16 text-center border border-gray-300 rounded"
            step="0.01"
            min="0"
            max={product.price}
          />
        </td>
      )}

      {/* Action Buttons */}
      <td className="p-2 flex gap-2">
        <button className="text-yellow-500 text-lg">
          <FaPencilAlt />
        </button>
        <button
          className="text-red-500 text-lg"
          onClick={() => handleDelete(index)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default DataRow;
