import React from "react";
import useProducts from "../../../hooks/useProducts";

const AddProduct = () => {
  const { handleAddProduct, handleDataChange, inputValue } = useProducts();

  return (
    <div>
      <form onSubmit={(e) => handleAddProduct(e)}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
