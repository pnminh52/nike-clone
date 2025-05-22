import React, { useState, useEffect } from 'react';
import axios from 'axios';

const availablePermissions = [
  { label: 'Quản lý sản phẩm', value: '/admin/dashboard/products/list' },
  { label: 'Quản lý coupon', value: '/admin/dashboard/coupons/list' },
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

  // Xử lý thay đổi permissions (checkbox)
  const handlePermissionChange = (e) => {
    const { checked, value } = e.target;
    setFormData(prev => {
      const newPerms = checked
        ? [...prev.permissions, value]
        : prev.permissions.filter(p => p !== value);
      return { ...prev, permissions: newPerms };
    });
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
      <h2 className="text-xl font-bold mb-4">Danh sách nhân viên (Staff)</h2>

      <ul className="space-y-3 mb-6">
  {staffUsers.map(user => (
    <li key={user.id} className="p-4 bg-gray-100 rounded shadow">
      <p><strong>Tên:</strong> {user.firstname} {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Vai trò:</strong> {user.role}</p>
      <p>
        <strong>Trạng thái:</strong>{' '}
        <span className={`font-semibold ${user.accountStatus === 'Blocked' ? 'text-red-500' : 'text-green-600'}`}>
          {user.accountStatus || 'Active'}
        </span>
      </p>
      <p>
        <strong>Quyền:</strong>{' '}
        {user.permissions && user.permissions.length > 0 ? (
          <ul className="list-disc list-inside ml-5">
            {user.permissions.map((perm, i) => <li key={i}>{perm}</li>)}
          </ul>
        ) : 'Chưa phân quyền'}
      </p>
      <button
        onClick={() => toggleAccountStatus(user)}
        className={`mt-2 px-4 py-1 rounded text-white ${
          user.accountStatus === 'Blocked'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {user.accountStatus === 'Blocked' ? 'Mở khóa' : 'Khóa tài khoản'}
      </button>
    </li>
  ))}
</ul>


      <h3 className="text-lg font-semibold mb-2">Thêm nhân viên mới</h3>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input
          type="text"
          name="firstname"
          placeholder="Họ"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Tên"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="district"
          placeholder="Quận/Huyện"
          value={formData.district}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Quốc gia"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="avatar"
          placeholder="URL Avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Phần chọn quyền */}
        <div>
          <label className="font-semibold mb-1 block">Chọn quyền truy cập:</label>
          {availablePermissions.map((perm) => (
            <label key={perm.value} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={perm.value}
                checked={formData.permissions.includes(perm.value)}
                onChange={handlePermissionChange}
                className="mr-1"
              />
              {perm.label}
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Đang thêm...' : 'Thêm nhân viên'}
        </button>
      </form>
    </div>
  );
};

export default DecentralizationList;
