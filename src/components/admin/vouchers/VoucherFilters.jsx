import React from "react";

const VoucherFilters = ({
  discountType,
  setDiscountType,
  stockStatus,
  setStockStatus,
  expiry,
  setExpiry
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Discount Type */}
      <select
        value={discountType}
        onChange={(e) => setDiscountType(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg"
      >
        <option value="">All Discount Types</option>
        <option value="percent">Percent</option>
        <option value="amount">Fixed Amount</option>
      </select>

      {/* Stock Status */}
      <select
        value={stockStatus}
        onChange={(e) => setStockStatus(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg"
      >
        <option value="">All Stock Status</option>
        <option value="in">In Stock</option>
        <option value="out">Out of Stock</option>
      </select>

      {/* Expiry */}
      <select
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg"
      >
        <option value="">All Expiry</option>
        <option value="short">≤ 7 days</option>
        <option value="medium">8 - 30 days</option>
        <option value="long">≥ 30 days</option>
      </select>
    </div>
  );
};

export default VoucherFilters;
