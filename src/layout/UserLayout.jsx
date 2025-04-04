import React from 'react'
import Header1 from '../components/user/Header1'
import Header2 from './../components/user/Header2';
import Header3 from './../components/user/Header3';
import Homepage from '../pages/user/homepage';
const UserLayout = () => {
  return (
    <div>
      <Header1 />
      <div className="sticky top-0 z-999 ">
      <Header2 />
      </div>
      <Header3 />
      <Homepage />
    </div>
  )
}

export default UserLayout
