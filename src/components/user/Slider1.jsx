import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Slider1 = () => {
    const images = [
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/1673823a-e689-4845-8ad7-23ec0996514e/image.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/796c0846-2a7d-4e1b-9430-4fe6401cbe01/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/4c99778b-acd3-4b36-8e24-81037a6349eb/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/867f7843-87a2-47fd-99ad-c6aca2774445/nike-just-do-it.jpg",
    ];
    const name = ["Air Max 90 LV8", "Air Max Plus", "Air Max 90", "Air Max Dn"];

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperReady, setSwiperReady] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        setSwiperReady(true);
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto px-10 mt-20">
            <div className="flex justify-between items-center mb-4">
                <p className="text-2xl">Find Your Max</p>
                <div className="hidden sm:flex gap-2">
                    <button
                        ref={prevRef}
                        className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer transition-opacity ${isBeginning ? "opacity-60 cursor-default" : ""
                            }`}
                    >
                        <svg
                            className="rotate-180"
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="img"
                            width="24px"
                            height="24px"
                            fill="none"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="M8.474 18.966L15.44 12 8.474 5.033"
                            ></path>
                        </svg>
                    </button>

                    <button
                        ref={nextRef}
                        className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer transition-opacity ${isEnd ? "opacity-60 cursor-default" : ""
                            }`}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="img"
                            width="24px"
                            height="24px"
                            fill="none"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="M8.474 18.966L15.44 12 8.474 5.033"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="hidden sm:block">
                {swiperReady && (
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        spaceBetween={15}
                        slidesPerView={3.2}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3.2 },
                        }}
                        className="mySwiper"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={`slide-${index}`}
                                    className="w-full object-cover"
                                />
                                <p className="py-4 text-xl font-medium">{name[index]}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
            <div className="block sm:hidden overflow-x-auto">

            </div>

        </div>
    );
};

export default Slider1;
