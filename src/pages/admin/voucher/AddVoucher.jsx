import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVoucher = () => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    discountType: "percent",
    value: 0,
    stock: 1,
    code: "",
    numberOfExpiryDate: 30,
    expiryDate: "",
    minOrderValue: "",
    pointToExchange: 0,
    category: "new-user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    setForm({
      ...form,
      [name]: type === "number"
        ? (value === "" ? "" : Number(value))
        : value
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
       expiryDate: ""
    
    };

    try {
      const res = await fetch("http://localhost:3000/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add coupon");
      navigate("/admin/dashboard/vouchers/list");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 h-full">
      <h1 className="nike-title-for-mobile">Add new Vouchers</h1>
      <p>Here you can manage all vouchers</p>

      <form onSubmit={handleSubmit} className="space-y-2 py-8">
      <div className="grid grid-cols-3 gap-2">
      {[
  ["name", "Coupon Name", "text"],
  ["image", "Image URL", "text"],
  ["description", "Description", "text"],
  ["code", "Discount Code", "text"],
  ["category", "Coupon Type (new-user, general...)", "text"],
  ["minOrderValue", "Minimum Order Value (VND)", "number"],
  ["discountType", "Discount Type", "select"],
  ["stock", "Stock Quantity", "number"],
  ["numberOfExpiryDate", "Expiry Days", "number"],
  ["pointToExchange", "Points to Exchange", "number"],
].map(([field, label, type]) => (
  <div key={field}>
    <label className="mb-1 text-sm font-medium">{label}</label>

    {type === "select" ? (
      <select
        name={field}
        value={form[field]}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      >
        <option value="percent">Percentage (%)</option>
        <option value="amount">Amount (VND)</option>
      </select>
    ) : (
      <input
        type={type}
        name={field}
        value={form[field]}
        onChange={handleChange}
        placeholder={label}
        required
        min={
          type === "date"
            ? new Date().toISOString().split("T")[0]
            : type === "number"
            ? 0
            : undefined
        }
        className="w-full border px-4 py-2 rounded-lg"
      />
    )}
  </div>
))}

{/* Discount Value chỉ hiển thị khi đã chọn type */}
{form.discountType && (
  <div>
    <label className="mb-1 text-sm font-medium">
      {form.discountType === "percent"
        ? "Discount Value (%)"
        : "Discount Value (đ)"}
    </label>
    <input
      type="number"
      name="value"
      placeholder="Enter discount value"
      value={form.value}
      onChange={handleChange}
      required
      min={form.discountType === "percent" ? 10 : 100000}
      max={form.discountType === "percent" ? 50 : undefined}
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>
)}


</div>


        <div className="py-6">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-full cursor-pointer "
          >
            Add Voucher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVoucher;
