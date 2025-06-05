import React from 'react';
import useCoupons from '../../hooks/useCoupons';
import { useAuth } from '../../hooks/useAuth';

const Coupons = () => {
  const { user } = useAuth();
  const { coupons, user: userData, loading, error, exchangeVoucher } = useCoupons(user?.id);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Tất cả voucher</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {coupons.map((coupon) => {
          const hasEnoughPoint = userData?.point >= coupon.pointToExchange;

          return (
            <div
              key={coupon.id}
              className={`p-4 rounded border shadow text-center transition ${
                hasEnoughPoint ? '' : 'opacity-50 pointer-events-none'
              }`}
            >
              <img src={coupon.image} alt={coupon.name} className="w-full h-32 object-contain mb-2" />
              <p className="font-bold">{coupon.name}</p>
              <p> stock:{coupon.stock}</p>
              <p>Value:{coupon.value}</p>
              <p>code:{coupon.code}</p>
              <p>point to exchange:{coupon.pointToExchange}</p>
              <p>apply to:{coupon.applicableProductNames}</p>
             
              <p className="text-sm">{coupon.description}</p>
              <p className="text-red-600 mt-1">
                Giảm: {coupon.value}{coupon.discountType === 'amount' ? 'đ' : '%'}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Đổi bằng: {coupon.pointToExchange} điểm
              </p>

              {hasEnoughPoint && (
                <button
                  className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded"
                  onClick={() => exchangeVoucher(coupon)}
                >
                  Đổi ngay
                </button>
              )}
              {!hasEnoughPoint && (
                <p className="text-xs text-gray-500 mt-2">Không đủ điểm</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Coupons;
