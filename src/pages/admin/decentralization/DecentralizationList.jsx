import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffTable from './../../../components/admin/staff/StaffTable';
import StaffFilters from '../../../components/admin/staff/StaffFilters.jsx';
import StaffAdd from './../../../components/admin/staff/StaffAdd';
const availablePermissions = [
  { label: 'Products', value: '/admin/dashboard/products/list' },
  { label: 'Vouchers ', value: '/admin/dashboard/vouchers/list' },
  // Thêm quyền khác nếu cần
];

const DecentralizationList = () => {
  const [staffUsers, setStaffUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    district: '',
    email: '',
    password: '111111Aa',
    country: '',
    role: 'Staff',
    accountStatus: 'Active',
    avatar: '',
    permissions: [], // Thêm trường permissions
  });
  const [loading, setLoading] = useState(false);
  const toggleAccountStatus = async (user) => {
    const updatedStatus = user.accountStatus === 'Active' ? 'Blocked' : 'Active';
  
    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        accountStatus: updatedStatus,
      });
  
      setStaffUsers(prev =>
        prev.map(u =>
          u.id === user.id ? { ...u, accountStatus: updatedStatus } : u
        )
      );
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái tài khoản:', err);
    }
  };
  // Xóa quyền của 1 staff
const handleDeletePermission = async (staffId, permission) => {
  const staff = staffUsers.find(s => s.id === staffId);
  if (!staff) return;

  const updatedPermissions = staff.permissions.filter(p => p !== permission);
  try {
    await axios.patch(`http://localhost:3000/users/${staffId}`, { permissions: updatedPermissions });
    setStaffUsers(prev =>
      prev.map(u => u.id === staffId ? { ...u, permissions: updatedPermissions } : u)
    );
  } catch (err) {
    console.error('Lỗi khi xóa quyền:', err);
  }
};

// Sửa quyền của 1 staff
const handleEditPermission = async (staffId, oldPermission, newPermission) => {
  const staff = staffUsers.find(s => s.id === staffId);
  if (!staff) return;

  const updatedPermissions = staff.permissions.map(p => p === oldPermission ? newPermission : p);
  try {
    await axios.patch(`http://localhost:3000/users/${staffId}`, { permissions: updatedPermissions });
    setStaffUsers(prev =>
      prev.map(u => u.id === staffId ? { ...u, permissions: updatedPermissions } : u)
    );
  } catch (err) {
    console.error('Lỗi khi sửa quyền:', err);
  }
};

  
  // Lấy danh sách Staff hiện có
  useEffect(() => {
    fetchStaffUsers();
  }, []);

  const fetchStaffUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users');
      const staff = res.data.filter(user => user.role === 'Staff');
      setStaffUsers(staff);
    } catch (error) {
      console.error('Lỗi khi fetch user:', error);
    }
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (e) => {
    const { checked, value } = e.target;
  
    setFormData(prev => {
      let updatedPermissions;
      if (checked) {
        // nếu đã có thì không thêm trùng
        updatedPermissions = [...new Set([...prev.permissions, value])];
      } else {
        updatedPermissions = prev.permissions.filter(p => p !== value);
      }
      return { ...prev, permissions: updatedPermissions };
    });
  };
  // Hàm xóa staff
const onDelete = async (id) => {
  const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3000/users/${id}`);
    // Cập nhật lại state sau khi xóa
    setStaffUsers((prev) => prev.filter((user) => user.id !== id));
  } catch (error) {
    console.error("Lỗi khi xóa Staff:", error);
  }
};


  // Gửi form thêm Staff mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newStaff = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone,
      address: formData.address,
      district: formData.district,
      email: formData.email,
      password: "111111Aa", // mật khẩu mặc định
      country: formData.country,
      role: 'Staff',
      accountStatus: 'Active',
      avatar: formData.avatar,
      permissions: formData.permissions, // Gửi permissions
    };

    try {
      await axios.post('http://localhost:3000/users', newStaff);
      // Load lại danh sách staff sau khi thêm
      fetchStaffUsers();

      // Reset form
      setFormData({
        firstname: '',
        lastname: '',
        phone: '',
        address: '',
        district: '',
        email: '',
        country: '',
        role: 'Staff',
        accountStatus: 'Active',
        avatar: '',
        permissions: [],
      });
    } catch (error) {
      console.error('Lỗi khi thêm Staff:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="nike-title-for-mobile">Manage staff list</h1>
      <p>You can view details and edit staff information.</p>
    <StaffFilters />
    <StaffTable
  staffUsers={staffUsers}
  onDelete={onDelete}
  onDeletePermission={handleDeletePermission}
  onEditPermission={handleEditPermission}
  availablePermissions={availablePermissions}
/>
     <StaffAdd handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} availablePermissions={availablePermissions} handlePermissionChange={handlePermissionChange} loading={loading}  />
    </div>
  );
};

export default DecentralizationList;
