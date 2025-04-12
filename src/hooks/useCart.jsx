import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useToast from './useToast';
export const useCart = () => {
  const [cart, setCart] = useState([]);
  const {successToast, errorToast, warningToast} = useToast();


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
      warningToast("🛑 Vui lòng đăng nhập để thêm vào giỏ hàng!");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await res.json();
      const currentCart = user.cart || [];
  
      // Kiểm tra xem sản phẩm đã tồn tại chưa
      const existingIndex = currentCart.findIndex(
        (item) => item.id === product.id && item.size === size
      );
  
      let updatedCart;
      if (existingIndex !== -1) {
        // Nếu đã tồn tại => tăng quantity
        updatedCart = [...currentCart];
        updatedCart[existingIndex].quantity += 1;
      } else {
        // Nếu chưa tồn tại => thêm mới
        updatedCart = [...currentCart, { ...product, size, quantity: 1 }];
      }
  
      // Gửi PATCH cập nhật cart
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }),
      });
  
      setCart(updatedCart);
      successToast("✅ Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      errorToast("❌ Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };
  
  
  const updateQuantity = async (productId, size, newQuantity) => {
    const userId = localStorage.getItem("userId"); // hoặc cách lấy userId hiện tại
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await res.json();
  
    const updatedCart = user.cart.map(item => {
      if (item.id === productId && item.size === size) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  
    // Update lên server
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cart: updatedCart })
    });
  
    // Update local state nếu có
    setCart(updatedCart);
  };
  
  
  const checkoutCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
  
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await res.json();
  
      const currentOrders = user.orders || [];
  
      // Tạo đơn hàng mới với thời gian và giỏ hàng hiện tại
      const newOrder = {
        id: Date.now(),
        items: cart,
        date: new Date().toISOString(),
        status: "Đang xử lý"
      };
  
      const updatedOrders = [...currentOrders, newOrder];
  
      // Cập nhật orders và xóa giỏ hàng
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: [],
          orders: updatedOrders
        }),
      });
  
      setCart([]);
      successToast("✅ Thanh toán thành công!");
    } catch (error) {
      console.error("Checkout error:", error);
      errorToast("❌ Lỗi khi thanh toán. Vui lòng thử lại.");
    }
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
