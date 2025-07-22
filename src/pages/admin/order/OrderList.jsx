import React from 'react';
import useOrders from '../../../hooks/useOrders';
import useOrderStatus from '../../../hooks/useOrderStatus';

const OrderList = () => {
  const { orders, loading, error, fetchOrders } = useOrders();
  const { orderStatusList } = useOrderStatus();

  const handleChangeStatus = async (userId, orderId, newStatus) => {
    try {
      // Lấy user hiện tại
      const res = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await res.json();
  
      // Cập nhật status trong mảng orders
      const updatedOrders = user.orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
  
      // Gửi PATCH để cập nhật user
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: updatedOrders }),
      });
      console.log('Cập nhật thành công!');
      fetchOrders(); // reload lại
    } catch (err) {
    }
  };
  
  
  

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (orders.length === 0) return <p>Không có đơn hàng nào.</p>;

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="p-4 border rounded shadow bg-white">
          <h3 className="text-lg font-bold">Đơn hàng #{order.id}</h3>
          <p>Người đặt: {order.userName} ({order.userEmail})</p>

          <div className="mt-2">
            <label className="font-medium mr-2">Trạng thái:</label>
            <select
  className="border px-2 py-1 rounded"
  value={order.status}
  onChange={(e) => handleChangeStatus(order.userId, order.id, e.target.value)}
  disabled={["delivered", "cancelled", "returned", "refunded"].includes(order.status.toLowerCase())}
>
  {orderStatusList.map((status, idx) => {
    const currentIndex = orderStatusList.findIndex(s => s.name === order.status);
    const isCurrent = idx === currentIndex;
    const isNext = idx === currentIndex + 1;
    const isFinalStatus = ["delivered", "cancelled", "returned", "refunded"].includes(order.status.toLowerCase());

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
