import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const NikeApps = () => {
  const combo = [
    {
      id: 1,
      img: "https://www.nike.com/assets/experience/membership/profile/assets/nrc.jpg",
      logo:"https://www.nike.com/assets/experience/membership/profile/assets/nrc.png",
      name: "Nike Run Club",
      title:"Run: Find the motivation you need to run better and more often."
    },
    {
      id: 2,
      img: "https://www.nike.com/assets/experience/membership/profile/assets/ntc.jpg",
      logo:"https://www.nike.com/assets/experience/membership/profile/assets/ntc.png",
      name: "Nike Training Club",
      title:"Train: Break a sweat to over 160 guided workouts."
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
     <p className="text-2xl ">Nike Apps</p>
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
                {combo.map(({ id, img, name, logo, title }) => (
                  <SwiperSlide key={id} className="px-1">
                    <div className="bg-white  overflow-hidden">
                      <img
                        src={img}
                        alt={name}
                        className="w-full h-auto object-cover"
                      />
                      <div className="pt-4 flex gap-2 items-center">
                        <img src={logo} className="w-14 h-14 cursor-pointer" alt="" />
                         <p className="  font-medium">
                                                {name}
                                              </p>
                      </div>
                      <p className="text-gray-400 inter py-4">
                        {title}
                      </p>
                    <div className="pb-4">
                    <button className="inter  border border-gray-400 hover:border-black rounded-full px-6 py-2">
                        Dowload
                      </button>
                    </div>
                     
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
    </div>
   
  );
};

export default NikeApps;
