import React, { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import InputInfo1 from './../../../components/admin/product/InputInfo1';
import InputInfo2 from "../../../components/admin/product/InputInfo2";

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
   <div className="p-4 h-full">
    <h1 className="nike-title-for-mobile">Add new product</h1>
    <p>Here you can add new products</p>
     <form onSubmit={handleSubmit} className="space-y-4 py-8">
          {/* --- TEXT INPUTS --- */}
          <InputInfo1 inputValue={inputValue} handleDataChange={handleDataChange} />
          <InputInfo2
  inputValue={inputValue}
  setInputValue={setInputValue}
  handleDataChange={handleDataChange}
  additionalImages={additionalImages}
  setAdditionalImages={setAdditionalImages}
  selectedSizes={selectedSizes}
  setSelectedSizes={setSelectedSizes}
  positionChecked={positionChecked}
  togglePosition={togglePosition}
  isDefaultChecked={isDefaultChecked}
  toggleIsDefault={toggleIsDefault}
  handleImageChange={handleImageChange}
  handleAddImageField={handleAddImageField}
  handleRemoveImageField={handleRemoveImageField}
  handleColorChange={handleColorChange}
  handleAddColorField={handleAddColorField}
  handleArrayChange={handleArrayChange}
  handleAddItem={handleAddItem}
  handleRemoveItem={handleRemoveItem}
  handleSizeToggle={handleSizeToggle}
/>

     
        
    
          <button type="submit" className="bg-black text-white px-4 py-2 rounded-full">Add this product!</button>
        </form>
   </div>
  );
};

export default AddProduct;
