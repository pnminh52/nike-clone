// components/user/order/CardOrders.jsx
import React from "react";

const CardOrders = ({ orders, setSelectedOrder }) => {
  return (
    <div className=" ">
      {orders.map((order) => (
        <div  onClick={() => setSelectedOrder(order)} key={order.id} className="py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
{/* Hình ảnh các sản phẩm trong đơn hàng */}
<div className="flex gap-2 ">
  {order.items.slice(0,1).map((item, index) => (
    <img
      key={index}
      src={item.img}
      alt={item.name}
      className="w-20 h-20 object-cover rounded-lg"
    />
  ))}
</div>

              {/* Thông tin đơn hàng */}
              <div className="">
              
               <p className="inter">#{order.id}</p>
               
              
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </p>
              
                <p className="text-sm">Quantity: {order.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0)},                   Total: {(order.totalPrice + order.shippingFee).toLocaleString()}<span className="underline text-xs">đ</span>
                </p>
               
              
            
                <p className="text-sm underline text-green-500 ">
               {order.status}
                </p>
              </div>
            </div>

           
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardOrders;
