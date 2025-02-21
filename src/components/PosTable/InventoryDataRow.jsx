import React from "react";
import defaultImage from "../../assets/Empty image.jpg";


function InventoryDataRow({ item, index }) {

  const imageName = item.imageUrl ? item.imageUrl.split("/").pop() : null;
    const imageSrc = imageName
      ? `http://localhost:8080/api/v1/product/url/${imageName}`
      : defaultImage;

  return (
    <tr className="hover:bg-pink-100 shadow-md text-gray-600">
      <td className="p-2 text-center">{index + 1}</td>
      <td className="p-2 flex justify-center">
        <img src={imageSrc} alt={item.productName} className="w-15 h-12 object-cover rounded" />
      </td>
      <td className="p-2 text-center">PD/{item.productId}</td>
      <td className="p-2 text-center">{item.productName}</td>
      <td className="p-2 text-center">{item.productCatagory}</td>
      <td className="p-2 text-center">Rs.{item.price.toFixed(2)}</td>
      <td className="p-2 text-center">24</td>
    </tr>
  );
}

export default InventoryDataRow;
