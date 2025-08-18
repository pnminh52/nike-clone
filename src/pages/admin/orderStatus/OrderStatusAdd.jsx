import React, { useState } from 'react';
import useOrderStatus from '../../../hooks/useOrderStatus';
import { useNavigate } from 'react-router-dom';
const OrderStatusAdd = () => {
  const { createOrderStatus } = useOrderStatus();
  const navigate = useNavigate()
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
    <div className='h-full p-4'>
      <h1 className="nike-title-for-mobile">Add New Order Status</h1>
      <p className=''>Fill in the details for the new order status below:</p>
      <form onSubmit={handleSubmit} >
       <div className='flex items-center justify-between py-4 gap-2'>
       <div className='w-full'>
        <p className="mb-1 text-sm font-medium">Status Name</p>
        <input
            type="text"
            name="name"
            placeholder=" Status Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"

          />
        </div>

        <div className='w-full'>
        <p className="mb-1 text-sm font-medium">Status Description</p>
        <input
            name="description"
            placeholder=" Status Description"
            type="text"

            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"

          />
        </div>
       </div>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded-full">Add Status</button>
      </form>
    </div>
  );
};

export default OrderStatusAdd;
