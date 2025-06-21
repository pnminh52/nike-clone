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
    <div className="max-w-screen-2xl mx-auto px-10">
      {/* <h2 className="text-2xl py-8">Orders List</h2>

      <div className="bg-white grid grid-cols-5 border border-gray-300 rounded-2xl py-4 text-center">
        {[
          { label: "Total Orders", count: orders.length },
          { label: "Orders Complete", count: orders.filter(o => o.status === "Complete").length },
          { label: "Orders Cancelled", count: orders.filter(o => o.status === "Cancelled").length },
          { label: "Pending Orders", count: orders.filter(o => o.status === "Pending").length },
          { label: "Delivered", count: orders.filter(o => o.status === "Delivered").length },
        ].map(({ label, count }, idx) => (
          <div key={label} className={idx < 4 ? "border-r border-gray-300" : ""}>
            <p className="text-lg text-gray-500">{label}</p>
            <p className="text-xl">{count}</p>
          </div>
        ))}
      </div>

      <div className="relative inline-block text-right ml-auto">
        <div onClick={() => setShowDropdown(!showDropdown)} className="flex gap-2 py-3 justify-end items-center cursor-pointer">
          <p>Sort By</p>
          <svg className={`w-5 h-5 transition-transform ${showDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg z-10 p-3 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Lọc theo trạng thái</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-2 py-1.5 border rounded-lg">
                {["All", "Pending", "Cancelled", "Complete", "Delivered"].map((s) => (
                  <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Sắp xếp theo ngày</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full px-2 py-1.5 border rounded-lg">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-[#F3F4F6]">
            <tr>
              <th className="border px-2"><input type="checkbox" checked={allChecked} onChange={handleCheckAll} /></th>
              {["Order ID", "Date", "Status", "Payment", "Items", "Total", "Action"].map((h) => (
                <th key={h} className="border px-2 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((order) =>
              order.items.map((item, idx) => (
                <tr key={`${order.id}-${item.id}-${idx}`}>
                  <td className="border text-center px-2">
                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleCheckItem(item.id)} />
                  </td>
                  <td className="border text-center px-2 py-3">#{order.id}</td>
                  <td className="border text-center px-2 py-3">{new Date(order.date).toLocaleString()}</td>
                  <td className="border text-center px-2 py-3">
                    <span className={`text-sm px-2 py-1 rounded-full border ${order.status === "Cancelled" ? "text-red-600 border-red-600" : "text-green-600 border-green-600"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="border text-center px-2 py-3">Cash On Delivery</td>
                  <td className="border text-center px-2 py-3">{item.quantity} items</td>
                  <td className="border text-center px-2 py-3">{item.quantity * item.price}</td>
                  <td className="border text-center px-2 py-3">
                    <button onClick={() => setSelectedOrder(order)} className="text-blue-500 hover:underline">Chi tiết</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {sorted.length > itemsPerPage && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )} */}
    <p>ahahahah</p>
    </div>
  );
};

export default Order;
