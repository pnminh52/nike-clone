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

  // Khi sửa quyền cũ
  const handleChangePermission = (e, staffId, oldPermission) => {
    const newPermission = e.target.value;
    if (!newPermission) return;

    // gọi callback update quyền
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
              <td className="border border-gray-300 p-2 text-center space-x-2">
                {staff.permissions?.length > 0 ? (
                  <>
                    {staff.permissions.map((p, idx) => (
  <span
    key={idx}
    className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white 
               px-3 py-1.5 text-sm shadow-sm transition"
  >
    {editing.staffId === staff.id && editing.permission === p ? (
      <>
        <select
          value={p}
          onChange={(e) => handleChangePermission(e, staff.id, p)}
          onBlur={handleCancelEdit}
          className="rounded-md border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {availablePermissions
            .filter(
              (ap) =>
                ap.value === p || !staff.permissions.includes(ap.value)
            )
            .map((ap) => (
              <option key={ap.value} value={ap.value}>
                {ap.label}
              </option>
            ))}
        </select>
        <button
          onClick={handleCancelEdit}
          className="ml-1 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </>
    ) : (
      <>
        <span className="whitespace-nowrap">{getPermissionLabel(p)}</span>

        <button
          onClick={() => handlePermissionDelete(staff.id, p)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* <button
          onClick={() => handleStartEdit(staff.id, p)}
          className="text-gray-500 hover:text-blue-500 transition"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L6.293 10.88l-.707 2.828 2.828-.707 8.293-8.293a2 2 0 000-2.828z" />
          </svg>
        </button> */}
      </>
    )}
  </span>
))}


                    {/* Nếu chưa đủ 3 quyền thì hiện nút thêm */}
                    {staff.permissions.length < 3 && (
                      <span className="inline-block rounded">
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            const newPermission = e.target.value;
                            if (newPermission) {
                              // gọi callback để thêm quyền mới
                              onEditPermission?.(staff.id, null, newPermission);
                              e.target.value = ""; // reset lại dropdown
                            }
                          }}
                          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        >
                          <option value="" disabled>
                            Add new permission
                          </option>
                          {availablePermissions
                            .filter((ap) => !staff.permissions.includes(ap.value))
                            .map((ap) => (
                              <option key={ap.value} value={ap.value}>
                                {ap.label}
                              </option>
                            ))}
                        </select>
                      </span>
                    )}

                  </>
                ) : (
                  <>
                    Không có{" "}
                    {/* Nếu chưa có quyền nào thì cho thêm mới ngay */}
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        if (e.target.value) {
                          onEditPermission?.(staff.id, null, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="ml-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    >
                      <option value="" disabled>
                        ➕ Add Permission
                      </option>
                      {availablePermissions.map((ap) => (
                        <option key={ap.value} value={ap.value}>
                          {ap.label}
                        </option>
                      ))}
                    </select>

                  </>
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
            className={`px-3 py-1 cursor-pointer border border-gray-300 rounded ${currentPage === i + 1 ? 'bg-gray-200 text-black' : ''
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
