import { useState } from "react";

const useComment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:3000";

  // Lấy bình luận theo productId
  const fetchComments = async (productId) => {
    if (!productId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await  fetch(`${API_URL}/comments?productId=${productId}`);
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
      const res = await  fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...comment, productId }),
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

  return { comments, fetchComments, addComment, loading, error };
};

export default useComment;
