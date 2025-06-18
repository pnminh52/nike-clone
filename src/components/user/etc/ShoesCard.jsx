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
        <div className={` mb-0  sm:mb-2  ${hasVariants ? 'group' : ''}`}>
          {/* Main Image */}
          <div className="aspect-square w-full">
  <img
    src={mainImage}
    alt={product.name}
    className="object-cover cursor-pointer transition-all duration-300 w-full h-full"
  />
</div>


          
          {hasVariants && (
            <div className="hidden sm:block">
              <div className="flex mt-2">
                <div className="flex gap-2">
                {visibleVariants?.map((variant, index) => (
  <img
    key={index}
    src={variant.img}
    alt={`Variant ${index + 1}`}
    className="w-[50px] h-[50px] object-cover cursor-pointer"
    onMouseEnter={() => handleImageHover(variant.img, variant.id)}
  />
))}
  {remainingVariantsCount > 0 && (
                  <div className="w-[50px] h-[50px] bg-gray-100 flex items-center justify-center cursor-pointer">
                    <p className=" text-gray-600">+{remainingVariantsCount}</p>
                  </div>
                )}

                </div>

              
              </div>
            </div>
          )}

          <div className="px-2 sm:px-0 py-2  ">
            <p className="text-[#D33918] ">{product.status}</p>

          
            <p className=" inter truncate block  ">
              {product.name}
            </p>
            <p className="   text-gray-500 block  ">
              {product.type}
            </p>
            <p className="  text-gray-500 block  ">
              {variantImages.length} Colour
            </p>

           
              <p className=" ">
                <span className="inter "> {formatPrice(product.price)}</span>
                <span className="text-sm">₫</span>
              </p>
              
           
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShoesCard;
