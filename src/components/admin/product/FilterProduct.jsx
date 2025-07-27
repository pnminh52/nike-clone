import React from 'react';
import { Link } from 'react-router-dom';

const FilterProduct = ({
  statusFilter,
  stockFilter,
  priceFilter,
  searchKeyword,
  onStockChange,
  onStatusChange,
  onPriceChange,
  onSearchChange,
}) => {
  return (
    <div className='flex items-center justify-between mb-2'>
      {/* Bộ lọc dropdown */}
      <div className="flex items-center gap-2">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-xl"
        >
          <option value="">Status: All</option>
          <option value="Just In">Status: Just In</option>
          <option value="Coming Soon">Status: Coming Soon</option>
        </select>

        <select
          value={stockFilter}
          onChange={(e) => onStockChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-xl"
        >
          <option value="">Stock: All</option>
          <option value="under25">Stock: Under 25</option>
          <option value="25to49">Stock: 25 - 49</option>
          <option value="50to74">Stock: 50 - 74</option>
          <option value="75to99">Stock: 75 - 99</option>
          <option value="over100">Stock: Over 100</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => onPriceChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-xl"
        >
          <option value="">Price: All</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Thanh tìm kiếm */}
      <div className='flex gap-2 items-center'>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name..."
          className="w-auto px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
         <Link to="/admin/dashboard/products/add">
                <button className="px-4 py-2  bg-black text-white rounded-full hover:bg-gray-800 cursor-pointer">
                  Add new shoes
                </button>
              </Link>
      </div>
    </div>
  );
};

export default FilterProduct;
