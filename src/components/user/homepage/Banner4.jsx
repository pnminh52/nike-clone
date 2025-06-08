import { div } from 'framer-motion/client'
import React from 'react'

const Banner4 = () => {
  return (
    <div className='mx-auto max-w-screen-2xl px-6 sm:px-10'>
      <div className='hidden sm:block'>
        <div className='border-l border-r border-b rounded-b-3xl border-blue-600'>
          <img src="https://static.nike.com.cn/a/images/f_auto/dpr_2.0,cs_srgb/w_1824,c_limit/3f9cc177-f92d-48e8-b88b-6223439fa09c/hp.jpg" alt="" />
          <div className="flex justify-center">
            <div className="text-center py-6 space-y-2 max-w-xl">
              <h3 className="nike-title w-full text-center justify-center bg-gradient-to-r from-[#EEE80C] to-black bg-clip-text text-transparent" data-qa="title">
                Discover{' '}
                Air Pegasus Wave
              </h3>


              <p className="">
                Experience the perfect blend of heritage and innovation with the all-new Nike Air Pegasus Wave.
              </p>
              <button className="px-5 py-2 mt-2 inter bg-gradient-to-r from-[#EEE80C] to-black text-white rounded-full cursor-pointer">
                Shop Now
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className='block sm:hidden'>
        <div className=''>
          <img src="https://static.nike.com.cn/a/images/f_auto/dpr_2.0,cs_srgb/h_446,c_limit/ed20a6ca-dbc6-4c80-98ff-bc52f41fca13/hp.jpg" alt="" />
         <div className="">
                   <div className=" py-6 space-y-2 max-w-xl">
                     <h3 className="nike-title-for-mobile w-full  bg-gradient-to-r from-[#EEE80C] to-black bg-clip-text text-transparent" data-qa="title">
                       Discover{' '}
                       Air Pegasus Wave
                     </h3>
       
       
                     <p className="">
                       Experience the perfect blend of heritage and innovation with the all-new Nike Air Pegasus Wave.
                     </p>
                     <button className="px-5 py-2 mt-2 inter bg-gradient-to-r from-[#EEE80C] to-black text-white rounded-full cursor-pointer">
                       Shop Now
                     </button>
                   </div>
                 </div>
        </div>
      </div>
    </div>

  )
}

export default Banner4
