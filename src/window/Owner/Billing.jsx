import React, { useEffect, useState } from "react";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import CustomerOrderTable from "../../components/customerOrderTable/CustomerOrderTable";
import {
  getAllCusOrderByOutletAndDate,
  getAllCusOrderByOutletAndYearAndMonth,
} from "../../api/outlet_service/cusOrderController";
import { getAllOutlets } from "../../api/outlet_service/outletController";

const Billing = ({ category, selCategory = "Pending", searchText }) => {
  const [orders, setOrders] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOutletId, setSelectedOutletId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [moreSort, setMoreSort] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const selectedCategory = category || selCategory;

  const yearOptions = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  const formatOrders = (orderData) => {
    return orderData
      .map((item) => ({
        orderId: item.cusOrderID.toString().padStart(3, "0"),
        outletName: item.outletName,
        date: new Date(item.orderDate).toLocaleDateString("en-US"),
        time: new Date(item.orderDate).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        status: item.status,
        customerName: item.customerName,
        customerPhone: item.customerPhone,
      }))
      .sort((a, b) => b.orderId.localeCompare(a.orderId));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const outletData = await getAllOutlets();
        setOutlets(outletData);

        if (outletData.length > 0) {
          const defaultOutletId = outletData[0].outletId;
          setSelectedOutletId(defaultOutletId);

          const orderData = await getAllCusOrderByOutletAndDate(
            defaultOutletId,
            selectedDate
          );
          setOrders(formatOrders(orderData));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!selectedOutletId) return;
      setLoading(true);
      try {
        let orderData;
        if (moreSort) {
          orderData = await getAllCusOrderByOutletAndYearAndMonth(
            selectedOutletId,
            selectedYear,
            selectedMonth
          );
        } else {
          orderData = await getAllCusOrderByOutletAndDate(
            selectedOutletId,
            selectedDate
          );
        }
        setOrders(formatOrders(orderData));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (outlets.length > 0) {
      fetchOrders();
    }
  }, [
    selectedOutletId,
    selectedDate,
    selectedYear,
    selectedMonth,
    moreSort,
    selectedCategory,
  ]);
  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-4">
        <div className="flex flex-wrap gap-4">
          {/* Outlet Selector */}
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Select Outlet:
            </label>
            <select
              value={selectedOutletId || ""}
              onChange={(e) => setSelectedOutletId(parseInt(e.target.value))}
              className="mt-1 block w-60 px-3 py-2 border border-pink-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              {outlets.map((outlet) => (
                <option key={outlet.outletId} value={outlet.outletId}>
                  {outlet.outletName}
                </option>
              ))}
            </select>
          </div>

          {!moreSort ? (
            // Date Picker
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Select Date:
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block px-3 py-2 border border-pink-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          ) : (
            <>
              {/* Year Selector */}
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Select Year:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="mt-1 block px-3 py-2 border border-pink-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month Selector */}
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Select Month:
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="mt-1 block px-3 py-2 border border-pink-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  {monthOptions.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        {/* Toggle Sort Button */}
        <button
          onClick={() => setMoreSort(!moreSort)}
          className="h-10 px-4 bg-pink-500 text-white text-xl font-extrabold rounded-full hover:bg-pink-600 transition"
        >
          {moreSort ? "Less" : "More Sort Options"}
        </button>
      </div>

      {/* Table or Loading or Empty Message */}
      {loading ? (
        <div className="text-center text-gray-600 py-5 text-lg">
          <LoadingWheel />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg font-medium">
          No Orders Available
        </div>
      ) : (
        <CustomerOrderTable orders={orders} />
      )}
    </div>
  );
};

export default Billing;
