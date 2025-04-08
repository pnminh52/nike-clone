import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCategories from '../../../hooks/useCategories';
import { Link } from 'react-router-dom'; // Hook để lấy dữ liệu category

const CategoryDetail = () => {
  const { categories, handleDeleteCategory } = useCategories(); // Lấy dữ liệu category từ hook
  const { id } = useParams(); // Lấy id của category cha từ URL
  const [childCategories, setChildCategories] = useState([]); // Dữ liệu category con

  useEffect(() => {
    // Lọc danh mục con dựa trên parentId
    const childCats = categories.filter((category) => category.parentId === id); // Chắc chắn rằng cả 2 đều là chuỗi
    setChildCategories(childCats); // Cập nhật danh sách category con
  }, [id, categories]); // Chạy lại khi id hoặc categories thay đổi

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Child Categories of Category {id}</h2>
      {childCategories.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {childCategories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-2 border-b">{category.name}</td>
                <td className="px-4 py-2 border-b">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <Link to={`/admin/categories/edit/${category.id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                    Edit
                  </button></Link>
                  <button onClick={()=>handleDeleteCategory(category.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No child categories found.</p>
      )}
    </div>
  );
};

export default CategoryDetail;
