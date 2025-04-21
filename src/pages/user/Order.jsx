import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import OrderDetails from "../../components/user/OrderDetails";
import axios from "axios";
import Pagination from "../../components/user/Pagination";

const Order = () => {
  const { user, setUser } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const allItems = orders.flatMap(order => order.items);
  const allChecked = selectedItems.length === allItems.length;
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

const paginatedOrders = orders.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
const totalPages = Math.ceil(orders.length / itemsPerPage);

  
  
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
    if (user?.orders) {
      setOrders([...user.orders]); // clone để tránh trỏ cùng reference
    }
  }, [user?.orders, refreshFlag]);

  const onUpdateStatus = async (orderId, newStatus, cancelReason) => {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:3000/users/${userId}`);
    const user = res.data;
  
    const updatedOrders = user.orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus, cancelReason } : order
    );
  
    const updatedUser = { ...user, orders: updatedOrders };
  
    await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
  
    return updatedUser; // 👈 trả lại để gọi updateUser sau đó
  };
  
  
  
  
  
  

  if (!orders || orders.length === 0) {
    return <p className="text-center mt-6">Chưa có đơn hàng nào.</p>;
  }


  return (
    <div className="max-w-screen-2xl mx-auto px-10">
    <h2 className="text-2xl py-8">Orders List</h2>
  <div className="bg-white grid grid-cols-5 border border-gray-300 rounded-2xl py-4 items-center text-center ">
    <div className="border-r border-gray-300"><p className="text-lg  inter text-gray-500">Total Orders</p>
    <p className="text-black text-xl inter">{orders.length}</p>
    </div>
    <div className="border-r border-gray-300"><p className="text-lg inter text-gray-500">Orders Complete</p>
    <p className="text-black text-xl inter">600</p>
    </div>
    <div className="border-r border-gray-300"><p className="text-lg inter text-gray-500">Orders Cancelled</p>
    <p className="text-black text-xl inter">600</p>
    </div>
    <div className="border-r border-gray-300"><p className="text-lg inter text-gray-500">Orders Cancelled</p>
    <p className="text-black text-xl inter">600</p>
    </div>
    <div className=""><p className="text-lg inter text-gray-500">Orders Cancelled</p>
    <p className="text-black text-xl inter">600</p>
    </div>
  </div>
  <div className="overflow-x-auto  mt-10 mb-10">
    <div className="mb-4 flex items-center justify-between ">
    <div className="flex gap-2 items-center">
    <input type="text" placeholder="Search orders" className="px-2 py-1.5 border border-gray-400 rounded-lg" />
   
   <p className="px-2 py-1.5 border rounded-lg border-gray-400">Filters</p>
    </div>
<div>
  <select name="Status" id="status">
    <option value="Pending">Status: Pending</option>
    <option value="Cancelled">Status:  Cancelled</option>
  </select>
  </div>  
    </div>
  <table className="table-auto w-full border border-gray-300">
    <thead className="bg-[#F3F4F6]">
      <tr>
     
      <td className="border text-center inter px-2 border-gray-300  hover:cursor-pointer  text-gray-500 ">
      <input type="checkbox" checked={allChecked} onChange={handleCheckAll} /> 

</td>
        <td className="border text-center inter border-gray-300  hover:cursor-pointer px-2 py-2 text-gray-500 ">
OrderID

        </td>
        <td className="border text-center inter border-gray-300  hover:cursor-pointer px-2 py-2 text-gray-500">Date</td>

        <td className="border text-center inter border-gray-300  hover:cursor-pointer px-2 py-2 text-gray-500">Status</td>
        <td className="border text-center inter border-gray-300  hover:cursor-pointer px-2 py-2 text-gray-500">Payment Status</td>
        <td className="border text-center inter border-gray-300  hover:cursor-pointer px-2 py-2 text-gray-500">Items</td>
        <td className="border text-center inter border-gray-300  hover:cursor-pointer px-2 py-2 text-gray-500">Total</td>
        <td className="border text-center inter border-gray-300  hover:cursor-pointer px-2 py-2 text-gray-500">Action</td>
      </tr>
    </thead>
    <tbody>
      {paginatedOrders.map((order) =>
        order.items.map((item, idx) => (
          <tr key={`${order.id}-${item.id}-${idx}`}>
          
          <td className="border-gray-300 border px-2  text-center ">
          <input
    type="checkbox"
    checked={selectedItems.includes(item.id)}
    onChange={() => handleCheckItem(item.id)}
  />
 </td>

            <td className="border-gray-300 border  px-2 py-3 text-center ">
         
              
              #{order.id}</td>
            <td className="border-gray-300 border  px-2 py-3 text-center">
              {new Date(order.date).toLocaleString()}
            </td>
            <td className="border-gray-300 border  px-2 py-3 text-center">
              <span
                className={`text-sm  px-2 py-1 items-center  bg-white  rounded-full ${
                  order.status === "Cancelled"
                    ? "text-red-600 border border-red-600"
                    : "text-green-600 border border-green-600"
                }`}
              >
               {order.status}
              </span>
            </td>
            <td className="border-gray-300 border  px-2 py-3 text-center">Cash On Delivery</td>
            
            <td className="border-gray-300 border  px-2 py-3 text-center">
              {item.quantity} items 
            </td>
            <td className="border-gray-300 border  px-2 py-3 text-center">
              {item.quantity*item.price} 
            </td>
            <td className="border-gray-300 border  px-2 py-3 text-center">
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
  <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => setCurrentPage(page)}
/>

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
