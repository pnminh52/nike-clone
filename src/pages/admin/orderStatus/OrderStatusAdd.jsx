import React, { useState } from 'react';
import useOrderStatus from '../../../hooks/useOrderStatus';
import { useNavigate } from 'react-router-dom';
const OrderStatusAdd = () => {
  const { createOrderStatus } = useOrderStatus();
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    await createOrderStatus(formData);
    setFormData({ name: '', description: '' });
    navigate('/admin/dashboard/order-status/list')
  };

  return (
    <div>
      <h2>Add New Order Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label> <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description:</label> <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Status</button>
      </form>
    </div>
  );
};

export default OrderStatusAdd;
