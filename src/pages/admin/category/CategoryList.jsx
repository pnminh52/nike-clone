import React, { useState } from "react";
import useCategories from "../../../hooks/useCategories";
import CategoryTable from './../../../components/admin/category/CategoryTable';
import CategoriesFilter from './../../../components/admin/category/CategoriesFilter';
const ListCategory = () => {
  const { categories, handleDeleteCategory } = useCategories();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const getChildCount = (parentId) => {
    return categories.filter((category) => category.parentId === parentId).length;
  };

  let parentCategories = categories.filter(
    (category) =>
      !category.parentId &&
      category.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (sortOrder) {
    parentCategories.sort((a, b) => {
      const countA = getChildCount(a.id);
      const countB = getChildCount(b.id);
      return sortOrder === "asc" ? countA - countB : countB - countA;
    });
  }
  return (
    <div className="p-4">
 <div>
        <h2 className="text-2xl nike-title-for-mobile">
          Categories management
        </h2>
        <p>You can see the detailed list of categories here</p>
      </div>
      <CategoriesFilter
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

     
      {parentCategories.length === 0 ? (
        <p className="text-gray-500 flex w-full justify-center text-sm italic mt-4">
     No category matching your filters.
  </p>
):(
  <CategoryTable
  parentCategories={parentCategories}
  getChildCount={getChildCount}
  handleDeleteCategory={handleDeleteCategory}
/>
)}
    </div>
  );
};

export default ListCategory;
