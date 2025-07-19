import React from "react";

const CardOrders = ({ orders, setSelectedOrder }) => {
  return (
    <div className="w-full">
    
      <div className="">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="py-4 px-6 border-b border-gray-200 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {/* Hình ảnh sản phẩm đầu tiên */}
                <div className="flex gap-2">
                  {order.items.slice(0, 1).map((item, index) => (
                    <img
                      key={index}
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>

                {/* Thông tin đơn hàng */}
                <div>
                  <p className="inter font-medium">#{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    Quantity:{" "}
                    {order.items.reduce(
                      (sum, item) => sum + (item.quantity ?? 1),
                      0
                    )}
                    , Total:{" "}
                    {(order.totalPrice + order.shippingFee).toLocaleString()}
                    <span className="underline text-xs">đ</span>
                  </p>
                  <p className="text-sm underline text-green-500">
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default CardOrders;
