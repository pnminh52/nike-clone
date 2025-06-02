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
        <div className={` mb-0  sm:mb-8  ${hasVariants ? 'group' : ''}`}>
          {/* Main Image */}
          <div className="aspect-square w-full">
  <img
    src={mainImage}
    alt={product.name}
    className="object-cover cursor-pointer transition-all duration-300 w-full h-full"
  />
</div>


          
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

          <div className="px-2 py-2  ">
            <p className="text-[#D33918] text-sm sm:text-lg">{product.status}</p>

          
            <p className="text-sm sm:text-lg inter truncate block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {product.name}
            </p>
            <p className="text-sm sm:text-lg text-gray-500 block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {product.gender}'s Shoes
            </p>
            <p className="text-sm sm:text-lg text-gray-500 block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {variantImages.length} Colour
            </p>

           
              <p className=" mt-1">
                <span className="inter text-sm sm:text-lg"> {formatPrice(product.price)}</span>
                <span className="text-xs">₫</span>
              </p>
              
           
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShoesCard;
