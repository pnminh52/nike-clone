import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SlideGerne = () => {
  const combo = [
    {
      id: 1,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_375,c_limit/c52dbab7-cde5-4417-8f57-40777bf0de76/nike-just-do-it.png",
    },
    {
      id: 2,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_375,c_limit/254849bd-b20b-46ea-87c0-2b785bb3e27c/nike-just-do-it.png",
    },
    {
      id: 3,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_360,c_limit/341f94f2-53c9-4195-ad45-62ea41cdad53/nike-just-do-it.png",
    },
    {
      id: 4,
      img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_360,c_limit/b16447ee-d083-434c-b012-ffa6f08ced7a/nike-just-do-it.png",
    },
    {
        id: 5,
        img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_360,c_limit/4b8054b2-b2f7-4c90-849f-83294a6f51d9/nike-just-do-it.png",
      },
      {
        id: 6,
        img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_360,c_limit/de86e5d8-b6ad-467a-8acc-566b7d4ffebf/nike-just-do-it.png",
      },
      {
        id: 7,
        img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_375,c_limit/bad15422-d2ad-4212-824d-2ad34b2ee26f/nike-just-do-it.png",
      },
      {
        id: 8,
        img: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_375,c_limit/ef047e79-2b3b-4e68-ae94-460e0455b736/nike-just-do-it.png",
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
   <div className=" px-6 sm:px-6 md:px-10 lg:px-15">
     <div className="max-w-screen-xl mx-auto border border-blue-600 sm:border-white">
      <div className="flex justify-between items-center mb-0 mt-4 ">
        <p className="text-lg sm:text-2xl">Find Your Gerne</p>
        <div className="hidden sm:block">
        <div className="flex gap-2 ">
          <button
            ref={prevRef}
            className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer transition-opacity `}
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
            className={`bg-[#E5E5E5] px-3 py-3 rounded-full cursor-pointer transition-opacity `}
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
 spaceBetween={10}
 loop={true} // bật loop vô hạn
 breakpoints={{
   0: { slidesPerView: 1.3, spaceBetween: 10 },    // điện thoại
   640: { slidesPerView: 2, spaceBetween: 12 },     // tablet nhỏ
   768: { slidesPerView: 3, spaceBetween: 15 },     // tablet lớn
   1024: { slidesPerView: 4, spaceBetween: 20 },    // màn hình lớn
 }}
 className="mySwiper"
>

    {combo.map(({ id, img, name }) => (
      <SwiperSlide key={id} className="px-1">
        <div className="bg-white overflow-hidden">
          <img src={img} alt={name} className="w-full  h-auto object-cover" />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)}

    </div>
   </div>
  );
};

export default SlideGerne;
