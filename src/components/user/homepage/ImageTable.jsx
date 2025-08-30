import React from 'react'

const ImageTable = () => {
  return (

     <div className='mx-auto max-w-screen-2xl px-6 sm:px-10'>
          <div className='hidden sm:block'>
            <div className='border-l border-r border-b rounded-b-3xl border-blue-600'>
              <img className='w-full h-auto object-cover' src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1247,c_limit/fe626a12-7dfb-4f60-a67d-2808ad1fe3e8/nike-just-do-it-nike-com-jp.jpg" alt="" />
            <div className="flex justify-center">
                <div className="text-center py-6 space-y-2 max-w-xl">
                  <h3 className="nike-title w-full text-center justify-center bg-gradient-to-r from-[#D397FA] to-black bg-clip-text text-transparent" data-qa="title">
                    Step Into{' '}
                    Your Next Adventure
                  </h3>
    
                  <p className="">
                    Discover the ultimate combination of style and performance with our new collection of running shoes.
                  </p>
                  <button className="px-5 py-2 mt-2 inter bg-gradient-to-r from-[#D397FA] to-black text-white rounded-full cursor-pointer">
                    Explore Now
                  </button>
                </div>
              </div>
    
            </div>
          </div>
          <div className='block sm:hidden'>
            <div className=''>
            <img className='w-full h-auto object-cover' src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_436,c_limit/c7a850e7-6d45-43f9-9a1c-858845391134/nike-just-do-it-nike-com-jp.jpg" alt="" />
            <div className="">
                       <div className=" py-6 space-y-2 max-w-xl">
                         <h3 className="nike-title-for-mobile w-full  bg-gradient-to-r from-[#D397FA] to-black bg-clip-text text-transparent" data-qa="title">
                           Step Into{' '}
                           Your Next Adventure
                         </h3>
           
           
                         <p className="">
                           Discover the ultimate combination of style and performance with our new collection of running shoes.
                         </p>
                         <button className="px-5 py-2 mt-2 inter bg-gradient-to-r from-[#D397FA] to-black text-white rounded-full cursor-pointer">
                           Explore Now
                         </button>
                       </div>
                     </div>
            </div>
          </div>
        </div>
   
  )
}

export default ImageTable
