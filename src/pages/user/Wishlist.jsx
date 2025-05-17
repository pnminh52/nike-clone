import React, { useState } from 'react';
import { useEffect } from 'react';
import { useWish } from '../../hooks/useWish';
import { useCart } from '../../hooks/useCart';
import PopupSize from '../../components/user/wishlist/PopupSize';
import ProductSkeleton from '../../components/user/etc/ProductSkeleton';
const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWish(); // ✅ lấy data từ hook
  const { addToCart } = useCart(); // ✅ lấy data từ hook
  const [loading, setLoading] = useState(true)
  const formatPrice = (price) => {
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const [showPopup, setShowPopup] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleAddToBagClick = (product) => {
    setSelectedProduct(product)
    setShowPopup(true)
  }

  const handleSelectSize = (size) => {
    if (selectedProduct) {
      addToCart(selectedProduct, size)
    }
    setShowPopup(false)
    setSelectedProduct(null)
  }
  useEffect(()=>{
    const timer = setTimeout(() => {
      setLoading(false)

    },3000)
return () => clearTimeout(timer)
  })
  if (loading) {
    return (    <ProductSkeleton />
    )
  }

  return (
    <div className=" max-w-screen-2xl max-auto px-10">
      <h2 className="text-2xl  py-5">Favourites</h2>

      {wishlist.length === 0 ? (
        <p className='h-300'>Bạn chưa có sản phẩm nào trong wishlist.</p>
      ) : (
        <div className="grid grid-cols-2  lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className=" ">
         <div className='relative '>
         <img src={item.img} alt={item.name} className="w-[442.66px] h-[442.66px] cursor-pointer object-cover mb-2 " />
         <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-5 right-5 text-black cursor-pointer bg-white p-2 rounded-full "
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="25px" height="25px" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z" clip-rule="evenodd"></path><path fill="currentColor" fill-rule="evenodd" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z" clip-rule="evenodd"></path><path stroke="currentColor" stroke-width="1.5" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"></path></svg>

              </button>
         </div>
            <div className='flex justify-between  '>
           <div>
           <p className="inter">{item.name}</p>
           <p className='text-gray-500 '>{item.gender}'s Shoes</p>
           </div>
       
    
       <p className="inter text-black">{formatPrice(item.price_sale)}<span>₫</span> </p>
      

     
            </div>
            <button
            onClick={() => handleAddToBagClick(item)}
            className="px-4 mt-3 py-2 border cursor-pointer border-gray-400 rounded-full"
          >
            Add to Bag
          </button>            
            </div>
          ))}
         {
  showPopup && selectedProduct && (
    <PopupSize 
      img={selectedProduct.img}
      name={selectedProduct.name}
      price={selectedProduct.price_sale}
      gender={selectedProduct.gender}
      sizes={selectedProduct.sizes}
      onSelectSize={handleSelectSize}
      onClose={() => setShowPopup(false)}
    />
  )
}

        </div>
      )}
    </div>
  );
};

export default Wishlist;
