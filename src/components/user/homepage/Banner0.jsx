import React from 'react'

const Banner0 = () => {
    return (
        <div className='mx-auto max-w-screen-2xl px-10 '>
            <div className='border-l border-r border-b rounded-b-3xl border-white  hover:border-blue-600'>
            <img className='cursor-pointer' src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1513,c_limit/56fe1abe-b1e9-4936-b5de-f9906fb609c5/nike-just-do-it.jpg" alt="" />
            <div className="flex justify-center">
                <div className="text-center py-6 space-y-2 max-w-xl">
                <h3 className="nike-title w-full whitespace-nowrap" data-qa="title">
  Elevate Your Look
</h3>

                    <p className="inter">Be ready for anything with the season's newest styles.</p>


                    <button className="px-5 py-2 mt-2 inter bg-black text-white rounded-full cursor-pointer">
                        Shop Sandals
                    </button>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default Banner0
