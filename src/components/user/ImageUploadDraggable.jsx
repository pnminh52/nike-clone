import React, { useState } from "react";

const ImageUploadDraggable = ({ images, setImages }) => {
    const handleFiles = (e) => {
      const files = Array.from(e.target.files);
      if (images.length + files.length > 5) {
        alert("Chỉ được tải lên tối đa 5 ảnh.");
        return;
      }
  
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      }));
  
      setImages((prev) => [...prev, ...newImages]);
    };
  
    const handleDelete = (id) => {
      setImages((prev) => prev.filter((img) => img.id !== id));
    };
  
    const handleDragStart = (e, index) => {
      e.dataTransfer.setData("dragIndex", index);
    };
  
    const handleDrop = (e, dropIndex) => {
      const dragIndex = e.dataTransfer.getData("dragIndex");
      if (dragIndex === null) return;
  
      const newImages = [...images];
      const draggedItem = newImages.splice(dragIndex, 1)[0];
      newImages.splice(dropIndex, 0, draggedItem);
      setImages(newImages);
    };
  
    return (
      <div className="space-y-4 py-4">
        <div>
          <h2>Share your photos</h2>
          <p className="text-gray-500">Add up to 5 photos that show how you wear and style this product.</p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="relative group w-27 h-27 rounded-lg overflow-hidden border border-gray-300"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
            >
              <img src={img.preview} alt="preview" className="w-full h-full object-cover cursor-pointer" />
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
  
          {images.length < 5 && (
            <label className="w-27 h-27 border-dashed border border-gray-400 flex items-center justify-center rounded-lg cursor-pointer hover:border-black">
              <span className="text-4xl text-gray-400">+</span>
              <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
            </label>
          )}
        </div>
      </div>
    );
  };
  

export default ImageUploadDraggable;
