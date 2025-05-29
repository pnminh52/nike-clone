import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/autoplay'; 
import { Autoplay } from 'swiper/modules';

const Header3 = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="text-center justify-center items-center py-3 cursor-pointer lg:flex gap-2">
        <Swiper
          loop={true} 
          spaceBetween={50} 
          slidesPerView={1}
          autoplay={{
            delay: 10000, 
            disableOnInteraction: false, 
          }}
          modules={[Autoplay]}
          className="w-full"
        >
          <SwiperSlide>
            <p className="text-sm">
              Free Standard Delivery & 30-Day Free Returns

            </p>
            <span className='text-sm inter underline'>Join Now View Details</span>
          </SwiperSlide>
          <SwiperSlide>
            <p className=" text-sm   ">
              New Styles On Sale: Up To 40% Off

            </p>
            <span className='text-sm inter underline'>  Shop All Our New Markdowns</span>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Header3;
