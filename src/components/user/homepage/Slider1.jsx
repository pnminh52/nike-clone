import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Slider1 = () => {
  const combo = [
    {
      id: 1,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/1673823a-e689-4845-8ad7-23ec0996514e/image.jpg",
      name: "Air Max 90 LV8",
    },
    {
      id: 2,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/796c0846-2a7d-4e1b-9430-4fe6401cbe01/nike-just-do-it.jpg",
      name: "Air Max Plus",
    },
    {
      id: 3,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/4c99778b-acd3-4b36-8e24-81037a6349eb/nike-just-do-it.jpg",
      name: "Air Max 90",
    },
    {
      id: 4,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_627,c_limit/867f7843-87a2-47fd-99ad-c6aca2774445/nike-just-do-it.jpg",
      name: "Air Max Dn",
    },
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
    <div className="max-w-screen-xl mx-auto px-6 sm:px-6 md:px-10 lg:px-15">
      <div className="flex justify-between items-center mb-4 mt-4 ">
        <p className="text-lg sm:text-2xl">Find Your Max</p>
        <div className="hidden sm:block">
        <div className="flex gap-2 ">
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
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1.1, spaceBetween: 10 },
            480: { slidesPerView: 1.4, spaceBetween: 12 },
            640: { slidesPerView: 1.8, spaceBetween: 14 },
            768: { slidesPerView: 2.4, spaceBetween: 15 },
            1024: { slidesPerView: 3.2, spaceBetween: 15 },
          }}
          className="mySwiper"
        >
          {combo.map(({ id, img, name }) => (
            <SwiperSlide key={id} className="px-1">
              <div className="bg-white rounded-xl overflow-hidden ">
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
  );
};

export default Slider1;
