import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";



const MightAlsoLike = ({currentProduct}) => {
   const { getAllProducts } = useProducts();
   const allProducts = getAllProducts();
   const navigate = useNavigate();
   const swiperRef = useRef(null);
   const [isBeginning, setIsBeginning] = useState(true);
   const [isEnd, setIsEnd] = useState(false);
   const formatPrice = (price) => {
     return Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   };
   const relatedProducts = allProducts
     .filter(
       (product) =>
         product.category === currentProduct.category &&
         product.name !== currentProduct.name 
     )
     .reduce((acc, product) => {
       const existingProductIndex = acc.findIndex(
         (item) => item.name === product.name
       );
       if (existingProductIndex === -1) {
         acc.push(product);
       } else {         
         if (product.isDefault) {
           acc[existingProductIndex] = product;
         }
       }
       return acc;
     }, []);
   const handleSlideChange = (swiper) => {
     setIsBeginning(swiper.isBeginning);
     setIsEnd(swiper.isEnd);
   };
   const handleProductSelect = (product, index) => {
     localStorage.setItem("scrollToTop", "true");
     navigate(`/details/${encodeURIComponent(product.name)}?id=${product.id}`, {
       state: { selectedProduct: product, selectedIndex: index },
     });
     window.scrollTo({ top: 0, behavior: "smooth" });
   }
   const [swiperReady, setSwiperReady] = useState(false);
 
   useEffect(() => {
     setSwiperReady(true);
   }, []);
  return (
 
     <div className="max-w-screen-2xl mx-auto  ">
     <div className="flex justify-between items-center mb-4 mt-4 px-6 sm:px-10">
     <p className="text-lg sm:text-2xl ">You might also like</p>
        <div className="hidden gap-2 items-center sm:flex">
           <button
            onClick={() => swiperRef.current.slidePrev()}
            disabled={isBeginning}
            className={`bg-[#E5E5E5] rounded-full px-3 py-3 shadow ${
              isBeginning ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <svg
              className="rotate-180"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M8.474 18.966L15.44 12 8.474 5.033"
              />
            </svg>
          </button>

          <button
            onClick={() => swiperRef.current.slideNext()}
            disabled={isEnd}
            className={`bg-[#E5E5E5] rounded-full px-3 py-3 shadow ${
              isEnd ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M8.474 18.966L15.44 12 8.474 5.033"
              />
            </svg>
          </button>
        </div>
            
            </div>
      
           <div className="px-0 sm:px-10">
           {swiperReady && (
                 <Swiper
                 spaceBetween={15}
                breakpoints={{
                  0: { slidesPerView: 1.2, spaceBetween: 10 },
                  480: { slidesPerView: 1.5, spaceBetween: 12 },
                  640: { slidesPerView: 2.2, spaceBetween: 14 },
                  768: { slidesPerView: 2.5, spaceBetween: 15 },
                  1024: { slidesPerView: 3.2, spaceBetween: 15 },
                }}
         slidesPerGroup={2}
         onSwiper={(swiper) => (swiperRef.current = swiper)}
         onSlideChange={handleSlideChange}
         modules={[Navigation]}
       >
         {relatedProducts.map((product, index) => (
           <SwiperSlide key={product.id}>
             <div
               onClick={() => handleProductSelect(product, index)}
               className="rounded-md  cursor-pointer"
             >
               <img
                 src={product.img}
                 alt={product.name}
                 className="w-full aspect-square rounded-none sm:rounded-md object-cover "
               />
              <div className="p-2 sm:p-0 lg:pt-2">
                 <h3 className="text-lg ">{product.name}</h3>
                               <p className="text-gray-500">{product.gender}'s {product.type}</p>
                               <p className=" text-lg inter">
                                 {formatPrice(product.price)}
                                 <span className="underline text-xs">đ</span>
                               </p>
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

export default MightAlsoLike;
