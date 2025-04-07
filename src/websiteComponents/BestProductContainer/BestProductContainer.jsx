// src/components/BestProductContainer.jsx
import React from "react";
import ProductCard from "./ProductCard";

const products = [
    { id: 1, title: "Burger",    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=200&q=80" },
    { id: 2, title: "Pizza",     image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=250" },
    { id: 3, title: "Sushi",     image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&h=200&q=80" },
    { id: 4, title: "Salad",     image: "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=250" },
    { id: 5, title: "Ice Cream", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&h=200&q=80" },
    { id: 6, title: "Coffee",    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=250" },
    { id: 7, title: "Taco",      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&h=200&q=80" },
    { id: 8, title: "Pancake",   image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=250" },
];

const BestProductContainer = () => (
    <div>
        <br />
        <div className="text-center mb-8">
            <h2 className="text-[#F4952C] font-pacifico text-3xl">Best Products</h2>
            <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                Best Products This Week!
            </h3>
        </div>

        <div className="flex justify-center px-5 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {products.map((p) => (
                    <ProductCard key={p.id} image={p.image} title={p.title} />
                ))}
            </div>
        </div>
    </div>
);

export default BestProductContainer;