import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const CheckoutHeader = () => {
  const navigate=useNavigate()
  return (
    <div className='h-14 bg-white '>
      <div className='h-14 max-w-screen-2xl border-b border-white sm:border-gray-300 mx-auto px-6 sm:px-10 flex justify-between items-center bg-white'>
       <Link to={'/'}>
                     <svg
        viewBox="0 0 24 24"
        fill="none"
        width="80px"
        height="80px"
      >
        <path
          fill="currentColor"
          d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
          style={{ transform: "scale(1.2)", transformOrigin: "center" }}
        />
      </svg>
      </Link>
      <div className='flex gap-4 items-center'>
        {/* <p className='text-sm cursor-pointer'>Viettel 12032484 & VTI 12032487</p>
      
        <img src="https://gs-checkout.nike.com/assets/images/chat.svg?v=09855dbcae24915fd3b45c647fbd0d1c" alt="" /> */}
      <img className='cursor-pointer' onClick={()=>navigate("/cart")} src="https://gs-checkout.nike.com/assets/images/cart.svg?v=09855dbcae24915fd3b45c647fbd0d1c" alt="" />
      </div>
      </div>
    </div>
  )
}

export default CheckoutHeader
