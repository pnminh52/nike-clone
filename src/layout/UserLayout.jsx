import React from 'react'
import Header1 from '../components/user/Header1'
import Header2 from './../components/user/Header2';
import Header3 from './../components/user/Header3';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const UserLayout = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  return (
    <div>
      {!isAuthPage && (
        <>
          <Header1 />
          <Header2 />
          <Header3 />
        </>
      )}
      <Outlet />
    </div>
  )
}

export default UserLayout
