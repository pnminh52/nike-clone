// src/components/admin/product/InputInfo2.jsx
import React from "react";

const InputInfo2 = ({
  inputValue,
  setInputValue,
  handleDataChange,
  additionalImages,
  setAdditionalImages,
  selectedSizes,
  setSelectedSizes,
  positionChecked,
  togglePosition,
  isDefaultChecked,
  toggleIsDefault,
  handleImageChange,
  handleAddImageField,
  handleRemoveImageField,
  handleColorChange,
  handleAddColorField,
  handleArrayChange,
  handleAddItem,
  handleRemoveItem,
  handleSizeToggle,
}) => {
  return (
    <>
      {/* --- SIZE CHECKBOXES --- */}
      <div>
        <p className="mb-1 text-sm font-medium">Sizes</p>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 15 }, (_, i) => i + 31).map((size) => (
            <label
              key={size}
              className={`cursor-pointer px-4 py-2 rounded-lg border border-gray-300 transition-all duration-200 text-sm font-medium ${
                selectedSizes.includes(String(size))
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedSizes.includes(String(size))}
                onChange={() => handleSizeToggle(size)}
                className="hidden"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* --- ADDITIONAL IMAGES --- */}
      <div className="w-full">
        <p className="mb-1 text-sm font-medium">Main Image Url</p>
        <input
          name="img"
          value={inputValue.img || ""}
          onChange={handleDataChange}
          placeholder="Main Image URL"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg"
        />
      </div>

      <div className="w-full">
        <p className="mb-1 text-sm font-medium">Additional Images</p>
        {additionalImages.map((img, idx) => (
          <div key={idx} className="flex items-center mb-2 gap-2">
            <input
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              placeholder={`Image ${idx + 1}`}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImageField(idx)}
              className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7L16.8995 16.8995"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddImageField}
          className="px-4 py-2 bg-black text-white rounded-full cursor-pointer"
        >
          + Add Image
        </button>
      </div>

      {/* --- COLORS --- */}
      <div>
      <p className="mb-1 text-sm font-medium">Colors</p>
        {(inputValue.color || []).map((color, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              value={color}
              onChange={(e) => handleColorChange(idx, e.target.value)}
              placeholder={`Color ${idx + 1}`}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                const updated = [...inputValue.color];
                updated.splice(idx, 1);
                setInputValue((prev) => ({ ...prev, color: updated }));
              }}
              className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7L16.8995 16.8995"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddColorField}
          className="px-4 py-2 bg-black text-white rounded-full cursor-pointer"
        >
          + Add Color
        </button>
      </div>

      {/* --- FEATURED --- */}
      <div>
      <p className="mb-1 text-sm font-medium">Featured</p>
        {(inputValue.featured || []).map((item, idx) => (
        <div key={idx} className="mb-2 border border-gray-300 p-4 rounded flex flex-col gap-2">
        {/* Hàng đầu: nút X nằm bên phải */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              const updated = [...inputValue.featured];
              updated.splice(idx, 1);
              setInputValue((prev) => ({ ...prev, featured: updated }));
            }}
            className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7L16.8995 16.8995"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </button>
        </div>
      
        {/* Inputs */}
        <input
          value={item.title}
          onChange={(e) => {
            const updated = [...inputValue.featured];
            updated[idx].title = e.target.value;
            setInputValue((prev) => ({ ...prev, featured: updated }));
          }}
          placeholder="Title"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg"
        />
        <textarea
          value={item.content}
          onChange={(e) => {
            const updated = [...inputValue.featured];
            updated[idx].content = e.target.value;
            setInputValue((prev) => ({ ...prev, featured: updated }));
          }}
          placeholder="Content"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg"
        />
      </div>
      
        ))}
        <button
          type="button"
          onClick={() => {
            setInputValue((prev) => ({
              ...prev,
              featured: [...(prev.featured || []), { title: "", content: "" }],
            }));
          }}
           className="px-4 py-2 bg-black text-white rounded-full cursor-pointer"
        >
          + Add Featured
        </button>
      </div>

      {/* --- BENEFITS / NOTES --- */}
      {["Benefit", "Notes"].map((field) => (
        <div key={field}>
          <p className="mb-1 text-sm font-medium">{field}</p>
          {inputValue[field]?.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                value={item}
                onChange={(e) => handleArrayChange(field, idx, e.target.value)}
                placeholder={`${field}...`}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(field, idx)}
                className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7L16.8995 16.8995"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem(field, "")}
           className="px-4 py-2 bg-black text-white rounded-full cursor-pointer"
          >
            + Add {field}
          </button>
        </div>
      ))}

      {/* --- CHECKBOXES --- */}
      <div className="flex flex-wrap gap-2">
  {/* Position */}
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={positionChecked}
      onChange={togglePosition}
      className="peer hidden"
    />
    <div className="px-4 py-2 rounded-lg border border-gray-300 border-gray-300 cursor-pointer transition-all 
                    peer-checked:border-black peer-checked:text-black ">
      The product is in first place
    </div>
  </label>

  {/* Is Default */}
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={isDefaultChecked}
      onChange={toggleIsDefault}
      className="peer hidden"
    />
    <div className="px-4 py-2 rounded-lg border border-gray-300 border-gray-300 cursor-pointer transition-all 
                    peer-checked:border-black peer-checked:text-black ">
      The product represents this line.
    </div>
  </label>
</div>


    </>
  );
};

export default InputInfo2;
