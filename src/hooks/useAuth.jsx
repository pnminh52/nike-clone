import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      const foundUser = res.data.find((u) => u.email === email && u.password === password);
  
      if (!foundUser) {
        toast.error("Email hoặc mật khẩu không đúng.");
        return null;
      }
  
      if (foundUser.accountStatus === "Blocked") {
        toast.error("Tài khoản của bạn đã bị khóa.");
        return null;
      }
  
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("userId", foundUser.id);
      return foundUser;
  
    } catch (error) {
      toast.error("Lỗi đăng nhập.");
      console.error("Login failed:", error);
      return null;
    }
  };
  
  
  
  
  
  const register = async (formData) => {
    try {
      const { email } = formData;
      const check = await axios.get(`http://localhost:3000/users?email=${email}`);
      if (check.data.length > 0) return false;
  
      const res = await axios.post("http://localhost:3000/users", {
        ...formData,
        accountStatus: "Active",
        cart: [],
        orders: [],
        point: 1000,
        totalOrder: 0,
        dateOfBirth: "",
        customerType: "New",
        role: "User",
        avatar: "",
        createdAt: new Date().toISOString(),
        coupons: [
          {
            id: "c1",
            category: "new-user",
            name: "50K Voucher",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b4f20f67-6cd6-4f8e-8e1c-41ccf6d9de08/GiftCard.png",
            description: "Get 50K off on your first order",
            discountType: "amount",
            value: 50000,
            applicableProductNames: "Nike Zoom Fly 6",
            stock: 5,
            code: "WELCOME50",
            expiryDate: "2025-06-30",
            pointToExchange: 1000
          }
        ]
      });
  
      // Trả về dữ liệu user mới tạo để xử lý đăng nhập bên ngoài
      return res.data;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };
  
  
  
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    navigate("/")
  };
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };
  

  return (
<AuthContext.Provider value={{ user, setUser, login, register, logout, updateUser }}>
{children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
