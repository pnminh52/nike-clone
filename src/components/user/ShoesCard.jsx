import React from 'react';
import { Link } from 'react-router-dom';

const ShoesCard = ({ product }) => {
  // const colorList = product.color.split(',').map(color => color.trim().toLowerCase());
  // const uniqueColorCount = [...new Set(colorList)].length;
  const formatPrice = (price) => {
    return Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  


  return (
    <Link to={`/details/${product.name}`} className="block">
      <div className="inter mb-4">
        <img
          src={product.img}
          alt={product.name}
          className="w-[324px] h-[324px] object-cover mb-2 cursor-pointer transition duration-300 "
        />
        <p className="text-orange-600">{product.status}</p>
        <p>{product.name}</p>
        <p className="text-gray-500">{product.gender}'s Shoes</p>
        {/* <p className="text-gray-500">{uniqueColorCount} colour{uniqueColorCount > 1 ? 's' : ''}</p> */}
        <p className="text-gray-500">1 Colour</p>
        <p className="text-black ">
       <span className='inter'> {formatPrice(product.price_sale)} </span>
        <span className='text-sm font-medium'>₫</span>
</p>

      </div>
    </Link>
  );
};

export default ShoesCard;
