import ProductCard from "./ProductCard";
import React from "react";

const BestProductContainer = () => {
  return (
    <div>
    <br/>
        <div className="text-center mb-8">
            <h2 className="text-[#F4952C] font-pacifico text-3xl ">Best Products</h2>
            <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                Best Products This Week!
            </h3>
        </div>

    <div className="flex justify-center px-5 mt-5">
      <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};
export default BestProductContainer;
