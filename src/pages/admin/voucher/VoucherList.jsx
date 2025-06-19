import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VoucherList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:3000/vouchers";

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await  fetch(API_URL);
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
      const res = await fetch(`${API_URL}/coupons/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Xóa thất bại");

      // Xóa khỏi state sau khi xóa thành công trên server
      setCoupons(coupons.filter((item) => item.id !== id));
    } catch (error) {
      alert("Đã xảy ra lỗi khi xóa coupon.");
      console.error(error);
    }
  };

  return (
    <div className="py-4 px-4">
      <Link to={"/admin/vouchers/add"}>
        <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
          Add Coupon
        </button>
      </Link>

      <table className="w-full border border-gray-300-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Ảnh</th>
            <th className="border border-gray-300 p-2">Tên</th>
            <th className="border border-gray-300 p-2">Mô tả</th>
            <th className="border border-gray-300 p-2">Loại giảm</th>
            <th className="border border-gray-300 p-2">Số lượng còn</th>
            <th className="border border-gray-300 p-2">Điểm cần đổi</th>
            <th className="border border-gray-300 p-2">HSD</th>
          
            <th className="border border-gray-300 p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr
              key={coupon.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="border border-gray-300 p-2 text-center">
                <img
                  src={coupon.image}
                  alt={coupon.name}
                  className="w-24 h-16 object-cover mx-auto rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">{coupon.name}</td>
              <td className="border border-gray-300 p-2">{coupon.description}</td>
              <td className="border border-gray-300 p-2">
                {coupon.discountType === "percent"
                  ? `${coupon.value}%`
                  : `${coupon.value.toLocaleString()}₫`}
              </td>
              <td className="border border-gray-300 p-2 text-center">{coupon.stock}</td>
              <td className="border border-gray-300 p-2 text-right">
                {coupon.pointToExchange.toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {coupon.numberOfExpiryDate} ngày
              </td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <Link to={`/admin/coupons/edit/${coupon.id}`}>
                  <button className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleRemoveCoupon(coupon.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoucherList;
