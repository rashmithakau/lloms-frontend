import React from "react";
import defaultImage from "../../assets/Empty image.jpg";

function ItemDisplayCard({ item, onClick, type }) {
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
      <div
        className={`pl-3 pr-5 pt-4 pb-3 flex flex-col w-full space-y-2 ${
          type === "factory" ? "text-center items-center" : "items-start"
        }`}
      >
        {/* Product ID and Status (Only for Owner) */}
        <div
          className={`${
            type === "factory"
              ? "text-center items-center"
              : "flex justify-between items-center w-full"
          }`}
        >
          <p className="font-semibold text-sm text-[#432634] font-poppins">
            {`PD/${String(item.productId).padStart(3, "0")}`}
          </p>

          {/* Active/Inactive Status - Only for Owner */}
          {type === "owner" && (
            <div
              className={`text-sm font-extrabold px-4 py-1 rounded-t-2xl rounded-b-none ${
                item.productStatus
                  ? "bg-green-100 text-green-600 border border-green-600"
                  : "bg-red-100 text-red-600 border border-red-600"
              }`}
            >
              {item.productStatus ? "Active" : "Inactive"}
            </div>
          )}
        </div>

        {/* Product Name */}
        <p className="text-md text-pink-600 font-bold truncate">
          {item.productName}
        </p>

        {/* Price */}
        <p className="text-green-600 font-bold text-lg">
          Rs. {parseFloat(item.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ItemDisplayCard;
