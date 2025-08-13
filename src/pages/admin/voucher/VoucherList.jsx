import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductSkeleton from './../../../components/user/etc/ProductSkeleton';
import VoucherTable from "../../../components/admin/vouchers/VoucherTable";
import VoucherFilters from "../../../components/admin/vouchers/VoucherFilters";

const VoucherList = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [discountType, setDiscountType] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [expiry, setExpiry] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 

  const API_URL = "http://localhost:3000/vouchers";

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu coupon");
        const data = await res.json();
        setCoupons(data);
        setFilteredCoupons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  useEffect(() => {
    let result = [...coupons];

    // Lọc theo loại giảm giá
    if (discountType) {
      result = result.filter((c) => c.discountType === discountType);
    }

    // Lọc theo trạng thái kho
    if (stockStatus) {
      if (stockStatus === "in") result = result.filter((c) => c.stock > 0);
      else if (stockStatus === "out") result = result.filter((c) => c.stock <= 0);
    }

    // Lọc theo hạn sử dụng
    if (expiry) {
      if (expiry === "short") result = result.filter((c) => c.numberOfExpiryDate <= 7);
      else if (expiry === "medium") result = result.filter((c) => c.numberOfExpiryDate > 7 && c.numberOfExpiryDate <= 30);
      else if (expiry === "long") result = result.filter((c) => c.numberOfExpiryDate > 30);
    }

    // Lọc theo từ khóa tìm kiếm (không cần Enter)
    if (searchTerm.trim()) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCoupons(result);
  }, [discountType, stockStatus, expiry, searchTerm, coupons]);

  if (loading) return <p><ProductSkeleton /></p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  const handleRemoveCoupon = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa coupon này?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      setCoupons(coupons.filter((item) => item.id !== id));
    } catch (error) {
      alert("Đã xảy ra lỗi khi xóa coupon.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 h-full">
      <h1 className="nike-title-for-mobile">Manage Vouchers</h1>
      <p>Here you can manage all vouchers</p>

      <div className="flex justify-between items-center py-4">
        <div className="flex flex-wrap gap-4 items-center">
          <VoucherFilters
            discountType={discountType}
            setDiscountType={setDiscountType}
            stockStatus={stockStatus}
            setStockStatus={setStockStatus}
            expiry={expiry}
            setExpiry={setExpiry}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-auto px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          <Link to={"/admin/dashboard/vouchers/add"}>
            <button className="px-4 py-2 bg-black rounded-full text-white cursor-pointer">
              Add New Voucher
            </button>
          </Link>
        </div>
      </div>

      {filteredCoupons.length > 0 ? (
        <VoucherTable coupons={filteredCoupons} onRemove={handleRemoveCoupon} />
      ) : (
        <p className="text-gray-500 flex w-full justify-center text-sm italic mt-4">
          No vouchers found matching your filters.
        </p>
      )}
    </div>
  );
};

export default VoucherList;
