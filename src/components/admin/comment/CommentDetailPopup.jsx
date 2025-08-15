import React from "react";

const CommentDetailPopup = ({ comment, formatDateTime, onClose }) => {
  if (!comment) return null; // Không render nếu chưa chọn comment

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" />
            <path d="M7 7L16.8995 16.8995" stroke="#000" strokeLinecap="round" />
          </svg>
        </button>

        {/* Gallery ảnh */}
        {comment.images && comment.images.length > 0 && (
          <div className=" mb-2 grid grid-cols-5 gap-2">
            {comment.images.slice(0, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Comment image ${index + 1}`}
                className="w-full aspect-square object-cover rounded-sm border border-gray-300 hover:scale-102 transition-transform cursor-pointer"
                onClick={() => window.open(img, "_blank")} // Click mở ảnh to
              />
            ))}
          </div>
        )}

        {/* Thông tin comment */}
        <p>
          <strong>Comment ID:</strong> {comment.id}
        </p>
        <p>
          <strong>Comment account:</strong> {comment.userName}
        </p>
        <p>
          <strong>Date / time:</strong> {formatDateTime(comment.date)}
        </p>
        <p className="whitespace-pre-wrap">
          <strong>Content:</strong> {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentDetailPopup;
