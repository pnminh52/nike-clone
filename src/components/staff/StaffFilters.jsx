import React from 'react'
import {Link} from 'react-router-dom';

const StaffFilters = () => {
  return (
    <div>
        
        <input type="text" placeholder='search by name...' />
      <Link to={"/admin/dashboard/decentralization/add"}><button className='bg-black text-white rounded-full cursor-pointer px-4 py-2'>Add new Staff</button></Link>
    </div>
  )
}

export default StaffFilters
