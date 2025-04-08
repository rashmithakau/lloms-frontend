import React from "react";

const ProductCard = ({ image, title }) => (
    <div className="w-[250px] h-[250px] rounded-[10px] overflow-hidden shadow-lg">
        <img
            src={image}
            alt={title}
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://via.placeholder.com/250x200?text=No+Image";
            }}
            className="w-full h-[200px] object-cover"
        />
        <div className="bg-[#F4952C] text-white text-center py-3 text-lg font-semibold">
            {title}
        </div>
    </div>
);

export default ProductCard;