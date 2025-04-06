import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";
const AddCategory = () => {
  const {
    inputValue,
    categories,
    handleDataChange,
    handleAddCategory,
    setInputValue,
  } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue({ name: "", imageUrl: "", parentId: null, page: "" });
  }, [setInputValue]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
      <form onSubmit={handleAddCategory}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleDataChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
<div>
<select
  name="page"
  value={inputValue.page || ""}
  onChange={handleDataChange}
  className="border border-gray-300 p-2 rounded-md"
>
  <option value="">Select page</option>

  {/* 5 lựa chọn mặc định */}
  <option value="new-featured">New & Featured</option>
  <option value="men">Men</option>
  <option value="women">Women</option>
  <option value="kids">Kids</option>
  <option value="sale">Sale</option>

 
</select>

</div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={inputValue.imageUrl}
            onChange={handleDataChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Parent Category</label>
          <select
  name="parentId"
  value={inputValue.parentId || ""}
  onChange={handleDataChange}
  className="border border-gray-300 p-2 rounded-md"
>
  <option value="">Select Parent Category</option>
  {categories
    .filter((category) => !category.parentId) // Lọc các category không phải con (root categories)
    .map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
</select>

        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
