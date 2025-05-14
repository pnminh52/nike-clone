import React from 'react'
import SideBar from './../../components/admin/dashboard/SideBar';
import Content from './../../components/admin/dashboard/Content';
import AdminTopBar from '../../components/admin/dashboard/AdminTopBar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className='flex w-full'>
      <div className='w-1/5'><SideBar /></div>
      <div className='w-4/5 '>
      <div><AdminTopBar /></div>
      <div> <Outlet /></div>
     </div>
    </div>
  )
}

export default AdminDashboard
