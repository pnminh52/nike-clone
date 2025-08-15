import React from 'react';
import { useNavigate } from "react-router-dom";

const CategoriesFilter = ({ searchKeyword, onSearchChange, sortOrder, onSortChange }) => {
  const navigate = useNavigate();

  return (
    <div className="py-4 flex flex-wrap gap-4 justify-between items-center">
    

      {/* Sort */}
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-xl"
      >
        <option value="">Sort by child: All</option>
        <option value="asc"> Sort by child: Increase</option>
        <option value="desc"> Sort by child: Decrease</option>
      </select>
 <div className='flex gap-2 items-center'>
     {/* Search */}
  <input
        type="text"
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name..."
        className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/* Add New */}
      <button
        onClick={() => navigate("/admin/dashboard/categories/add")}
        className="bg-black text-white px-4 py-2 rounded-full cursor-pointer"
      >
        Add New Category
      </button>
 </div>
    </div>
  );
};

export default CategoriesFilter;
