import React, { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import NewAndFeatured from "../../../components/admin/product/NewAndFeatured";
import TrendingCategory from "../../../components/admin/product/TrendingCategory";
import WomenCategory from "../../../components/admin/product/WomenCategory";

const AddProduct = () => {
  const { handleAddProduct, handleDataChange, inputValue, setInputValue } = useProducts();
  const [positionChecked, setPositionChecked] = useState(false);
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);
  const [additionalImages, setAdditionalImages] = useState([""]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleAddItem = (field, defaultValue) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue],
    }));
  };

  const handleRemoveItem = (field, index) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setInputValue((prev) => {
      const updated = [...(prev[field] || [])];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const handleImageChange = (index, value) => {
    const updated = [...additionalImages];
    updated[index] = value;
    setAdditionalImages(updated);
    setInputValue((prev) => ({ ...prev, additionalImages: updated }));
  };

  const handleAddImageField = () => {
    setAdditionalImages((prev) => [...prev, ""]);
  };

  const handleRemoveImageField = (index) => {
    const updated = [...additionalImages];
    updated.splice(index, 1);
    setAdditionalImages(updated);
    setInputValue((prev) => ({ ...prev, additionalImages: updated }));
  };

  const handleColorChange = (index, value) => {
    const updated = [...(inputValue.color || [])];
    updated[index] = value;
    setInputValue((prev) => ({ ...prev, color: updated }));
  };
  

  const handleAddColorField = () => {
    setInputValue((prev) => ({
      ...prev,
      color: [...(prev.color || []), ""],
    }));
  };
  

  const handleSizeToggle = (size) => {
    const sizeStr = String(size);
    const updatedSizes = selectedSizes.includes(sizeStr)
      ? selectedSizes.filter((s) => s !== sizeStr)
      : [...selectedSizes, sizeStr];
  
    setSelectedSizes(updatedSizes);
    setInputValue((prev) => ({ ...prev, sizes: updatedSizes }));
  };
  
  // Khi toggle position
const togglePosition = () => {
  setPositionChecked(prev => {
    const newVal = !prev;
    setInputValue(prevInput => ({
      ...prevInput,
      position: newVal ? 1 : undefined
    }));
    return newVal;
  });
};

// Khi toggle isDefault
const toggleIsDefault = () => {
  setIsDefaultChecked(prev => {
    const newVal = !prev;
    setInputValue(prevInput => ({
      ...prevInput,
      isDefault: newVal ? true : undefined
    }));
    return newVal;
  });
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...inputValue,
      additionalImages,
      
      color: inputValue.color || [],
      sizes: selectedSizes.map(String),
    };
    

    if (positionChecked) {
      productData.position = 1;
    }

    if (isDefaultChecked) {
      productData.isDefault = "true";
    }

    handleAddProduct(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* --- TEXT INPUTS --- */}
      <input name="name" value={inputValue.name || ""} onChange={handleDataChange} placeholder="Product Name" className="w-full border" />
      <input name="stock" type="number" value={inputValue.stock || ""} onChange={handleDataChange} placeholder="Stock" className="w-full border" />
      <input name="price" type="number" value={inputValue.price || ""} onChange={handleDataChange} placeholder="Price" className="w-full border" />
      <input name="price_sale" type="number" value={inputValue.price_sale || ""} onChange={handleDataChange} placeholder="Price Sale" className="w-full border" />
      <input name="img" value={inputValue.img || ""} onChange={handleDataChange} placeholder="Main Image URL" className="w-full border" />
      <input name="style" value={inputValue.style||""} onChange={handleDataChange} placeholder="Style" className="w-full border" type="text" />
      <input name="country" value={inputValue.country || ""} onChange={handleDataChange} placeholder="Country" className="w-full border" />
      <input name="height" value={inputValue.height || ""} onChange={handleDataChange} placeholder="Height" className="w-full border" />
      <input name="shoesFor" value={inputValue.shoesFor || ""} onChange={handleDataChange} placeholder="Shoes For" className="w-full border" />
      <input name="class" value={inputValue.class || ""} onChange={handleDataChange} placeholder="Class" className="w-full border" />
      <input name="brand" value={inputValue.brand || ""} onChange={handleDataChange} placeholder="Brand" className="w-full border" />
      <input name="features" value={inputValue.features || ""} onChange={handleDataChange} placeholder="Features" className="w-full border" />
      <input name="giftPoint" type="number" value={inputValue.giftPoint || ""} onChange={handleDataChange} placeholder="Gift Point" className="w-full border" />
      <input name="type" value={inputValue.type || ""} onChange={handleDataChange} placeholder="Type" className="w-full border" />
      <input name="des" value={inputValue.des || ""} onChange={handleDataChange} placeholder="Description" className="w-full border" />

      {/* --- DROPDOWNS --- */}
      <select name="page" value={inputValue.page || ""} onChange={handleDataChange} className="w-full border">
        <option value="">Select Page</option>
        <option value="New & Featured">New & Featured</option>
        <option value="Trending">Trending</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
        <option value="Sale">Sale</option>
      </select>

      {inputValue.page === "New & Featured" && <NewAndFeatured value={inputValue.category} onChange={handleDataChange} />}
      {inputValue.page === "Trending" && <TrendingCategory value={inputValue.category} onChange={handleDataChange} />}
      {inputValue.page === "Women" && <WomenCategory value={inputValue.category} onChange={handleDataChange} />}

      <select name="status" value={inputValue.status || ""} onChange={handleDataChange} className="w-full border">
        <option value="">Select Status</option>
        <option value="Just In">Just In</option>
        <option value="Coming Soon">Coming Soon</option>
      </select>

      <select name="customer" value={inputValue.customer || ""} onChange={handleDataChange} className="w-full border">
        <option value="">Select Customer</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
        <option value="Kids">Kids</option>
      </select>

      {inputValue.customer !== "Kids" && (
        <select name="gender" value={inputValue.gender || ""} onChange={handleDataChange} className="w-full border">
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      )}
  {/* --- SIZE CHECKBOXES --- */}
      <div>
        <label className="font-semibold">Sizes</label>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 15 }, (_, i) => i + 31).map((size) => (
            <label key={size} className="flex items-center gap-1">
            <input
  type="checkbox"
  checked={selectedSizes.includes(String(size))}
  onChange={() => handleSizeToggle(size)}
/>

              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>
      {/* --- ADDITIONAL IMAGES --- */}
      <div>
        <label className="font-semibold">Additional Images</label>
        {additionalImages.map((img, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <input value={img} onChange={(e) => handleImageChange(idx, e.target.value)} placeholder={`Image ${idx + 1}`} className="w-full border" />
            <button type="button" onClick={() => handleRemoveImageField(idx)} className="text-red-500 text-sm">X</button>
          </div>
        ))}
        <button type="button" onClick={handleAddImageField} className="text-blue-600 text-sm">+ Add Image</button>
      </div>

      {/* --- COLORS --- */}
      <div>
  <label className="font-semibold">Colors</label>
  {(inputValue.color || []).map((color, idx) => (
    <input
      key={idx}
      value={color}
      onChange={(e) => handleColorChange(idx, e.target.value)}
      placeholder={`Color ${idx + 1}`}
      className="w-full border mb-1"
    />
  ))}
  <button type="button" onClick={handleAddColorField} className="text-blue-600 text-sm">
    + Add Color
  </button>
</div>
{/* --- FEATURED --- */}
<div>
  <label className="font-semibold">Featured</label>
  {(inputValue.featured || []).map((item, idx) => (
    <div key={idx} className="mb-2 border p-2 rounded">
      <input
        value={item.title}
        onChange={(e) => {
          const updated = [...inputValue.featured];
          updated[idx].title = e.target.value;
          setInputValue(prev => ({ ...prev, featured: updated }));
        }}
        placeholder="Title"
        className="w-full border mb-1"
      />
      <textarea
        value={item.content}
        onChange={(e) => {
          const updated = [...inputValue.featured];
          updated[idx].content = e.target.value;
          setInputValue(prev => ({ ...prev, featured: updated }));
        }}
        placeholder="Content"
        className="w-full border"
      />
      <button
        type="button"
        onClick={() => {
          const updated = [...inputValue.featured];
          updated.splice(idx, 1);
          setInputValue(prev => ({ ...prev, featured: updated }));
        }}
        className="text-red-500 text-sm mt-1"
      >
        X
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => {
      setInputValue(prev => ({
        ...prev,
        featured: [...(prev.featured || []), { title: "", content: "" }],
      }));
    }}
    className="text-blue-600 text-sm"
  >
    + Add Featured
  </button>
</div>



    

      {/* --- BENEFITS / NOTES --- */}
      {["moreBenefit", "notes"].map((field) => (
        <div key={field}>
          <label className="font-semibold">{field}</label>
          {inputValue[field]?.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input value={item} onChange={(e) => handleArrayChange(field, idx, e.target.value)} placeholder={`${field}...`} className="w-full border" />
              <button type="button" onClick={() => handleRemoveItem(field, idx)} className="text-red-500 text-sm">X</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem(field, "")} className="text-blue-600 text-sm">+ Add {field}</button>
        </div>
      ))}

      {/* --- CHECKBOXES --- */}
      <label className="flex items-center gap-2">
              <input type="checkbox" checked={positionChecked} onChange={togglePosition} />
        
        <span>Position</span>
      </label>

      <label className="flex items-center gap-2">
      <input type="checkbox" checked={isDefaultChecked} onChange={toggleIsDefault} />
        <span>Is Default</span>
      </label>
    

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
};

export default AddProduct;
