import React, { useState } from "react";
import axios from "axios";

const AddComment = ({ productId, user, onClose, onSubmit }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const realUser = user;


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("Bạn chỉ được chọn tối đa 5 ảnh.");
      return;
    }

    setFiles(selectedFiles);

    const previewsArray = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(previewsArray);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nike_product_comment"); // Thay bằng preset thật của bạn

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dovbpv8ul/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (!realUser || !realUser.id || !realUser.username) {
      alert("Bạn cần đăng nhập để gửi bình luận.");
      onClose();
      return null;
    }
    
  
    if (!content.trim()) {
      alert("Vui lòng viết bình luận trước khi gửi.");
      return;
    }
  
    setIsSubmitting(true);
  
    let imageUrls = [];
  
    try {
      if (files.length > 0) {
        imageUrls = await Promise.all(
          files.map((file) => uploadImageToCloudinary(file))
        );
      }

      const newComment = {
        productId,
        userId: realUser.id,
        userName:  realUser.username , // Sử dụng username thay vì ghép fullname
        rating,
        content,
        images: imageUrls.filter(Boolean), // Bỏ ảnh null nếu upload lỗi
        date: new Date().toISOString(),
      };
      
  
      await onSubmit(newComment);
      
    } catch (error) {
      console.error("Error while submitting comment:", error);
      alert("Đã xảy ra lỗi khi gửi bình luận. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-[90%] max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">Viết đánh giá</h2>

        <label className="block mb-2">Đánh giá:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mb-4 w-full border p-2 rounded"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} sao
            </option>
          ))}
        </select>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="w-full border mb-4 p-2 rounded"
          rows={4}
          required
        />

        <div className="mb-4">
          <label className="block mb-2">Tải lên tối đa 5 ảnh:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {previews.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`preview-${index}`}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-gray-500">
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
