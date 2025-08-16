import React, { useState } from 'react';

const OrderFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    onFilter({ searchTerm, status });
  };

  return (
    <div className="py-4 flex justify-between items-center">  
     <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          onFilter({ searchTerm, status: e.target.value });
        }}
        className="px-3 py-2 border border-gray-300 rounded-xl"
      >
        <option value="">Status: All</option>
        <option value="Pending">Status: Pending</option>
        <option value="Confirmed">Status: Confirmed</option>
        <option value="Processing">Status: Processing</option>
        <option value="Shipping">Status: Shipping</option>
        <option value="Delivered">Status: Delivered</option>
        <option value="Cancelled">Status: Cancelled</option>
        <option value="Refunded">Status: Refunded</option>
        <option value="Returned">Status: Returned</option>

      </select>   
      <input
        type="text"
        placeholder="Search by ID, name, or email..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onFilter({ searchTerm: e.target.value, status });
        }}
        className="w-auto px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

     
    </div>
  );
};

export default OrderFilter;
