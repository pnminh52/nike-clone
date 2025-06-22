import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import OrderDetails from "../../components/user/order/OrderDetails";
import axios from "axios";
import Pagination from "../../components/user/etc/Pagination";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (user?.orders) setOrders([...user.orders]);
  }, [user?.orders, refreshFlag]);

  const allItems = orders.flatMap((order) => order.items);
  const allChecked = selectedItems.length === allItems.length;

  const handleCheckAll = () => {
    setSelectedItems(allChecked ? [] : allItems.map((item) => item.id));
  };

  const handleCheckItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".relative")) setShowDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const onUpdateStatus = async (orderId, newStatus, cancelReason) => {
    const userId = localStorage.getItem("userId");
    const { data: userData } = await axios.get(`http://localhost:3000/users/${userId}`);
    const updatedOrders = userData.orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus, cancelReason } : o
    );
    const updatedUser = { ...userData, orders: updatedOrders };
    await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
    return updatedUser;
  };

  const filtered = statusFilter === "All" ? orders : orders.filter((o) => o.status === statusFilter);

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  if (!orders.length) {
    return (
      <div className="h-100 flex items-center mx-auto justify-center">
        <div className="text-center">
          <p>No orders found.</p>
          <Link to={"/category/New%20%26%20Upcoming%20Drops"}>
            <p className="text-blue-600 underline">Start shopping now!</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-0">
              <h2 className="text-2xl  px-6 sm:px-0 py-5">Orders</h2>
              <div className="h-16   items-center flex px-6 justify-between border-t border-b border-gray-300">
                <p>{orders.length} Items</p>
                <button>sdsd</button>

              </div>
{/* Danh sách đơn hàng */}
<div className="divide-y border-b">
  {paginated.map((order) => (
    <div key={order.id} className="p-6 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">Order ID: #{order.id}</p>
          <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleString()}</p>
          <p className="text-sm text-gray-500">Status: <span className="font-medium">{order.status}</span></p>
          <p className="text-sm text-gray-500">Total: {(order.totalPrice + order.shippingFee).toLocaleString()} VND</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setSelectedOrder(order)}
            className="text-blue-600 underline"
          >
            View Details
          </button>
          <input
            type="checkbox"
            checked={order.items.every((item) => selectedItems.includes(item.id))}
            onChange={() => {
              const allIds = order.items.map((item) => item.id);
              const allSelected = allIds.every((id) => selectedItems.includes(id));
              if (allSelected) {
                setSelectedItems((prev) => prev.filter((id) => !allIds.includes(id)));
              } else {
                setSelectedItems((prev) => [...new Set([...prev, ...allIds])]);
              }
            }}
          />
        </div>
      </div>

      {/* Danh sách sản phẩm trong đơn */}
      <div className="mt-3 grid gap-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-2 border rounded-md">
            <img src={item.img} alt={item.name} className="w-16 h-16 object-cover" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
              <p className="text-sm text-gray-500">Price: {parseInt(item.price_sale || item.price).toLocaleString()} VND</p>
            </div>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckItem(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  ))}
</div>



     

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
};

export default Order;
