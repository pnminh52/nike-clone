import React, { useState } from "react";

const StaffTable = ({
  staffUsers = [],
  onDelete,
  onDeletePermission,
  onEditPermission,
  availablePermissions = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editing, setEditing] = useState({ staffId: null, permission: null }); // trạng thái đang edit
  const itemsPerPage = 10;

  const getPermissionLabel = (value) => {
    const found = availablePermissions.find((p) => p.value === value);
    return found ? found.label : value;
  };

  const totalPages = Math.ceil(staffUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = staffUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này không?")) {
      onDelete?.(id);
    }
  };

  const handlePermissionDelete = (staffId, permission) => {
    if (window.confirm("Bạn có chắc muốn xóa quyền này không?")) {
      onDeletePermission?.(staffId, permission);
    }
  };

  const handleStartEdit = (staffId, permission) => {
    setEditing({ staffId, permission });
  };

  const handleChangePermission = (e, staffId, oldPermission) => {
    const newPermission = e.target.value;
    onEditPermission?.(staffId, oldPermission, newPermission);
    setEditing({ staffId: null, permission: null });
  };

  const handleCancelEdit = () => {
    setEditing({ staffId: null, permission: null });
  };

  return (
    <div className="overflow-x-auto p-4 border-gray-300 border bg-white rounded-2xl">
    <table className="min-w-full border bg-white">
      <thead className="bg-white">
          <tr>
            <th className="border border-gray-300 p-2 text-center">Staffname </th>
            <th className="border border-gray-300 p-2 text-center">Email</th>
            <th className="border border-gray-300 p-2 text-center">Status</th>
            <th className="border border-gray-300 p-2 text-center">Authority</th>
            <th className="border border-gray-300 p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
         
            {currentItems.map((staff) => (
              <tr key={staff.id} className="text-center">
                <td className="border border-gray-300 p-2 text-center">{staff.firstname} {staff.lastname}</td>
                <td className="border border-gray-300 p-2 text-center">{staff.email}</td>
                <td className="border border-gray-300 p-2 text-center">{staff.accountStatus}</td>
                <td className="border border-gray-300 p-2 text-center">
  {staff.permissions?.length > 0 ? (
    staff.permissions.map((p, idx) => (
      <span
        key={idx}
        className="inline-block bg-gray-200 px-2 py-1 m-1 rounded"
      >
        {editing.staffId === staff.id && editing.permission === p ? (
          <>
            <select
              value={p}
              onChange={(e) => handleChangePermission(e, staff.id, p)}
              onBlur={handleCancelEdit}
            >
              {availablePermissions.map((ap) => (
                <option key={ap.value} value={ap.value}>
                  {ap.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleCancelEdit}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            {getPermissionLabel(p)}
            {staff.permissions.length > 1 && (
              <button
                onClick={() => handlePermissionDelete(staff.id, p)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ×
              </button>
            )}
            <button
              onClick={() => handleStartEdit(staff.id, p)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              ✎
            </button>
          </>
        )}
      </span>
    ))
  ) : (
    "Không có"
  )}
</td>


                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="cursor-pointer"
                  >
                                      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>

                  </button>
                </td>
              </tr>
            ))}
         
        </tbody>
      </table>

     {/* Pagination */}
     <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 cursor-pointer border border-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 cursor-pointer border border-gray-300 rounded ${
                currentPage === i + 1 ? 'bg-gray-200 text-black' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 cursor-pointer border border-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default StaffTable;
