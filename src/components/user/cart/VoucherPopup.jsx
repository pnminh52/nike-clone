import React, { useState } from "react";
import useVouchers from "../../../hooks/useVouchers";
import ProductSkeleton from "../etc/ProductSkeleton";

const VoucherPopup = ({ setShowPopup, userId, total, onApply }) => {
  const { user, loading, applyVoucher, vouchers, exchangeVoucher } = useVouchers(userId);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);

  const now = new Date();

  const handleClickVoucher = (voucher) => {
    if (total < voucher.minOrderValue) return;

    setSelectedVoucherId(voucher.id);
    const discount = applyVoucher(voucher, total);
    if (discount !== null) {
      onApply(discount, voucher);
      setShowPopup(false);
    }
  };

  const sortVouchers = (a, b) => {
    const isAExpiring = new Date(a.expiryDate) - now <= 3 * 86400000 && new Date(a.expiryDate) >= now;
    const isBExpiring = new Date(b.expiryDate) - now <= 3 * 86400000 && new Date(b.expiryDate) >= now;
    const canAApply = total >= a.minOrderValue;
    const canBApply = total >= b.minOrderValue;

    if (canAApply && isAExpiring && !(canBApply && isBExpiring)) return -1;
    if (canBApply && isBExpiring && !(canAApply && isAExpiring)) return 1;
    if (canAApply && !canBApply) return -1;
    if (canBApply && !canAApply) return 1;
    return 0;
  };

  const renderVoucher = (v, owned = true) => {
    const expiry = new Date(v.expiryDate);
    if (expiry < now) return null; // Ẩn voucher hết hạn

    const canApply = total >= v.minOrderValue;
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    return (
      <li
        key={`${owned ? "own" : "other"}-${v.id}`}
        onClick={() => owned && handleClickVoucher(v)}
        className={`p-2 border border-gray-300 rounded-lg flex gap-2 ${
          owned
            ? canApply
              ? `cursor-pointer ${selectedVoucherId === v.id ? "border-green-600 bg-green-50" : ""}`
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        <img src={v.image} className="w-20 h-20 rounded-lg object-cover" alt="" />
        <div>
          <p className="text-sm">{v.name}</p>
          <p className="text-sm">
            Discount {(v.value ?? 0).toLocaleString()}
            {v.discountType === "amount" ? <span className="underline">đ</span> : "%"}
          </p>
          <p className="text-sm">
            Applies to orders from {(v.minOrderValue ?? 0).toLocaleString()}
            <span className="underline">đ</span>
          </p>
          {!canApply && owned && <p className="text-sm text-red-400">Not eligible to apply</p>}
          {diffDays <= 3 && diffDays >= 0 && (
            <p className="text-sm text-red-600">This voucher is about to expire.</p>
          )}
          {!owned && (
            <>
              {user?.point >= v.pointToExchange ? (
                <button
                  className=" text-sm cursor-pointer  text-blue-600 underline rounded "
                  onClick={(e) => {
                    e.stopPropagation();
                    exchangeVoucher(v);
                  }}
                >
                  Redeem this coupon code
                </button>
              ) : (
                <p className="text-sm text-red-400 mt-1">{v.pointToExchange} points are required</p>
              )}
            </>
          )}
        </div>
      </li>
    );
  };

  const popupContent = (
    <div className="bg-white relative min-h-[90vh] w-full max-w-xl p-6 rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" />
          <path d="M7 7L16.8995 16.8995" stroke="#000" strokeLinecap="round" />
        </svg>
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ProductSkeleton />
        </div>
      ) : (
        <>
          <div className=" mt-12">
            <p className="text-blue-600 underline text-sm">You have: {user?.point} point</p>
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            <ul className="space-y-2 py-2">
              {[...user.vouchers].sort(sortVouchers).map((v) => renderVoucher(v))}
            </ul>
            <div className="space-y-2">
              {vouchers?.map((v) => {
                const owned = user.vouchers?.some((uv) => uv.id === v.id);
                if (!owned) return renderVoucher(v, false);
                return null;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const popupMobile = (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 sm:hidden">
      <div className="bg-white w-full h-full overflow-y-auto relative p-4">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" />
            <path d="M7 7L16.8995 16.8995" stroke="#000" strokeLinecap="round" />
          </svg>
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <ProductSkeleton />
          </div>
        ) : (
          <>
            <div className=" mt-12">
              <p className="text-blue-600 underline text-sm">You have: {user?.point} point</p>
            </div>
            <ul className="space-y-2 py-2">
              {[...user.vouchers].sort(sortVouchers).map((v) => renderVoucher(v))}
            </ul>
            <div className="space-y-2">
              {vouchers?.map((v) => {
                const owned = user.vouchers?.some((uv) => uv.id === v.id);
                if (!owned) return renderVoucher(v, false);
                return null;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:flex fixed inset-0 z-50 bg-black/40 justify-center items-center">
        {popupContent}
      </div>

      {/* Mobile */}
      {popupMobile}
    </>
  );
};

export default VoucherPopup;
