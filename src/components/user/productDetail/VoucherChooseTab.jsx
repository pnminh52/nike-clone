import React, { useState, useEffect } from 'react';
import VoucherCard from './VoucherCard';
import ProductSkeleton from '../etc/ProductSkeleton';
import ExchangeVoucher from './ExchangeVoucher'; // Đảm bảo đúng đường dẫn

const VoucherChooseTab = ({
  applicableCoupons,
  selectedProduct,
  selectedCoupon,
  setSelectedCoupon,
  user,
  onClose,
}) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [showExchangePage, setShowExchangePage] = useState(false); // 👈 Thêm state điều khiển

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
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
  

  const filteredCoupons = applicableCoupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
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

        {showExchangePage ? (
         <ExchangeVoucher
         onBack={() => setShowExchangePage(false)}
         user={user}
         setSelectedCoupon={setSelectedCoupon} // Truyền lại để cập nhật coupon đã chọn
       />
       

        ) : (
          <>
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

            {/* Nội dung */}
            <div className="py-2">
              All offers ({filteredCoupons.length})
              <p className="text-xs text-red-600">
                Please note: The voucher is non-refundable when you cancel the order
                <span className="text-red-600">*</span>
              </p>
              <p className='text-sm'>
                Bạn hiện có {user.point} điểm.
                <span
                  className='text-blue-600 underline cursor-pointer ml-1'
                  onClick={() => setShowExchangePage(true)}
                >
                  Đổi voucher ngay!
                </span>
              </p>
            </div>

            {/* Coupon lựa chọn */}
            <div className="space-y-2">
              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((coupon) => (
                  <VoucherCard
                    key={coupon.id}
                    coupon={coupon}
                    user={user}
                    selectedProduct={selectedProduct}
                    isSelected={selectedCoupon?.id === coupon.id}
                    onSelect={handleSelectCoupon}
                  />
                ))
              ) : searchText.trim() !== '' ? (
                <p className="text-center text-black mt-2 mb-2">No matching vouchers found</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VoucherChooseTab;
