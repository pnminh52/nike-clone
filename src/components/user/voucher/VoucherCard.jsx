import React from "react";
import { Gift, Tag, Hash } from "lucide-react";
import ProductSkeleton from './../etc/ProductSkeleton';

const VoucherCard = ({ voucher, user, exchangeVoucher }) => {
  if (!voucher) {
    // Hiển thị loading skeleton
    return (
      <ProductSkeleton />
    );
  }

  const userVoucherStock =
    user?.vouchers?.find((v) => v.id === voucher.id)?.stock || 0;

    const hasVoucher = userVoucherStock > 0;
    const enoughPoint = (user?.point ?? 0) >= (voucher?.pointToExchange ?? Infinity);
    

  return (
    <div
  className={`min-w-[280px] max-w-[280px] h-[420px] flex-shrink-0 rounded-2xl border border-gray-300 bg-white  overflow-hidden ${
    hasVoucher || enoughPoint ? "" : "opacity-60"
  }`}
>

      <div className="relative">
        <img
          className="w-full h-[160px] object-cover rounded-t-2xl"
          src={voucher.image || "https://via.placeholder.com/280x160"}
          alt="voucher"
        />
        <span className="absolute top-2 left-2 bg-black text-white text-sm px-2 py-1 rounded-full ">
          {voucher.pointToExchange} points
        </span>
        {
            userVoucherStock >0 && (
        <div className="absolute top-2 right-2 ">
       
                <p className="text-xs bg-black w-6 h-6  text-white flex items-center justify-center rounded-full">
 {userVoucherStock}
</p>
           
        </div>
         )
        }
      </div>

      <div className="flex flex-col justify-between h-[calc(100%-160px)] p-4 gap-3">
        {/* Info */}
        <div className="space-y-1">
        
         <h3 className="text-lg inter ">{voucher.name}</h3>
        
       
          <p className="text-sm text-black flex items-center gap-0">
          Can be reduced by up to: {voucher.value}{voucher.discountType === "amount" ? "đ" : "%"}
           
          </p>
          <p className="text-sm text-gray-400  ">
            
           # {voucher.code} / Expire in {voucher.numberOfExpiryDate} days from the time of exchange.
          </p>

       

          <p className="text-sm text-gray-400 ">
            {voucher.description || "Không có mô tả"}
          </p>
        </div>

        {hasVoucher && enoughPoint ? (
  <button
  className="w-full text-sm py-2 rounded-full cursor-pointer bg-black hover:bg-gray-800 duration-300 text-white transition"
  onClick={() => exchangeVoucher(voucher)}
  >
    Exchange More
  </button>
) : !hasVoucher && enoughPoint ? (
  <button
    className="w-full text-sm py-2 cursor-pointer rounded-full bg-black hover:bg-gray-800 duration-300 text-white transition"
    onClick={() => exchangeVoucher(voucher)}
  >
    Exchange Now
  </button>
) : (
  <p className="text-sm text-center py-2  text-red-600 ">
    Insufficient points
  </p>
)}


      </div>
    </div>
  );
};

export default VoucherCard;
