import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch("http://localhost:3000/coupons");
        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu coupon");
        const data = await res.json();
        setCoupons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <p>Đang tải danh sách coupon...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;
  const handleRemoveCoupon = async (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa coupon này?");
    if (!confirm) return;
  
    try {
      const res = await fetch(`http://localhost:3000/coupons/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Xóa thất bại");
  
      // Xóa khỏi state sau khi xóa thành công trên server
      const newCouponList = coupons.filter((item) => item.id !== id);
      setCoupons(newCouponList);
    } catch (error) {
      alert("Đã xảy ra lỗi khi xóa coupon.");
      console.error(error);
    }
  };
  

  return (
   <div>
   <Link to={"/admin/coupons/add"}> <button>Add Coupon</button></Link>
     <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <div
          key={coupon.id}
          className="border rounded-xl shadow p-4 flex flex-col bg-white hover:shadow-lg transition"
        >
          <img
            src={coupon.image}
            alt={coupon.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">{coupon.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{coupon.description}</p>

          <div className="mt-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Loại giảm:</span>{" "}
              {coupon.discountType === "percent"
                ? `${coupon.value}%`
                : `${coupon.value.toLocaleString()}₫`}
            </p>
            <p>
              <span className="font-semibold">Áp dụng cho:</span>{" "}
              {coupon.applicableProductNames}
            </p>
            <p>
              <span className="font-semibold">Số lượng còn:</span> {coupon.stock}
            </p>
            <p>
              <span className="font-semibold">Điểm cần đổi:</span>{" "}
              {coupon.pointToExchange.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">HSD:</span>{" "}
              {coupon.numberOfExpiryDate} ngày kể từ ngày đổi
            </p>
            <p>
              <span className="font-semibold">Mã:</span> {coupon.code}
            </p>
            <Link to={`/admin/coupons/edit/${coupon.id}`}>
  <button>Edit Coupon</button>
</Link>
<button onClick={()=>handleRemoveCoupon(coupon.id)}>DELETE</button>

          </div>
        </div>
      ))}
    </div>
   </div>
  );
};

export default CouponList;
