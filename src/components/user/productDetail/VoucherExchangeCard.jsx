import React, { useState, useEffect } from 'react';

const VoucherExchangeCard = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hàm fetch dữ liệu từ API
    const fetchCoupons = async () => {
      try {
        const response = await fetch('http://localhost:3000/coupons'); // Thay bằng URL API đúng
        const data = await response.json();
        setCoupons(data); // Lưu trữ dữ liệu coupons vào state
      } catch (error) {
        console.error('Error fetching coupons:', error);
      } finally {
        setLoading(false); // Khi đã fetch xong, tắt loading
      }
    };

    fetchCoupons(); // Gọi hàm fetch ngay khi component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang load
  }

  return (
    <div className="space-y-2">
      {coupons.map((coupon) => (
        <div key={coupon.id} className="border p-4 rounded-xl shadow-sm flex items-center gap-4">
          <img
            src={coupon.image}
            alt={coupon.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-bold">{coupon.name}</h3>
            <p className="text-sm text-gray-600">{coupon.description}</p>
            <p className="text-sm text-gray-500">
              Points to exchange:{' '}
              <span className="font-semibold text-black">{coupon.pointToExchange}</span>
            </p>
            <p className="text-xs text-gray-400">Valid until: {coupon.expiryDate}</p>
          </div>
          <button className="bg-black text-white text-sm px-3 py-1 rounded-lg hover:bg-gray-800 transition">
            Exchange
          </button>
        </div>
      ))}
    </div>
  );
};

export default VoucherExchangeCard;
