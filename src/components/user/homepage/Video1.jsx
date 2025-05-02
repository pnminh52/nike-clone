import React, { useState, useRef } from "react";

const Video1 = () => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRef = useRef(null);
  
    const handleVideoEnd = () => {
      setCurrentVideo((prev) => (prev === 0 ? 1 : 0));
    };
  return (
    <div>
        <div className="hidden sm:block">
            <video
              ref={videoRef}
              src={currentVideo === 0 ? "/public/AirMaxDn8Video1.mp4" : "/public/AirMaxDn8Video2.mp4"}
              autoPlay
              muted
              onEnded={handleVideoEnd}
              key={currentVideo}
              className=""
            ></video>
          </div>
    </div>
  )
}

export default Video1
