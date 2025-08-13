import React from "react";

const AccountFilter = ({ filterStatus, onChange }) => {
  return (
    <div className="py-4">
      <select
        value={filterStatus}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-2 py-1"
      >
        <option value="All">Status: All</option>
        <option value="Active">Status: Active</option>
        <option value="Blocked">Status: Blocked</option>
      </select>
    </div>
  );
};

export default AccountFilter;
