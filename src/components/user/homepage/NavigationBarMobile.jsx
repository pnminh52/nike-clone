import React, { useState, useEffect } from 'react';

const NavigationBarMobile = () => {
  const [isVisible, setIsVisible] = useState(false);
 
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
    className={`block md:hidden bg-white/70 backdrop-blur-sm border border-blue-600 transition-all duration-300 ease-in-out
      fixed top-4 left-1/2 transform -translate-x-1/2 z-50
      ${isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-10'
      } rounded-lg shadow-md`}
    style={{ height: '60px', width: 'calc(100% - 32px)' }}
  >
  
      <div  className="flex items-center justify-between h-full px-6">
        <div onClick={scrollToTop} className="cursor-pointer">
        <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="60px"
                                    height="60px"
                                    className='cursor-pointer'
                                >
                                    <path
                                        fill="currentColor"
                                        d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
                                        style={{ transform: "scale(1.2)", transformOrigin: "center" }}
                                    />
                                </svg>
        </div>

       

        <div className="cursor-pointer">
                            <svg

                                className=""
                                aria-hidden="true"
                                focusable="false"
                                viewBox="0 0 24 24"
                                role="img"
                                width="24px"
                                height="24px"
                                fill="none"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    d="M21 5.25H3M21 12H3m18 6.75H3"
                                ></path>
                            </svg>
                        </div>
      </div>
    </div>
  );
};

export default NavigationBarMobile;
