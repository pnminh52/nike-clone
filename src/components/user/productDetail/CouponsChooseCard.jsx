import React from 'react';
import VoucherCard from './VoucherCard';

const CouponsChooseCard = ({
  applicableCoupons,
  selectedProduct,
  selectedCoupon,
  setSelectedCoupon,
  onClose,
}) => {
  const [searchText, setSearchText] = React.useState('');
  
  const handleCancel = () => {
    setSelectedCoupon(null);
    onClose();
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7 && diffDays >= 0;
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    onClose();
  };

  // const bestCoupon = applicableCoupons.reduce((best, current) => {
  //   const getDiscount = (coupon) =>
  //     coupon.discountType === "percent"
  //       ? selectedProduct.price * coupon.value / 100
  //       : coupon.value;
  //   return getDiscount(current) > getDiscount(best) ? current : best;
  // }, applicableCoupons[0]);

  // Lọc các coupon theo tên
  const filteredCoupons = applicableCoupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="relative bg-white max-h-[90vh] w-full max-w-lg p-4 rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
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

        <div className="mt-12 flex justify-between items-center gap-2">
          <input
            className="bg-[#F3F4F6] outline-none focus:ring-2 font-semibold focus:ring-black transition duration-200 hover:bg-[#E5E5E5] text-inter w-full border-gray-500 rounded-lg px-2 h-10"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search for offer codes"
          />
        </div>

        <div className="py-2">All offers ({filteredCoupons.length})
        <p className="text-xs text-gray-500 ">
                  Please note: The voucher is non-refundable when you cancel the order
                  <span className="text-red-600">*</span>
                </p>
        </div>
   
        

        {/* {bestCoupon && (
          <div className="w-full rounded-xl flex gap-2 items-center border border-gray-300 text-sm bg-white hover:bg-gray-50 transition-all duration-200">
            <div className="flex cursor-pointer px-2 gap-2 py-2 w-full">
              <img
                className="w-18 h-18 object-cover rounded-md"
                src={bestCoupon.image || "https://via.placeholder.com/40"}
                alt="coupon"
              />
              <div className="overflow-hidden">
                <p className="font-medium">{bestCoupon.name}</p>
                <p className="text-xs text-gray-500">
                  {bestCoupon.description || "Không có mô tả"}
                </p>
                {bestCoupon.expiryDate && isExpiringSoon(bestCoupon.expiryDate) && (
                  <p className="text-xs text-red-500">
                    This voucher will expire on {new Date(bestCoupon.expiryDate).toLocaleDateString("vi-VN")}
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  if (selectedCoupon?.id !== bestCoupon.id) handleSelectCoupon(bestCoupon);
                }}
                className={`w-25 h-23 inter border-dashed border-l border-gray-300 transition-all duration-200 ${
                  selectedCoupon?.id === bestCoupon.id
                    ? "text-green-600 cursor-pointer font-semibold"
                    : "text-blue-600 cursor-pointer"
                }`}
              >
                {selectedCoupon?.id === bestCoupon.id ? "Selected" : "Apply"}
              </button>
              <p className="absolute top-3 right-0 inter text-gray-400 text-xs bg-gray-200 px-1 py-0.5">
                x{bestCoupon.stock}
              </p>
            </div>
          </div>
        )} */}

        
        <div className="space-y-2">
          {filteredCoupons.map((coupon) => (
            <VoucherCard
              key={coupon.id}
              coupon={coupon}
              isSelected={selectedCoupon?.id === coupon.id}
              onSelect={handleSelectCoupon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponsChooseCard;
