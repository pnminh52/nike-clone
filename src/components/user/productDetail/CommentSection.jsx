import React, { useState } from "react";
import CommentTab from "../productDetail/CommentTab";

const CommentSection = ({ comments, user }) => {
  const [showCommentTab, setShowCommentTab] = useState(false);
  const topComments = comments.slice(0, 3);

  return (
    <div className="mt-6 space-y-4">
      {topComments.length === 0 && (
        <p className="text-gray-500">There are no reviews yet.</p>
      )}
  {comments.length > 3 && (
        <button
          onClick={() => setShowCommentTab(true)}
          className="text-sm text-blue-600 underline hover:text-gray-800"
        >
          View all comments
        </button>
      )}
      {topComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

    

      {showCommentTab && (
        <CommentTab
          comments={comments}
          user={user}
          onClose={() => setShowCommentTab(false)}
        />
      )}
    </div>
  );
};

const CommentItem = ({ comment }) => (
  <div>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < comment.rating ? "text-black" : "text-white"
            }`}
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="currentColor"
              stroke="black"
              strokeWidth="1.5"
              d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
            />
          </svg>
        ))}
      </div>
      <div>
        <p className="text-gray-500 text-sm">
          {comment.userName} -{" "}
          {new Date(comment.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>

    <p className="text-black text-sm cursor-pointer mt-2">
      {comment.content.split(" ").slice(0, 50).join(" ")}
      {comment.content.split(" ").length > 50 && "..."}
    </p>

    {Array.isArray(comment.images) && comment.images.length > 0 && (
      <div className="flex overflow-auto w-full gap-2 mt-3">
        {comment.images.slice(0, 4).map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`comment-img-${idx}`}
            className="w-24 h-24 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        ))}
      </div>
    )}
  </div>
);

export default CommentSection;
