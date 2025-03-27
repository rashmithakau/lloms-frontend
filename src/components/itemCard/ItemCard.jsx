import React from "react";
import defaultImage from "../../assets/Empty image.jpg";

function ItemCard({ item, onClick }) {
  const imageName = item.imageUrl ? item.imageUrl.split("\\").pop() : null;
  const imageSrc = imageName
    ? `http://localhost:8080/api/v1/product/url/${imageName}`
    : defaultImage;

  return (
    <div
      onClick={onClick}
      className="group border-[2px] shadow-md border-pink-200 rounded-b-2xl bg-white flex flex-col items-start transition-transform transform hover:scale-108 hover:shadow-lg hover:border-pink-500"
    >
      {/* Product Image */}
      <img
        src={imageSrc}
        alt={item.productName}
        className="w-full h-40 object-cover transition-transform transform group-hover:brightness-90"
      />

      {/* Product Info */}
      <div className="pl-3 pr-5 pt-4 pb-3 flex flex-col w-full space-y-2">
        {/* ID and Stock */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm text-[#432634] font-poppins">
            {`PD/${String(item.productId).padStart(3, "0")}`}
          </p>
          <div className="bg-[#FFEBEB] text-[#FF0077] text-sm font-extrabold px-4 py-1 rounded-t-2xl rounded-b-none">
            Stock : {item.stockQuantity}
          </div>
        </div>

        {/* Product Name */}
        <p className="text-sm text-[#432634]/80 font-semibold font-poppins truncate">
          {item.productName}
        </p>

        {/* Price */}
        <p className="flex text-sm font-semibold text-[#432634]/70 font-poppins">
          Rs. {item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ItemCard;
