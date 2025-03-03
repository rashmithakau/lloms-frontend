import React, { useState, useEffect } from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import OrderTable from "../../components/PosTable/OrderTable";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import OrderAction from "../../components/OrderAction/OrderAction";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import { getAllProductsForOutlet } from "../../api/product-service/productController";

function Order() {
  const [orderItems, setOrderItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products and filter active ones
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllProductsForOutlet(101);
        const filteredItems = data.filter(
          (item) => item.productStatus === true
        ); // ✅ Only active products
        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Clear order items
  const handleClearOrder = () => {
    setOrderItems([]);
  };

  // Handle item click
  const handleItemClick = (item) => {
    setOrderItems((prevOrderItems) => {
      const existingItem = prevOrderItems.find(
        (orderItem) => orderItem.id === item.productId
      );

      if (existingItem) {
        return prevOrderItems.map((orderItem) =>
          orderItem.id === item.productId
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [
          ...prevOrderItems,
          {
            id: item.productId,
            name: item.productName,
            price: item.price,
            quantity: 1, // ✅ Ensure quantity is added when a new item is added
            discount: 0,
          },
        ];
      }
    });
  };

  return (
    <div>
      {/* Items List */}
      <div className="flex justify-center items-center my-2">
        <CardContainer h="58vh">
          {loading ? (
            <div className="text-center text-gray-600 py-5 text-lg">
              <LoadingWheel />
            </div>
          ) : (
            items.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))
          )}
        </CardContainer>
      </div>

      {/* Order Table & Actions */}
      <div className="flex">
        <OrderTable
          tType="order"
          products={orderItems}
          setProducts={setOrderItems}
        />
        <ActionContainer>
          <OrderAction onClear={handleClearOrder} />
        </ActionContainer>
      </div>
    </div>
  );
}

export default Order;
