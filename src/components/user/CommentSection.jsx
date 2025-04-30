import React from "react";

const CommentSection = ({ comments }) => {
  return (
    <div className="mt-6 space-y-4 inter">
      {comments.length === 0 && (
        <p className="text-gray-500">Chưa có đánh giá nào.</p>
      )}
      {comments.map((comment) => (
        <div key={comment.id} className="">
          <div className="flex items-center gap-3">
            <p className="font-semibold">{comment.userName}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${index < comment.rating ? "text-black" : "text-gray-300"}`}
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                fill="none"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>

          <p className="mt-2">{comment.content}</p>

          {/* Kiểm tra xem comment có ảnh từ Cloudinary không */}
          {Array.isArray(comment.images) && comment.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-3">
              {comment.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}  // Sử dụng Cloudinary URL
                  alt={`comment-img-${idx}`}
                  className="w-full h-24 object-cover rounded hover:scale-105 transition"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
