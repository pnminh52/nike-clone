import React, { useState, useEffect } from 'react';
import VoucherCard from './VoucherCard';
import ProductSkeleton from '../etc/ProductSkeleton';
import VoucherExchangeCard from './VoucherExchangeCard';

const CouponsChooseTab = ({
  applicableCoupons,
  selectedProduct,
  selectedCoupon,
  setSelectedCoupon,
  onClose,
}) => {
  const [searchText, setSearchText] = useState('');
  const [isExchangingVoucher, setIsExchangingVoucher] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTabChanging, setIsTabChanging] = useState(false); // State để theo dõi việc chuyển tab
  

  // Loading trong 2 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer); // Clear timeout nếu component bị unmount sớm
  }, []);

  const handleCancel = () => {
    setSelectedCoupon(null);
    onClose();
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    onClose();
  };

  const handleTabChange = (tabType) => {
    setIsTabChanging(true); // Bắt đầu quá trình chuyển tab
    setTimeout(() => {
      setIsExchangingVoucher(tabType === 'exchange');
      setIsTabChanging(false); // Kết thúc quá trình chuyển tab sau 1 giây
    }, 1500); // Delay 1 giây
  };

  if (loading || isTabChanging) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
        <div className="bg-white p-6 rounded-3xl max-w-lg w-full">
          <ProductSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="relative bg-white max-h-[90vh] w-full max-w-lg p-4 rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
        {/* Nút đóng */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleCancel}
            type="button"
            className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="mt-12 flex justify-between items-center gap-2">
          <input
            className="bg-[#F3F4F6] outline-none focus:ring-2 font-semibold focus:ring-black transition duration-200 hover:bg-[#E5E5E5] text-inter w-full border-gray-500 rounded-lg px-2 h-10"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search for offer codes"
          />
        </div>

        {/* Tab chọn/đổi */}
        <div className="flex items-center mt-4 h-10">
          <div
            className={`w-1/2 flex justify-center border-black border text-center ${
              !isExchangingVoucher ? 'bg-black hover:bg-gray-800 text-white' : ''
            } rounded-l-full items-center cursor-pointer h-full`}
            onClick={() => handleTabChange('select')} // Thay đổi tab chọn
          >
            Chọn mã giảm giá
          </div>
          <div
            className={`w-1/2 cursor-pointer flex justify-center rounded-r-full border-black border h-10 items-center text-center ${
              isExchangingVoucher ? 'bg-black hover:bg-gray-800 text-white' : ''
            }`}
            onClick={() => handleTabChange('exchange')} // Thay đổi tab đổi mã
          >
            Đổi mã giảm giá
          </div>
        </div>

        {!isExchangingVoucher && (
        <div className="py-2">
          All offers ({applicableCoupons.length}) {/* Hiển thị số lượng coupon đã lọc */}
          <p className="text-xs text-red-600">
            Please note: The voucher is non-refundable when you cancel the order
            <span className="text-red-600">*</span>
          </p>
        </div>
      )}

        {/* Nội dung */}
        {isExchangingVoucher ? (
          <div className="space-y-2">
            <VoucherExchangeCard />
          </div>
        ) : (
          <div className="space-y-2">
            {applicableCoupons.length > 0 ? (
              applicableCoupons.map((coupon) => (
                <VoucherCard
                  key={coupon.id}
                  coupon={coupon}
                  selectedProduct={selectedProduct}
                  isSelected={selectedCoupon?.id === coupon.id}
                  onSelect={handleSelectCoupon}
                />
              ))
            ) : searchText.trim() !== '' ? (
              <p className="text-center text-black mt-2 mb-2">No matching vouchers found</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsChooseTab;
