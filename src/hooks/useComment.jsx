import { useState } from "react";

const useComment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const API_URL = "http://localhost:3000";
  const API_URL = import.meta.env.VITE_API_URL;
  // Lấy bình luận theo productId hoặc toàn bộ nếu không truyền
  const fetchComments = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const url = productId
        ? `${API_URL}/comments?productId=${productId}`
        : `${API_URL}/comments`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Không thể lấy bình luận.");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Thêm bình luận
  const addComment = async (productId, comment) => {
    if (!productId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...comment, productId, status: true }),
      });

      if (!res.ok) throw new Error("Không thể thêm bình luận.");

      const newComment = await res.json();
      setComments((prev) => [...prev, newComment]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle trạng thái bình luận (ẩn/hiện)
  const toggleCommentStatus = async (id, currentStatus) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !currentStatus }),
      });

      if (!res.ok) throw new Error("Không thể cập nhật trạng thái bình luận.");

      const updatedComment = await res.json();
      setComments((prev) =>
        prev.map((cmt) => (cmt.id === id ? updatedComment : cmt))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    fetchComments,
    addComment,
    toggleCommentStatus,
    loading,
    error,
  };
};

export default useComment;
