import React from "react";

const CommentTab = ({ comments, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white max-h-[90vh] w-full max-w-3xl p-6 rounded overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tất cả đánh giá</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-3">
              <p className="font-semibold">{comment.userName}</p>
              <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
              <div className="flex mt-1 mb-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${index < comment.rating ? "text-black" : "text-gray-300"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
                    />
                  </svg>
                ))}
              </div>
              <p>{comment.content}</p>
              {Array.isArray(comment.images) && comment.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {comment.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`comment-img-${idx}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentTab;
