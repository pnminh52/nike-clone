import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useToast from './useToast';
import { useAuth } from './useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
export const useCart = () => {
  const navigate=useNavigate()
  const [cart, setCart] = useState([]);
  const {successToast, errorToast, warningToast} = useToast();
  const {updateUser}=useAuth()
  const API_URL = "http://localhost:3000";



  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await   fetch(`${API_URL}/users/${userId}`);
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
      const res = await fetch(`${API_URL}/users/${userId}`);
      const user = await res.json();
      const currentCart = user.cart || [];
  
      const existingIndex = currentCart.findIndex(
        (item) => item.id === product.id && item.size === size
      );
  
      let updatedCart;
      if (existingIndex !== -1) {
        updatedCart = [...currentCart];
        updatedCart[existingIndex].quantity += 1;
      } else {
        updatedCart = [...currentCart, { ...product, size, quantity: 1 }];
      }
  
      await   fetch(`${API_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }),
      });
  
      setCart(updatedCart);
      successToast("The product has been successfully added to the shopping cart!");
    } catch (error) {
      errorToast("❌ An error occurred while adding the product to the cart!");
    }
  };
  
  
  const updateQuantity = async (productId, size, newQuantity) => {
    const userId = localStorage.getItem("userId"); // hoặc cách lấy userId hiện tại
    const res = await   fetch(`${API_URL}/users/${userId}`);
    const user = await res.json();
  
    const updatedCart = user.cart.map(item => {
      if (item.id === productId && item.size === size) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  
    // Update lên server
    await   fetch(`${API_URL}/users/${userId}`, {
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
      const res = await   fetch(`${API_URL}/users/${userId}`);
      const user = await res.json();
  
      const currentOrders = user.orders || [];
  
      const productTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
  
      const shippingFee = user.shippingFeeByAddress || 0;
  
      const totalPrice = productTotal + shippingFee;
  
      const newOrder = {
        id: Date.now(),
        items: cart,
        date: new Date().toISOString(),
        status: "Pending",
        shippingFee,
        totalPrice
      };
  
      const updatedOrders = [...currentOrders, newOrder];
  
      const newTotalOrder = (user.totalOrder || 0) + 1;
  
      let newCustomerType = "New";
      if (newTotalOrder >= 100) {
        newCustomerType = "Vip";
      } else if (newTotalOrder >= 50) {
        newCustomerType = "Regular";
      } else if (newTotalOrder >= 1) {
        newCustomerType = "Standard";
      }
  
      const totalGiftPoint = cart.reduce((total, item) => total + (item.giftPoint || 0), 0);  
      const updatedUser = {
        ...user,
        cart: [],
        orders: updatedOrders,
        totalOrder: newTotalOrder,
        customerType: newCustomerType,
      };
  
      await   fetch(`${API_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      updateUser(updatedUser);
      // Cập nhật stock cho từng sản phẩm đã mua
await Promise.all(
  cart.map(async (item) => {
    try {
      const res = await fetch(`${API_URL}/products/${item.id}`);
      const product = await res.json();
      const currentStock = parseInt(product.stock || 0, 10);
      const purchasedQuantity = item.quantity ?? 1;
      const newStock = Math.max(currentStock - purchasedQuantity, 0); // đảm bảo không âm

      await fetch(`${API_URL}/products/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: newStock }),
      });
    } catch (err) {
      console.error(`Lỗi khi cập nhật stock cho sản phẩm ${item.id}:`, err);
    }
  })
);

      setCart([]);
      successToast("✅ Thanh toán thành công!");
      navigate("/")
      // successToast(`🎉 Bạn đã được cộng thêm ${totalGiftPoint} điểm thưởng! Tổng điểm hiện tại: ${updatedPoint}`);
    } catch (error) {
      console.error("Checkout error:", error);
      errorToast("❌ Lỗi khi thanh toán. Vui lòng thử lại.");
    }
  };
  

  
  
  
  
  
  
  const removeFromCart = async (productId, size) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await   fetch(`${API_URL}/users/${userId}`);
    const user = await res.json();

    const updatedCart = (user.cart || []).filter(
      (item) => !(item.id === productId && item.size === size)
    );

    await   fetch(`${API_URL}/users/${userId}`, {
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

    await   fetch(`${API_URL}/users/${userId}`, {
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
