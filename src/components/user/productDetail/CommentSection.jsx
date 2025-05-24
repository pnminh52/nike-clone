import React, { useState } from "react";
import CommentTab from "../productDetail/CommentTab";
const CommentSection = ({ comments, user }) => {
 
  const topComments = comments.slice(0, 3);

  return (
    <div className="mt-6 space-y-4 ">
      {topComments.length === 0 && (
        <p className="text-gray-500">Chưa có đánh giá nào.</p>
      )}
      {topComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

    

    
    </div>
  );
};

const CommentItem = ({ comment }) => (
  <div>

    <div className="flex items-center justify-between">
      <div className="flex items-center ">
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
        <p className=" text-gray-500 text-sm">
          {comment.userName} -{" "}
          {new Date(comment.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>

    <p
  className="text-black cursor-pointer mt-2"
  content={comment.content}
>
  {comment.content.split(" ").slice(0, 50).join(" ")}
  {comment.content.split(" ").length > 50 && "..."}
</p>


    {Array.isArray(comment.images) && comment.images.length > 0 && (
      <div className="grid grid-cols-5 gap-2 mt-3">
        {comment.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`comment-img-${idx}`}
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        ))}
      </div>
    )}
  </div>
);

export default CommentSection;
