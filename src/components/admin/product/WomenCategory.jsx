import React from "react";

const WomenCategory = ({ value, onChange }) => {
  return (
    <select
      name="category"
      value={value || ""}
      onChange={onChange}
      className="border border-gray-300 rounded p-2 w-full"
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
  );
};

export default WomenCategory;
