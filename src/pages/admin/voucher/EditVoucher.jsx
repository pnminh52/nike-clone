import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVoucher = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupon = async () => {
      const res = await fetch(`http://localhost:3000/coupons/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchCoupon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "value" || name === "stock" || name === "pointToExchange" || name === "numberOfExpiryDate" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/coupons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      navigate("/admin/coupons/list");
    } catch (err) {
      alert(err.message);
    }
  };

  if (!form) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Cập nhật Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["name", "Tên coupon"],
          ["image", "URL hình ảnh"],
          ["description", "Mô tả"],
          ["applicableProductNames", "Áp dụng cho sản phẩm"],
          ["code", "Mã giảm giá"],
          ["category", "Loại coupon"],
        ].map(([field, label]) => (
          <div key={field}>
            <label className="block font-medium">{label}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium">Loại giảm giá</label>
          <select
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="percent">Phần trăm (%)</option>
            <option value="amount">Số tiền (VNĐ)</option>
          </select>
        </div>

        {[
          ["value", "Giá trị giảm"],
          ["stock", "Số lượng"],
          ["numberOfExpiryDate", "Số ngày hết hạn"],
          ["pointToExchange", "Điểm để đổi"],
        ].map(([field, label]) => (
          <div key={field}>
            <label className="block font-medium">{label}</label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cập nhật coupon
        </button>
      </form>
    </div>
  );
};

export default EditVoucher;
