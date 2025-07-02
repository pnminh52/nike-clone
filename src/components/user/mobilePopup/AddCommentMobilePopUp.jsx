import React from "react";
import StarRatingInput from "../productDetail/StarRatingInput";
import ImageUploadDraggable from "../productDetail/ImageUploadDraggable";

const AddCommentMobilePopup = ({
  product,
  rating,
  setRating,
  title,
  setTitle,
  content,
  setContent,
  images,
  setImages,
  isChecked,
  setIsChecked,
  handleSubmit,
  handleCancel,
  isSubmitting,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto hide-scrollbar">
      <div className="flex justify-center items-start h-full ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 relative  shadow max-w-screen-sm w-full mx-auto"
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
              <img
                src={product.img}
                alt={product.name}
                className="w-20 h-20 cursor-pointer object-cover rounded-lg"
              />
              <h3 className="cursor-pointer">{product.name}</h3>
            </div>
          )}

          <StarRatingInput rating={rating} setRating={setRating} />

          <div className="py-2">
            <p className="py-2">
              Your Review<span className="text-red-600">*</span>
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-gray-500 border p-2 rounded-xl"
              rows={4}
              required
            />
            <p className="text-xs text-gray-600">
              Describe what you liked, what you didn't like and other key things
              shoppers should know. Minimum 30 characters.
            </p>
          </div>

          <div className="py-2">
            <p className="py-2">
              Review title<span className="text-red-600">*</span>
            </p>
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
              className="appearance-none hidden sm:block transition duration-300 ease-in-out cursor-pointer w-10 h-8 sm:w-8 sm:h-8 bg-white border-2 border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <input
  type="checkbox"
  className="w-7 h-7 rounded-xl block sm:hidden  accent-black cursor-pointer"
/>

            
            <p className="text-sm">
              By ticking the tick box, I agree to the Privacy Policy, Terms of
              Use and Terms of Service.<span className="text-red-600">*</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isChecked}
            className="h-14 w-full inter rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default  AddCommentMobilePopup ;
