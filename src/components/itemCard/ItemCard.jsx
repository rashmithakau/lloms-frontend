import image from '../../assets/2254.jpg_wh860.jpg';
import React from 'react';

function ItemCard() {
  return (
      {/* Product Image */}
    <div className="group border-[2px] shadow-md border-pink-200 rounded-b-lg bg-white flex flex-col items-start space-y-2 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-pink-500">
      <img
        src={image} // Use the constructed URL or default image
        alt="Product"
        className="w-full h-auto object-cover transition-transform transform group-hover:brightness-90"
      />

      {/* Product Info */}
      <div className="pl-3 pr-5 pt-4 pb-3 flex flex-col w-full space-y-2">
        {/* ID and Rating */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm text-[#432634] font-poppins">
          PD/1001
          </p>
          <div className="bg-[#FFEBEB] text-[#FF0077] text-xs font-extrabold px-4 py-1 rounded-t-2xl rounded-b-none">
            233
          </div>
        </div>

        {/* Product Name */}
        <p className="text-sm text-[#432634]/80 font-poppins truncate">
        Cream Cake
        </p>

        {/* Price */}
        <p className="flex text-sm text-[#432634]/70 font-poppins">
          Rs. 100.00
        </p>
      </div>
    </div>
  );
}

export default ItemCard;
