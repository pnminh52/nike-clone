import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCategories from '../../../hooks/useCategories';
import CategoryChildTable from './../../../components/admin/category/CategoryChildTable';

const CategoryDetail = () => {
  const { categories, handleDeleteCategory } = useCategories();
  const { id } = useParams();
  const [childCategories, setChildCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const childCats = categories.filter((category) => category.parentId === id);
    setChildCategories(childCats);
    setCurrentPage(1); 
  }, [id, categories]);

  const totalPages = Math.ceil(childCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = childCategories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="h-full p-4">
    <h1 className="nike-title-for-mobile">Child Category Details</h1>
    <p>Here you can all of child category</p>
      {childCategories.length > 0 ? (
        <>
           <CategoryChildTable
          categories={childCategories}
          handleDeleteCategory={handleDeleteCategory}
        />

         
        </>
      ) : (
        <p>No child categories found.</p>
      )}
    </div>
  );
};

export default CategoryDetail;
