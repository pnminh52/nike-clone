import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VoucherCard from './VoucherCard';
import ProductSkeleton from '../etc/ProductSkeleton';
import ExchangeVoucher from './ExchangeVoucher';  // Import ExchangeVoucher

const VoucherChooseTab = ({
  selectedProduct,
  selectedCoupon,
  setSelectedCoupon,
  user,
  onClose,
  setUser
}) => {
  const [coupons, setCoupons] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [showExchangePage, setShowExchangePage] = useState(false);

  useEffect(() => {
    const fetchUserCoupons = async () => {
      try {
        // Lấy thông tin coupons của người dùng từ API
        const res = await axios.get(`http://localhost:3000/users/${user.id}`);
        setCoupons(res.data.coupons); // Lấy coupons của người dùng
      } catch (error) {
        console.error("Error fetching user coupons:", error);
      }
    };

    if (user && user.id) {
      fetchUserCoupons();
    }
  }, [user]);  // Khi user thay đổi thì gọi lại API

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchText.toLowerCase())
  );

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
          selectedProduct={selectedProduct}
            userId={user.id}  // Passing dynamic userId
            onBack={() => setShowExchangePage(false)}  // Set the state to go back
          />
        ) : (
          <>
            <div className="mt-12 flex justify-between items-center gap-2">
              <input
                className="bg-[#F3F4F6] outline-none focus:ring-2 font-semibold focus:ring-black transition duration-200 hover:bg-[#E5E5E5] text-inter w-full border-gray-500 rounded-lg px-2 h-10"
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search for offer codes"
              />
            </div>

            <div className="py-2">
              All offers ({filteredCoupons.length})
              <p className="text-xs text-red-600">
                Please note: The voucher is non-refundable when you cancel the order*
              </p>
            
                <p
                  className='text-blue-600 text-sm underline cursor-pointer'
                  onClick={() => setShowExchangePage(true)}  // Show exchange page
                >
                  Exchange discount code!
                </p>
        
            </div>

            <div className="space-y-2">
              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((coupon) => (
                  <VoucherCard
                    key={coupon.id}
                    coupon={coupon}
                    user={user}
                    setUser={setUser}
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
