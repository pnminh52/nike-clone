import React, { useState } from "react";
import ProductSkeleton from "../etc/ProductSkeleton";
const VoucherCard = ({ coupon, isSelected, onSelect, selectedProduct, user, updateUser }) => {
    const isExpiringSoon = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 7 && diffDays >= 0;
      };
      const [loading, setLoading]=useState(true)
      const isApplicable = (() => {
        const applicableNames = coupon.applicableProductNames;
        const productName = selectedProduct?.name;
    
        return (
          !applicableNames || // Nếu không có field này thì áp dụng toàn bộ
          applicableNames === "All" ||
          (Array.isArray(applicableNames) && applicableNames.includes(productName)) ||
          applicableNames === productName
        );
      })();
  return (
    
    <div className="space-y-2">
      <div
        className={`  w-full  rounded-xl  flex gap-2 items-center border border-gray-300 text-sm 
         bg-white hover:bg-gray-50  transition-all duration-200
       `}
      >
       <div className="flex  cursor-pointer  px-2 gap-2 py-2 w-full">
       <img
          className="w-18 h-18 object-cover  rounded-md"
          src={coupon.image || "https://via.placeholder.com/40"}
          alt="coupon"
        />
        <div className="overflow-hidden">
          <p className="font-medium">{coupon.name}</p>
          <p className="text-xs text-gray-500  ">
            {coupon.description || "Không có mô tả"}
          </p>
          {isApplicable && coupon.applicableProductNames !== "All" && (
              <p className="text-xs text-green-500">
                Applied to the {selectedProduct?.name}
              </p>
            )}
          {coupon.expiryDate && isExpiringSoon(coupon.expiryDate) && (
  
  
  <p className="text-xs text-red-500">
   This voucher will expire on {new Date(coupon.expiryDate).toLocaleDateString("vi-VN")}
  </p>
)}

          

        </div>
       </div>
      <div className="relative">
      <button
  onClick={() => {
    if (!isSelected) onSelect(coupon);
  }}
  className={`w-25 h-23  inter border-dashed  border-l border-gray-300 transition-all duration-200 ${
    isSelected
      ? " text-green-600 cursor-pointer font-semibold "
      : "text-blue-600 cursor-pointer "
  }`}
>
{isSelected ? "Selected" : "Apply"}

</button>
<p className="absolute top-3 right-0 inter text-gray-400 text-xs bg-gray-200 px-1 py-0.5 flex text-center justify-center">x{coupon.stock}</p>
      </div>
      </div>
    </div>
  );
};

export default VoucherCard;
