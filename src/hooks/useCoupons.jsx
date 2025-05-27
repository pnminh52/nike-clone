import { useEffect, useState } from 'react';
import useToast from './useToast';

const useCoupons = (userId) => {
  const {successToast, errorToast, warningToast}=useToast()
  const [coupons, setCoupons] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "https://nikejsonserver-2.onrender.com";


  // Fetch coupons và user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [couponRes, userRes] = await Promise.all([
          fetch(`${API_URL}/coupons`),
           fetch(`${API_URL}/users/${userId}`),
        ]);

        if (!couponRes.ok || !userRes.ok) throw new Error('Fetch failed');

        const [couponData, userData] = await Promise.all([
          couponRes.json(),
          userRes.json(),
        ]);

        setCoupons(couponData);
        setUser(userData);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  // Logic đổi voucher
  const exchangeVoucher = async (voucher) => {
    if (!user || user.point < voucher.pointToExchange) {
        errorToast('Không đủ điểm để đổi voucher này.');
      return;
    }

    const updatedCoupons = [...user.coupons];
    const existingIndex = updatedCoupons.findIndex(c => c.id === voucher.id);

    if (existingIndex !== -1) {
      // Đã có, chỉ tăng stock
      updatedCoupons[existingIndex].stock += 1;
    } else {
      // Chưa có, set expiryDate = hôm nay + số ngày hết hạn
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + voucher.numberOfExpiryDate);

      updatedCoupons.push({
        ...voucher,
        stock: 1,
        expiryDate: expiryDate.toISOString().split('T')[0],
      });
    }

    const updatedUser = {
      ...user,
      point: user.point - voucher.pointToExchange,
      coupons: updatedCoupons,
    };

    try {
      const res = await  fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error('Cập nhật người dùng thất bại');

      setUser(updatedUser);
      successToast('Đổi voucher thành công!');
    } catch (error) {
        errorToast('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return {
    coupons,
    user,
    loading,
    error,
    exchangeVoucher,
  };
};

export default useCoupons;
