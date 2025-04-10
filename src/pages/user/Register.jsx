import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = e => {
    e.preventDefault();
    const success = register(email, password);
    if (success) {
      alert('Đăng ký thành công!');
    } else {
      alert('Email đã tồn tại!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Đăng ký</h2>
      <input className="block border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" className="block border p-2 w-full mb-2" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Đăng ký</button>
    </form>
  );
};

export default Register;
