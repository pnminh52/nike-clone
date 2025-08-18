import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVoucher = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    discountType: "percent",
    value: 0,
    stock: 1,
    code: "",
    numberOfExpiryDate: 30,
    minOrderValue: "",
    pointToExchange: 0,
    category: "general",
  });

  // Lấy dữ liệu voucher cần edit
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const res = await fetch(`http://localhost:3000/vouchers/${id}`);
        if (!res.ok) throw new Error("Failed to fetch voucher");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchVoucher();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === "number" ? (value === "" ? "" : Number(value)) : value,
        expiryDate:""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/vouchers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update voucher");
      navigate("/admin/dashboard/vouchers/list");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 h-full">
      <h1 className="nike-title-for-mobile">Edit Voucher</h1>
      <p>Here you can edit voucher details</p>

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
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
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
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
              )}
            </div>
          ))}

          {/* Discount Value */}
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
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="py-6">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-full cursor-pointer"
          >
            Update Voucher
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVoucher;
