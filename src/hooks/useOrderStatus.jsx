import { useEffect, useState } from 'react';

const API_URL = 'https://nikejsonserver-2.onrender.com/orderStatusList';

const useOrderStatus = () => {
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all
  const fetchOrderStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setOrderStatusList(data);
    } catch (err) {
      setError(err.message || 'Error fetching order statuses');
    } finally {
      setLoading(false);
    }
  };

  // Create
  const createOrderStatus = async (newStatus) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus),
      });
      const data = await response.json();
      setOrderStatusList((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update
  const updateOrderStatus = async (id, updatedStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStatus),
      });
      const data = await response.json();
      setOrderStatusList((prev) =>
        prev.map((status) => (status.id === id ? data : status))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete
  const deleteOrderStatus = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setOrderStatusList((prev) => prev.filter((status) => status.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOrderStatus();
  }, []);

  return {
    orderStatusList,
    loading,
    error,
    fetchOrderStatus,
    createOrderStatus,
    updateOrderStatus,
    deleteOrderStatus,
  };
};

export default useOrderStatus;
