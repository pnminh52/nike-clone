import React, { useState } from "react";
import useVouchers from "../../../hooks/useVouchers";
import ProductSkeleton from "../etc/ProductSkeleton";
const VoucherPopup = ({ setShowPopup, userId, total, onApply }) => {
  const { user, loading, applyVoucher } = useVouchers(userId);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  const handleApply = () => {
    const selected = user?.vouchers.find((v) => v.id === selectedVoucherId);
    if (!selected) return;

    const discount = applyVoucher(selected, total);
    if (discount !== null) {
      onApply(discount, selected);
      setShowPopup(false);
    }
  };

  return (
    <div>
      <div className="hidden sm:block">
      <div className="fixed   inset-0 z-50 bg-black/40 flex justify-center items-center">
     <div className="bg-white relative min-h-[90vh] w-full max-w-xl p-6 rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
     <div className="absolute top-4 right-4">
  <button
    onClick={closeWithAnimation}
    type="button"
    className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
  >
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
</div>

<div className="flex justify-center text-center mt-5">
  <p className="text-2xl font-semibold">Vouchers</p>
</div>

{loading ? (
  <div className="flex justify-center items-center h-full">
    <ProductSkeleton />
  </div>
) : user?.vouchers?.length > 0 ? (
  <ul className="space-y-4 px-4 py-2 overflow-y-auto max-h-[calc(90vh-120px)] hide-scrollbar">

    {[...user.vouchers]
      .sort((a, b) => {
        const now = new Date();
        const isAExpiring =
          new Date(a.expiryDate) - now <= 3 * 24 * 60 * 60 * 1000 &&
          new Date(a.expiryDate) - now >= 0;
        const isBExpiring =
          new Date(b.expiryDate) - now <= 3 * 24 * 60 * 60 * 1000 &&
          new Date(b.expiryDate) - now >= 0;
        const canAApply = total >= a.minOrderValue;
        const canBApply = total >= b.minOrderValue;

        if (canAApply && isAExpiring && !(canBApply && isBExpiring)) return -1;
        if (canBApply && isBExpiring && !(canAApply && isAExpiring)) return 1;
        if (canAApply && !canBApply) return -1;
        if (canBApply && !canAApply) return 1;
        return 0;
      })
      .map((v) => {
        const canApply = total >= v.minOrderValue;
        const expiry = new Date(v.expiryDate);
        const today = new Date();
        const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        return (
          <li
            key={v.id}
            onClick={() => {
              if (!canApply) return;
              setSelectedVoucherId(v.id);
              const selected = user?.vouchers.find((voucher) => voucher.id === v.id);
              if (!selected) return;
              const discount = applyVoucher(selected, total);
              if (discount !== null) {
                onApply(discount, selected);
                setShowPopup(false);
              }
            }}
            className={`p-2 border border-gray-300 rounded-lg flex gap-2 cursor-pointer
              ${!canApply ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
              ${
                selectedVoucherId === v.id && canApply
                  ? "border-green-600 bg-green-50"
                  : ""
              }
            `}
          >
            <img
              src={v.image}
              className="w-20 h-20 rounded-lg object-cover"
              alt=""
            />
            <div>
              <p className="text-sm">{v.name}</p>
              <p className="text-sm">
                Discount {(v.value ?? 0).toLocaleString()}
                {v.discountType === "amount" ? (
                  <span className="underline text-sm">đ</span>
                ) : (
                  "%"
                )}
              </p>
              <p className="text-sm">
                Applies to orders from {(v.minOrderValue ?? 0).toLocaleString()}
                <span className="underline text-sm">đ</span>
              </p>
              {!canApply && (
                <p className="text-sm text-red-400">Not eligible to apply</p>
              )}
              {diffDays <= 3 && diffDays >= 0 && (
                <p className="text-sm text-red-600">This voucher is about to expire.</p>
              )}
            </div>
          </li>
        );
      })}
  </ul>
) : (
<div className="min-h-[80vh] flex flex-col items-center justify-center text-center  text-black">
  <p className=" ">No vouchers available.</p>
  <p className=" text-blue-600 underline">Check back later for new promotions!</p>
</div>

)}

              </div>
              </div>
      </div>
      <div className="block sm:hidden">
        <div className=" fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
          <div
            className={`bg-white w-full h-full sm:h-auto sm:w-96  overflow-y-auto sm:overflow-visible  
  ${isClosing ? "voucher-exit" : "voucher-enter"}
`}
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={closeWithAnimation}
                type="button"
                className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L16.8995 7.10051"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7.00001L16.8995 16.8995"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-center text-center  mt-5">
              <div>
                <p className="inter text-xl "> Vouchers </p>
              </div>
            </div>

            {loading ? (
                 <div className="flex justify-center items-center h-screen">
             <ProductSkeleton />
             </div>
            ) : user?.vouchers?.length > 0 ? (
              <ul className="space-y-4 py-4  px-4 min-h-screen">
                {[...user.vouchers]
  .sort((a, b) => {
    const now = new Date();

    const isAExpiring =
      new Date(a.expiryDate) - now <= 3 * 24 * 60 * 60 * 1000 &&
      new Date(a.expiryDate) - now >= 0;
    const isBExpiring =
      new Date(b.expiryDate) - now <= 3 * 24 * 60 * 60 * 1000 &&
      new Date(b.expiryDate) - now >= 0;

    const canAApply = total >= a.minOrderValue;
    const canBApply = total >= b.minOrderValue;

    // Ưu tiên: dùng được + sắp hết hạn → dùng được → còn lại
    if (canAApply && isAExpiring && !(canBApply && isBExpiring)) return -1;
    if (canBApply && isBExpiring && !(canAApply && isAExpiring)) return 1;
    if (canAApply && !canBApply) return -1;
    if (canBApply && !canAApply) return 1;

    return 0;
  })
  .map((v) => {
    const canApply = total >= v.minOrderValue;
    const expiry = new Date(v.expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return (
      <li
        key={v.id}
        onClick={() => {
            if (!canApply) return;
            setSelectedVoucherId(v.id);
            const selected = user?.vouchers.find((voucher) => voucher.id === v.id);
            if (!selected) return;
          
            const discount = applyVoucher(selected, total);
            if (discount !== null) {
              onApply(discount, selected);
              setShowPopup(false);
            }
          }}
          
        className={`p-2 border border-gray-300 rounded-lg flex gap-2 cursor-pointer
          ${!canApply ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
          ${
            selectedVoucherId === v.id && canApply
              ? "border-green-600 bg-green-50"
              : ""
          }
        `}
      >
        <img
          src={v.image}
          className="w-20 h-20 rounded-lg object-cover"
          alt=""
        />
        <div>
          <p className="text-sm">{v.name}</p>
          <p className="text-sm">
            Discount {(v.value ?? 0).toLocaleString()}
            {v.discountType === "amount" ? (
              <span className="underline text-sm">đ</span>
            ) : (
              "%"
            )}
          </p>
          <p className="text-sm">
            Applies to orders from {(v.minOrderValue ?? 0).toLocaleString()}
            <span className="underline text-sm">đ</span>
          </p>
          {!canApply && (
            <p className="text-sm text-red-400">Not eligible to apply</p>
          )}
          {diffDays <= 3 && diffDays >= 0 && (
            <p className="text-sm text-red-600">This voucher is about to expire.</p>
          )}
        </div>
      </li>
    );
  })}

              </ul>
            ) : (
              <div className="min-h-[80vh] flex flex-col items-center justify-center text-center  text-black">
              <p className=" ">No vouchers available.</p>
              <p className=" text-blue-600 underline">Check back later for new promotions!</p>
            </div>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherPopup;
