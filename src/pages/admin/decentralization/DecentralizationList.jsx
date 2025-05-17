import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DecentralizationList = () => {
  const [staffUsers, setStaffUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users');
        const staff = res.data.filter(user => user.role === 'Staff');
        setStaffUsers(staff);
      } catch (error) {
        console.error('Lỗi khi fetch user:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách nhân viên (Staff)</h2>
      <ul className="space-y-3">
        {staffUsers.map(user => (
          <li key={user.id} className="p-4 bg-gray-100 rounded shadow">
            <p><strong>Tên:</strong> {user.firstname} {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Vai trò:</strong> {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DecentralizationList;
