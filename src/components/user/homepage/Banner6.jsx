import React from 'react'

const Banner6 = () => {
  return (
    <div className='mx-auto max-w-screen-2xl px-6  sm:px-10'>
      <div className='hidden sm:block'>
        <div className='border-l border-r border-b rounded-b-3xl border-blue-600'>
          <img className='w-full h-full' src="https://static.nike.com.cn/a/images/f_auto/dpr_1.0,cs_srgb/w_1247,c_limit/635f8f87-3b9e-4488-b44e-bb83f64ef523/hp.jpg" alt="" />
          <div className="flex justify-center">
            <div className="text-center py-6 space-y-2 max-w-3xl">
              <h3 className="nike-title w-full bg-gradient-to-r from-[#EB6814] to-black bg-clip-text text-transparent" data-qa="title">
              Brand collaboration
             
              </h3>
              <p className="inter">
              Nike x LEGO® Collection
              </p>
              <button className="px-5 py-2 mt-2 inter bg-gradient-to-r from-[#EB6814] to-black text-white rounded-full cursor-pointer">
              Explore now
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className='block sm:hidden'>
        <div className=''>
        <img className='w-full h-full' src="https://static.nike.com.cn/a/images/f_auto/dpr_1.0,cs_srgb/h_416,c_limit/08252f6a-06f8-4f51-a743-f5eee40470c9/hp.png" alt="" />
          <div className="">
            <div className=" py-6 space-y-2 max-w-xl">
              <h3 className="nike-title-for-mobile w-full bg-gradient-to-r from-[#EB6814] to-black bg-clip-text text-transparent" data-qa="title">
              Brand collaboration
              </h3>
              <p className="">
              Nike x LEGO® Collection              </p>
              <button className="px-5 py-2 mt-2 inter bg-gradient-to-r from-[#EB6814] to-black text-white rounded-full cursor-pointer">
              Explore now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Banner6
