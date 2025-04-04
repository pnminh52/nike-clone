import React, { useState } from 'react';

const Slider1 = () => {
    const images = [
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/1673823a-e689-4845-8ad7-23ec0996514e/image.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/796c0846-2a7d-4e1b-9430-4fe6401cbe01/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/4c99778b-acd3-4b36-8e24-81037a6349eb/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/867f7843-87a2-47fd-99ad-c6aca2774445/nike-just-do-it.jpg",
    ];
    const name = [
        'Air Max 90 LV8',
        'Air Max Plus',
        'Air Max 90',
        'Air Max Dn'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <div>
            <div className="max-w-screen-xl mx-auto px-10 mt-20">
                <div className="flex justify-between items-center mb-4">
                    <p className=" text-2xl">Find Your Max</p>
                    <div className='hidden sm:block'>
                        <div className="gap-2 flex items-center ">
                            <button
                                onClick={goToPrev}
                                className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer ${currentIndex === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                                disabled={currentIndex === 0}
                            >
                                <svg className="rotate-180" aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                    <path stroke="currentColor" strokeWidth="1.5" d="M8.474 18.966L15.44 12 8.474 5.033"></path>
                                </svg>
                            </button>
                            <button
                                onClick={goToNext}
                                className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer ${currentIndex === images.length - 1 ? 'opacity-60 cursor-not-allowed' : ''}`}
                                disabled={currentIndex === images.length - 1}
                            >
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                    <path stroke="currentColor" strokeWidth="1.5" d="M8.474 18.966L15.44 12 8.474 5.033"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-10 border border-red-500">
                <div className="relative overflow-hidden overflow-x-auto">
                    <div className="flex transition-transform duration-500 ease-in-out gap-4" style={{ transform: `translateX(-${currentIndex * 66.66}%)` }}>
                        {images.map((image, index) => (
                            <div key={index} className="flex-shrink-0 w-2/3 sm:w-2/3 lg:w-1/3">
                                <img
                                    src={image}
                                    alt={`slide-${index}`}
                                    className="w-full object-cover"
                                />
                                <p>{name[index]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider1;
