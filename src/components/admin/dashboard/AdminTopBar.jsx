import React from 'react';
const AdminTopBar = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className='p-4 h-[80px] border-b border-gray-200'>
      <div className='flex items-center justify-between h-full'>
       
        <div className="h-full flex items-center gap-2">
          <button onClick={handleLogout}>Logout</button>
          {user?.role === 'Admin' && (
            <img
              src={user.avatar}
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};


export default AdminTopBar;
