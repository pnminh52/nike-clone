import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useFeatured from "../../../hooks/useFeatured";


const Slider1 = () => {
  const { featured } = useFeatured();
  const [combos, setCombos] = useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const onCombos = featured
      .filter((item) => item.status === "On")
      .flatMap((item) => item.combo); 

    setCombos(onCombos);
  }, [featured]);

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
            {combos.map((combo, index) => (
              <SwiperSlide key={combo.id || index}>
                <img
                  src={combo.img}
                  alt={combo.name}
                  className="w-full object-cover"
                />
                <p className="py-4 text-lg font-medium">{combo.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Slider1;
