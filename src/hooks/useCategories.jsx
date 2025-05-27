import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState({ name: "", imageUrl: "", parentId: null });
  const navigate = useNavigate();
  const API_URL = "https://nikejsonserver-2.onrender.com";

  const handleDeleteCategory = (id) => {
     fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    });
    const newCategoryList = categories.filter((category) => category.id !== id);
    setCategories(newCategoryList);
  };

  const handleAddCategory = () => {
     fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputValue),
    })
      .then((response) => response.json())
      .then((data) => setCategories([...categories, data]));
    navigate("/admin/categories/list");
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
      .finally(() => navigate("/admin/categories/list"));
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
