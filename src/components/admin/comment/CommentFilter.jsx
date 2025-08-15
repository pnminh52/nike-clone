import React from "react";

const CommentFilter = ({ filters, onChange }) => {
  return (
    <div className="flex justify-between items-center gap-4 my-4">
      {/* Filter theo trạng thái */}
    <div className="flex items-center gap-2">
    <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-xl"
      >
        <option value="">Status: All</option>
        <option value="display">Status: Display</option>
        <option value="hidden">Status: Hidden</option>
      </select>
      <select
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-xl"
      >
        <option value="">Sort: Default</option>
        <option value="newest">Sort: Newest</option>
        <option value="oldest">Sort: Oldest</option>
      </select>
    </div>

      {/* Filter theo username */}
      <input
        type="text"
        placeholder="Search by name..."
        value={filters.userName}
        onChange={(e) => onChange({ ...filters, userName: e.target.value })}
        className="w-auto px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default CommentFilter;
