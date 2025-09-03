import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useProducts = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  // const API_URL = "http://localhost:3000";
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const navigate = useNavigate();

  const handleDeleteProduct = (id) => {
    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    const newProductList = products.filter((product) => product.id !== id);
    setProducts(newProductList);
  };
  const getProductsByName = (name) => {
    return products.filter((p) => p.name === decodeURIComponent(name));
  };
  
  
  const handleAddProduct = (e) => {
    fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputValue),
    })
      .then((response) => response.json())
      .then((data) => setProducts([...products, data]));
    navigate("/admin/dashboard/products/list");
  };

  const handleEditProduct = (product) => {
    fetch(`${API_URL}/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prev) =>
          prev.map((item) => (item.id === data.id ? data : item))
        );
      })
      .finally(() => navigate("/admin/dashboard/products/list"));
  };

  const handleDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "select-multiple") {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
      setInputValue((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return {
    products,
    handleDeleteProduct,
    handleAddProduct,
    handleEditProduct,
    handleDataChange,
    inputValue,
    setInputValue,
    getProductsByName,
    getAllProducts: () => products
  };
};

export default useProducts;
