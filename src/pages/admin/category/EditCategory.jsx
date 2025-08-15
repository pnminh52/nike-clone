import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";

const EditCategory = () => {
  const { id } = useParams();
  const {
    categories,
    inputValue,
    handleDataChange,
    handleEditCategory,
    setInputValue,
  } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    const categoryToEdit = categories.find((category) => category.id === id);
    if (categoryToEdit) {
      let pageValue = categoryToEdit.page || "";
        if (!pageValue && categoryToEdit.parentId) {
        const parentCategory = categories.find(c => c.id === categoryToEdit.parentId);
        if (parentCategory) {
          pageValue = parentCategory.page || "";
        }
      }
  
      setInputValue({
        name: categoryToEdit.name,
        imageUrl: categoryToEdit.imageUrl,
        parentId: categoryToEdit.parentId ? String(categoryToEdit.parentId) : "",
        page: pageValue,
      });
    }
  }, [categories, id, setInputValue]);
  
  

  return (
    <div className="h-full p-4">
      <h1 className="nike-title-for-mobile">Edit category</h1>
      <p>Here you can update category information</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditCategory({ id, ...inputValue });
        }}
        className="py-4 space-y-4"
      >
        {/* Name & Image */}
        <div className="flex gap-2 w-full items-center">
          <div className="w-full">
            <p className="mb-1 text-sm font-medium">Category Name</p>
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={inputValue.name || ""}
              onChange={handleDataChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm font-medium">Category Image</p>
            <input
              type="url"
              name="imageUrl"
              placeholder="Category Image"
              value={inputValue.imageUrl || ""}
              onChange={handleDataChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Page & Parent Category */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium">Select Page</p>
            <select
              name="page"
              value={inputValue.page || ""}
              onChange={handleDataChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select page</option>
              <option value="new-featured">New & Featured</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="sale">Sale</option>
            </select>
          </div>

          {inputValue.page && (
            <div className="flex-1">
              <p className="mb-1 text-sm font-medium">Select Parent Category</p>
              <select
                name="parentId"
                value={inputValue.parentId || ""}
                onChange={handleDataChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="">Select Parent Category</option>
                {categories
                  .filter(
                    (category) =>
                      !category.parentId &&
                      category.id !== id &&
                      category.page?.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-") ===
                        inputValue.page
                  )
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-black text-white rounded-full px-4 py-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
