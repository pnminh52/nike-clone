import React, { useEffect, useState } from "react";
import useComment from "../../../hooks/useComment";
import CommentTable from "../../../components/admin/comment/CommentTable";
import CommentFilter from "../../../components/admin/comment/CommentFilter";

const CommentList = () => {
  const { comments, toggleCommentStatus, loading, fetchComments } = useComment();
  const [filters, setFilters] = useState({ status: "", username: "" });
  const [filteredComments, setFilteredComments] = useState([]);

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    });

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    let data = [...comments];

    // Filter theo status
    if (filters.status) {
      if (filters.status === "display") {
        data = data.filter((c) => !c.status);
      } else if (filters.status === "hidden") {
        data = data.filter((c) => c.status);
      }
    }

    // Sort theo thời gian
if (filters.sort === "newest") {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filters.sort === "oldest") {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  

    // Filter theo username
    if (filters.username) {
      data = data.filter((c) =>
        c.userName.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    setFilteredComments(data);
  }, [filters, comments]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 h-full">
      <div>
        <h2 className="text-2xl nike-title-for-mobile">Manage comment list</h2>
        You can see the detailed list and status of comments here
      </div>

      <CommentFilter filters={filters} onChange={setFilters} />

     
       {
            filteredComments.length > 0 ? (
                <CommentTable
                comments={filteredComments}
                formatDateTime={formatDateTime}
                onHide={toggleCommentStatus}
              />
            ):(
              <p className="text-gray-500 flex w-full justify-center text-sm italic mt-4">
              No comment found matching your filters.
            </p>
            )
           }
    </div>
  );
};

export default CommentList;
