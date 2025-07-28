import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import InputInfo1 from '../../../components/admin/product/InputInfo1';
import InputInfo2 from '../../../components/admin/product/InputInfo2';

const EditProduct = () => {
  const { id } = useParams();
  const {
    products,
    handleEditProduct,
    handleDataChange,
    inputValue,
    setInputValue,
  } = useProducts();

  const productToEdit = products.find((item) => item.id == id);

  const [positionChecked, setPositionChecked] = useState(false);
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);

  useEffect(() => {
    if (productToEdit) {
      const sizeList = productToEdit.sizes || [];
      const addImgs = productToEdit.additionalImages || [];

      setInputValue({ ...productToEdit });
      setSelectedSizes(sizeList);
      setAdditionalImages(addImgs);
      setPositionChecked(!!productToEdit.position);
      setIsDefaultChecked(!!productToEdit.isDefault);
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...inputValue,
      sizes: selectedSizes,
      additionalImages,
      position: positionChecked ? 1 : undefined,
      isDefault: isDefaultChecked ? true : undefined,
    };
    handleEditProduct(updatedProduct);
  };

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
    const updated = [...(inputValue[field] || [])];
    updated[index] = value;
    setInputValue((prev) => ({ ...prev, [field]: updated }));
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

  const togglePosition = () => {
    setPositionChecked((prev) => {
      const newVal = !prev;
      setInputValue((prevInput) => ({
        ...prevInput,
        position: newVal ? 1 : undefined,
      }));
      return newVal;
    });
  };

  const toggleIsDefault = () => {
    setIsDefaultChecked((prev) => {
      const newVal = !prev;
      setInputValue((prevInput) => ({
        ...prevInput,
        isDefault: newVal ? true : undefined,
      }));
      return newVal;
    });
  };

  return (
    <div className="p-4 h-full">
      <h1 className="nike-title-for-mobile">Edit product</h1>
      <p>Update product information below</p>
      <form onSubmit={handleSubmit} className="space-y-4 py-8">
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

        <button type="submit" className="bg-black text-white px-6 py-2 rounded-full">
          Save this Changes!
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
