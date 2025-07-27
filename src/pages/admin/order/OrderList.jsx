import React from 'react';
import { useNavigate } from 'react-router-dom';
import useOrders from '../../../hooks/useOrders';

const OrderList = () => {
  const { orders, loading, error } = useOrders();
  const navigate = useNavigate();

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (orders.length === 0) return <p>Không có đơn hàng nào.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Người đặt</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.userName}</td>
              <td className="border p-2">{order.userEmail}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate(`/admin/dashboard/orders/${order.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
