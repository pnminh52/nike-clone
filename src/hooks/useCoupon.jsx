import { useState } from "react";

const useCoupon = ({ user, cart, updateCoupons }) => {
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [error, setError] = useState("");
  
    const coupons = user?.coupons || [];
  
    const applyCoupon = (code) => {
      const coupon = coupons.find(c => c.name.toLowerCase() === code.toLowerCase());
  
      if (!coupon) {
        setError("Mã không tồn tại");
        setAppliedCoupon(null);
        return false;
      }
  
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      const hasEligibleProduct = cart.some(item =>
        coupon.applicableProductNames.includes(item.name)
      );
  
      const isUserEligible = (() => {
        if (coupon.category === "user-moi") return user.orders.length === 0;
        if (coupon.category === "trung-thanh") {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return user.orders.some(order => new Date(order.date) < thirtyDaysAgo);
        }
        return true;
      })();
  
      if (coupon.stock <= 0) {
        setError("Mã đã hết lượt sử dụng");
        return false;
      }
  
      if (!hasEligibleProduct) {
        setError("Không có sản phẩm nào trong giỏ phù hợp với mã này");
        return false;
      }
  
      if (total < coupon.priceRange.min || total > coupon.priceRange.max) {
        setError("Giá trị đơn hàng không phù hợp để áp mã");
        return false;
      }
  
      if (!isUserEligible) {
        setError("Bạn không đủ điều kiện để dùng mã này");
        return false;
      }
  
      // Giảm stock khi mã thành công
      const updatedCoupons = coupons.map(c => 
        c.id === coupon.id ? { ...c, stock: c.stock - 1 } : c
      );
  
      // Gọi hàm updateCoupons để lưu lại cập nhật
      updateCoupons(updatedCoupons);
  
      setAppliedCoupon(coupon);
      setError("");
      return true;
    };
  
    return {
      applyCoupon,
      appliedCoupon,
      error
    };
  };
  
  export default useCoupon;
  