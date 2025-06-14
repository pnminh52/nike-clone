import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MemberBenefit = () => {
  const combo = [
    {
      id: 1,
      img: "https://static.nike.com/a/images/w_1920,c_limit/wnvgdvk039burostgbdb/member-home-carousel.jpg",
      name: "Member-Only Products",
    },
    {
      id: 2,
      img: "https://static.nike.com/a/images/w_1920,c_limit/gkq1c6xpvais2s9cvre6/member-home-carousel.jpg",
      name: "Free Returns With Every Order",
    },
    {
      id: 3,
      img: "https://static.nike.com/a/images/w_1920,c_limit/dwchwjfhrmorbr1qapdx/member-home-carousel.jpg",
      name: "Exclusive Deals",
    },
    {
      id: 4,
      img: "https://static.nike.com/a/images/w_1920,c_limit/70c351cb-82c0-49f6-b5b9-6941ed9754bc/member-home-carousel.jpg",
      name: "Free Running and Training Apps",
    },
    {
      id: 5,
      img: "https://static.nike.com/a/images/w_1920,c_limit/mb8zpthvbkhnfympqhht/member-home-carousel.jpg",
      name: "Nike Events",
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
    <div >
     <div className="max-w-screen-xl mx-auto border border-blue-600 sm:border-white">
     <div className="flex justify-between items-center mb-4 mt-4">
     <p className="text-2xl ">Member Benefits</p>
              <div className="hidden sm:flex gap-2">
                <button
                  ref={prevRef}
                  className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer transition-opacity ${
                    isBeginning ? "opacity-60 cursor-default" : ""
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
                  className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer transition-opacity ${
                    isEnd ? "opacity-60 cursor-default" : ""
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

export default MemberBenefit;
