import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/users';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrdersFromAllUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const users = await res.json();

      const combinedOrders = users.flatMap(user =>
        (user.orders || []).map(order => ({
          ...order,
          userId: user.id,
          userName: `${user.firstname} ${user.lastname}`,
          userEmail: user.email,
        }))
      );

      setOrders(combinedOrders);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersFromAllUsers();
  }, []);

  return { orders, loading, error };
};

export default useOrders;
