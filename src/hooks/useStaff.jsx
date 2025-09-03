import { useState, useEffect } from "react";
import axios from "axios";

export const useStaff = () => {
  const [staffUsers, setStaffUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  // Lấy danh sách Staff hiện có
  const fetchStaffUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      const staff = res.data.filter((user) => user.role === "Staff");
      setStaffUsers(staff);
    } catch (error) {
      console.error("Lỗi khi fetch user:", error);
    }
  };

  useEffect(() => {
    fetchStaffUsers();
  }, []);

  // Toggle trạng thái
  const toggleAccountStatus = async (user) => {
    const updatedStatus =
      user.accountStatus === "Active" ? "Blocked" : "Active";

    try {
      await axios.patch(`${API_URL}/users/${user.id}`, {
        accountStatus: updatedStatus,
      });

      setStaffUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, accountStatus: updatedStatus } : u
        )
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái tài khoản:", err);
    }
  };

  // Xóa staff
  const onDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa nhân viên này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/users/${id}`);
      setStaffUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa Staff:", error);
    }
  };

  // Xóa quyền
  const handleDeletePermission = async (staffId, permission) => {
    const staff = staffUsers.find((s) => s.id === staffId);
    if (!staff) return;

    const updatedPermissions = staff.permissions.filter((p) => p !== permission);
    try {
      await axios.patch(`${API_URL}/users/${staffId}`, {
        permissions: updatedPermissions,
      });
      setStaffUsers((prev) =>
        prev.map((u) =>
          u.id === staffId ? { ...u, permissions: updatedPermissions } : u
        )
      );
    } catch (err) {
      console.error("Lỗi khi xóa quyền:", err);
    }
  };

 // Sửa / Thêm quyền
const handleEditPermission = async (staffId, oldPermission, newPermission) => {
  const staff = staffUsers.find((s) => s.id === staffId);
  if (!staff) return;

  let updatedPermissions = [];

  if (oldPermission) {
    // ---- Sửa quyền ----
    updatedPermissions = staff.permissions.map((p) =>
      p === oldPermission ? newPermission : p
    );
  } else {
    // ---- Thêm quyền mới ----
    if (staff.permissions.length >= 3) {
      alert("Một nhân viên chỉ có tối đa 3 quyền!");
      return;
    }
    if (staff.permissions.includes(newPermission)) {
      alert("Quyền này đã tồn tại!");
      return;
    }
    updatedPermissions = [...staff.permissions, newPermission];
  }

  try {
    await axios.patch(`${API_URL}/users/${staffId}`, {
      permissions: updatedPermissions,
    });
    setStaffUsers((prev) =>
      prev.map((u) =>
        u.id === staffId ? { ...u, permissions: updatedPermissions } : u
      )
    );
  } catch (err) {
    console.error("Lỗi khi cập nhật quyền:", err);
  }
};


  // Thêm Staff mới
  const addStaff = async (newStaff) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/users`, newStaff);
      fetchStaffUsers();
    } catch (error) {
      console.error("Lỗi khi thêm Staff:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    staffUsers,
    loading,
    fetchStaffUsers,
    toggleAccountStatus,
    onDelete,
    handleDeletePermission,
    handleEditPermission,
    addStaff,
  };
};
