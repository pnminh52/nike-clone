import React from "react";

const AccountFilter = ({
  filterStatus,
  onChange,
  sortOrder,
  onSortChange,
  searchKeyword,
  onSearchChange
}) => {
  return (
    <div className="py-4 flex justify-between items-center">
      {/* Filter status */}
    <div className="flex items-center gap-2">
    <select
        value={filterStatus}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-xl"
      >
        <option value="All">Status: All</option>
        <option value="Active">Status: Active</option>
        <option value="Blocked">Status: Blocked</option>
      </select>

      {/* Sort by date */}
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-xl"
      >
        <option value="newest">Sort: Newest</option>
        <option value="oldest">Sort: Oldest</option>
      </select>
    </div>

      {/* Search by name */}
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name..."
        className="w-auto px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default AccountFilter;
