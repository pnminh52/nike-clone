import React from 'react'
import SideBar from './../../components/admin/dashboard/SideBar';
import AdminTopBar from '../../components/admin/dashboard/AdminTopBar';
import { Outlet } from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth"

const AdminDashboard = () => {
  const {user, logout }=useAuth()
  return (
    <div className='flex w-full'>
      <div className='w-1/5'><SideBar /></div>
      <div className='w-4/5 '>
      <div><AdminTopBar user={user} logout={logout}/></div>
      <div> <Outlet /></div>
     </div>
    </div>
  )
}

export default AdminDashboard
