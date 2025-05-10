// src/components/ProductSkeleton.js
import React, { useState, useEffect } from 'react';

const ProductSkeleton = () => {
  const [spinDuration, setSpinDuration] = useState(5000); // Đặt thời gian quay là 5 giây

  useEffect(() => {
    // Cập nhật thời gian quay sau khi render lần đầu tiên
    const timeout = setTimeout(() => {
      setSpinDuration(5000); // Sau 5 giây thì spinner sẽ quay xong
    }, 1000); // Thời gian delay trước khi bắt đầu quay spinner (1 giây)

    return () => clearTimeout(timeout); // Clean up khi component unmount
  }, []);

  return (
    <div className="flex justify-center items-center min-h-100">
      {/* Spinner với thời gian quay lâu hơn */}
      <div
        className="w-13 h-13 border-3 border-t-transparent border-black rounded-full"
        style={{
          animation: `spin-slow ${spinDuration}ms linear infinite`, // Dùng thời gian quay từ state
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>

      {/* Định nghĩa keyframe cho spinner */}
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSkeleton;
