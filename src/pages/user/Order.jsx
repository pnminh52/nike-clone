import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import OrderDetails from "../../components/user/order/OrderDetails";
import axios from "axios";
import Pagination from "../../components/user/etc/Pagination";
import { Link } from "react-router-dom";
import CardOrders from "./../../components/user/order/CardOrders";
import ResultNotfound from './../../components/user/etc/ResultNotfound';
import OrderTable from './../../components/user/order/OrderTable';

const Order = () => {
  const { user } = useAuth();
  const orderStatusList = [
    { id: "1", name: "Pending" },
    { id: "2", name: "Confirmed" },
    { id: "3", name: "Processing" },
    { id: "4", name: "Shipping" },
    { id: "5", name: "Delivered" },
    { id: "6", name: "Cancelled" },
    { id: "7", name: "Returned" },
    { id: "8", name: "Refunded" },
  ];  
  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const closeMenu = () => {
    setAnimateOut(true);
  };
  useEffect(() => {
    if (animateOut) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setAnimateOut(false);
      }, 300); // thời gian animation
      return () => clearTimeout(timer);
    }
  }, [animateOut]);
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
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".relative")) setShowDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const onUpdateStatus = async (orderId, newStatus, cancelReason) => {
    const userId = localStorage.getItem("userId");
    const { data: userData } = await axios.get(
      `http://localhost:3000/users/${userId}`
    );
    const updatedOrders = userData.orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus, cancelReason } : o
    );
    const updatedUser = { ...userData, orders: updatedOrders };
    await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
    return updatedUser;
  };
  const filtered =
    statusFilter === "All"
      ? orders
      : orders.filter((o) => o.status === statusFilter);
  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 min-h-150">
    {/* Tiêu đề */}
    <div className="px-0 sm:px-0 py-5">
      <h2 className="text-lg sm:text-xl font-semibold">Orders</h2>
      <p className="text-sm block sm:hidden text-blue-600 underline">All your orders will be displayed here</p>
    </div>
  
    {/* Bộ lọc + Filter button */}
    <div className="block sm:hidden">
    <div className="h-16 items-center  flex px-0 sm:px-6 justify-between border-t border-b border-gray-300">
      <p className="text-base sm:text-lg text-[#707072]">
        {filtered.length} {statusFilter === "All" ? "Orders" : `${statusFilter} Orders`}
      </p>
  
      <button
        onClick={() => setIsOpen(true)}
        className="flex gap-1 items-center px-4 py-1 border rounded-full border-gray-300 cursor-pointer text-sm sm:text-base"
      >
        Filters
        <svg
          aria-hidden="true"
          className="icon-filter-ds"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
        >
          <path stroke="currentColor" strokeWidth="1.5" d="M21 8.25H10m-5.25 0H3"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M3 15.75h10.75m5 0H21"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
    </div>

  
    {/* Bộ lọc popup (hiện tại đang giữ nguyên) */}
    {isOpen && (
      <div className={`fixed inset-0 bg-white z-50`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={closeMenu}
            type="button"
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7.00001L16.8995 16.8995" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
  
        <div className="px-6 py-4">
          {/* Bộ lọc trạng thái */}
          <div>
            <p className="text-lg py-2">Sort by Status</p>
            <div className="border border-blue-600">
              {["All", ...orderStatusList.map((s) => s.name)].map((status) => (
                <label key={status} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={statusFilter === status}
                    onChange={() => {
                      setStatusFilter(status);
                      setCurrentPage(1);
                      closeMenu();
                    }}
                    className="appearance-none form-checkbox w-5 h-5 transition cursor-pointer bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black"
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>
  
          {/* Bộ lọc theo ngày */}
          <div>
            <p className="text-lg py-2">Sort by Date</p>
            <div className="border border-blue-600">
              {[
                { label: "Newest First", value: "newest" },
                { label: "Oldest First", value: "oldest" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={sortOrder === option.value}
                    onChange={() => {
                      setSortOrder(option.value);
                      setCurrentPage(1);
                      closeMenu();
                    }}
                    className="appearance-none form-checkbox w-5 h-5 transition cursor-pointer bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  
<div className="block sm:hidden">
      {/* Danh sách đơn hàng */}
      {paginated.length === 0 ? (
      <ResultNotfound />
    ) : (
      <CardOrders
        orders={paginated}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setSelectedOrder={setSelectedOrder}
      />
    )}
</div>
<div className="hidden sm:block">
<OrderTable orders={paginated}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setSelectedOrder={setSelectedOrder}/>
</div>
  
    {/* Chi tiết đơn hàng */}
    {selectedOrder && (
      <OrderDetails
        users={user}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={onUpdateStatus}
      />
    )}
  </div>
  
  );
};

export default Order;
