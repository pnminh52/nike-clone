import React, { useState } from "react";
import StaffAdd from "./../../../components/admin/staff/StaffAdd";
import { useStaff } from "../../../hooks/useStaff.jsx";

const availablePermissions = [
  { label: "Products", value: "/admin/dashboard/products/list" },
  { label: "Vouchers ", value: "/admin/dashboard/vouchers/list" },
  { label: "Orders", value: "/admin/dashboard/orders/list" },
  { label: "Users", value: "/admin/dashboard/users/list" },
  { label: "Staff", value: "/admin/dashboard/staff/list" },
  { label: "Categories", value: "/admin/dashboard/categories/list" },
];

const DecentralizationAdd = () => {
  const { addStaff, loading } = useStaff();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    district: "",
    email: "",
    password: "111111Aa",
    country: "",
    role: "Staff",
    accountStatus: "Active",
    avatar: "",
    permissions: [],
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (e) => {
    const { checked, value } = e.target;
    setFormData((prev) => {
      let updatedPermissions;
      if (checked) {
        updatedPermissions = [...new Set([...prev.permissions, value])];
      } else {
        updatedPermissions = prev.permissions.filter((p) => p !== value);
      }
      return { ...prev, permissions: updatedPermissions };
    });
  };

  // Gửi form thêm Staff mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStaff = {
      ...formData,
      password: "111111Aa",
      role: "Staff",
      accountStatus: "Active",
    };
    await addStaff(newStaff);

    // Reset form
    setFormData({
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      district: "",
      email: "",
      country: "",
      role: "Staff",
      accountStatus: "Active",
      avatar: "",
      permissions: [],
    });
  };

  return (
    <div className="p-4 w-full">
      <h1 className="nike-title-for-mobile">Add new staff</h1>
        <p className="mb-4">You can add new staff and assign permissions here</p>
      <StaffAdd
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        availablePermissions={availablePermissions}
        handlePermissionChange={handlePermissionChange}
        loading={loading}
      />
    </div>
  );
};

export default DecentralizationAdd;
