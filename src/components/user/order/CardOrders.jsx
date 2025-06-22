// components/user/order/CardOrders.jsx
import React from "react";

const CardOrders = ({ orders, setSelectedOrder }) => {
  return (
    <div className=" ">
      {orders.map((order) => (
        <div key={order.id} className="py-4 px-6 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">

              {/* Thông tin đơn hàng */}
              <div className="">
               <div className="flex items-center gap-1">
               <p className="inter">#{order.id}</p>
                <p className="text-xs inter text-green-400 bg-green-100 px-2 py-1 rounded-full">
               {order.status}
                </p>
               </div>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </p>
               
                <p className="inter">
                  Total: {(order.totalPrice + order.shippingFee).toLocaleString()} VND
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(order)}
              className="text-blue-600 text-sm underline"
            >
              View Details
            </button>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardOrders;
