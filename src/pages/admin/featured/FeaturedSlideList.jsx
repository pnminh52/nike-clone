import React from "react";
import { Link } from "react-router-dom";
import useFeatured from "../../../hooks/useFeatured";
import axios from "axios";
import { toast } from "react-toastify";

const FeaturedSlideList = () => {
  const { featured, setFeatured } = useFeatured(); // nhớ hook phải có setFeatured để cập nhật danh sách

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa combo này không?")) {
      try {
        await axios.delete(`http://localhost:3000/featured/${id}`);
        toast.success("Xóa combo thành công!");
        // cập nhật lại danh sách sau khi xóa
        setFeatured(featured.filter((item) => item.id !== id));
      } catch (error) {
        toast.error("Xóa combo thất bại!");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Danh sách Combo Slide</h2>
        <Link
          to="/admin/dashboard/slide/featured/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Thêm combo
        </Link>
      </div>

      {featured.map((item) => (
        <div key={item.id} className="border rounded-lg mb-6 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Combo ID: {item.id}</p>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                item.status === "On"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {item.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {item.combo.map((combo) => (
              <div
                key={combo.id}
                className="bg-gray-100 rounded-lg p-2 text-center"
              >
                <img
                  src={combo.img}
                  alt={combo.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-medium">{combo.name}</p>
              </div>
            ))}
          </div>

          <div className="text-right mt-4 space-x-4">
            <Link
              to={`/admin/dashboard/slide/featured/edit/${item.id}`}
              className="text-blue-600 hover:underline"
            >
              ✏️ Sửa combo
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:underline"
            >
              🗑️ Xóa combo
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSlideList;
