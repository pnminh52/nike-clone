import React, { useState } from "react";
import StaffTable from "./../../../components/admin/staff/StaffTable";
import StaffFilters from "../../../components/admin/staff/StaffFilters.jsx";
import { useStaff } from "../../../hooks/useStaff.jsx";

const availablePermissions = [
  { label: "Products", value: "/admin/dashboard/products/list" },
  { label: "Vouchers ", value: "/admin/dashboard/vouchers/list" },
  { label: "Orders", value: "/admin/dashboard/orders/list" },
  { label: "Users", value: "/admin/dashboard/users/list" },
  { label: "Staff", value: "/admin/dashboard/staff/list" },
  { label: "Categories", value: "/admin/dashboard/categories/list" },
];

const DecentralizationList = () => {
  const {
    staffUsers,
    loading,
    onDelete,
    handleDeletePermission,
    handleEditPermission,
  } = useStaff();

  const [filters, setFilters] = useState({
    search: "",
    accountStatus: "All",
    permission: "All",
  });

  const filteredStaff = staffUsers.filter((staff) => {
    const matchesSearch =
      filters.search === "" ||
      staff.firstname?.toLowerCase().includes(filters.search.toLowerCase()) ||
      staff.lastname?.toLowerCase().includes(filters.search.toLowerCase()) ||
      staff.email?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.accountStatus === "All" ||
      staff.accountStatus === filters.accountStatus;

    const matchesPermission =
      filters.permission === "All" ||
      staff.permissions?.includes(filters.permission);

    return matchesSearch && matchesStatus && matchesPermission;
  });

  return (
    <div className="p-4">
      <h1 className="nike-title-for-mobile">Manage staff list</h1>
      <p>You can view details and edit staff information.</p>

      <StaffFilters
        filters={filters}
        setFilters={setFilters}
        availablePermissions={availablePermissions}
      />

      {filteredStaff.length > 0 ? (
        <StaffTable
          staffUsers={filteredStaff}
          onDelete={onDelete}
          onDeletePermission={handleDeletePermission}
          onEditPermission={handleEditPermission}
          availablePermissions={availablePermissions}
        />
      ) : (
        <p className="text-gray-500 flex w-full justify-center text-sm italic mt-4">
          No staff found matching your filters.
        </p>
      )}
    </div>
  );
};

export default DecentralizationList;
