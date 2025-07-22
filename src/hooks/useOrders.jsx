import { useState, useEffect } from 'react';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/users');
      const users = await res.json();

      // Gộp tất cả đơn hàng từ mọi user + thêm userId để sau này xử lý
      const allOrders = users.flatMap(user =>
        user.orders.map(order => ({
          ...order,
          userId: user.id,
          userName: user.name,
          userEmail: user.email
        }))
      );

      setOrders(allOrders);
    } catch (err) {
      setError('Lỗi khi tải đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, fetchOrders };
};

export default useOrders;
