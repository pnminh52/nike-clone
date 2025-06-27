import React from 'react';

const FilterProduct = ({ selectedStatus, stockFilter, onStockChange, onStatusChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium mr-2">Filter Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="Just In">Just In</option>
          <option value="Coming Soon">Coming Soon</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Filter Stock:</label>
        <select
          value={stockFilter}
          onChange={(e) => onStockChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">All</option>
          <option value="under25">Under 25</option>
          <option value="25to49">25 - 49</option>
          <option value="50to74">50 - 74</option>
          <option value="75to99">75 - 99</option>
          <option value="over100">Over 100</option>
        </select>
      </div>
    </div>
  );
};

export default FilterProduct;
