import React from 'react'
import Header1 from '../components/user/Header1'
import Header2 from './../components/user/Header2';
import Header3 from './../components/user/Header3';
import { Outlet } from 'react-router-dom';
const UserLayout = () => {
  return (
    <div>
      <Header1 />
      <div className=" ">
      <Header2 />
      </div>
      <Header3 />
      <Outlet />
    </div>
  )
}

export default UserLayout
