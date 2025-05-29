import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Slider4 = () => {
  const combo = [
    {
      id: 1,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_300,c_limit/e2644f62-7d8f-4ede-a7b7-c9a72b5fd63e/nike-just-do-it-nike-com-jp.jpg",
      name: "Air Max 90 LV8",
    },
    {
      id: 2,
      img: "https://static.nike.com/a/images/f_auto,cs_srgb/w_960,c_limit/3bfc6eab-0663-48cf-8882-eb94cf7b1867/nike-just-do-it-nike-com-jp.jpg",
      name: "Air Max Plus",
    },
    {
      id: 3,
      img: "https://static.nike.com/a/images/f_auto,cs_srgb/w_960,c_limit/6322dc5b-210d-4b35-802a-28ebdc36555d/nike-just-do-it-nike-com-jp.jpg",
      name: "Air Max 90",
    },
    {
      id: 4,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_300,c_limit/dbfe95b5-78bd-4aca-b617-f098cd1ef4e2/nike-just-do-it-nike-com-jp.jpg",
      name: "Air Max Dn",
    },
    {
        id: 5,
        img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_300,c_limit/e8a17273-8928-465c-a5c2-ad389f9fb073/nike-just-do-it-nike-com-jp.jpg",
        name: "Air Max Dn",
      },
      {
        id: 6,
        img: "https://static.nike.com/a/images/f_auto,cs_srgb/w_960,c_limit/9afd1d9d-4768-4408-89bb-08a06886e5ba/nike-just-do-it-nike-com-jp.jpg",
        name: "Air Max Dn",
      },
      {
        id: 6,
        img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_300,c_limit/b8f5fef5-374a-405a-9dfe-bf5b72e9f27f/nike-just-do-it-nike-com-jp.jpg",
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
    <div className="max-w-screen-xl mx-auto px-15  ">
      <div className="flex justify-between items-center mb-4 mt-4 ">
        <p className="text-2xl ">Find Your Max</p>
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
            {combo.map(({ id, img, name }) => (
              <SwiperSlide key={id}>
                <img src={img} alt={name} className="w-full object-cover " />
                <p className="py-4 text-lg font-medium ">{name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};
4
export default Slider4;
