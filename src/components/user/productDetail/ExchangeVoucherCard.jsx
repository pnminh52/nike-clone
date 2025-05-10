import React from 'react';

const ExchangeVoucherCard = ({ voucher }) => {
  return (
    <div className="border rounded-xl p-4 flex gap-4 items-center shadow">
      <img src={voucher.image} alt={voucher.name} className="w-24 h-24 object-cover rounded" />
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold">{voucher.name}</h3>
        <p className="text-sm text-gray-600">{voucher.description}</p>
        <p className="text-sm text-gray-500">Điểm cần đổi: <strong>{voucher.pointToExchange}</strong></p>
        <p className="text-sm text-gray-500">Hết hạn: {voucher.expiryDate}</p>
      </div>
    </div>
  );
};

export default ExchangeVoucherCard;
