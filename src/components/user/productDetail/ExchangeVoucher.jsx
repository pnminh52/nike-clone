import React from 'react';
import ExchangeVoucherCard from './ExchangeVoucherCard';
import useCoupons from '../../../hooks/useCoupons';

const ExchangeVoucher = ({ onBack, userId, selectedProduct }) => {
  const {
    coupons,
    user,
    loading,
    error,
    exchangeVoucher,
  } = useCoupons(userId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Lỗi: {error.message}</p>;

  // Hàm kiểm tra xem voucher có áp dụng cho sản phẩm đã chọn không
  const isVoucherApplicable = (voucher) => {
    const applicable = voucher.applicableProductNames;
    if (applicable === "All") {
      return true;  // Voucher này áp dụng cho tất cả sản phẩm
    }
    if (Array.isArray(applicable)) {
      // Nếu là mảng, kiểm tra sản phẩm đã chọn có trong mảng không
      return applicable.includes(selectedProduct?.name);
    } 
    // Nếu là chuỗi, so sánh trực tiếp với tên sản phẩm đã chọn
    return applicable === selectedProduct?.name;
  };

  // Kiểm tra xem có bất kỳ voucher nào phù hợp không
  const applicableCoupons = coupons.filter(isVoucherApplicable);

  return (
    <div className="space-y-0">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 underline hover:text-blue-800"
      >
        ← Back
      </button>

      <div className='py-2'>
        <p>All offers ({coupons.length})</p>
        <p className='text-sm'>You currently have {user?.point} points</p>
        <p className="text-xs text-red-600">
          Please note: The voucher is non-refundable when you cancel the order*
        </p>
      </div>

      {applicableCoupons.length > 0 ? (
        <div className="space-y-3">
          {[...applicableCoupons]
            .sort((a, b) => {
              const canExchangeA = user?.point >= a.pointToExchange;
              const canExchangeB = user?.point >= b.pointToExchange;
              return (canExchangeB ? 1 : 0) - (canExchangeA ? 1 : 0);
            })
            .map(voucher => (
              <ExchangeVoucherCard
                key={voucher.id}
                selectedProduct={selectedProduct}
                voucher={voucher}
                userPoint={user?.point || 0}
                onExchange={() => exchangeVoucher(voucher)}
              />
            ))}
        </div>
      ) : (
        <p className="text-gray-600">Không có voucher nào để hiển thị.</p>
      )}
    </div>
  );
};

export default ExchangeVoucher;
