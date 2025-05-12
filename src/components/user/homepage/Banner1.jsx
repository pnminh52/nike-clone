import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner1 = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);


  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev === 0 ? 1 : 0));
    setIsPlaying(true);
  };
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="relative">
      {isReady && (
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          speed={800}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.pagination.el = paginationRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          }}
          className="w-full"
        >
          <SwiperSlide>
            <div className="hidden sm:block">
              <video
                ref={videoRef1}
                src={currentVideo === 0 ? "/public/LukaVideo1.mp4" : "/public/LukaVideo2.mp4"}
                autoPlay
                muted
                onEnded={handleVideoEnd}
                key={currentVideo}
              ></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hidden sm:block">
              <video
                ref={videoRef2}
                src={currentVideo === 0 ? "/public/StyleByNike1.mp4" : "/public/StyleByNike2.mp4"}
                autoPlay
                muted
                onEnded={handleVideoEnd}
                key={currentVideo}
              ></video>
            </div>
          </SwiperSlide>
        </Swiper>
      )}

      <div className="absolute bottom-10 right-10 z-10 flex gap-2">
        <button
          ref={prevRef}
          className="cursor-pointer bg-[#E5E5E5] hover:bg-white flex rounded-full h-10 w-10 justify-center items-center text-center text-black shadow"
        >
          <svg
            className="rotate-180"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              d="M8.474 18.966L15.44 12 8.474 5.033"
            />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="cursor-pointer bg-[#E5E5E5] hover:bg-white flex rounded-full h-10 w-10 justify-center items-center text-center text-black shadow"
        >
          <svg viewBox="0 0 24 24" width="24px" height="24px" fill="none">
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              d="M8.474 18.966L15.44 12 8.474 5.033"
            />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default Banner1;
