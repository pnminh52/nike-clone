import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MightAlsoLike = ({ currentProduct }) => {
  const { getAllProducts } = useProducts();
  const allProducts = getAllProducts();
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const formatPrice = (price) => {
    return Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const relatedProducts = allProducts.filter(
    (product) =>
      product.category === currentProduct.category &&
      product.id !== currentProduct.id // bỏ chính biến thể đang xem
  );
  


  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleProductSelect = (product, index) => {
    localStorage.setItem("scrollToTop", "true");
    navigate(`/details/${encodeURIComponent(product.name)}?id=${product.id}`, {
      state: { selectedProduct: product, selectedIndex: index },
    });
    // window.location.reload();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mt-8 mb-2">
        <p className="text-2xl">You might also like</p>
        <div className="flex gap-2 items-center">
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

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        modules={[Navigation]}
      >
      {relatedProducts.map((product, index) => (
  <SwiperSlide key={product.id}>
    <div
      onClick={() => handleProductSelect(product, index)}
      className="rounded-md block cursor-pointer"
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-[420px] h-[420px] rounded-md object-cover mb-2"
      />
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-gray-500">{product.gender}'s {product.type}</p>
      <p className="font-medium inter">
        {formatPrice(product.price)}
        <span className="underline text-xs">đ</span>
      </p>
      <p className="font-medium text-gray-500 line-through inter">
        {formatPrice(product.price_sale)}
        <span className="underline text-xs">đ</span>
      </p>
    </div>
  </SwiperSlide>
))}

      </Swiper>
    </div>
  );
};

export default MightAlsoLike;
