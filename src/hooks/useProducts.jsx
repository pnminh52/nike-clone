import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const navigate = useNavigate();
  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    const newProductList = products.filter((products) => products.id !== id);
    setProducts(newProductList);
  };
  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/products`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputValue),
    })
      .then((response) => response.json())
      .then((data) => setProducts([...products, data]));
    navigate("/admin/products/list");
  };
  const handleEditProduct = (product) => {
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prev) => prev.map((item) => (item.id === data.id ? data : item)));
      })
      .finally(() => navigate("/admin/products/list"));
  };
  
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  useEffect(() => {
    fetch(`http://localhost:3000/products`)
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
  };
};

export default useProducts;
