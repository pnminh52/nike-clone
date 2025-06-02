import React from "react";

const TrendingCategory = ({ value, onChange }) => {
  const options = [
    "New Arrivals",
    "Bestsellers",
    "Shop All Sale",
    "All Shoes",
    "Lifestyle",
    "Jordan",
    "Running",
    "Football",
    "Basketball",
    "Gym and Training",
    "Skateboarding",
    "Sandals and Slides",
    "Nike By You",
    "All Clothing",
    "Tops and T-Shirts",
    "Shorts",
    "Pants and Leggings",
    "Hoodies and Sweatshirts",
    "Jackets and Gilets",
    "Jerseys and Kits",
    "Golf",
    "Tennis",
    "Yoga",
    "All Accessories and Equipment",
    "Bags and Backpacks",
    "Socks",
    "Hats and Headwear",
  ];

  return (
    <select
      name="category"
      value={value || ""}
      onChange={onChange}
      className="w-full border rounded p-2"
    >
      <option value="">Select Category</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default TrendingCategory;
