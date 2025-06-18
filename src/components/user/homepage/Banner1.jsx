import React from 'react'

const Banner1 = () => {
    const MobileBanner=[
        {
            id:1,
            img:"https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_586,c_limit/9bbc4c92-3135-4cdd-bfc0-c97acc67549b/nike-just-do-it.jpg",
        },
        {
            id:2,
            img:"https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_586,c_limit/9781d3c6-4072-4ac7-bb86-b6eaea52cc71/nike-just-do-it.jpg",
        },
        {
            id:3,
            img:"https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_518,c_limit/af4133a2-c198-4750-acf2-94b24fa9c22c/nike-just-do-it.jpg",
        },
        {
            id:4,
            img:"https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_518,c_limit/ec6cb339-edc8-43b4-a118-1d8b2598a048/nike-just-do-it.jpg",
        },

    ]
  return (
    <div>
        <div className='block sm:hidden'>
       <div className='py-8 space-y-2'>
       {
            MobileBanner.map((item)=>{
                return(
                    <div key={item.id} className="px-6 ">
                    <img src={item.img} className="w-full h-full object-cover" alt="" />
                   
                  
                  </div>
                  
                )
            })
        }
       </div>
      
    </div>
   
    </div>
  )
}

export default Banner1
