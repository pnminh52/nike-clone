import { useEffect, useState } from 'react';
import useToast from './useToast';
import { useAuth } from './useAuth';

const useVouchers = (userId) => {
  const { successToast, errorToast, warningToast } = useToast();
  
  const [vouchers, setVouchers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [voucherRes, userRes] = await Promise.all([
          fetch(`${API_URL}/vouchers`),
          fetch(`${API_URL}/users/${userId}`),
        ]);
  
        if (!voucherRes.ok || !userRes.ok) throw new Error('Fetch failed');
  
        const [voucherData, userData] = await Promise.all([
          voucherRes.json(),
          userRes.json(),
        ]);
  
        // ✅ Lọc bỏ voucher hết hạn
        const today = new Date().toISOString().split("T")[0];
        const validVouchers = (userData.vouchers || []).filter(
          (v) => !v.expiryDate || v.expiryDate >= today
        );
  
        // Nếu có sự khác biệt thì cập nhật lại db
        if (validVouchers.length !== (userData.vouchers || []).length) {
          const updatedUser = { ...userData, vouchers: validVouchers };
          await fetch(`${API_URL}/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
          });
          setUser(updatedUser);
        } else {
          setUser(userData);
        }
  
        setVouchers(voucherData);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) fetchData();
  }, [userId]);
  

  const applyVoucher = (voucher, total) => {
    const today = new Date().toISOString().split('T')[0];

    if (voucher.expiryDate < today) {
      warningToast("Voucher đã hết hạn.");
      return null;
    }

    const minOrderValue = voucher.minOrderValue ?? 0;

    if (total < minOrderValue) {
      warningToast(`Order has not reached minimum value!`);
      return null;
    }

    let discount = 0;

    if (voucher.discountType === 'percent') {
      discount = (voucher.value / 100) * total;
    } else {
      discount = voucher.value;
    }

    successToast("Voucher applied successfully!");
    return discount;
  };

  const exchangeVoucher = async (voucher) => {
    if (!user || user.point < voucher.pointToExchange) {
      errorToast('Not enough points to redeem this voucher!');
      return;
    }
  
    const updatedVouchers = [...(user.vouchers || [])];
    const existingIndex = updatedVouchers.findIndex(v => v.id === voucher.id);
  
    if (existingIndex !== -1) {
      updatedVouchers[existingIndex].stock += 1;
    } else {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + (voucher.numberOfExpiryDate ?? 30));
  
      updatedVouchers.push({
        ...voucher,
        stock: 1,
        expiryDate: expiryDate.toISOString().split('T')[0],
        applyTo: voucher.applyTo || 'order',
        minOrderValue: voucher.minOrderValue ?? 0,
        value: voucher.value ?? 0,
        discountType: voucher.discountType ?? 'amount',
      });
    }
  
    const updatedUser = {
      ...user,
      point: user.point - voucher.pointToExchange,
      vouchers: updatedVouchers,
    };
  
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
  
      if (!res.ok) throw new Error('Cập nhật người dùng thất bại');
  
      // ✅ Cập nhật state user ngay lập tức
      setUser({ ...updatedUser });
  
      // ✅ Đồng thời cập nhật vouchers trong hook nếu muốn
      setVouchers((prev) => prev.map(v => v.id === voucher.id ? { ...v } : v));
  
      successToast('Voucher redeemed successfully!');
    } catch (error) {
      errorToast('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };
  
  

  return {
    vouchers,
    user,
    loading,
    error,
    exchangeVoucher,
    applyVoucher,
  };
};

export default useVouchers;
