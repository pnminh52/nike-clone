import React from 'react'

const AdminTopBar = () => {
  return (
    <div className='p-4 h-[80px] border-b border-gray-200'>
      <div className='flex items-center justify-between h-full'>
        <input
          className='border border-gray-400 bg-gray-200 px-3 py-2 rounded h-full'
          type="text"
          placeholder='Search'
        />
        <div className="h-full flex items-center">
          admin avatar o day
        </div>
      </div>
    </div>
  )
}

export default AdminTopBar
