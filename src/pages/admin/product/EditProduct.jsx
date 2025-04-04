import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProducts from '../../../hooks/useProducts';

const EditProduct = () => {
  const { id } = useParams();
  const { handleEditProduct, handleDataChange, inputValue, setInputValue, products } = useProducts();
  const productToEdit = products.find((item) => item.id == id);

  useEffect(() => {
    if (productToEdit) {
      setInputValue({
        name: productToEdit.name,
        price: productToEdit.price,
        price_sale: productToEdit.price_sale,
        category: productToEdit.category,
        des: productToEdit.des,
        img: productToEdit.img
      });
    }
  }, [productToEdit, setInputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = { ...productToEdit, ...inputValue };
    handleEditProduct(updateData);
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={inputValue.name || ""}
          placeholder="Product Name"
          onChange={handleDataChange}
          type="text"
        />
        <input
          name="price"
          value={inputValue.price || ""}
          placeholder="Product Price"
          onChange={handleDataChange}
          type="number"
        />
        <input
          name="price_sale"
          value={inputValue.price_sale || ""}
          placeholder="Product Price Sale"
          onChange={handleDataChange}
          type="number"
        />
        <input
          name="category"
          value={inputValue.category || ""}
          placeholder="Product Category"
          onChange={handleDataChange}
          type="text"
        />
        <input
          name="des"
          value={inputValue.des || ""}
          placeholder="Product Description"
          onChange={handleDataChange}
          type="text"
        />
        <input
          name="img"
          value={inputValue.img || ""}
          placeholder="Product Image URL"
          onChange={handleDataChange}
          type="text"
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProduct;
