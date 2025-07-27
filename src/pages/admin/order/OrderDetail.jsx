import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useOrderStatus from '../../../hooks/useOrderStatus';

const OrderDetail = () => {
  const { id } = useParams();
  const { orderStatusList } = useOrderStatus();
  const [order, setOrder] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null); // 👉 thêm state lưu thông tin user

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`http://localhost:3000/users`);
      const users = await res.json();
      for (const user of users) {
        const foundOrder = user.orders.find(o => o.id === Number(id));
        if (foundOrder) {
          setOrder(foundOrder);
          setUserId(user.id);
          setUser(user); // 👉 lưu user vào state
          break;
        }
      }
    };
    fetchOrder();
  }, [id]);

  const handleChangeStatus = async (newStatus) => {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await res.json();

    const updatedOrders = user.orders.map(o =>
      o.id === order.id ? { ...o, status: newStatus } : o
    );

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: updatedOrders }),
    });

    setOrder({ ...order, status: newStatus });
  };

  if (!order || !user) return <p>Đang tải chi tiết đơn hàng...</p>;

  const currentIndex = orderStatusList.findIndex(s => s.name === order.status);
  const isFinalStatus = ["delivered", "cancelled", "returned", "refunded"].includes(order.status.toLowerCase());

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng #{order.id}</h2>
      <p><strong>Người đặt:</strong> {user.firstname}{user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mt-4">
        <label className="font-medium mr-2">Trạng thái:</label>
        <select
          value={order.status}
          onChange={(e) => handleChangeStatus(e.target.value)}
          className="border px-2 py-1 rounded"
          disabled={isFinalStatus}
        >
          {orderStatusList.map((status, idx) => {
            const isCurrent = idx === currentIndex;
            const isNext = idx === currentIndex + 1;

            return (
              <option
                key={status.id}
                value={status.name}
                disabled={isFinalStatus || (!isCurrent && !isNext)}
              >
                {status.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mt-4">
        <p className="font-medium">Sản phẩm:</p>
        <ul className="list-disc ml-6">
          {order.items?.map((item, idx) => (
            <li key={idx}>{item.name} - SL: {item.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetail;
