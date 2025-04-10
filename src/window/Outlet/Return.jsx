import React, { useContext } from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import OrderTable from "../../components/PosTable/OrderTable";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import OrderAction from "../../components/OrderAction/OrderAction";
import ReturnAction from "../../components/ReturnAction/ReturnAction";
import Image from "../../assets/2254.jpg_wh860.jpg";
import { useState, useEffect } from "react";
import { getAllProductsByOutletId } from "../../api/product-service/productController";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import AuthContext from "../../context/AuthContext";

function Return() {
  const [orderItems, setOrderItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { outletId } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllProductsByOutletId(outletId);
        
        setItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };
    fetchItems();
  }, []);

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleItemClick = (item) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.id === item.productId
    );

    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.productId
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          id: item.productId,
          name: item.productName,
          price: item.price,
          stock: item.stockQuantity,
          //discount: 0,
        
        },
      ]);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center my-2">
        <CardContainer>
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
      <div className="flex">
        <OrderTable
          tType="return"
          products={orderItems}
          setProducts={setOrderItems}
        />
        <ActionContainer>
          <ReturnAction onClear={handleClearOrder} products={orderItems}/>
        </ActionContainer>
      </div>
    </div>
  );
}

export default Return;
