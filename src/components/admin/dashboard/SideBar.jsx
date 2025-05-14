import React from 'react'
import { Link, useLocation  } from 'react-router-dom'
const SideBar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard/' },

    { name: 'Product', path: '/admin/dashboard/products/list' },
    { name: 'Voucher', path: '/admin/dashboard/coupons/list' },
    { name: 'Acoount', path: '/admin/dashboard/account/list' },
    { name: 'Comment', path: '#' },
    { name: 'Category', path: '#' },
    { name: 'Order', path: '#' },
  ];

  return (
    <div className='text-white  min-h-screen bg-white border-r border-gray-200'>
      <div className='text-black flex justify-center border-b  border-gray-200 h-[80px]'>
        <svg viewBox="0 0 24 24" fill="none" width="80px" height="80px">
          <path
            fill="currentColor"
            d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
            style={{ transform: "scale(1.2)", transformOrigin: "center" }}
          />
        </svg>
      </div>

      <ul className='space-y-2 px-4 py-2 '>
        <li className='text-gray-400 text-sm'>Main navigation</li>

        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={index}
              className={`px-4 py-2 rounded-lg border border-gray-200 ${
                isActive ? 'bg-blue-200' : ''
              } text-black`}
            >
              {item.path === '#' ? (
                item.name
              ) : (
                <Link to={item.path}>
                  <button>{item.name}</button>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default SideBar
