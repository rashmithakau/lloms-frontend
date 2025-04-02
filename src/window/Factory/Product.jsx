import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/product-service/productController";
import CardContainer from "../../components/cardContainer/CardContainer";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import ItemDisplayCard from "../../components/itemDisplayCard/ItemDisplayCard";
import AddNewItemButton from "../../components/AddNewItemButton";
import UpdateItem from "../../components/UpdateItem/UpdateItem";

function Product() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for UpdateItem popup
    const [selectedItem, setSelectedItem] = useState(null); // Store selected item for update
    const [showUpdatePopup, setShowUpdatePopup] = useState(false); // Show/hide popup

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllProducts();
        const activeProducts = data.filter(
          (item) => item.productStatus === true
        );
        setItems(activeProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Handle item click to open the update popup
  const handleItemClick = (item) => {
    setSelectedItem(item);  // Store selected item for update
    setShowUpdatePopup(true);  // Show the UpdateItem popup
  };

  // Close the UpdateItem popup
  const handleClosePopup = () => {
    setShowUpdatePopup(false);
    setSelectedItem(null); // Clear the selected item
  };

  return (
    <div className="flex flex-col items-center my-2 w-full">
      <div className="flex justify-between w-full px-10 my-4">
        <AddNewItemButton />

        <div className="text-3xl font-semibold text-pink-600">
          Total Products: {items.length}
        </div>
      </div>

      <CardContainer h="77vh">
        {loading ? (
          <div className="text-center text-gray-600 py-5 text-lg">
            <LoadingWheel />
          </div>
        ) : items.length === 0 ? (
          <p className="text-gray-500 text-lg text-center py-5">
            No items available
          </p>
        ) : (
          items.map((item, index) => (
            <ItemDisplayCard
              key={index}
              item={item}
              //onClick={() => console.log("Factory Item clicked", item)}
              onClick={() => handleItemClick(item)}  // Open popup on item click
              type="factory"
            />
          ))
        )}
      </CardContainer>

        {/* Conditionally render the UpdateItem popup */}
              {showUpdatePopup && (
                <UpdateItem item={selectedItem} onClose={handleClosePopup} />
              )}

    </div>
  );
}

export default Product;
