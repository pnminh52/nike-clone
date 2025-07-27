import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';

const EditProduct = () => {
  const { id } = useParams();
  const { handleEditProduct, handleDataChange, inputValue, setInputValue, products } = useProducts();
  const productToEdit = products.find((item) => item.id == id);

  useEffect(() => {
    if (productToEdit) {
      setInputValue({
        ...productToEdit,
        sizes: productToEdit.sizes || [],
        position: productToEdit.position || false,
        isDefault: productToEdit.isDefault || false,
        additionalImages: productToEdit.additionalImages || [],
        featured: productToEdit.featured || [],
      });
    }
  }, [productToEdit]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProduct({ ...productToEdit, ...inputValue });
  };

  const handleAddAdditionalImage = () => {
    setInputValue(prev => ({
      ...prev,
      additionalImages: [...(prev.additionalImages || []), '']
    }));
  };

  const handleAdditionalImageChange = (index, value) => {
    const updated = [...inputValue.additionalImages];
    updated[index] = value;
    setInputValue(prev => ({ ...prev, additionalImages: updated }));
  };

  const handleRemoveAdditionalImage = (index) => {
    const updated = [...inputValue.additionalImages];
    updated.splice(index, 1);
    setInputValue(prev => ({ ...prev, additionalImages: updated }));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={inputValue.name || ""} onChange={handleDataChange} placeholder="Product Name" className="w-full border px-4 py-2 rounded" />

        <input name="price" type="number" value={inputValue.price || ""} onChange={handleDataChange} placeholder="Price" className="w-full border px-4 py-2 rounded" />

        <input name="price_sale" type="number" value={inputValue.price_sale || ""} onChange={handleDataChange} placeholder="Price Sale" className="w-full border px-4 py-2 rounded" />

        <input name="category" value={inputValue.category || ""} onChange={handleDataChange} placeholder="Category" className="w-full border px-4 py-2 rounded" />

        <input name="des" value={inputValue.des || ""} onChange={handleDataChange} placeholder="Description" className="w-full border px-4 py-2 rounded" />

        <input name="img" value={inputValue.img || ""} onChange={handleDataChange} placeholder="Image URL" className="w-full border px-4 py-2 rounded" />

        {/* Checkbox Position & IsDefault */}
        <div className="flex gap-4">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={inputValue.position || false}
      onChange={(e) => setInputValue(prev => ({ ...prev, position: e.target.checked }))}
    />
    <span>Position</span>
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={inputValue.isDefault || false}
      onChange={(e) => setInputValue(prev => ({ ...prev, isDefault: e.target.checked }))}
    />
    <span>Is Default</span>
  </label>
</div>


        {/* Sizes */}
        <div>
  <label className="font-semibold">Sizes</label>
  <div className="flex flex-wrap gap-2">
    {Array.from({ length: 15 }, (_, i) => (i + 31)).map((size) => {
      const sizeStr = String(size);
      const isChecked = inputValue.sizes?.includes(sizeStr);

      return (
        <label key={size} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              const sizes = inputValue.sizes || [];
              const updatedSizes = isChecked
                ? sizes.filter((s) => s !== sizeStr)
                : [...sizes, sizeStr];

              setInputValue((prev) => ({ ...prev, sizes: updatedSizes }));
            }}
          />
          <span>{size}</span>
        </label>
      );
    })}
  </div>
</div>



        {/* Additional Images */}
        <div>
          <label className="font-semibold">Additional Images</label>
          {inputValue.additionalImages?.map((img, idx) => (
            <div key={idx} className="flex gap-2 items-center mt-1">
              <input
                value={img}
                onChange={(e) => handleAdditionalImageChange(idx, e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveAdditionalImage(idx)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddAdditionalImage} className="mt-2 text-blue-500">
            + Add Image
          </button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
