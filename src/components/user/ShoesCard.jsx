import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShoesCard = ({ product, isFilterVisible }) => {
  const [mainImage, setMainImage] = useState(product.img);  // Lưu trữ ảnh chính
  const [variantId, setVariantId] = useState(product.id);  // Lưu trữ id của biến thể

  const formatPrice = (price) => {
    return Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateDiscount = (price, price_sale) => {
    if (!price || !price_sale) return 0;
    return Math.round(((price - price_sale) / price) * 100);
  };

  const discountPercentage = calculateDiscount(product.price, product.price_sale);

  // Tạo danh sách ảnh biến thể, bao gồm cả ảnh chính (position 1)
  let variantImages = [product.img, ...product.variants?.filter(variant => variant.position !== 1).map(variant => variant.img)];

  // Kiểm tra xem sản phẩm có ảnh biến thể hay không
  const hasVariants = variantImages?.length > 1;

  // Giới hạn số lượng ảnh hiển thị (tối đa 4 ảnh)
  const visibleVariants = variantImages?.slice(0, 4);
  const remainingVariantsCount = variantImages?.length - visibleVariants?.length;

  // Hàm thay đổi ảnh và id biến thể khi hover vào ảnh nhỏ
  const handleImageHover = (variantImg, variantProductId) => {
    setMainImage(variantImg);
    setVariantId(variantProductId);  // Cập nhật id biến thể
  };

  return (
    <div>
      <Link 
        to={`/details/${product.name}?id=${variantId}`}  // Cập nhật id biến thể vào URL
        className="block"
      >
        <div className={`inter mb-14 ${hasVariants ? 'group' : ''}`}>
          {/* Main Image */}
          <img
            src={mainImage}
            alt={product.name}
            className={`object-cover cursor-pointer transition-all duration-300 ${
              isFilterVisible ? 'w-[330px] h-[330px]' : 'w-[440px] h-[440px]'
            }`}
          />
          
          {/* Display variant images below the main image only if there are variants */}
          {hasVariants && (
            <div className="hidden group-hover:block">
              <div className="flex mt-2">
                <div className="flex gap-2">
                  {visibleVariants?.map((variantImg, index) => (
                    <img
                      key={index}
                      src={variantImg}
                      alt={`Variant ${index + 1}`}
                      className="w-[40px] h-[40px] object-cover cursor-pointer"
                      onMouseEnter={() => handleImageHover(variantImg, product.variants[index]?.id)}  // Thay đổi ảnh và id biến thể
                    />
                  ))}
                </div>

                {/* Display remaining count if there are more variants */}
                {remainingVariantsCount > 0 && (
                  <div className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                    <p className="text-lg text-gray-600">+{remainingVariantsCount}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-2 transform transition-all duration-500 -translate-y-0 group-hover:translate-y-2.5">
            <p className="text-orange-600 ">{product.status}</p>

            {/* Trượt xuống khi hover vào ảnh biến thể */}
            <p className="block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {product.name}
            </p>
            <p className="text-gray-500 block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {product.gender}'s Shoes
            </p>
            <p className="text-gray-500 block group-hover:hidden transform transition-all duration-500 translate-y-0 group-hover:translate-y-6">
              {variantImages.length} Colour
            </p>

            <div className="flex gap-3 mt-3">
              <p className="text-black">
                <span className="inter"> {formatPrice(product.price_sale)}</span>
                <span className="text-sm font-medium">₫</span>
              </p>
              <p className="text-gray-500">
                <span className="inter line-through"> {formatPrice(product.price)}</span>
                <span className="text-sm font-medium">₫</span>
              </p>
              {discountPercentage > 0 && (
                <p className="text-green-600">
                  {discountPercentage}%off
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShoesCard;
