import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FeaturedSlideAdd = () => {
  const navigate = useNavigate();

  const [comboData, setComboData] = useState({
    combo: [
      { id: "1", name: "", img: "" },
      { id: "2", name: "", img: "" },
      { id: "3", name: "", img: "" },
      { id: "4", name: "", img: "" },
    ],
    status: "Off",
  });

  const handleChangeItem = (index, field, value) => {
    const updatedCombo = [...comboData.combo];
    updatedCombo[index][field] = value;
    setComboData({ ...comboData, combo: updatedCombo });
  };

  const handleAddItem = () => {
    const newItem = {
      id: (comboData.combo.length + 1).toString(),
      name: "",
      img: "",
    };
    setComboData({ ...comboData, combo: [...comboData.combo, newItem] });
  };

  const handleDeleteItem = (index) => {
    if (comboData.combo.length <= 4) {
      toast.error("Phải có ít nhất 4 mục trong combo");
      return;
    }
    const updatedCombo = [...comboData.combo];
    updatedCombo.splice(index, 1);
    setComboData({ ...comboData, combo: updatedCombo });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Bạn có thể thêm validate nếu muốn
    axios
      .post("http://localhost:3000/featured", comboData)
      .then(() => {
        toast.success("Thêm combo thành công!");
        navigate("/admin/dashboard/slide/featured/list");
      })
      .catch(() => toast.error("Lỗi khi thêm combo!"));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Thêm Combo Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {comboData.combo.map((item, index) => (
          <div
            key={item.id}
            className="border p-4 rounded-md mb-4 bg-gray-50 relative"
          >
            <div className="mb-2">
              <label className="block font-medium">Tên</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleChangeItem(index, "name", e.target.value)
                }
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium">Ảnh (URL)</label>
              <input
                type="text"
                value={item.img}
                onChange={(e) => handleChangeItem(index, "img", e.target.value)}
                className="border w-full px-3 py-2 rounded"
                required
              />
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
          Thêm Combo
        </button>
      </form>
    </div>
  );
};

export default FeaturedSlideAdd;
