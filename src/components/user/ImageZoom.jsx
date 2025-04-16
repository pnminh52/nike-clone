import React, { useRef, useState } from "react";

const ImageZoom = ({ src, zoomSrc, alt }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, show: false });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setPosition({ ...position, show: false });
  };

  return (
    <div
      className="relative w-[485px] h-[650px] cursor-pointer overflow-hidden rounded-xl group"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none"
      />
      {position.show && (
        <div
          className="absolute w-[300px] h-[300px] border-2 border-red-600 shadow-xl rounded-md overflow-hidden z-50 opacity-100"
          style={{
            top: "0",
            left: "calc(100% + 20px)",
            backgroundImage: `url(${zoomSrc || src})`,
            backgroundSize: "200% 200%",
            backgroundPosition: `${position.x}% ${position.y}%`,
            pointerEvents: "none", // Đảm bảo không cản trở chuột
          }}
        />
      )}
    </div>
  );
};

export default ImageZoom;
