import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBarProfile = () => {
  return (
    <div>
       <div className="flex gap-4 py-10  overflow-auto hide-scrollbar">
      <Link to={"/profile"}><p className="inter ">Profile</p></Link>
      <p className="inter text-gray-400">Inbox</p>
      <Link to={"/orders"}><p className="inter text-gray-400">Orders</p></Link>
      <Link to={"/wishlist"}><p className="inter text-gray-400">Favourites</p></Link>
      <Link to={"/setting"}><p className="inter text-gray-400">Settings</p></Link>
      </div>
    </div>
  )
}

export default NavigationBarProfile
