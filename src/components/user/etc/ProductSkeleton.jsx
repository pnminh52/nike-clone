import React, { useState, useEffect } from 'react';
import './ProductSkeleton.css'; // Import CSS file

const ProductSkeleton = () => {
  const [spinDuration, setSpinDuration] = useState(2000); 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSpinDuration(2000); 
    }, ); 

    return () => clearTimeout(timeout); 
  }, []);

  return (
    <div className="flex justify-center items-center min-h-100">
      <div
        className="w-13 h-13 border-3 border-t-transparent border-black rounded-full"
        style={{
          animation: `spin-slow ${spinDuration}ms linear infinite`,
        }}
        role="status"
      >
       
      </div>
    </div>
  );
};

export default ProductSkeleton;
