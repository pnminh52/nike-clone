import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import OrderDetails from "../../components/user/order/OrderDetails";
import axios from "axios";
import Pagination from "../../components/user/etc/Pagination";
import { Link } from "react-router-dom";
import CardOrders from './../../components/user/order/CardOrders';

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
   <div>
    <div className="hidden sm:block">

    </div>
    <div className="block sm:hidden">
    <div className="max-w-screen-2xl mx-auto px-0 sm:px-10">
              <h2 className="text-2xl  px-6 sm:px-0 py-5">Orders</h2>
              <div className="h-16   items-center flex px-6 justify-between border-t border-b border-gray-300">
                <p className="text-lg text-[#707072]">{orders.length} Items</p>
              <button className='flex gap-1 items-center px-4 py-1 border rounded-full border-gray-300 cursor-pointer'
      >
       Filters
        <svg
          aria-hidden="true"
          className="icon-filter-ds"
          focusable="false"
          viewBox="0 0 24 24"
          role="img"
          width="24px"
          height="24px"
          fill="none"
        >
          <path stroke="currentColor" strokeWidth="1.5" d="M21 8.25H10m-5.25 0H3"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M3 15.75h10.75m5 0H21"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
        </svg></button>

              </div>
<CardOrders  orders={paginated}
  selectedItems={selectedItems}
  setSelectedItems={setSelectedItems}
  setSelectedOrder={setSelectedOrder}/>



     

      {selectedOrder && (
        <OrderDetails
        users={user}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
    </div>
   </div>
  );
};

export default Order;
