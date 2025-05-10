import React from 'react';

const ExchangeVoucher = ({ onBack }) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 underline hover:text-blue-800"
      >
        ← Quay lại
      </button>

      <h2 className="text-xl font-semibold">Đổi điểm lấy voucher</h2>
      <p className="text-gray-600">Chức năng đổi điểm sẽ được hiển thị ở đây.</p>

      {/* Bạn có thể thêm các voucher để đổi, ví dụ: */}
      {/* <ExchangeVoucherCard /> */}
    </div>
  );
};

export default ExchangeVoucher;
