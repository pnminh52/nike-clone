import React from "react";
import { Link } from "react-router-dom";

const StaffFilters = ({ filters, setFilters, availablePermissions }) => {
  return (
    <div className="flex justify-between items-center py-4">
      {/* Search */}
     

     <div className="flex gap-2 items-center">
       {/* Filter status */}
       <select
        value={filters.accountStatus}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, accountStatus: e.target.value }))
        }
        className="px-3 py-2 border border-gray-300 rounded-xl"
      >
        <option value="All">Status: All</option>
        <option value="Active">Status: Active</option>
        <option value="Blocked">Status: Blocked</option>
      </select>

      {/* Filter permission */}
      <select
        value={filters.permission}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, permission: e.target.value }))
        }
        className="px-3 py-2 border border-gray-300 rounded-xl"
      >
        <option value="All">Permissions: All</option>
        {availablePermissions.map((p) => (
          <option key={p.value} value={p.value}>
           Permissions: {p.label}
          </option>
        ))}
      </select>
     </div>
    <div className="flex gap-2 items-center">
    <input
        type="text"
        placeholder="Search by name or email..."
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
        className="w-auto px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Link to={"/admin/dashboard/decentralization/add"}>
      <button className="px-4 py-2  bg-black text-white rounded-full hover:bg-gray-800 cursor-pointer">
      Add new staff</button></Link>
    </div>
    </div>
  );
};

export default StaffFilters;
