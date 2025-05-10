import React, { useEffect, useState } from 'react';
import ExchangeVoucherCard from './ExchangeVouchercard';

const ExchangeVoucher = ({ onBack, userId }) => {
  const [coupons, setCoupons] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch coupons
    fetch('http://localhost:3000/coupons')
      .then(res => res.json())
      .then(data => setCoupons(data))
      .catch(err => console.error('Failed to fetch coupons:', err));

    // Fetch user info using dynamic userId
    fetch(`http://localhost:3000/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Failed to fetch user:', err));
  }, [userId]);

  const handleExchange = async (voucher) => {
    if (!user || user.point < voucher.pointToExchange) {
      alert('Không đủ điểm để đổi voucher này.');
      return;
    }

    const updatedCoupons = [...user.coupons];
    const existingIndex = updatedCoupons.findIndex(c => c.id === voucher.id);

    if (existingIndex !== -1) {
      updatedCoupons[existingIndex].stock += 1;
    } else {
      updatedCoupons.push({ ...voucher, stock: 1 });
    }

    const updatedUser = {
      ...user,
      point: user.point - voucher.pointToExchange,
      coupons: updatedCoupons,
    };

    try {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      setUser(updatedUser);
      alert('Đổi voucher thành công!');
    } catch (error) {
      console.error('Đổi voucher thất bại:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 underline hover:text-blue-800"
      >
        ← Quay lại
      </button>
<p>Ban hien co: {user?.point}</p>
      <h2 className="text-xl font-semibold">Đổi điểm lấy voucher</h2>

      {coupons.length > 0 ? (
        <div className="space-y-3">
          {coupons.map(voucher => (
            <ExchangeVoucherCard
              key={voucher.id}
              voucher={voucher}
              onExchange={handleExchange}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Không có voucher nào để hiển thị.</p>
      )}
    </div>
  );
};

export default ExchangeVoucher;
