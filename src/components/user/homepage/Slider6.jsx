import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Slider6 = () => {
    const combo = [
        {
            id: 1,
            img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_407,c_limit/1d076321-2b07-4dbb-ae09-7df5a4cd3f2e/nike-just-do-it-nike-com-jp.jpg",
            name: "Men's Best Selling Items",
        },
        {
            id: 2,
            img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_407,c_limit/f4d8ef79-843a-4546-b0b4-84de929492a4/nike-just-do-it-nike-com-jp.jpg",
            name: "Women's Best Selling Items",
        },
        {
            id: 3,
            img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_407,c_limit/ca659e80-ea2f-4225-a8e8-fa8db8f4c343/nike-just-do-it-nike-com-jp.jpg",
            name: "Kid's Best Selling Items",
        }
    ];

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperReady, setSwiperReady] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        setSwiperReady(true);
    }, []);

    return (
        <div className=" px-6 sm:px-6 md:px-10 lg:px-15">
            <div className="max-w-screen-xl mx-auto border border-blue-600 sm:border-white">
                <div className="flex justify-between items-center mb-4 mt-4">
                    <p className="text-lg sm:text-2xl">Popular and trending products</p>
                    <div className="hidden sm:flex gap-2">
                        <button
                            ref={prevRef}
                            className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer transition-opacity ${isBeginning ? "opacity-60 cursor-default" : ""
                                }`}
                            disabled={isBeginning}
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
                            disabled={isEnd}
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
                        breakpoints={{
                            0: { slidesPerView: 1.2, spaceBetween: 10 },
                            480: { slidesPerView: 1.5, spaceBetween: 12 },
                            640: { slidesPerView: 2.2, spaceBetween: 14 },
                            768: { slidesPerView: 2.5, spaceBetween: 15 },
                            1024: { slidesPerView: 3.2, spaceBetween: 15 },
                        }}
                        className="mySwiper"
                    >
                        {combo.map(({ id, img, name }) => (
                            <SwiperSlide key={id} className="px-1">
                                <div className="bg-white  overflow-hidden">
                                    <img
                                        src={img}
                                        alt={name}
                                        className="w-full h-auto object-cover"
                                    />
                                    <p className="py-2 px-2 text-base sm:text-lg font-medium">
                                        {name}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>

    );
};

export default Slider6;
