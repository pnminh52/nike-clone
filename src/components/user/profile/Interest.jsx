import React, { useState } from "react";
import AddInterestPopup from "./AddInterestPopup";
const tabs = ["All", "Sports", "Products", "Teams", "Athlete", "Cities"];
import { useAuth } from "../../../hooks/useAuth";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const Interest = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const handleClick = () => {
    setShowPopup(true);
  };

  const title = selected === "All" ? "Interest" : selected;

  return (
    <div className="block sm:hidden">
      <div className="flex justify-between items-center py-6">
        <p className="text-2xl">Interests</p>
        <p className="inter cursor-pointer">Edit</p>
      </div>

      <div className="flex overflow-auto hide-scrollbar border-b border-gray-400">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => setSelected(tab)}
            className={`inter  px-3 py-3 cursor-pointer ${
              selected === tab ? "border-b-2 border-black" : ""
            }`}
          >
            {tab}
          </p>
        ))}
      </div>

     

     
     <div className="py-8 mt-8 mb-8 border border-blue-600">
     <Swiper
  spaceBetween={16}
  slidesPerView={2}
  breakpoints={{
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }}
>
  <SwiperSlide>
    <div
      onClick={handleClick}
      className="aspect-square relative bg-[#F5F5F5] cursor-pointer flex items-center justify-center"
    >
      <div className="text-center">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          role="img"
          width="28px"
          height="28px"
          className="mx-auto"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M12 6v12m6-6H6m15.75 0c0 5.39-4.36 9.75-9.75 9.75S2.25 17.39 2.25 12 6.61 2.25 12 2.25s9.75 4.36 9.75 9.75z"
          ></path>
        </svg>
        <p className="mt-1 inter text-gray-700 whitespace-nowrap">
          Add {title}
        </p>
      </div>
    </div>
  </SwiperSlide>

  {user?.interest
    ?.filter((item) => selected === 'All' || item.category === selected)
    .map((item) => (
      <SwiperSlide key={item.id}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full cursor-pointer object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <p className="absolute bottom-4 left-4 text-white inter">
            {item.name}
          </p>
        </div>
      </SwiperSlide>
    ))}
</Swiper>
     </div>

    
     


      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white  rounded-lg w-full h-full">
            <AddInterestPopup
              title={title}
              onClose={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Interest;
