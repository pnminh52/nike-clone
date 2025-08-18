import React from 'react';
const AdminTopBar = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className='p-4 h-[80px] border-b border-gray-300'>
      <div className='flex items-center justify-between h-full w-full'>
       
       
          
            <img
              src={user?.avatar}
              alt="Admin Avatar"
              className="w-10 h-10 cursor-pointer rounded-full  object-cover"
            />
                      <button onClick={handleLogout} className='px-4 py-2 bg-black text-white rounded-full cursor-pointer'>Logout</button>
            
        
       
      </div>
    </div>
  );
};


export default AdminTopBar;
