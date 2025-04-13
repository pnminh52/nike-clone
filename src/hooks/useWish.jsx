import { useEffect, useState } from "react";
import useToast from "./useToast";


export const useWish = () => {
    const [wishlist, setWishlist] = useState([]);
    const { successToast, errorToast, warningToast } = useToast();
  
    const userId = localStorage.getItem("userId"); // ✅ Lấy userId trực tiếp ở đây
  
    useEffect(() => {
      if (!userId) return;
  
      const fetchWishlist = async () => {
        try {
          const res = await fetch(`http://localhost:3000/users/${userId}`);
          const user = await res.json();
          setWishlist(user.wishlist || []);
        } catch (error) {
          console.error("Lỗi khi tải wishlist:", error);
          errorToast("❌ Lỗi khi tải danh sách yêu thích.");
        }
      };
  
      fetchWishlist();
    }, [userId]);
  
    const updateWishlist = async (newWishlist) => {
      try {
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wishlist: newWishlist }),
        });
  
        if (res.ok) {
          setWishlist(newWishlist);
          successToast("✅ Cập nhật wishlist thành công!");
        } else {
          throw new Error("Cập nhật không thành công");
        }
      } catch (error) {
        console.error("Failed to update wishlist:", error);
        errorToast("❌ Lỗi khi cập nhật wishlist.");
      }
    };
  
    const isInWishlist = (productId) =>
      wishlist.some((item) => item.id === productId);
  
    const addToWishlist = (product) => {
      if (!isInWishlist(product.id)) {
        updateWishlist([...wishlist, product]);
      } else {
        warningToast("Sản phẩm đã có trong wishlist.");
      }
    };
  
    const removeFromWishlist = (productId) => {
      const updated = wishlist.filter((item) => item.id !== productId);
      updateWishlist(updated);
    };
  
    const toggleWish = (product) => {
      isInWishlist(product.id)
        ? removeFromWishlist(product.id)
        : addToWishlist(product);
    };
  
    return {
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWish,
      isInWishlist,
    };
  };
  
