import React, { useState } from "react";
import useProducts from "../../../hooks/useProducts";

const AddProduct = () => {
  const { handleAddProduct, handleDataChange, inputValue, setInputValue } = useProducts();
  const [additionalImages, setAdditionalImages] = useState([""]);

  // Hàm thêm trường ảnh phụ
  const handleAddImageField = () => {
    setAdditionalImages([...additionalImages, ""]);
  };

  // Hàm thay đổi URL ảnh phụ
  const handleImageChange = (index, value) => {
    const newImages = [...additionalImages];
    newImages[index] = value;
    setAdditionalImages(newImages);
  };

  // Cập nhật state inputValue với các URL ảnh phụ trước khi gửi form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload mặc định khi submit form
    
    // Cập nhật lại inputValue với các URL ảnh phụ
    inputValue.additionalImages = additionalImages; 
    
    // Gửi dữ liệu lên server
    handleAddProduct(e);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <input
          name="name"
          value={inputValue.name || ""}
          placeholder="Product Name"
          onChange={handleDataChange}
          type="text"
        />
        <select
          name="page"
          value={inputValue.page || ""}
          onChange={handleDataChange}
        >
          <option value="">Select page</option>
          <option value="New & Featured">New & Featured</option>
          <option value="Trending">Trending</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Sale">Sale</option>

        </select>
        {inputValue.page === "New & Featured" && (
          <select
            name="category"
            value={inputValue.category || ""}
            onChange={handleDataChange}
          >
            <option value="">Select Category</option>
            <option value="New & Upcoming Drops">New & Upcoming Drops</option>
            <option value="New Arrivals">New Arrivals</option>
            <option value="Bestsellers">Bestsellers</option>
            <option value="Member Exclusive">Member Exclusive</option>
            <option value="Customise with Nike By You">Customise with Nike By You</option>
            <option value="What's Trending">What's Trending</option>
            <option value="Jordan">Jordan</option>
            <option value="Air Max Dn8">Air Max Dn8</option>
            <option value="Nike 24.7">Nike 24.7</option>
            <option value="Retro Running">Retro Running</option>
            <option value="Running Shoe Finder">Running Shoe Finder</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Air Force 1">Air Force 1</option>
            <option value="Air Jordan 1">Air Jordan 1</option>
            <option value="Air Max">Air Max</option>
            <option value="Dunk">Dunk</option>
            <option value="Cortez">Cortez</option>
            <option value="Blazer">Blazer</option>
            <option value="Pegasus">Pegasus</option>
            <option value="Vomero">Vomero</option>
            <option value="Running">Running</option>
            <option value="Basketball">Basketball</option>
            <option value="Football">Football</option>
            <option value="Golf">Golf</option>
            <option value="Tennis">Tennis</option>
            <option value="Gym and Training">Gym and Training</option>
            <option value="Yoga">Yoga</option>
            <option value="Skateboarding">Skateboarding</option>
          </select>
        )}

        {inputValue.page === "Trending" && (
          <select
            name="category"
            value={inputValue.category || ""}
            onChange={handleDataChange}
          >
            <option value="">Select Category</option>
            <option value="New Arrivals">New Arrivals</option>
            <option value="Bestsellers">Bestsellers</option>
            <option value="Shop All Sale">Shop All Sale</option>
            <option value="All Shoes">All Shoes</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Jordan">Jordan</option>
            <option value="Running">Running</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Gym and Training">Gym and Training</option>
            <option value="Skateboarding">Skateboarding</option>
            <option value="Sandals and Slides">Sandals and Slides</option>
            <option value="Nike By You">Nike By You</option>
            <option value="All Clothing">All Clothing</option>
            <option value="Tops and T-Shirts">Tops and T-Shirts</option>
            <option value="Shorts">Shorts</option>
            <option value="Pants and Leggings">Pants and Leggings</option>
            <option value="Hoodies and Sweatshirts">Hoodies and Sweatshirts</option>
            <option value="Jackets and Gilets">Jackets and Gilets</option>
            <option value="Jerseys and Kits">Jerseys and Kits</option>
            <option value="Jordan">Jordan</option>
            <option value="Running">Running</option>
            <option value="Basketball">Basketball</option>
            <option value="Football">Football</option>
            <option value="Golf">Golf</option>
            <option value="Tennis">Tennis</option>
            <option value="Gym and Training">Gym and Training</option>
            <option value="Yoga">Yoga</option>
            <option value="Skateboarding">Skateboarding</option>
            <option value="All Accessories and Equipment">All Accessories and Equipment</option>
            <option value="Bags and Backpacks">Bags and Backpacks</option>
            <option value="Socks">Socks</option>
            <option value="Hats and Headwear">Hats and Headwear</option>
          </select>
        )}
         {inputValue.page === "Women" && (
          <select
            name="category"
            value={inputValue.category || ""}
            onChange={handleDataChange}
          >
            <option value="">Select Category</option>
            <option value="New Arrivals">New Arrivals</option>
            <option value="Bestsellers">Bestsellers</option>
            <option value="Shop All Sale">Shop All Sale</option>
            
            <optgroup label="All Shoes">
              <option value="Lifestyle">Lifestyle</option>
              <option value="Jordan">Jordan</option>
              <option value="Running">Running</option>
              <option value="Gym and Training">Gym and Training</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Sandals and Slides">Sandals and Slides</option>
              <option value="Nike By You">Nike By You</option>
            </optgroup>

            <optgroup label="All Clothing">
              <option value="Performance Essentials">Performance Essentials</option>
              <option value="Tops and T-Shirts">Tops and T-Shirts</option>
              <option value="Sports Bras">Sports Bras</option>
              <option value="Pants and Leggings">Pants and Leggings</option>
              <option value="Shorts">Shorts</option>
              <option value="Hoodies and Sweatshirts">Hoodies and Sweatshirts</option>
              <option value="Jackets and Gilets">Jackets and Gilets</option>
              <option value="Skirts and Dresses">Skirts and Dresses</option>
              <option value="Modest Wear">Modest Wear</option>
              <option value="Nike Maternity">Nike Maternity</option>
              <option value="Plus Size">Plus Size</option>
            </optgroup>

            <optgroup label="All Sports">
              <option value="Yoga">Yoga</option>
              <option value="Running">Running</option>
              <option value="Gym and Training">Gym and Training</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Golf">Golf</option>
              <option value="Football">Football</option>
              <option value="Skateboarding">Skateboarding</option>
            </optgroup>

            <optgroup label="All Accessories and Equipment">
              <option value="Bags and Backpacks">Bags and Backpacks</option>
              <option value="Socks">Socks</option>
              <option value="Hats and Headwear">Hats and Headwear</option>
            </optgroup>
          </select>
        )}

        {/* Product Price */}
        <input
          name="price"
          value={inputValue.price || ""}
          placeholder="Product Price"
          onChange={handleDataChange}
          type="number"
        />

        {/* Product Price Sale */}
        <input
          name="price_sale"
          value={inputValue.price_sale || ""}
          placeholder="Product Price Sale"
          onChange={handleDataChange}
          type="number"
        />

        {/* Product Status */}
        <select
          name="status"
          value={inputValue.status || ""}
          onChange={handleDataChange}
        >
          <option value="">Select status</option>
          <option value="Just In">Just In</option>
          <option value="Coming Soon">Coming Soon</option>
        </select>

        {/* Customer Type */}
        <select
          name="customer"
          value={inputValue.customer || ""}
          onChange={handleDataChange}
        >
          <option value="">Select Customer Type</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
          <option value="Kids">Kids</option>
        </select>

        {/* Product Description */}
        <input
          name="des"
          value={inputValue.des || ""}
          placeholder="Product Description"
          onChange={handleDataChange}
          type="text"
        />

        {/* Product Main Image URL */}
        <input
          name="img"
          value={inputValue.img || ""}
          placeholder="Product Main Image URL"
          onChange={handleDataChange}
          type="text"
        />

        {/* Additional Images */}
        <div>
        {additionalImages.map((image, index) => (
          <input
            key={index}
            value={image}
            placeholder={`Additional Image ${index + 1}`}
            onChange={(e) => handleImageChange(index, e.target.value)}
            type="text"
          />
        ))}
      </div>
        <button type="button" onClick={handleAddImageField}>
          Add Image Field
        </button>

        {/* Gender Option (only available if Customer is not Kids) */}
        {inputValue.customer !== "Kids" && (
          <select
            name="gender"
            value={inputValue.gender || ""}
            onChange={handleDataChange}
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        )}

        {/* If Customer is Kids, show Boys or Girls */}
        {inputValue.customer === "Kids" && (
          <select
            name="kids_gender"
            value={inputValue.kids_gender || ""}
            onChange={handleDataChange}
          >
            <option value="">Select Gender for Kids</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        )}

        {/* Colors Available */}
        <select
          name="color"
          value={inputValue.color || ""}
          onChange={handleDataChange}
        >
          <option value="">Select color</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
        </select>

        {/* Sizes Available (multiple select) */}
        <select
          name="sizes"
          value={inputValue.sizes || []}  // Khởi tạo giá trị là một mảng
          onChange={handleDataChange}
          multiple
        >
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="35">35</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
