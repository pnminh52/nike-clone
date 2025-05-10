import React, { useEffect, useState } from 'react';
import ExchangeVoucherCard from './ExchangeVouchercard';

const ExchangeVoucher = ({ onBack }) => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/coupons')
      .then(res => res.json())
      .then(data => setCoupons(data))
      .catch(err => console.error('Failed to fetch coupons:', err));
  }, []);

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 underline hover:text-blue-800"
      >
        ← Quay lại
      </button>

      <h2 className="text-xl font-semibold">Đổi điểm lấy voucher</h2>

      {coupons.length > 0 ? (
        <div className="space-y-3">
          {coupons.map(voucher => (
            <ExchangeVoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Không có voucher nào để hiển thị.</p>
      )}
    </div>
  );
};

export default ExchangeVoucher;
