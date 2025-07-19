import React, { useState, useEffect } from "react";
import OrderFilterSidebar from "./OrderFilterSidebar";

const OrderTable = ({ orders, setSelectedOrder }) => {
  const [priceSort, setPriceSort] = useState("");
  const [statusFilters, setStatusFilters] = useState([]);
  const [itemSort, setItemSort] = useState("");
  const [dateSort, setDateSort] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    let updated = [...orders];

    if (statusFilters.length > 0) {
      updated = updated.filter((order) => statusFilters.includes(order.status));
    }

    if (dateRange) {
      const days = parseInt(dateRange, 10);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      updated = updated.filter((order) => new Date(order.date) >= cutoff);
    }

    if (dateSort === "newest") {
      updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (dateSort === "oldest") {
      updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (priceSort === "asc") {
      updated.sort(
        (a, b) =>
          a.totalPrice + a.shippingFee - (b.totalPrice + b.shippingFee)
      );
    } else if (priceSort === "desc") {
      updated.sort(
        (a, b) =>
          b.totalPrice + b.shippingFee - (a.totalPrice + a.shippingFee)
      );
    }

    if (itemSort === "asc") {
      updated.sort(
        (a, b) =>
          a.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0) -
          b.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
      );
    } else if (itemSort === "desc") {
      updated.sort(
        (a, b) =>
          b.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0) -
          a.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
      );
    }

    setFilteredOrders(updated);
  }, [orders, priceSort, statusFilters, itemSort, dateSort, dateRange]);

  return (
    <div className="flex items-start gap-6">
      <OrderFilterSidebar
        priceSort={priceSort}
        setPriceSort={setPriceSort}
        statusFilters={statusFilters}
        setStatusFilters={setStatusFilters}
        itemSort={itemSort}
        setItemSort={setItemSort}
        dateSort={dateSort}
        setDateSort={setDateSort}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <table className="w-[80%] text-sm">
        <thead>
          <tr className="border border-gray-400 text-center bg-gray-100">
            <th className="p-3">Order ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Items</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="border border-gray-400 hover:bg-gray-50 cursor-pointer text-center"
            >
              <td className="p-3 font-medium">#{order.id}</td>
              <td className="p-3">{new Date(order.date).toLocaleString()}</td>
              <td className="p-3">
                {order.items.reduce(
                  (sum, item) => sum + (item.quantity ?? 1),
                  0
                )}
              </td>
              <td className="p-3">
                {(order.totalPrice + order.shippingFee).toLocaleString()}
                <span className="underline text-xs">đ</span>
              </td>
              <td className="p-3 text-green-600 underline">{order.status}</td>
              <td className="p-3">
                <button className="bg-black text-white px-4 py-1 rounded-full text-xs cursor-pointer">
                  View
                </button>
              </td>
            </tr>
          ))}
          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-5 text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
