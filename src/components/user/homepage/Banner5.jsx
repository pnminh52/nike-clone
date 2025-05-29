import React from 'react'

const Banner5 = () => {
  return (
    <div className='mx-auto max-w-screen-2xl px-6  sm:px-10'>
      <div className='hidden sm:block'>
        <div className='border-l border-r border-b rounded-b-3xl border-blue-600'>
          <img src="https://static.nike.com.cn/a/images/f_auto/dpr_2.0,cs_srgb/w_928,c_limit/534e170d-3d0f-40bf-afd3-0042a2b3761c/hp.jpg" alt="" />
          <div className="flex justify-center">
            <div className="text-center py-6 space-y-2 max-w-xl">
              <h3 className="nike-title w-full bg-gradient-to-r from-[#940700] to-black bg-clip-text text-transparent" data-qa="title">
                Gear Up Now!
              </h3>
              <p className="inter">
                Discover durable, comfy, and stylish sportswear made just for your kids.
              </p>
              <button className="px-5 py-2 mt-2 inter bg-gradient-to-r from-[#940700] to-black text-white rounded-full cursor-pointer">
                Shop Kids' Sportswear
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className='block sm:hidden'>
        <div className='border-l border-r border-b rounded-b-3xl border-blue-600'>
        <img src="https://static.nike.com.cn/a/images/f_auto/dpr_2.0,cs_srgb/h_427,c_limit/c963e3fe-7952-4f6f-b06a-9d99ff326031/hp.jpg" alt="" />
          <div className="">
            <div className=" py-6 space-y-2 max-w-xl">
              <h3 className="nike-title-for-mobile w-full bg-gradient-to-r from-[#940700] to-black bg-clip-text text-transparent" data-qa="title">
                Gear Up Now!
              </h3>
              <p className="">
                Discover durable, comfy, and stylish sportswear made just for your kids.
              </p>
              <button className="px-5 py-2 mt-2 inter bg-gradient-to-r from-[#940700] to-black text-white rounded-full cursor-pointer">
                Shop Kids' Sportswear
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Banner5
