import React, { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import NewAndFeatured from "../../../components/admin/product/NewAndFeatured";
import TrendingCategory from "../../../components/admin/product/TrendingCategory";
import WomenCategory from "../../../components/admin/product/WomenCategory";

const AddProduct = () => {
  const { handleAddProduct, handleDataChange, inputValue, setInputValue } = useProducts();
  const [additionalImages, setAdditionalImages] = useState([""]);
  const [positionChecked, setPositionChecked] = useState(false);
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);
  // Hàm thêm trường ảnh phụ
  const handleAddImageField = () => {
    setAdditionalImages([...additionalImages, ""]);
  };

  // Hàm thay đổi URL ảnh phụ
  const handleImageChange = (index, value) => {
    const newImages = [...additionalImages];
    newImages[index] = value;
    setAdditionalImages(newImages);
  
    // Cập nhật luôn vào inputValue để hiển thị ngay
    setInputValue((prev) => ({
      ...prev,
      additionalImages: newImages,
    }));
  };
  
  const handleColorChange = (index, value) => {
    const updatedColors = [...colorsInput];
    updatedColors[index] = value;
    setColorsInput(updatedColors);
  };
  const handleAddColorField = () => {
    setColorsInput([...colorsInput, ""]);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newInputValue = { ...inputValue };
  
    newInputValue.additionalImages = additionalImages;
    newInputValue.color = colorsInput;
  
    if (positionChecked) {
      newInputValue.position = 1;
    } else {
      delete newInputValue.position;
    }
  
    if (isDefaultChecked) {
      newInputValue.isDefault = "true";
    } else {
      delete newInputValue.isDefault;
    }
  
    // setInputValue(newInputValue); // Không cần thiết nếu handleAddProduct nhận object trực tiếp
  
    handleAddProduct(newInputValue); // Truyền luôn dữ liệu mới
  };
  
  
  const [colorsInput, setColorsInput] = useState([""]);

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
       <div className="w-full">
       <input
       className="w-full border"
          name="name"
          value={inputValue.name || ""}
          placeholder="Product Name"
          onChange={handleDataChange}
          type="text"
        />
       </div>
      <div>
          <select
                  name="page"
                  className="w-full border"
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
      </div>
      <div>
      {inputValue.page === "New & Featured" && (
         <NewAndFeatured
         value={inputValue.category}
         onChange={handleDataChange}
       />
        )}

        {inputValue.page === "Trending" && (
         <TrendingCategory 
         value={inputValue.category}
         onChange={handleDataChange}
         />
        )}
         {inputValue.page === "Women" && (
          <WomenCategory 
          value={inputValue.category}
          onChange={handleDataChange}
          />
        )}
      </div>
      <div>
  <input
    name="stock"
    className="w-full border"
    value={inputValue.stock || ""}
    placeholder="Stock"
    onChange={handleDataChange}
    type="number"
  />
</div>


      <div>
          {/* Product Price */}
                <input
                  name="price"
                  className="w-full border"
                  value={inputValue.price || ""}
                  placeholder="Product Price"
                  onChange={handleDataChange}
                  type="number"
                />
      </div>
      <div>
          <input
          name="price_sale"
           className="w-full border"
          value={inputValue.price_sale || ""}
          placeholder="Product Price Sale"
          onChange={handleDataChange}
          type="number"
        />
      </div>
       <div>
       <input
          name="style"
           className="w-full border"
          value={inputValue.style || ""}
          placeholder="style"
          onChange={handleDataChange}
          type="text"
        />
       </div>
     <div>
     <input
  name="country"
   className="w-full border"
  value={inputValue.country || "Vietnam"}
  placeholder="Country"
  onChange={handleDataChange}
  type="text"
/>
     </div>


       <div>
         {/* Product Status */}
         <select
          name="status"
          className="w-full border"
          value={inputValue.status || ""}
          onChange={handleDataChange}
        >
          <option value="">Select status</option>
          <option value="Just In">Just In</option>
          <option value="Coming Soon">Coming Soon</option>
        </select>
       </div>

       <div>
         {/* Customer Type */}
         <select
         className="w-full border"
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
       </div>

    <div>
          {/* Product Description */}
          <input
          className="w-full border"
          name="des"
          value={inputValue.des || ""}
          placeholder="Product Description"
          onChange={handleDataChange}
          type="text"
        />
    </div>

       <div>
         {/* Product Main Image URL */}
         <input
          name="img"
          className="w-full border"
          value={inputValue.img || ""}
          placeholder="Product Main Image URL"
          onChange={handleDataChange}
          type="text"
        />
       </div>

        {/* Additional Images */}
        <div className="w-full  gap-2">
        {additionalImages.map((image, index) => (
          <input
          className="w-full border"
            key={index}
            value={image}
            placeholder={`Additional Image ${index + 1}`}
            onChange={(e) => handleImageChange(index, e.target.value)}
            type="text"
          />
        ))}
         <button type="button" className="bg-blue-600 text-white" onClick={handleAddImageField}>
          Add Image Field
        </button>
      </div>
      <div>
      <label className="flex items-center space-x-2 my-2">
          <input
            type="checkbox"
            checked={positionChecked}
            onChange={() => setPositionChecked(!positionChecked)}
          />
          <span>Position</span>
        </label>

        {/* Checkbox isDefault */}
        <label className="flex items-center space-x-2 my-2">
          <input
            type="checkbox"
            checked={isDefaultChecked}
            onChange={() => setIsDefaultChecked(!isDefaultChecked)}
          />
          <span>Is Default</span>
        </label>
      </div>
       

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

<div>
  <label>Colors:</label>
  {colorsInput.map((color, index) => (
    <input
      key={index}
      type="text"
      placeholder={`Color ${index + 1}`}
      value={color}
      onChange={(e) => handleColorChange(index, e.target.value)}
      className="border p-2 rounded mb-2 block"
    />
  ))}
  <button type="button" onClick={handleAddColorField} className="border p-1 rounded bg-blue-500 text-white">
    Add Color
  </button>
</div>



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
