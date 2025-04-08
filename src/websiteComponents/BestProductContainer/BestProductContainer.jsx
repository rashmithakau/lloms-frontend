import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../api/product-service/productController.js"; // Adjust the path to your API utility file

const BASE_URL = "http://localhost:8080/api/v1/product";

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const BestProductContainer = () => {
    // State to hold the 8 random products
    const [products, setProducts] = useState([]);
    // State to manage loading
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const data = await getAllProducts();
                if (data && data.length > 0) {
                    // Shuffle the products and select the first 8
                    const shuffled = shuffleArray(data);
                    const selectedProducts = shuffled.slice(0, 8);
                    setProducts(selectedProducts);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div>
            <br />
            <div className="text-center mb-8">
                <h2 className="text-[#F4952C] font-pacifico text-3xl">Best Products</h2>
                <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                    Best Products This Week!
                </h3>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="loader border-t-4 border-orange-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : (
                <div className="flex justify-center px-5 mt-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                        {products.map((p) => (
                            <ProductCard
                                key={p.productId} // Unique identifier from the backend
                                image={`${BASE_URL}/url/${p.imageUrl}`} // Full image URL
                                title={p.productName} // Product name from the backend
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BestProductContainer;