import { FaTrash, FaPencilAlt } from "react-icons/fa";

const DataRow = ({ product, index, handleQuantityChange, handleDelete, handleDiscountChange, type = "pos" }) => {
  const handleDiscountValidation = (index, value) => {
    const validDiscount = Math.max(0, Math.min(value, product.price)); // Ensure discount is between 0 and product price
    handleDiscountChange(index, validDiscount);
  };

  return (
    <tr key={product.id} className="border-b border-gray-300">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{product.id}</td>
      <td className="p-2">{product.name}</td>
      <td className="p-2">{product.price.toFixed(2)}</td>
      {type === "return" && <td className="p-2">{product.price.toFixed(3)}</td>}
      
      {/* Quantity Input */}
      <td className="p-2">
        <div className="flex items-center gap-2">
          <button
            className="bg-pink-500 text-white px-2 py-1 rounded"
            onClick={() => handleQuantityChange(index, Math.max(0, product.quantity - 1))}
          >
            -
          </button>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => handleQuantityChange(index, parseFloat(e.target.value) || 0)}
            className="w-16 text-center border border-gray-300 rounded"
          />
          <button
            className="bg-pink-500 text-white px-2 py-1 rounded"
            onClick={() => handleQuantityChange(index, product.quantity + 1)}
          >
            +
          </button>
        </div>
      </td>

      {/* Discount Input for 'pos' type */}
      {type === "pos" && (
        <td className="p-2">
          <input
            type="number"
            value={product.discount}
            onChange={(e) => handleDiscountValidation(index, parseFloat(e.target.value) || 0)}
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
        <button className="text-red-500 text-lg" onClick={() => handleDelete(index)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default DataRow;
