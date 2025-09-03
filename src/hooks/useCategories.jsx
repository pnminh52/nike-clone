import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState({ name: "", imageUrl: "", parentId: null });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleDeleteCategory = (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this category?");
    if (!confirmDelete) return;
  
    fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const newCategoryList = categories.filter((category) => category.id !== id);
        setCategories(newCategoryList);
      });
  };

  const handleAddCategory = () => {
     fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputValue),
    })
      .then((response) => response.json())
      .then((data) => setCategories([...categories, data]));
    navigate("/admin/dashboard/categories/list");
  };
  

  const handleEditCategory = (category) => {
     fetch(`${API_URL}/categories/${category.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(category),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories((prev) =>
          prev.map((item) => (item.id === data.id ? data : item))
        );
      })
      .finally(() => navigate("/admin/dashboard/categories/list"));
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
     fetch(`${API_URL}/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return {
    categories,
    handleDeleteCategory,
    handleAddCategory,
    handleEditCategory,
    handleDataChange,
    inputValue,
    setInputValue,
  };
};

export default useCategories;
