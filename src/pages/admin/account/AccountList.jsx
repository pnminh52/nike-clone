import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetailModal from '../../../components/admin/account/UserDetailModal';
import BlockReasonModal from '../../../components/admin/account/BlockUserModal';

const AccountList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToBlock, setUserToBlock] = useState(null);



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

  const toggleAccountStatus = async (user, reason = '') => {
    const updatedStatus = user.accountStatus === 'Blocked' ? 'Active' : 'Blocked';
  
    if (updatedStatus === 'Blocked' && !reason) {
      setUserToBlock(user); // Hiện modal nếu chưa có lý do
      return;
    }
  
    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        accountStatus: updatedStatus,
        blockReason: updatedStatus === 'Blocked' ? reason : '',
      });
  
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, accountStatus: updatedStatus, blockReason: reason }
            : u
        )
      );
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái tài khoản:', err);
    } finally {
      setUserToBlock(null);
    }
  };
  

  if (loading) return <p>Đang tải danh sách người dùng...</p>;

  const filteredUsers = users
    .filter(user => user.role !== 'Admin' && user.role !== 'Staff')
    .filter(user => {
      if (filterStatus === 'All') return true;
      return (user.accountStatus || 'Active') === filterStatus;
    });

  return (
    <div className="p-4">
     <div>
     <h2 className="text-2xl  nike-title-for-mobile">User account management</h2>
     <p>You can see the detailed list and account status of users here</p>
     </div>

      {/* Bộ lọc trạng thái */}
      <div className=" py-4">
        <label className=" font-medium"></label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-lg px-2  py-1 "
        >
          <option value="All">Status: All</option>
          <option value="Active">Status: Active</option>
          <option value="Blocked">Status: Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Username</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 text-center border">{index + 1}</td>
                <td className="p-3 text-center border">{user.email}</td>
                <td className="p-3 text-center border">{user.firstname} {user.lastname}</td>
                <td className="p-3 text-center border">{user.role}</td>
                <td className="p-3 text-center border">
                  <span className={` ${user.accountStatus === 'Blocked' ? 'text-red-600' : 'text-green-600'}`}>
                    {user.accountStatus || 'Active'}
                  </span>
                </td>
                <td className="p-3 border">
  <div className="flex justify-center items-center gap-3">
    <button
      onClick={() => setSelectedUser(user)}
      className="px-4 py-1 rounded-full bg-black text-white cursor-pointer"
    >
      View details
    </button>

    <button
      onClick={() => toggleAccountStatus(user)}
      className={` ${
        user.accountStatus === 'Blocked'
          ? 'px-4 py-1 cursor-pointer bg-white text-black rounded-full border  '
          : 'px-4 py-1 cursor-pointer bg-white text-red-600 rounded-full border border-red-600'
      }`}
    >
      {user.accountStatus === 'Blocked' ? 'Unlock' : 'Blocked'}
    </button>
  </div>
</td>

              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Không tìm thấy người dùng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUser && (
  <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
)}
{userToBlock && (
  <BlockReasonModal
    user={userToBlock}
    onConfirm={(reason) => toggleAccountStatus(userToBlock, reason)}
    onCancel={() => setUserToBlock(null)}
  />
)}

    </div>
  );
};

export default AccountList;
