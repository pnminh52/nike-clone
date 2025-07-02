import React, { useState } from "react";
import axios from "axios";
import StarRatingInput from "../productDetail/StarRatingInput";
import ImageUploadDraggable from "../productDetail/ImageUploadDraggable";
import AddCommentMobilePopup from './../mobilePopup/AddCommentMobilePopUp';

const AddComment = ({ productId, user, onClose, onSubmit, product, animateOut }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [images, setImages] = useState([]);
  const realUser = user;

  const handleCancel = () => {
    setRating(0);
    setContent("");
    setTitle("");
    setImages([]);
    onClose();
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nike_product_comment");

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

    if (!realUser || !realUser.id || !realUser.lastname || !realUser.firstname) {
      alert("You must be logged in to post a comment!");
      onClose();
      return;
    }

    if (!content.trim()) {
      alert("Please write a comment before submitting!");
      return;
    }

    if (!isChecked) {
      alert("Please agree to the terms before submitting a comment!");
      return;
    }

    setIsSubmitting(true);

    let imageUrls = [];

    try {
      if (images.length > 0) {
        imageUrls = await Promise.all(
          images.map((img) => uploadImageToCloudinary(img.file))
        );
      }

      const newComment = {
        productId,
        userId: realUser.id,
        userName: `${realUser.firstname} ${realUser.lastname}`,
        rating,
        content,
        title,
        images: imageUrls.filter(Boolean),
        date: new Date().toISOString(),
      };

      await onSubmit(newComment);
    } catch (error) {
      alert("Đã xảy ra lỗi khi gửi bình luận. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
   <div>
    <div className="hidden sm:block">
    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto hide-scrollbar">
      <div className="flex justify-center items-start min-h-screen py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 relative rounded-4xl shadow max-w-screen-sm w-full mx-auto"
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={handleCancel}
              type="button"
              className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>

        

          {product && (
            <div className="flex gap-2 py-4">
              <img src={product.img} alt={product.name} className="w-20 h-20 cursor-pointer object-cover rounded-lg" />
              <h3 className="cursor-pointer">{product.name}</h3>
            </div>
          )}

          <StarRatingInput rating={rating} setRating={setRating} />

          <div className="py-2">
            <p className="py-2">Your Review<span className="text-red-600">*</span></p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-gray-500 border p-2 rounded-xl"
              rows={4}
              required
            />
            <p className="text-xs text-gray-600">
              Describe what you liked, what you didn't like and other key things shoppers should know. Minimum 30 characters.
            </p>
          </div>

          <div className="py-2">
            <p className="py-2">Review title<span className="text-red-600">*</span></p>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-500 border p-2 rounded-xl h-15"
              rows={2}
              required
            />
            <p className="text-xs text-gray-600">
              Summarise your review in 150 characters or less.
            </p>
          </div>

          <ImageUploadDraggable images={images} setImages={setImages} />

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              className="appearance-none transition duration-300 ease-in-out cursor-pointer w-8 h-8 bg-white border-2 border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p className="text-sm">
              By ticking the tick box, I agree to the Privacy Policy, Terms of Use and Terms of Service.<span className="text-red-600">*</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isChecked}
            className="h-14 w-full rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
    <div className="block sm:hidden">
     <AddCommentMobilePopup 
     animateOut={animateOut}
      product={product}
      rating={rating}
      setRating={setRating}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      images={images}
      setImages={setImages}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      isSubmitting={isSubmitting} />
    </div>
   </div>
  );
};

export default AddComment;
