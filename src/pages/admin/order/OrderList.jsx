import React from 'react';
import useOrders from '../../../hooks/useOrders';

const OrderList = () => {
  const { orders, loading, error } = useOrders();

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (orders.length === 0) return <p>Không có đơn hàng nào.</p>;

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="p-4 border rounded shadow bg-white">
          <h3 className="text-lg font-bold">Đơn hàng #{order.id}</h3>
          <p>Người đặt: {order.userName} ({order.userEmail})</p>
          <p>Trạng thái: {order.status}</p>
          <div className="mt-2">
            <p className="font-medium">Sản phẩm:</p>
            <ul className="list-disc ml-5">
              {order.items?.map((item, idx) => (
                <li key={idx}>{item.name} - SL: {item.quantity}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
