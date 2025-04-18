import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);
      const foundUser = res.data[0];
  
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('userId', foundUser.id);
        return true;
      }
  
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      setUser(null);
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
  
  
  const register = async (formData) => {
    try {
      const { email } = formData;
      const check = await axios.get(`http://localhost:3000/users?email=${email}`);
      if (check.data.length > 0) return false;
  
      const res = await axios.post("http://localhost:3000/users", {
        ...formData,
        cart: [],
        orders: []
      });
  
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('userId', res.data.id);
  
      return true;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };
  
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    window.location.reload(); 
  };
  

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
