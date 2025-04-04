import React from "react";

const ShopPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm-50 z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative">
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 transition-colors"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Product Card */}
                <div className="flex flex-col items-center">
                    {/* Product Image */}
                    <img
                        src="https://source.unsplash.com/300x300/?product"
                        alt="Product"
                        className="rounded-xl w-60 h-60 object-cover mb-6"
                    />

                    {/* Product Details */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2">Product Name</h2>
                        <p className="text-2xl text-orange-600 font-bold mb-3">Rs. 1,000</p>

                        {/* Reviews */}
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-yellow-500 text-2xl">⭐⭐⭐⭐☆</span>
                            <span className="text-gray-500 text-sm">(128 reviews)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPopup;
