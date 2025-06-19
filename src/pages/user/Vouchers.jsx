import React, { useRef } from 'react';
import useVouchers from '../../hooks/useVouchers';
import { useAuth } from '../../hooks/useAuth';

const Vouchers = () => {
  const { user } = useAuth();
  const { vouchers, user: userData, loading, error, exchangeVoucher } = useVouchers(user?.id);

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
      <h2 className="text-2xl py-5">Vouchers</h2>
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
        {[...vouchers]
          .sort((a, b) => {
            const aEnough = user?.point >= a.pointToExchange;
            const bEnough = user?.point >= b.pointToExchange;
            if (aEnough && !bEnough) return -1;
            if (!aEnough && bEnough) return 1;
            return 0;
          })
          .map((voucher) => {
            const hasEnoughPoint = user?.point >= voucher.pointToExchange;

            return (
              <div
                key={voucher.id}
                className={`min-w-[280px] max-w-[280px] h-[400px] flex-shrink-0 rounded-lg border border-gray-300 bg-white shadow-sm transition ${
                  hasEnoughPoint ? '' : 'opacity-50 pointer-events-none'
                }`}
              >
                <img
                  className="w-full rounded-t-lg h-[160px] object-cover"
                  src={voucher.image || 'https://via.placeholder.com/280x160'}
                  alt="voucher"
                />

                <div className="flex flex-col justify-between h-[calc(100%-160px)] p-2 gap-2">
                  <div className="overflow-hidden">
                    <p className="font-medium">
                      {voucher.name} - {voucher.pointToExchange} point
                    </p>
                    <p className="text-sm">
                      You have: {user?.vouchers?.find((v) => v.id === voucher.id)?.stock || 0}
                    </p>
                    <p className="text-sm">Value: {voucher.value}</p>
                    <p className="text-sm">Apply code: {voucher.code}</p>
                    {Array.isArray(voucher.applicableProductNames) &&
                      voucher.applicableProductNames.length > 0 &&
                      voucher.applicableProductNames[0] !== 'All' && (
                        <p className="text-xs text-red-500 truncate">
                          *Only applies to: {voucher.applicableProductNames.join(', ')}
                        </p>
                      )}
                    <p className="text-xs text-gray-500">
                      {voucher.description || 'Không có mô tả'}
                    </p>
                    <p className="text-red-500 text-sm">
                      Giảm: {voucher.value}
                      {voucher.discountType === 'amount' ? 'đ' : '%'}
                    </p>
                  </div>

                  {hasEnoughPoint ? (
                    <button
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                      onClick={() => exchangeVoucher(voucher)}
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

export default Vouchers;
