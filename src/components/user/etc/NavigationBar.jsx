import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const NavigationBar = () => {
  const [isSticky, setIsSticky] = useState(false);
const scrollToTopForLaptop=()=>{
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
  useEffect(() => {
    const handleScroll = () => {
      // Ví dụ: khi scroll quá ..px thì thanh navbar trở thành sticky
      if (window.scrollY > 150) {
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
      className={`hidden md:block bg-white/70 backdrop-blur-sm transition-all duration-300 ${isSticky
          ? 'fixed top-2 left-1/2 transform -translate-x-1/2 shadow-md z-50 rounded-lg opacity-100'
          : 'absolute top-[-60px] left-1/2 transform -translate-x-1/2 opacity-0'
        }`}
      style={{ height: '60px', width: 'calc(100% - 32px)' }}
    >


      {/* Nội dung navbar */}
      <nav className="flex items-center justify-between h-full px-6">
       <div onClick={()=>scrollToTopForLaptop()}>
    
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="80px"
                                    height="80px"
                                    className='cursor-pointer'
                                >
                                    <path
                                        fill="currentColor"
                                        d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
                                        style={{ transform: "scale(1.2)", transformOrigin: "center" }}
                                    />
                                </svg>
                         
       </div>
        <div>
          <ul className='flex gap-4'>
            <li>New & Featured</li>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Sale</li>
          </ul>
        </div>
        <div>Menu</div>
      </nav>
    </div>
  );
};

export default NavigationBar;
