import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useOrderStatus from '../../../hooks/useOrderStatus';

const OrderStatusUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    orderStatusList,
    updateOrderStatus,
    fetchOrderStatus,
  } = useOrderStatus();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      await fetchOrderStatus();
      setLoading(false);
    };
    loadStatus();
  }, []);

  useEffect(() => {
    if (!loading) {
      const existing = orderStatusList.find(item => item.id === +id);
      if (existing) {
        setFormData({ name: existing.name, description: existing.description });
      }
    }
  }, [loading, orderStatusList, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      alert('Please fill all fields');
      return;
    }
    await updateOrderStatus(id, formData);
    alert('Updated successfully!');
    navigate('/admin/dashboard/order-status/list');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Update Order Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            defaultValue={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            name="description"
            defaultValue={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default OrderStatusUpdate;
