import React from 'react'

const StaffTable = ({staffUsers}) => {
  return (
    <div>
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
    </div>
  )
}

export default StaffTable
