import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FeaturedSlideEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comboData, setComboData] = useState({
    combo: [],
    status: "On",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/featured/${id}`)
      .then((res) => setComboData(res.data))
      .catch(() => toast.error("Không tìm thấy combo!"));
  }, [id]);

  const handleChangeItem = (index, field, value) => {
    const updatedCombo = [...comboData.combo];
    updatedCombo[index][field] = value;
    setComboData({ ...comboData, combo: updatedCombo });
  };

  const handleAddItem = () => {
    const newItem = {
      id: "", // bỏ uuid, id sẽ do backend tạo nếu cần
      name: "",
      img: ""
    };
    setComboData({ ...comboData, combo: [...comboData.combo, newItem] });
  };

  const handleDeleteItem = (index) => {
    const updatedCombo = [...comboData.combo];
    updatedCombo.splice(index, 1);
    setComboData({ ...comboData, combo: updatedCombo });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (comboData.status === "On") {
        // Lấy danh sách tất cả combo
        const res = await axios.get("http://localhost:3000/featured");
  
        // Tìm combo đang bật khác với combo hiện tại
        const activeCombo = res.data.find(
          (item) => item.status === "On" && item.id !== id
        );
  
        if (activeCombo) {
          // Cập nhật combo kia thành Off
          await axios.put(`http://localhost:3000/featured/${activeCombo.id}`, {
            ...activeCombo,
            status: "Off",
          });
        }
      }
  
      // Cập nhật combo hiện tại
      await axios.put(`http://localhost:3000/featured/${id}`, comboData);
  
      toast.success("Cập nhật combo thành công!");
      navigate("/admin/dashboard/slide/featured/list");
    } catch (error) {
      toast.error("Lỗi khi cập nhật combo!");
    }
  };
  

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa Combo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {comboData.combo.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-md mb-4 bg-gray-50 relative"
          >
            <div className="mb-2">
              <label className="block font-medium">Tên</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChangeItem(index, "name", e.target.value)}
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium">Ảnh</label>
              <input
                type="text"
                value={item.img}
                onChange={(e) => handleChangeItem(index, "img", e.target.value)}
                className="border w-full px-3 py-2 rounded"
                required
              />
              {item.img && (
                <img
                  src={item.img}
                  alt="preview"
                  className="w-32 h-32 object-cover border mt-2"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => handleDeleteItem(index)}
              className="absolute top-2 right-2 text-red-500 hover:underline"
            >
              Xoá
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddItem}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Thêm mục
        </button>

        <div className="mt-4">
          <label className="block font-medium mb-1">Trạng thái</label>
          <select
            value={comboData.status}
            onChange={(e) =>
              setComboData({ ...comboData, status: e.target.value })
            }
            className="border px-3 py-2 rounded"
          >
            <option value="On">Bật</option>
            <option value="Off">Tắt</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Cập nhật Combo
        </button>
      </form>
    </div>
  );
};

export default FeaturedSlideEdit;
