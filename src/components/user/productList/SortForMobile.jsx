import React, { useState, useEffect } from 'react';

const SortForMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const closeMenu = () => {
    setAnimateOut(true);
  };

  useEffect(() => {
    if (animateOut) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setAnimateOut(false);
      }, 300); // thời gian animation
      return () => clearTimeout(timer);
    }
  }, [animateOut]);

  return (
    <>
      <div
        className='flex gap-1 items-center px-4 py-1 border rounded-full border-gray-300 cursor-pointer'
        onClick={() => setIsOpen(true)}
      >
        <p>Sort By</p>
        <svg
          aria-hidden="true"
          className="icon-filter-ds"
          focusable="false"
          viewBox="0 0 24 24"
          role="img"
          width="24px"
          height="24px"
          fill="none"
        >
          <path stroke="currentColor" strokeWidth="1.5" d="M21 8.25H10m-5.25 0H3"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M3 15.75h10.75m5 0H21"></path>
          <path stroke="currentColor" strokeWidth="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
        </svg>
      </div>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-white z-50 flex flex-col ${
            animateOut ? 'slide-down' : 'slide-up'
          }`}
        >
          <div className="flex justify-between items-center px-6 py-4 ">
            <h2 className="">Filter</h2>
            <button
              onClick={closeMenu}
              className=""
              aria-label="Close Sort Menu"
            >
              <svg viewBox="0 0 24 24" fill="none" width="28px" height="28px">
    <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 7L16.8995 16.8995" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
            </button>
          </div>

          <div className="px-6  space-y-4">
            <p>Sort By</p>
            <ul className='space-y-4'>
                <li>Featured</li>
                <li>Newest</li>
                <li>Price: Low-High</li>
                <li>Price: High-Low</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SortForMobile;
