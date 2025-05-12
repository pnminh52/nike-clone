import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShoesCard = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.img);  
  const [variantId, setVariantId] = useState(product.id); 

  const formatPrice = (price) => {
    return Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const variantList = Array.isArray(product.variants)
  ? product.variants.filter(variant => variant.position !== 1)
  : [];

const variantImages = [ { id: product.id, img: product.img }, ...variantList.map(v => ({ id: v.id, img: v.img })) ];

  
  const hasVariants = variantImages?.length > 1;

  const visibleVariants = variantImages.slice(0, 4);

  const remainingVariantsCount = variantImages?.length - visibleVariants?.length;

  const handleImageHover = (variantImg, variantProductId) => {
    setMainImage(variantImg);
    setVariantId(variantProductId);  
  };

  return (
    <div>
      <Link 
        to={`/details/${product.name}?id=${variantId}`}  
        className="block"
      >
        <div className={`inter mb-8 ${hasVariants ? 'group' : ''}`}>
          {/* Main Image */}
          <img
  src={mainImage}
  alt={product.name}
  className={`object-cover cursor-pointer transition-all duration-300 
    w-[139.5px] h-[139.5px] 
    sm:w-[139.5px] sm:h-[139.5px] 
    md:w-[330px] md:h-[330px] 
    lg:w-[330px] lg:h-[330px]`}
/>

          
          {hasVariants && (
            <div className="hidden group-hover:block">
              <div className="flex mt-2">
                <div className="flex gap-2">
                {visibleVariants?.map((variant, index) => (
  <img
    key={index}
    src={variant.img}
    alt={`Variant ${index + 1}`}
    className="w-[40px] h-[40px] object-cover cursor-pointer"
    onMouseEnter={() => handleImageHover(variant.img, variant.id)}
  />
))}

                </div>

                {remainingVariantsCount > 0 && (
                  <div className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                    <p className="text-lg text-gray-600">+{remainingVariantsCount}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-2 ">
            <p className="text-orange-600 ">{product.status}</p>

          
            <p className="block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {product.name}
            </p>
            <p className="text-gray-500 block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {product.gender}'s Shoes
            </p>
            <p className="text-gray-500 block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {variantImages.length} Colour
            </p>

            <div className="flex gap-3 mt-1">
         
              <p className="">
                <span className=""> {formatPrice(product.price)}</span>
                <span className="text-sm font-medium">₫</span>
              </p>
             
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShoesCard;
