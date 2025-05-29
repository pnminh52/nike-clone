import React, { useState, useEffect } from 'react';

const NavigationBarMobile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // Hiện navbar khi cuộn quá 200px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-[20px] left-0 w-full px-4 transition-all duration-300 z-50 md:hidden 
        ${isVisible ? 'bottom-4 opacity-100' : 'opacity-0'}`}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg h-[60px] flex items-center justify-between px-6">
        <div onClick={scrollToTop} className="cursor-pointer">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            width="32px"
            height="32px"
          >
            <path
              fill="currentColor"
              d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
              style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}
            />
          </svg>
        </div>

       

        <div className="cursor-pointer text-sm font-semibold">Menu</div>
      </div>
    </div>
  );
};

export default NavigationBarMobile;
