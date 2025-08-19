import React, { useRef } from "react";
import useVouchers from "../../hooks/useVouchers";
import { useAuth } from "../../hooks/useAuth";
import ProductSkeleton from "../../components/user/etc/ProductSkeleton";
import VoucherCard from "../../components/user/voucher/VoucherCard";
import Slider6 from './../../components/user/homepage/Slider6';
import Slider3 from './../../components/user/homepage/Slider3';
const Vouchers = () => {
  const { user } = useAuth();
  const { vouchers, user: userData, loading, error, exchangeVoucher } =
    useVouchers(user?.id);

  const sliderRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDownRef.current = true;
    sliderRef.current.classList.add("cursor-grabbing");
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
    sliderRef.current?.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
    sliderRef.current?.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  if (loading) return <ProductSkeleton />;
  if (error) return <div>Lỗi: {error.message}</div>;

  return (
   <div>
     <div className="max-w-screen-2xl mx-auto px-10">
      <h2 className="text-2xl py-5">Vouchers / <span className="text-lg">You have {userData?.point} point!</span></h2>
     

      {/* Slider container */}
      <div
        ref={sliderRef}
        className="flex select-none overflow-x-auto hide-scrollbar space-x-4 pb-2 scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {[...vouchers]
          .sort((a, b) => {
            const aEnough = user?.point >= a.pointToExchange;
            const bEnough = user?.point >= b.pointToExchange;
            if (aEnough && !bEnough) return -1;
            if (!aEnough && bEnough) return 1;
            return 0;
          })
          .map((voucher) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              user={userData}
              exchangeVoucher={exchangeVoucher}
            />
          ))}
      </div>
     
    </div>
     <Slider3 />
   </div>
  );
};

export default Vouchers;
