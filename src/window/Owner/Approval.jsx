import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import {
  getAllProducts,
  updateProductStatus,
} from "../../api/product-service/productController";
import {
  getAllInactiveOutlets,
  updateOutletStatus,
} from "../../api/outlet_service/outletController";
import defaultImage from "../../assets/Empty image.jpg";
import {
  deletePriceStatus,
  getAllInactivePrices,
  updatePriceStatus,
} from "../../api/product-service/priceUpdateController";

function Approval() {
  const [selectedApproval, setSelectedApproval] = useState("price");
  const [loading, setLoading] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const [newOutlets, setNewOutlets] = useState([]);
  const [priceUpdates, setPriceUpdates] = useState([]);

  const fetchNewProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      const pendingProducts = data.filter((p) => p.productStatus === false);
      setNewProducts(pendingProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewOutlets = async () => {
    setLoading(true);
    try {
      const data = await getAllInactiveOutlets();
      const pendingOutlets = data.filter((o) => o.status === "Inactive");
      setNewOutlets(pendingOutlets);
    } catch (error) {
      console.error("Error fetching outlets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPriceUpdates = async () => {
    setLoading(true);
    try {
      const data = await getAllInactivePrices();
      setPriceUpdates(data);
    } catch (error) {
      console.error("Error fetching price updates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovePriceUpdate = async (productId, price, date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    const formattedDate = newDate.toISOString().split("T")[0];

    setLoading(true);
    try {
      await updatePriceStatus(productId, price, formattedDate, true);
    } catch (error) {
      console.error("Error approving price update:", error);
    } finally {
      await fetchPriceUpdates();
      setLoading(false);
    }
  };

  const handleRejectPriceUpdate = async (productId, price, date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    const formattedDate = newDate.toISOString().split("T")[0];

    setLoading(true);
    try {
      await deletePriceStatus(productId, price, formattedDate);
    } catch (error) {
      console.error("Error rejecting price update:", error);
    } finally {
      await fetchPriceUpdates();
      setLoading(false);
    }
  };

  const handleApproveNewProduct = async (productId) => {
    setLoading(true);
    try {
      await updateProductStatus(productId);
    } catch (error) {
      console.error("Error approving product:", error);
    } finally {
      await fetchNewProducts();
      setLoading(false);
    }
  };

  const handleApproveNewOutlet = async (outletId) => {
    setLoading(true);
    try {
      await updateOutletStatus(outletId);
    } catch (error) {
      console.error("Error approving outlet:", error);
    } finally {
      await fetchNewOutlets();
      setLoading(false);
    }
  };

  const confirmAction = async (action, id, price, date) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${action}?`,
      text: `This will ${action} item with ID: ${id}`,
      icon: action === "approve" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#28a745" : "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${action}`,
    });

    if (result.isConfirmed) {
      Swal.fire(
        `${action.charAt(0).toUpperCase() + action.slice(1)}d!`,
        `Item with ID ${id} has been ${action}d.`,
        "success"
      );

      if (action === "approve") {
        if (selectedApproval === "price") {
          handleApprovePriceUpdate(id, price, date);
        } else if (selectedApproval === "product") {
          handleApproveNewProduct(id);
        } else if (selectedApproval === "outlet") {
          handleApproveNewOutlet(id);
        }
      } else if (action === "reject") {
        if (selectedApproval === "price") {
          handleRejectPriceUpdate(id, price, date);
        } else if (selectedApproval === "product") {
          console.log("Rejected Product ID:", id);
          await fetchNewProducts();
        } else if (selectedApproval === "outlet") {
          console.log("Rejected Outlet ID:", id);
          await fetchNewOutlets();
        }
      }
    }
  };

  useEffect(() => {
    if (selectedApproval === "product") fetchNewProducts();
    else if (selectedApproval === "outlet") fetchNewOutlets();
    else if (selectedApproval === "price") fetchPriceUpdates();
  }, [selectedApproval]);

  return (
    <div className="p-4 bg-transparent rounded-lg shadow-md">
      <div className="mb-4 border border-pink-300 rounded-md p-4">
        <span className="text-pink-600 font-medium mr-4">
          Select Approval Type:
        </span>
        {[
          { value: "price", label: "Price Updates" },
          { value: "product", label: "New Product" },
          { value: "outlet", label: "New Outlet" },
        ].map((type) => (
          <label key={type.value} className="mr-4 text-pink-700">
            <input
              type="radio"
              value={type.value}
              checked={selectedApproval === type.value}
              onChange={(e) => setSelectedApproval(e.target.value)}
              className="mr-1 text-pink-600"
            />
            {type.label}
          </label>
        ))}
      </div>

      {loading ? (
        <LoadingWheel />
      ) : (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-pink-500 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                {selectedApproval === "price" && (
                  <>
                    <th className="px-4 py-2 text-left">Product ID</th>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </>
                )}
                {selectedApproval === "product" && (
                  <>
                    <th className="px-4 py-2 text-left">Product ID</th>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </>
                )}
                {selectedApproval === "outlet" && (
                  <>
                    <th className="px-4 py-2 text-left">Outlet ID</th>
                    <th className="px-4 py-2 text-left">Outlet Name</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {selectedApproval === "price" &&
                priceUpdates.map((item) => {
                  const date = new Date(item.priceUpdateDate);
                  date.setDate(date.getDate() + 1);
                  const formattedDate = date.toISOString().split("T")[0];

                  return (
                    <tr key={item.priceUpdateId}>
                      <td className="px-4 py-2">{item.productId}</td>
                      <td className="px-4 py-2">{item.productName}</td>
                      <td className="px-4 py-2">{item.price}</td>
                      <td className="px-4 py-2">{formattedDate}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() =>
                            confirmAction(
                              "approve",
                              item.productId,
                              item.price,
                              item.priceUpdateDate
                            )
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            confirmAction(
                              "reject",
                              item.productId,
                              item.price,
                              item.priceUpdateDate
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {selectedApproval === "product" &&
                newProducts.map((item) => {
                  const imageName = item.imageUrl?.split("\\").pop();
                  const imageSrc = imageName
                    ? `http://localhost:8080/api/v1/product/url/${imageName}`
                    : defaultImage;

                  return (
                    <tr key={item.productId}>
                      <td className="px-4 py-2">{item.productId}</td>
                      <td className="px-4 py-2">{item.productName}</td>
                      <td className="px-4 py-2">
                        <img
                          src={imageSrc}
                          alt={item.productName}
                          className="h-10 w-10 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() =>
                            confirmAction("approve", item.productId)
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            confirmAction("reject", item.productId)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {selectedApproval === "outlet" &&
                newOutlets.map((item) => (
                  <tr key={item.outletId}>
                    <td className="px-4 py-2">{item.outletId}</td>
                    <td className="px-4 py-2">{item.outletName}</td>
                    <td className="px-4 py-2">{item.location}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => confirmAction("approve", item.outletId)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => confirmAction("reject", item.outletId)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Approval;
