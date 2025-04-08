import React, { useEffect, useState } from "react";
import Product_Card from "./ProductCard.jsx";
import { getAllProducts } from "../../api/product-service/productController";

const BestProductContainer = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                const activeProducts = data.filter((item) => item.productStatus === true);
                if (activeProducts.length > 0) {
                    const shuffled = [...activeProducts].sort(() => Math.random() - 0.5);
                    setProducts(shuffled.slice(0, 8));
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const sortedProducts = sortOrder
        ? [...products].sort((a, b) => {
            if (sortOrder === "lowToHigh") {
                return a.price - b.price;
            } else if (sortOrder === "highToLow") {
                return b.price - a.price;
            }
            return 0;
        })
        : products;

    return (
        <div className="max-w-7xl mx-auto">
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="loader border-t-4 border-orange-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : (
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-[#F4952C] font-pacifico text-3xl">Best Products</h2>
                        <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                            Best Products This Week!
                        </h3>
                    </div>

                    {sortedProducts.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No products found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {sortedProducts.map((item) => (
                                <Product_Card key={item.productId} item={item} />
                            ))}
                        </div>
                    )}
                </div>
                )}
        </div>
);
};

export default BestProductContainer;