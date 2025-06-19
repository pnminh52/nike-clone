import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VoucherPopup from "./VoucherPopup";

const Summary = ({ user, formatPrice, total }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(total + user.shippingFeeByAddress);

  useEffect(() => {
    let base = total + user.shippingFeeByAddress;
    base = Math.max(0, base - discountAmount);
    setFinalPrice(base);
  }, [total, user.shippingFeeByAddress, discountAmount]);

  const handleApplyVoucher = (discount, voucher) => {
    setSelectedVoucher(voucher);
    setDiscountAmount(discount);
  };

  const renderSummary = () => (
    <>
      <p className="text-2xl py-5">Summary</p>
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <p>
            {formatPrice(total)}<span className="text-sm underline">đ</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping Fee</p>
          <p>
           <span> {formatPrice(user.shippingFeeByAddress)}</span>
            <span className="text-sm underline">đ</span>
          </p>
        </div>
        {selectedVoucher?.value && selectedVoucher?.discountType && (
          <div className="flex justify-between items-center text-green-600">
            <p>Discount {selectedVoucher.name ? `(${selectedVoucher.name})` : ""}</p>
            <p>
  {selectedVoucher.discountType === "amount" ? (
    <>
      -{formatPrice(discountAmount)}<span className="text-sm underline">đ</span>
    </>
  ) : (
    <>-{selectedVoucher.value}%</>
  )}
</p>

          </div>
        )}
      </div>
      <div className="flex justify-between items-center py-6 border-t border-b border-gray-300">
        <p className="inter text-lg">Total</p>
        <div className="flex gap-2 items-center">
          <p className="flex items-center gap-2">
            {selectedVoucher && finalPrice !== total + user.shippingFeeByAddress && (
              <span className="line-through text-gray-400 text-base">
                {formatPrice(total + user.shippingFeeByAddress)}<span className="underline ">đ</span>
              </span>
            )}
          </p>
          <p>  <span className="inter  text-black">{formatPrice(finalPrice)}</span><span className="text-sm underline">đ</span>
          </p>
        </div>

      </div>
      <div className="space-y-2 mt-8">
      <Link
  to="/checkout"
  state={{
    discountAmount,
    selectedVoucher,
    finalPrice
  }}
  className="block w-full inter text-lg rounded-full h-16 transition bg-black text-white hover:bg-gray-800 text-center leading-[4rem]"
>
  Member Checkout
</Link>

        <button
          onClick={() => setShowPopup(true)}
          className="block cursor-pointer w-full inter text-lg rounded-full h-16 transition bg-blue-600 text-white text-center leading-[4rem]"
        >
          Apply voucher
        </button>
        <Link
          to="/category/New%20%26%20Upcoming%20Drops"
          className="block w-full inter text-lg rounded-full h-16 transition bg-white text-black border border-gray-400 hover:border-black text-center leading-[4rem]"
        >
          Continue Shopping
        </Link>
      </div>
    </>
  );

  return (
    <div>
      <div className="hidden sm:block">{renderSummary()}</div>
      <div className="block sm:hidden">{renderSummary()}</div>

      {showPopup && (
        <VoucherPopup
          setShowPopup={setShowPopup}
          userId={user.id}
          total={total}
          onApply={handleApplyVoucher}
        />
      )}
    </div>
  );
};

export default Summary;
