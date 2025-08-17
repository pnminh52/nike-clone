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
    <div className="mt-4">
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Họ</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Quyền</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((staff) => (
              <tr key={staff.id} className="text-center">
                <td className="p-2 border">{staff.firstname}</td>
                <td className="p-2 border">{staff.lastname}</td>
                <td className="p-2 border">{staff.email}</td>
                <td className="p-2 border">{staff.accountStatus}</td>
                <td className="p-2 border flex flex-wrap gap-1 justify-center">
  {staff.permissions?.length > 0 ? (
    staff.permissions.map((p, idx) => (
      <span
        key={idx}
        className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
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

                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border text-center" colSpan="6">
                Không có nhân viên nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Trang {currentPage} / {totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StaffTable;
