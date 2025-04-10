import React, { useState, useRef } from "react";
import Slider1 from "../../components/user/Slider1";

const Homepage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="h-900">
      <div className="max-w-screen-2xl mx-auto px-15 justify-center items-center">
        <div className="block sm:hidden mt-2">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_586,c_limit/a4aef648-8791-47d0-a667-3e2fde99f3b6/nike-just-do-it.jpg"
            alt=""
          />
        </div>
        <div>
          <div className="hidden sm:block">
            <video
              ref={videoRef}
              src={currentVideo === 0 ? "/segment0.mp4" : "/segment1.mp4"}
              autoPlay
              muted
              onEnded={handleVideoEnd}
              key={currentVideo}
            ></video>
          </div>
          <div className="justify-center items-center lg:text-center sm:text-left mt-8 space-y-1">
            <p className="inter">Unreal Motion</p>
            <p className="title font-medium text-5xl uppercase cursor-pointer">
              air max dn8
            </p>

            <p className="inter font-bold">
              Discover the electrifying moves of footballer Nico Williams.
            </p>
            <button className="px-4 py-1.5 mt-1  bg-black font-semibold text-white rounded-full cursor-pointer">
              Shop
            </button>
          </div>
        </div>
      </div>
          <Slider1 />
    </div>
  );
};

export default Homepage;
