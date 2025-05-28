import React, { useState, useEffect } from 'react';

const NavigationBar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ví dụ: khi scroll quá 100px thì thanh navbar trở thành sticky
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
    className={`bg-white/70 backdrop-blur-sm transition-all duration-300 ${
      isSticky
        ? 'fixed top-2 left-1/2 transform -translate-x-1/2 shadow-md z-50 rounded-lg opacity-100'
        : 'absolute top-[-60px] left-1/2 transform -translate-x-1/2 opacity-0'
    }`}
    style={{ height: '60px', width: 'calc(100% - 32px)' }}
  >
   
  
      {/* Nội dung navbar */}
      <nav className="flex items-center justify-between h-full px-6">
        <div>Logo</div>
        <div>Menu</div>
      </nav>
    </div>
  );
};

export default NavigationBar;
