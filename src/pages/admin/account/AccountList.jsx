import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Lỗi khi tải người dùng:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm cập nhật trạng thái tài khoản
  const toggleAccountStatus = async (user) => {
    const updatedStatus = user.accountStatus === 'Active' ? 'Blocked' : 'Active';

    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        accountStatus: updatedStatus,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, accountStatus: updatedStatus } : u
        )
      );
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái tài khoản:', err);
    }
  };

  if (loading) return <p>Đang tải danh sách người dùng...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý tài khoản</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users
        .filter((user)=>user.role!=="Admin"&&user.role!=="Staff")
        .map((user) => (
          <div key={user.id} className="border rounded p-4 bg-white shadow">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Họ tên:</strong> {user.firstname} {user.lastname}</p>
            <p><strong>Loại:</strong> {user.role}</p>
            <p>
              <strong>Trạng thái:</strong>{' '}
              <span
                className={`font-semibold ${
                  user.accountStatus === 'Blocked' ? 'text-red-500' : 'text-green-600'
                }`}
              >
                {user.accountStatus || 'Active'}
              </span>
            </p>
            <button
              onClick={() => toggleAccountStatus(user)}
              className={`mt-2 px-4 py-1 rounded text-white ${
                user.accountStatus === 'Blocked' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {user.accountStatus === 'Blocked' ? 'Mở khóa' : 'Khóa tài khoản'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountList;
