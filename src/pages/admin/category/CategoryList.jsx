import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";
import { Link } from "react-router-dom";

const ListCategory = () => {
  const { categories, handleDeleteCategory } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  // Xử lý chọn/deselect category
  const handleSelectCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Xử lý chọn tất cả
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(categories.map((category) => category.id));
    } else {
      setSelectedCategories([]);
    }
  };

  // Xóa các category đã chọn
  const handleDeleteSelectedCategories = () => {
    selectedCategories.forEach((id) => handleDeleteCategory(id));
    setSelectedCategories([]); // Reset danh sách chọn sau khi xóa
  };

  // Hàm tính số danh mục con của category cha
  const getChildCount = (parentId) => {
    return categories.filter((category) => category.parentId === parentId).length;
  };

  // Lọc chỉ các category cha (không có parentId)
  const parentCategories = categories.filter((category) => !category.parentId);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Categories List</h2>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/admin/categories/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Category
        </button>
        {selectedCategories.length > 0 && (
          <button
            onClick={handleDeleteSelectedCategories}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete Selected
          </button>
        )}
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedCategories.length === parentCategories.length}
              />
            </th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Số danh mục con</th>
            <th className="px-4 py-2 border-b">Page</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parentCategories.map((category) => (
            <tr key={category.id}>
              <td className="px-4 py-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleSelectCategory(category.id)}
                />
              </td>
              <td className="px-4 py-2 border-b">{category.name}</td>
              <td className="px-4 py-2 border-b">
                {/* Hiển thị số lượng danh mục con */}
                {getChildCount(category.id)}
              </td>
              <td className="px-4 py-2 border-b">{category.page}</td>
              <td className="px-4 py-2 border-b flex space-x-2">
                <button
                  onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <Link to={`/admin/categories/view/${category.id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;
