import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate=useNavigate()
  const shippingFeeByAddress = {
    "Hà Nội": 10000,
    "TP Hồ Chí Minh": 12000,
    "Đà Nẵng": 11000,
    "Hải Phòng": 10000,
    "Cần Thơ": 12000,
    "An Giang": 15000,
    "Bà Rịa - Vũng Tàu": 13000,
    "Bắc Giang": 14000,
    "Bắc Kạn": 16000,
    "Bạc Liêu": 15000,
    "Bắc Ninh": 14000,
    "Bến Tre": 15000,
    "Bình Định": 15000,
    "Bình Dương": 13000,
    "Bình Phước": 14000,
    "Bình Thuận": 15000,
    "Cà Mau": 16000,
    "Cao Bằng": 17000,
    "Đắk Lắk": 16000,
    "Đắk Nông": 16000,
    "Điện Biên": 18000,
    "Đồng Nai": 13000,
    "Đồng Tháp": 15000,
    "Gia Lai": 16000,
    "Hà Giang": 18000,
    "Hà Nam": 11000,
    "Hà Tĩnh": 14000,
    "Hải Dương": 11000,
    "Hậu Giang": 15000,
    "Hòa Bình": 13000,
    "Hưng Yên": 11000,
    "Khánh Hòa": 14000,
    "Kiên Giang": 16000,
    "Kon Tum": 17000,
    "Lai Châu": 18000,
    "Lâm Đồng": 15000,
    "Lạng Sơn": 14000,
    "Lào Cai": 18000,
    "Long An": 13000,
    "Nam Định": 12000,
    "Nghệ An": 14000,
    "Ninh Bình": 12000,
    "Ninh Thuận": 14000,
    "Phú Thọ": 13000,
    "Phú Yên": 14000,
    "Quảng Bình": 14000,
    "Quảng Nam": 14000,
    "Quảng Ngãi": 14000,
    "Quảng Ninh": 13000,
    "Quảng Trị": 14000,
    "Sóc Trăng": 15000,
    "Sơn La": 16000,
    "Tây Ninh": 13000,
    "Thái Bình": 12000,
    "Thái Nguyên": 12000,
    "Thanh Hóa": 13000,
    "Thừa Thiên Huế": 14000,
    "Tiền Giang": 13000,
    "Trà Vinh": 15000,
    "Tuyên Quang": 15000,
    "Vĩnh Long": 15000,
    "Vĩnh Phúc": 12000,
    "Yên Bái": 15000
  };
  
  

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) setUser(storedUser);
    } catch {
      setUser(null);
    }
  }, []);
  

  const register = async (formData) => {
    try {
      const { email, address } = formData;
  
      const check = await axios.get(`http://localhost:3000/users?email=${email}`);
      if (check.data.length > 0) return false;
  
      const fee = shippingFeeByAddress[address] || 20000;
  
      const res = await axios.post("http://localhost:3000/users", {
        ...formData,
        shippingFeeByAddress: fee,  
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
  
      return res.data;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };
  

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
