import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useToast from './useToast';
import { useAuth } from './useAuth';
export const useCart = () => {
  const [cart, setCart] = useState([]);
  const {successToast, errorToast, warningToast} = useToast();
  const {updateUser}=useAuth()


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
  
      // Tổng tiền sản phẩm
      const productTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
  
      // Lấy phí ship từ user
      const shippingFee = user.shippingFeeByAddress || 0;
  
      // Tổng thanh toán
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
  
      const updatedPoint = user.point + totalGiftPoint;
  
      const updatedUser = {
        ...user,
        cart: [],
        orders: updatedOrders,
        totalOrder: newTotalOrder,
        customerType: newCustomerType,
        point: updatedPoint
      };
  
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      updateUser(updatedUser);
      setCart([]);
      successToast("✅ Thanh toán thành công!");
      successToast(`🎉 Bạn đã được cộng thêm ${totalGiftPoint} điểm thưởng! Tổng điểm hiện tại: ${updatedPoint}`);
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
