import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';

const ProductDetail = () => {
  const { name } = useParams();
  const { getProductsByName } = useProducts();
  const products = getProductsByName(name);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProduct = products?.[selectedIndex];

  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.img);

    }
  }, [selectedProduct]);

  if (!products || products.length === 0 || !selectedProduct) {
    return <div className="p-4">Loading...</div>;
  }


  return (
    <div className="mx-auto mt-6 flex max-w-screen-lg px-2 gap-0 h-1000">
      <div className="w-2/3 flex gap-2 ">
        {/* Cột ảnh phụ cuộn dọc */}
        <div className="flex flex-col gap-2 overflow-y-auto h-[600px] hide-scrollbar">
          <img
            src={selectedProduct.img}
            alt={selectedProduct.name}
            onClick={() => setMainImage(selectedProduct.img)}
            className={`w-20 h-20 rounded-md object-cover cursor-pointer   ${mainImage === selectedProduct.img ? " " : ""
              }`}
          />
          {selectedProduct.additionalImages.map((img, idx) => (
           <div className='relative cursor-pointer' onClick={() => setMainImage(img)}>
             <img
              key={idx}
              src={img}
              alt="additional"
              
              className={`w-20 h-20 rounded-md object-cover cursor-pointer  hover:border-black transition ${mainImage === img ? "" : ""
                }`}
            />
           <div className="absolute inset-0 bg-black/15 rounded-md hover:bg-black/30 duration-300 ease-in-out transition  "></div>
           </div>
          ))}
        </div>

        {/* Ảnh chính */}
        <div className='relative'>
          <img
            src={mainImage}
            alt={selectedProduct.name}
            className="w-[470px] h-[600px] object-cover cursor-pointer rounded-lg"
          />
          <button className='absolute left-3 top-3 px-4 py-2 bg-white flex items-center rounded-full cursor-pointer gap-1'>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="20px" height="20px" fill="none"><path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z" clip-rule="evenodd"></path></svg>
            <span className='text-xs inter '> Highly Rated</span>
          </button>
        </div>

      </div>

      <div className="w-[50%] ">
        <div>
          <p className="text-2xl inter leading-[1]">{selectedProduct.name}</p>
          <p className="text-gray-600 leading-tight">{selectedProduct.gender}'s Shoes</p>

        </div>
        <div className='mt-2'>
          <p className="text-black inter">{selectedProduct.price_sale} $</p>
        </div>
        <div className="grid grid-cols-5 gap-2 py-4">
          {products.map((product, idx) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedIndex(idx);
                setSelectedSize(null);
              }}
              className={`cursor-pointer rounded ${selectedIndex === idx ? "ring-2 rounded-md transition duration-300 ease-in-out" : ""
                }`}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-20 h-20 rounded-md object-cover"
              />
            </div>
          ))}
        </div>




        <div className='flex justify-between inter'>
          <p>Select Size</p>
          <div className='flex gap-2 items-center'>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M21.75 10.5v6.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V10.5m3.308-2.25h12.885"></path><path stroke="currentColor" stroke-width="1.5" d="M15.79 5.599l2.652 2.65-2.652 2.653M8.21 5.599l-2.652 2.65 2.652 2.653M17.25 19v-2.5M12 19v-2.5M6.75 19v-2.5"></path></svg>
            <p>Size Guide</p>
          </div>
        </div>


        <div className="grid grid-cols-4 gap-2 py-4 inter">
          {[31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41].map((size) => {
            const isAvailable = selectedProduct.sizes.includes(String(size));
            const isSelected = selectedSize === size;

            return (
              <button
                key={size}
                disabled={!isAvailable}
                onClick={() => isAvailable && setSelectedSize(size)}
                className={`px-4 py-3 cursor-pointer flex items-center justify-center border rounded-md text-sm transition
          ${isSelected ? "ring-2 ring-black" : ""}
          ${isAvailable
                    ? "border-gray-400 hover:border-black hover:text-black"
                    : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"}
            
            ${!isAvailable ? 'line-through bg-gray-200' : ''}`}
              >
                EU {size}
              </button>
            );
          })}
        </div>



        <div className='space-y-3 mt-4'>
          <button className="w-full inter text-lg rounded-full bg-black text-white hover:cursor-pointer h-16 hover:bg-gray-800 transition ">
            Add to Bag
          </button>
          <button className="w-full border-1 flex items-center gap-1 justify-center inter text-lg rounded-full bg-white text-black hover:cursor-pointer h-16 hover:text-gray-800 transition ">

            <span>Favourite</span>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451"></path><title>non-filled</title></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
