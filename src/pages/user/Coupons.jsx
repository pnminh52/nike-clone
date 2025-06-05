import React, {useRef } from 'react';
import useCoupons from '../../hooks/useCoupons';
import { useAuth } from '../../hooks/useAuth';

const Coupons = () => {
    const { user } = useAuth();
    const { coupons, user: userData, loading, error, exchangecoupon } = useCoupons(user?.id);
  
    const sliderRef = useRef(null);
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
  
    const handleMouseDown = (e) => {
      if (!sliderRef.current) return;
      isDownRef.current = true;
      sliderRef.current.classList.add('cursor-grabbing');
      startXRef.current = e.pageX - sliderRef.current.offsetLeft;
      scrollLeftRef.current = sliderRef.current.scrollLeft;
    };
  
    const handleMouseLeave = () => {
      isDownRef.current = false;
      sliderRef.current?.classList.remove('cursor-grabbing');
    };
  
    const handleMouseUp = () => {
      isDownRef.current = false;
      sliderRef.current?.classList.remove('cursor-grabbing');
    };
  
    const handleMouseMove = (e) => {
      if (!isDownRef.current || !sliderRef.current) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error.message}</div>;
  
    return (
      <div className="max-w-screen-2xl mx-auto px-10">
        <h2 className="text-2xl py-5">Coupons</h2>
        <p className="text-blue-600 underline mb-4">
          You have {userData?.point} point! Exchange the discount code now!
        </p>
  
        {/* Slider container */}
        <div
          ref={sliderRef}
          className="flex select-none overflow-x-auto hide-scrollbar space-x-4 pb-2 scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {[...coupons]
            .sort((a, b) => {
              const aEnough = user?.point >= a.pointToExchange;
              const bEnough = user?.point >= b.pointToExchange;
              if (aEnough && !bEnough) return -1;
              if (!aEnough && bEnough) return 1;
              return 0;
            })
            .map((coupon) => {
              const hasEnoughPoint = user?.point >= coupon.pointToExchange;
  
              return (
                <div
                  key={coupon.id}
                  className={`min-w-[280px] max-w-[280px] h-[400px] flex-shrink-0 rounded-lg border border-gray-300 bg-white shadow-sm transition ${
                    hasEnoughPoint ? '' : 'opacity-50 pointer-events-none'
                  }`}
                >
                  <img
                    className="w-full rounded-t-lg h-[160px] object-cover"
                    src={coupon.image || 'https://via.placeholder.com/280x160'}
                    alt="coupon"
                  />
  
                  <div className="flex flex-col justify-between h-[calc(100%-160px)] p-2 gap-2">
                    <div className="overflow-hidden">
                      <p className="font-medium">
                        {coupon.name} - {coupon.pointToExchange} point
                      </p>
                      <p className="text-sm">
                        You have: {user?.coupons?.find((c) => c.id === coupon.id)?.stock || 0}
                      </p>
                      <p className="text-sm">Value: {coupon.value}</p>
                      <p className="text-sm">Apply code: {coupon.code}</p>
                      {Array.isArray(coupon.applicableProductNames) &&
                        coupon.applicableProductNames.length > 0 &&
                        coupon.applicableProductNames[0] !== 'All' && (
                          <p className="text-xs text-red-500 truncate">
                            *Only applies to: {coupon.applicableProductNames.join(', ')}
                          </p>
                        )}
                      <p className="text-xs text-gray-500">
                        {coupon.description || 'Không có mô tả'}
                      </p>
                      <p className="text-red-500 text-sm">
                        Giảm: {coupon.value}
                        {coupon.discountType === 'amount' ? 'đ' : '%'}
                      </p>
                    </div>
  
                    {hasEnoughPoint ? (
                      <button
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                        onClick={() => exchangecoupon(coupon)}
                      >
                        Đổi ngay
                      </button>
                    ) : (
                      <p className="text-xs text-center text-red-500">Không đủ điểm</p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };
  
  export default Coupons;  
