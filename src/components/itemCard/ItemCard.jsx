import image from '../../assets/2254.jpg_wh860.jpg';
import React from 'react';

function ItemCard() {
  return (
    <div className="group border-[2px] shadow-md border-pink-200 rounded-b-lg bg-white flex flex-col items-start space-y-2 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-pink-500">
      <img
        src={image}
        alt="Product"
        className="w-full h-auto object-cover transition-transform transform group-hover:brightness-90"
      />
      <div className="px-3 flex justify-between w-full items-center">
        <p className="font-semibold text-[14px] text-[#432634] font-poppins">
          PD/1001
        </p>
        <div className="bg-[#FFEBEB] text-[#FF0077] text-xs font-extrabold px-4 py-1 rounded-t-2xl rounded-b-none">
          223
        </div>
      </div>
      <p className="px-3 font-regular text-[14px] text-[#432634]/61 font-poppins">
        Cream Cake
      </p>
      <p className="px-3 pb-3 font-regular text-[14px] text-[#432634]/70 font-poppins">
        Rs. 100.00
      </p>
    </div>
  );
}

export default ItemCard;
