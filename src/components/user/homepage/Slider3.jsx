import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Slider3 = () => {
    const images = [
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_596,c_limit/a3c971bc-bc0a-4c0c-8bdf-e807a3027e53/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_596,c_limit/e4695209-3f23-4a05-a9f9-d0edde31b653/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_596,c_limit/38ed4b8e-9cfc-4e66-9ddd-02a52314eed9/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_596,c_limit/e36a4a2b-4d3f-4d1c-bc75-d6057b7cec87/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_596,c_limit/7ce96f81-bf80-45b9-918e-f2534f14015d/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_596,c_limit/6be55ac6-0243-42d6-87d0-a650074c658c/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_596,c_limit/608705dc-dea5-4450-b68f-e624cf1ed2a7/nike-just-do-it.jpg",
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_596,c_limit/c779e4f6-7d91-46c3-9282-39155e0819e5/nike-just-do-it.jpg"
    ]
    const name = ["Running", "Football", "Basketball", "Training and Gym", "Tennis", "Yoga", "Skateboarding", "Dance"];
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperReady, setSwiperReady] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    useEffect(() => {
        setSwiperReady(true);
    }, []);
    return (
        <div className="max-w-screen-xl mx-auto px-10  ">
            <div className="flex justify-between items-center mb-4">
                <p className="text-2xl">Shop By Sport</p>
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
                                <div className=" ">
                                    <img
                                        src={image}
                                        alt={`slide-${index}`}
                                        className="w-full object-cover relative"
                                    />
                                    <button className="absolute hover:bg-[#CACACB] bottom-8 rounded-full inter left-8 px-5 py-2 bg-white text-black cursor-pointer ">{name[index]}</button>
                                </div>
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

export default Slider3
