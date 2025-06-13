import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const NavigationBarLaptop = () => {
  const [isSticky, setIsSticky] = useState(false);
const scrollToTopForLaptop=()=>{
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
  useEffect(() => {
    const handleScroll = () => {
      // Ví dụ: khi scroll quá ..px thì thanh navbar trở thành sticky
      if (window.scrollY > 200) {
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
      className={`hidden md:block bg-white/70 backdrop-blur-sm border border-blue-600 transition-all duration-300 ${isSticky
          ? 'fixed top-4 left-1/2 transform -translate-x-1/2 shadow-md z-50 rounded-lg opacity-100'
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
       
        <div className=' flex gap-2 items-center'>
          <button className='bg-white px-4 py-3 rounded-lg border border-gray-300 text-sm cursor-pointer'>
            Join Us
          </button>
          <button className='px-4 py-3 text-center justify-center items-center bg-black flex cursor-pointer gap-2 rounded-lg  text-white text-sm'>
          <svg className="w-3 md:w-3.5" fill="none" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.9984.98236c-2.53.35112-5.06001.71507-7.58521 1.10147a3272.65486 3272.65486 0 0 0 0 5.60513C8.9432 7.68094 11.4716 7.64246 14 7.63284c-.0016-2.21736 0-4.43312-.0016-6.65048ZM5.72073 2.19285C3.8112 2.43174 1.90151 2.68506 0 2.97847v4.75217c1.90792.00481 3.81601-.02405 5.72394-.02244-.00161-1.83899-.00161-3.67637-.00321-5.51535ZM5.71896 8.33028C3.81264 8.33348 1.90648 8.30302 0 8.30943v4.76497c1.90792.2582 3.81601.5049 5.72073.7873.00304-1.8438-.00177-3.6876-.00177-5.53142ZM13.9984 8.38319H6.40197c.00321 1.85501.00802 3.70841.01122 5.56201 2.53001.3429 5.06001.6941 7.58521 1.0724 0-2.2125.0032-4.4235 0-6.63441Z" fill="currentColor"></path></svg>
            Dowload</button>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBarLaptop;
