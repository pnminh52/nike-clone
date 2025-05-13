import React from "react";

const renderSpecialProductMessage = (applicableProductNames, selectedProduct) => {
  if (Array.isArray(applicableProductNames)) {
    return applicableProductNames.map((productName) =>
      productName === selectedProduct?.name ? (
        <p className="text-xs text-[#CCD0D7]" key={productName}>
          Special applied to {productName}
        </p>
      ) : null
    );
  }
  return null;
};

const ExchangeVoucherCard = ({ voucher, onExchange, userPoint, selectedProduct }) => {
  const remainingPoint = userPoint - voucher.pointToExchange;

  return (
    <div>
      {remainingPoint >= 0 ? (
        <div>
          <div
            className={`w-full rounded-xl flex gap-2 items-center border border-gray-300 text-sm bg-white hover:bg-gray-50 transition-all duration-200`}
          >
            <div className="flex cursor-pointer px-2 gap-2 py-2 w-full">
              <img
                className="w-18 h-18 object-cover rounded-md"
                src={voucher.image || "https://via.placeholder.com/40"}
                alt="voucher"
              />
              <div className="overflow-hidden">
                <p className="font-medium">
                  {voucher.name} - {voucher.pointToExchange} point
                </p>
                <p className="text-xs text-gray-500">{voucher.description || "Không có mô tả"}</p>
                <p className="text-xs">Remaining point {remainingPoint}</p>
                {renderSpecialProductMessage(voucher.applicableProductNames, selectedProduct)}
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => onExchange(voucher)}
                className={`w-25 h-23 inter border-dashed border-l border-gray-300 transition-all duration-200 text-blue-600 cursor-pointer`}
              >
                Exchange
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`w-full rounded-xl flex gap-2 items-center border border-gray-300 text-sm bg-[#F2F3F5] transition-all duration-200`}
          >
            <div className="flex cursor-pointer px-2 gap-2 py-2 w-full">
              <img
                className="w-18 h-18 object-cover rounded-md"
                src={voucher.image || "https://via.placeholder.com/40"}
                alt="voucher"
              />
              <div className="overflow-hidden">
                <p className="font-medium text-[#CCD0D7]">
                  {voucher.name} - {voucher.pointToExchange} point
                </p>
                <p className="text-xs text-[#CCD0D7]">{voucher.description || "Không có mô tả"}</p>
                {renderSpecialProductMessage(voucher.applicableProductNames, selectedProduct)}
              </div>
            </div>
            <div className="relative">
              <button
                className={`w-25 h-23 inter border-dashed border-l border-gray-300 transition-all duration-200 text-[#CCD0D7] cursor-pointer`}
              >
                Exchange
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeVoucherCard;
