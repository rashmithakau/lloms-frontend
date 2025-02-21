import React, { useState } from "react";
import Item from "./Item";

export default function AddNewItemButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Add New Product Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:w-[200px] sm:w-[150px] w-[100px] h-[33px] font-semibold text-white rounded-4xl border border-pink-500 bg-pink-400"
      >
        Add New Product
      </button>

      {/* Pop-up for Item Component */}
      {isOpen && <Item onClose={() => setIsOpen(false)} mode="add" />}
    </div>
  );
}