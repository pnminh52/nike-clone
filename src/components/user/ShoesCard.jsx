import React from 'react';
import { Link } from 'react-router-dom';
import CategoryPage from '../../pages/user/CategoryPage';
const ShoesCard = ({ product, isFilterVisible } ) => {
  // const colorList = product.color.split(',').map(color => color.trim().toLowerCase());
  // const uniqueColorCount = [...new Set(colorList)].length;
  const formatPrice = (price) => {
    return Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  


  return (
<Link to={`/details/${product.name}?id=${product.id}`} className="block">
<div className="inter  ">
      <img
  src={product.img}
  alt={product.name}
  className={`object-cover cursor-pointer transition-all duration-300 ${
    isFilterVisible ? 'w-[340px] h-[340px]' : 'w-[440px] h-[440px]'
  }`}
/>

       <div className='mt-2'>
         <p className="text-orange-600">{product.status}</p>
                <p>{product.name}</p>
                <p className="text-gray-500">{product.gender}'s Shoes</p>
                <p className="text-gray-500">1 Colour</p>
                <p className="text-black mt-1.5 ">
               <span className='inter'> {formatPrice(product.price_sale)} </span>
                <span className='text-sm font-medium'>₫</span>
        </p>
       </div>

      </div>
    </Link>
  );
};

export default ShoesCard;
