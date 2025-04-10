import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export const useCart = () => {
  const [cart, setCart] = useState([]);

  // 👉 Lấy cart từ server khi component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/${userId}`);
        const user = await res.json();
        setCart(user.cart || []);
      } catch (err) {
        console.error("Lỗi khi load giỏ hàng:", err);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product, size) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.warning("🛑 Vui lòng đăng nhập để thêm vào giỏ hàng!");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await res.json();
  
      const updatedCart = [...(user.cart || []), { ...product, size, quantity: 1 }];
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }),
      });
  
      setCart(updatedCart);
      toast.success("✅ Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      toast.error("❌ Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };
  
  const updateQuantity = (productId, size, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const checkoutCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
  
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
  
    alert("Thanh toán thành công!");
  };
  
  
  
  
  const removeFromCart = async (productId, size) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await res.json();

    const updatedCart = (user.cart || []).filter(
      (item) => !(item.id === productId && item.size === size)
    );

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: updatedCart }),
    });

    setCart(updatedCart);
  };

  const clearCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: [] }),
    });

    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    checkoutCart
  };
};
