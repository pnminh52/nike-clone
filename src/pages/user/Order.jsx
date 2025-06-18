import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import OrderDetails from "../../components/user/order/OrderDetails";
import axios from "axios";
import Pagination from "../../components/user/etc/Pagination";
import { Link } from "react-router-dom";
const Order = () => {
  const { user, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    if (user?.orders) {
      setOrders([...user.orders]);
    }
  }, [user?.orders, refreshFlag]);

  const allItems = orders.flatMap(order => order.items);
  const allChecked = selectedItems.length === allItems.length;

  const handleCheckAll = () => {
    if (allChecked) {
      setSelectedItems([]);
    } else {
      const allIds = allItems.map(item => item.id);
      setSelectedItems(allIds);
    }
  };

  const handleCheckItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const onUpdateStatus = async (orderId, newStatus, cancelReason) => {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:3000/users/${userId}`);
    const user = res.data;

    const updatedOrders = user.orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus, cancelReason } : order
    );

    const updatedUser = { ...user, orders: updatedOrders };
    await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
    return updatedUser;
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter === "All") return true;
    return order.status === statusFilter;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  if (!orders || orders.length === 0) {
    return  <div className="h-100 flex items-center mx-auto justify-center">
                        <div className="text-center">
                        <p>No orders found.</p>
                        <Link to={"/category/New%20%26%20Upcoming%20Drops"}>
                         <p className=" text-blue-600 underline">
                         Start shopping now!
                          </p></Link>
                        </div>
                      </div>
           ;
  }

  

  return (
    <div className="max-w-screen-2xl mx-auto px-10">
      <h2 className="text-2xl py-8">Orders List</h2>

      {/* Dashboard stats */}
      <div className="bg-white grid grid-cols-5 border border-gray-300 rounded-2xl py-4 items-center text-center ">
        <div className="border-r border-gray-300">
          <p className="text-lg text-gray-500">Total Orders</p>
          <p className="text-xl">{orders.length}</p>
        </div>
        <div className="border-r border-gray-300">
          <p className="text-lg text-gray-500">Orders Complete</p>
          <p className="text-xl">
            {orders.filter(order => order.status === "Complete").length}
          </p>
        </div>
        <div className="border-r border-gray-300">
          <p className="text-lg text-gray-500">Orders Cancelled</p>
          <p className="text-xl">
            {orders.filter(order => order.status === "Cancelled").length}
          </p>
        </div>
        <div className="border-r border-gray-300">
          <p className="text-lg text-gray-500">Pending Orders</p>
          <p className="text-xl">
            {orders.filter(order => order.status === "Pending").length}
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-500">Delivered</p>
          <p className="text-xl">
            {orders.filter(order => order.status === "Delivered").length}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
    
      <div className="relative inline-block text-right ml auto">
  <div
    onClick={() => setShowDropdown(!showDropdown)}
    className="flex gap-2 py-3 justify-end text-right items-center cursor-pointer "
  >
    <p>Sort By</p>
    <svg
      className={`w-5 h-5 transform transition-transform ${showDropdown ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {showDropdown && (
    <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg z-10 p-3 space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Lọc theo trạng thái</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-2 py-1.5 border rounded-lg border-gray-400"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Complete">Complete</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Sắp xếp theo ngày</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full px-2 py-1.5 border rounded-lg border-gray-400"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  )}
</div>

   

      {/* Table */}
      <div className="overflow-x-auto mb-10">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-[#F3F4F6]">
            <tr>
              <td className="border text-center px-2 border-gray-300">
                <input type="checkbox" checked={allChecked} onChange={handleCheckAll} />
              </td>
              <td className="border text-center px-2 py-2 border-gray-300">Order ID</td>
              <td className="border text-center px-2 py-2 border-gray-300">Date</td>
              <td className="border text-center px-2 py-2 border-gray-300">Status</td>
              <td className="border text-center px-2 py-2 border-gray-300">Payment</td>
              <td className="border text-center px-2 py-2 border-gray-300">Items</td>
              <td className="border text-center px-2 py-2 border-gray-300">Total</td>
              <td className="border text-center px-2 py-2 border-gray-300">Action</td>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) =>
              order.items.map((item, idx) => (
                <tr key={`${order.id}-${item.id}-${idx}`}>
                  <td className="border text-center px-2 border-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckItem(item.id)}
                    />
                  </td>
                  <td className="border text-center px-2 py-3 border-gray-300">#{order.id}</td>
                  <td className="border text-center px-2 py-3 border-gray-300">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="border text-center px-2 py-3 border-gray-300">
                    <span
                      className={`text-sm px-2 py-1 rounded-full border ${
                        order.status === "Cancelled"
                          ? "text-red-600 border-red-600"
                          : "text-green-600 border-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border text-center px-2 py-3 border-gray-300">Cash On Delivery</td>
                  <td className="border text-center px-2 py-3 border-gray-300">
                    {item.quantity} items
                  </td>
                  <td className="border text-center px-2 py-3 border-gray-300">
                    {item.quantity * item.price}
                  </td>
                  <td className="border text-center px-2 py-3 border-gray-300">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-500 hover:underline"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
      {orders<10&&(
          <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      </div>

      {/* Chi tiết đơn hàng */}
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
