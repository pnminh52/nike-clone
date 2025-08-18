import React from 'react';
import { Link } from 'react-router-dom';

const OrderStatusFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center justify-between py-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name..."
        className="w-auto px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Link to={'/admin/dashboard/order-status/add'}>
        <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 cursor-pointer">
          Add status
        </button>
      </Link>
    </div>
  );
};

export default OrderStatusFilter;
