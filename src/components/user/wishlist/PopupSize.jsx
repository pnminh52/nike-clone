import React, { useState, useEffect } from "react";

const PopupSize = ({
    img,
    name,
    price,
    onSelectSize,
    gender,
    onClose,
    sizes = [],
}) => {
    const allSizes = Array.from({ length: 14 }, (_, i) => (31 + i).toString());
    const [selectedSize, setSelectedSize] = useState(null);
    const [showError, setShowError]=useState(false)
    const formatPrice = (price) => {
        return Number(price)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
useEffect(()=>{
    if(selectedSize){
        setShowError(false)
    }
},[selectedSize])
    return (
        <div onClick={onClose}  className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40">
            <div   onClick={(e) => e.stopPropagation()} className="bg-white rounded-4xl max-w-screen-lg shadow-lg">
                <div className="flex gap-4 p-6">
                    <div className="w-1/2">
                        <img
                            src={img}
                            alt={name}
                            className="w-[500px] h-[400px] object-cover"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between">
                        <div>
                            <p className="inter">{gender}'s Shoes</p>
                            <p className="text-2xl font-semibold">{name}</p>
                            <p className="inter">{formatPrice(price).toLocaleString()}₫</p>
                        </div>

                        <div className="">
                            <p className={`mb-1 inter ${showError?"text-[#D30005]":""}`}>Select Size</p>
                            <div className={`grid grid-cols-5 gap-2 py-2 ${showError?"border py-0 border-[#D30005] rounded-lg":""}`}>
                                {allSizes.map((size) => {
                                    const isAvailable = sizes.includes(size);
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => isAvailable && setSelectedSize(size)}
                                            className={`border px-4 py-2 inter rounded-lg
                        ${isAvailable
                                                    ? "border-gray-400 hover:bg-gray-100  hover:border-black cursor-pointer"
                                                    : "border-gray-200 text-gray-400 line-through cursor-not-allowed"
                                                }
                        ${selectedSize === size
                                                    ? "ring-2 ring-black transition duration-300 ease-in-out"
                                                    : ""
                                                }
                      `}
                                            disabled={!isAvailable}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="py-1">
                                {showError && (
                                    <p className="text-[#D30005]">Please select a size.</p>
                                )}
                            </div>
                            <div className="">
                            <button
  onClick={() => {
    if (selectedSize) {
      onSelectSize(selectedSize);
      setShowError(false); 
    } else {
      setShowError(true); 
    }
  }}
  className={`w-full inter text-lg rounded-full h-14 transition bg-black text-white hover:bg-gray-800 cursor-pointer
   
  `}
>
  Add to Bag
</button>
                        </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupSize;
